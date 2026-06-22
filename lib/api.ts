import type { Prisma } from "@prisma/client";
import { prisma } from "@/lib/prisma";
import type {
  Category,
  HeroSlide,
  Product,
  ProductFull,
  Review,
} from "@/types";
import { getColorHex } from "@/lib/product-colors";

type ApiPagination = {
  page: number;
  limit: number;
  total: number;
  pages: number;
};

const PAGE_SIZE = 20;

// ─── Mapping helpers ────────────────────────────────────────────────────────

type DbProduct = {
  id: string;
  name: string;
  slug: string;
  description?: string;
  price: number | { toNumber(): number } | string;
  salePrice: number | { toNumber(): number } | string | null;
  featured: boolean;
  isNew: boolean;
  bestSeller: boolean;
  category: { id: string; name: string; slug: string; image: string | null };
  images: { id: string; url: string; alt: string | null; position: number }[];
  variants?: { id: string; color: string; size: string; stock: number }[];
  rating?: number;
  reviewCount?: number;
  related?: DbProduct[];
};

function toNum(v: unknown): number {
  if (typeof v === "number") return v;
  if (v && typeof (v as { toNumber: () => number }).toNumber === "function")
    return (v as { toNumber: () => number }).toNumber();
  return Number(v);
}

export function toProduct(product: DbProduct): Product {
  const firstImage = product.images[0];
  const price = toNum(product.price);
  const salePrice = product.salePrice != null ? toNum(product.salePrice) : null;
  const activePrice = salePrice ?? price;

  return {
    id: product.slug,
    slug: product.slug,
    name: product.name,
    category: product.category.name,
    categorySlug: product.category.slug,
    price: activePrice,
    salePrice: salePrice ?? undefined,
    oldPrice: salePrice ? price : undefined,
    imageUrl: firstImage?.url,
    images: product.images.map((img) => ({ imageUrl: img.url })),
    colors: product.variants?.map((v) => v.color),
    sizes: product.variants?.map((v) => v.size),
    installments: {
      count: 6,
      value: Number((activePrice / 6).toFixed(2)),
    },
    badge: salePrice
      ? { type: "sale", label: "Promo" }
      : product.isNew
      ? { type: "new", label: "Novo" }
      : undefined,
  };
}

function toProductFull(product: DbProduct): ProductFull {
  const variants = product.variants ?? [];
  const colors = Array.from(
    new Map(variants.map((v) => [v.color, v])).values()
  );
  const sizes = Array.from(
    new Map(variants.map((v) => [v.size, v])).values()
  );

  return {
    ...toProduct(product),
    description: product.description ?? "",
    rating: product.rating ?? 0,
    reviewCount: product.reviewCount ?? 0,
    gallery: product.images.map((img) => ({ imageUrl: img.url })),
    availableColors: colors.map((v) => ({
      name: v.color,
      hex: getColorHex(v.color),
    })),
    availableSizes: sizes.map((v) => ({
      label: v.size,
      available: v.stock > 0,
    })),
    related: product.related?.map(toProduct) ?? [],
  };
}

// ─── Public query functions (no HTTP) ───────────────────────────────────────

export async function getCategories() {
  try {
    const categories = await prisma.category.findMany({
      select: {
        id: true,
        name: true,
        slug: true,
        image: true,
        _count: { select: { products: { where: { active: true } } } },
      },
      orderBy: { name: "asc" },
    });

    return {
      data: categories.map((c) => ({
        id: c.slug,
        name: c.name,
        count: c._count.products,
        href: `/${c.slug}`,
        imageUrl: c.image ?? undefined,
      })) as Category[],
      error: null,
    };
  } catch {
    return { data: [] as Category[], error: "Erro ao carregar categorias" };
  }
}

const productSelect = {
  id: true,
  name: true,
  slug: true,
  price: true,
  salePrice: true,
  featured: true,
  isNew: true,
  bestSeller: true,
  category: { select: { id: true, name: true, slug: true, image: true } },
  images: {
    select: { id: true, url: true, alt: true, position: true },
    orderBy: { position: "asc" as const },
  },
  variants: { select: { id: true, color: true, size: true, stock: true } },
} satisfies Prisma.ProductSelect;

