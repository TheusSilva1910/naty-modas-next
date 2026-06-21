import { NextResponse } from "next/server";
import type { Prisma } from "@prisma/client";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);

    const category = searchParams.get("category");
    const featured = searchParams.get("featured");
    const isNew = searchParams.get("new");

    const where: Prisma.ProductWhereInput = {};

    if (category) {
      where.category = {
        slug: category,
      };
    }

    if (featured === "true") {
      where.featured = true;
    }

    if (isNew === "true") {
      where.isNew = true;
    }

    where.active = true;

    const products = await prisma.product.findMany({
      where,
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

    return NextResponse.json({
      success: true,
      data: products.map((product) => ({
        ...product,
        price: Number(product.price),
        salePrice: product.salePrice ? Number(product.salePrice) : null,
      })),
    });
  } catch (error) {
    console.error("Erro ao buscar produtos:", error);

    return NextResponse.json(
      {
        success: false,
        error: "Erro ao buscar produtos",
      },
      { status: 500 }
    );
  }
}
