import { headers } from "next/headers";
import type {
  Category,
  HeroSlide,
  Product,
  ProductFull,
  Review,
} from "@/types";
import { getColorHex } from "@/lib/product-colors";

type ApiResponse<T> = {
  success: boolean;
  data?: T;
  error?: string;
};

type ApiCategory = {
  id: string;
  name: string;
  slug: string;
  image: string | null;
  count?: number;
};

type ApiProductImage = {
  id: string;
  url: string;
  alt: string | null;
  position: number;
};

type ApiProductVariant = {
  id: string;
  color: string;
  size: string;
  stock: number;
};

type ApiProductCategory = {
  id: string;
  name: string;
  slug: string;
  image: string | null;
};

type ApiProduct = {
  id: string;
  name: string;
  slug: string;
  description?: string;
  price: number;
  salePrice: number | null;
  featured: boolean;
  isNew: boolean;
  bestSeller: boolean;
  category: ApiProductCategory;
  images: ApiProductImage[];
  variants?: ApiProductVariant[];
  rating?: number;
  reviewCount?: number;
  related?: ApiProduct[];
};

type ApiBanner = {
  id: string;
  title: string;
  subtitle: string | null;
  image: string;
  buttonText: string | null;
  buttonLink: string | null;
  position: string;
};

type ApiReview = {
  id: string;
  rating: number;
  quote: string;
  author: string;
  location: string | null;
};

function getBaseUrl() {
  const requestHeaders = headers();
  const host = requestHeaders.get("host");
  const protocol = requestHeaders.get("x-forwarded-proto") ?? "http";

  if (host) {
    return `${protocol}://${host}`;
  }

  return process.env.NEXT_PUBLIC_APP_URL ?? "http://127.0.0.1:3000";
}

async function fetchApi<T>(path: string) {
  const response = await fetch(`${getBaseUrl()}${path}`, {
    cache: "no-store",
  });

  if (!response.ok) {
    return {
      data: null,
      error: `Erro ${response.status} ao carregar ${path}`,
    };
  }

  const payload = (await response.json()) as ApiResponse<T>;

  if (!payload.success) {
    return {
      data: null,
      error: payload.error ?? `Erro ao carregar ${path}`,
    };
  }

  return {
    data: payload.data ?? null,
    error: null,
  };
}

function toCategory(category: ApiCategory): Category {
  return {
    id: category.slug,
    name: category.name,
    count: category.count ?? 0,
    href: `/${category.slug}`,
    imageUrl: category.image ?? undefined,
  };
}

export function toProduct(product: ApiProduct): Product {
  const firstImage = product.images[0];
  const activePrice = product.salePrice ?? product.price;
  const oldPrice = product.salePrice ? product.price : undefined;

  return {
    id: product.slug,
    slug: product.slug,
    name: product.name,
    category: product.category.name,
    categorySlug: product.category.slug,
    price: activePrice,
    salePrice: product.salePrice ?? undefined,
    oldPrice,
    imageUrl: firstImage?.url,
    images: product.images.map((image) => ({
      imageUrl: image.url,
    })),
    colors: product.variants?.map((variant) => variant.color),
    sizes: product.variants?.map((variant) => variant.size),
    installments: {
      count: 6,
      value: Number((activePrice / 6).toFixed(2)),
    },
    badge: product.salePrice
      ? { type: "sale", label: "Promo" }
      : product.isNew
      ? { type: "new", label: "Novo" }
      : undefined,
  };
}

function toProductFull(product: ApiProduct): ProductFull {
  const variants = product.variants ?? [];
  const colors = Array.from(
    new Map(variants.map((variant) => [variant.color, variant])).values()
  );
  const sizes = Array.from(
    new Map(variants.map((variant) => [variant.size, variant])).values()
  );

  return {
    ...toProduct(product),
    description: product.description ?? "",
    rating: product.rating ?? 0,
    reviewCount: product.reviewCount ?? 0,
    gallery: product.images.map((image) => ({
      imageUrl: image.url,
    })),
    availableColors: colors.map((variant) => ({
      name: variant.color,
      hex: getColorHex(variant.color),
    })),
    availableSizes: sizes.map((variant) => ({
      label: variant.size,
      available: variant.stock > 0,
    })),
    related: product.related?.map(toProduct) ?? [],
  };
}

function toHeroSlide(banner: ApiBanner): HeroSlide {
  return {
    eyebrow: banner.position,
    title: banner.title,
    description: banner.subtitle ?? "",
    cta: {
      label: banner.buttonText ?? "Comprar agora",
      href: banner.buttonLink ?? "/",
    },
    imageUrl: banner.image,
  };
}

function toReview(review: ApiReview): Review {
  return {
    id: review.id,
    rating: review.rating,
    quote: review.quote,
    author: review.author,
    location: review.location ?? "",
  };
}

export async function getCategories() {
  const result = await fetchApi<ApiCategory[]>("/api/categories");
  return {
    data: result.data?.map(toCategory) ?? [],
    error: result.error,
  };
}

export async function getProducts(query = "") {
  const result = await fetchApi<ApiProduct[]>(`/api/products${query}`);
  return {
    data: result.data?.map(toProduct) ?? [],
    error: result.error,
  };
}

export async function getProductBySlug(slug: string) {
  const result = await fetchApi<ApiProduct>(`/api/products/${slug}`);
  return {
    data: result.data ? toProductFull(result.data) : null,
    error: result.error,
  };
}

export async function getBanners() {
  const result = await fetchApi<ApiBanner[]>("/api/banners");
  return {
    data: result.data?.map(toHeroSlide) ?? [],
    error: result.error,
  };
}

export async function getReviews() {
  const result = await fetchApi<ApiReview[]>("/api/reviews");
  return {
    data: result.data?.map(toReview) ?? [],
    error: result.error,
  };
}