export async function getProducts(query = ""): Promise<{
  data: Product[];
  pagination?: ApiPagination;
  error: string | null;
}> {
  try {
    const params = new URLSearchParams(query.replace(/^\?/, ""));
    const category  = params.get("category");
    const featured  = params.get("featured");
    const isNew     = params.get("new");
    const sort      = params.get("sort");
    const size      = params.get("size");
    const color     = params.get("color");
    const minPrice  = params.get("minPrice");
    const maxPrice  = params.get("maxPrice");
    const search    = params.get("search");
    const page      = Math.max(1, parseInt(params.get("page") ?? "1", 10));

    const where: Prisma.ProductWhereInput = { active: true };

    if (category)  where.category = { slug: category };
    if (featured === "true") where.featured = true;
    if (isNew === "true")    where.isNew    = true;
    if (search) {
      where.OR = [
        { name:        { contains: search, mode: "insensitive" } },
        { description: { contains: search, mode: "insensitive" } },
      ];
    }
    if (size || color) {
      where.variants = {
        some: {
          ...(size  && { size }),
          ...(color && { color }),
          stock: { gt: 0 },
        },
      };
    }
    if (minPrice || maxPrice) {
      where.price = {
        ...(minPrice && { gte: parseFloat(minPrice) }),
        ...(maxPrice && { lte: parseFloat(maxPrice) }),
      };
    }

    let orderBy: Prisma.ProductOrderByWithRelationInput = { name: "asc" };
    if (sort === "price_asc")  orderBy = { price: "asc" };
    if (sort === "price_desc") orderBy = { price: "desc" };
    if (sort === "newest")     orderBy = { createdAt: "desc" };

    const skip = (page - 1) * PAGE_SIZE;

    const [products, total] = await Promise.all([
      prisma.product.findMany({ where, orderBy, skip, take: PAGE_SIZE, select: productSelect }),
      prisma.product.count({ where }),
    ]);

    return {
      data: products.map((p) => toProduct(p as DbProduct)),
      pagination: { page, limit: PAGE_SIZE, total, pages: Math.ceil(total / PAGE_SIZE) },
      error: null,
    };
  } catch {
    return { data: [], error: "Erro ao buscar produtos" };
  }
}

export async function getProductBySlug(slug: string) {
  try {
    const product = await prisma.product.findFirst({
      where: { slug, active: true },
      select: {
        ...productSelect,
        description: true,
        reviews: {
          select: {
            id: true,
            rating: true,
            comment: true,
            createdAt: true,
            user: { select: { name: true } },
          },
          orderBy: { createdAt: "desc" },
          take: 20,
        },
      },
    });

    if (!product) return { data: null, error: null };

    const related = await prisma.product.findMany({
      where: { active: true, categoryId: product.category.id, id: { not: product.id } },
      take: 4,
      select: productSelect,
      orderBy: { name: "asc" },
    });

    const reviewCount = product.reviews.length;
    const rating = reviewCount > 0
      ? Math.round(product.reviews.reduce((s, r) => s + r.rating, 0) / reviewCount)
      : 0;

    const reviewList = product.reviews
      .filter((r) => r.comment)
      .map((r) => ({
        id: r.id,
        author: r.user.name,
        rating: r.rating,
        comment: r.comment ?? "",
        date: r.createdAt.toISOString(),
      }));

    return {
      data: {
        ...toProductFull({
          ...product,
          rating,
          reviewCount,
          related: related as DbProduct[],
        } as DbProduct),
        reviewList,
      },
      error: null,
    };
  } catch {
    return { data: null, error: "Erro ao buscar produto" };
  }
}

export async function getBanners() {
  try {
    const banners = await prisma.banner.findMany({
      where: { active: true },
      orderBy: { createdAt: "asc" },
    });

    return {
      data: banners.map((b) => ({
        eyebrow: b.position,
        title: b.title,
        description: b.subtitle ?? "",
        cta: { label: b.buttonText ?? "Comprar agora", href: b.buttonLink ?? "/" },
        imageUrl: b.image,
      })) as HeroSlide[],
      error: null,
    };
  } catch {
    return { data: [] as HeroSlide[], error: "Erro ao carregar banners" };
  }
}

export async function getReviews() {
  try {
    const reviews = await prisma.review.findMany({
      where: { comment: { not: null } },
      select: {
        id: true,
        rating: true,
        comment: true,
        user: { select: { name: true } },
      },
      orderBy: { createdAt: "desc" },
      take: 6,
    });

    return {
      data: reviews.map((r) => ({
        id: r.id,
        rating: r.rating,
        quote: r.comment ?? "",
        author: r.user.name,
        location: "",
      })) as Review[],
      error: null,
    };
  } catch {
    return { data: [] as Review[], error: "Erro ao carregar avaliações" };
  }
}
