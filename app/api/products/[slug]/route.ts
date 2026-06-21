import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

interface RouteContext {
  params: {
    slug: string;
  };
}

export async function GET(_request: Request, { params }: RouteContext) {
  try {
    const product = await prisma.product.findFirst({
      where: {
        slug: params.slug,
        active: true,
      },
      select: {
        id: true,
        name: true,
        slug: true,
        description: true,
        price: true,
        salePrice: true,
        featured: true,
        isNew: true,
        bestSeller: true,
        category: {
          select: {
            id: true,
            name: true,
            slug: true,
            image: true,
          },
        },
        images: {
          select: {
            id: true,
            url: true,
            alt: true,
            position: true,
          },
          orderBy: {
            position: "asc",
          },
        },
        variants: {
          select: {
            id: true,
            color: true,
            size: true,
            stock: true,
          },
        },
        reviews: {
          select: {
            rating: true,
          },
        },
      },
    });

    if (!product) {
      return NextResponse.json(
        {
          success: false,
          error: "Produto não encontrado",
        },
        { status: 404 }
      );
    }

    const related = await prisma.product.findMany({
      where: {
        active: true,
        categoryId: product.category.id,
        id: {
          not: product.id,
        },
      },
      take: 4,
      select: {
        id: true,
        name: true,
        slug: true,
        price: true,
        salePrice: true,
        featured: true,
        isNew: true,
        bestSeller: true,
        category: {
          select: {
            id: true,
            name: true,
            slug: true,
            image: true,
          },
        },
        images: {
          select: {
            id: true,
            url: true,
            alt: true,
            position: true,
          },
          orderBy: {
            position: "asc",
          },
        },
        variants: {
          select: {
            id: true,
            color: true,
            size: true,
            stock: true,
          },
        },
      },
      orderBy: {
        name: "asc",
      },
    });

    const reviewCount = product.reviews.length;
    const rating =
      reviewCount > 0
        ? Math.round(
            product.reviews.reduce((total, review) => total + review.rating, 0) /
              reviewCount
          )
        : 0;

    return NextResponse.json({
      success: true,
      data: {
        ...product,
        price: Number(product.price),
        salePrice: product.salePrice ? Number(product.salePrice) : null,
        rating,
        reviewCount,
        related: related.map((item) => ({
          ...item,
          price: Number(item.price),
          salePrice: item.salePrice ? Number(item.salePrice) : null,
        })),
      },
    });
  } catch (error) {
    console.error("Erro ao buscar produto:", error);

    return NextResponse.json(
      {
        success: false,
        error: "Erro ao buscar produto",
      },
      { status: 500 }
    );
  }
}
