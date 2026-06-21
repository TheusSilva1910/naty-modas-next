import { NextResponse } from "next/server";
import type { Prisma } from "@prisma/client";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

const PAGE_SIZE = 20;

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);

    const category  = searchParams.get("category");
    const featured  = searchParams.get("featured");
    const isNew     = searchParams.get("new");
    const sort      = searchParams.get("sort");
    const size      = searchParams.get("size");
    const color     = searchParams.get("color");
    const minPrice  = searchParams.get("minPrice");
    const maxPrice  = searchParams.get("maxPrice");
    const page      = Math.max(1, parseInt(searchParams.get("page") ?? "1", 10));

    const where: Prisma.ProductWhereInput = { active: true };

    if (category) {
      where.category = { slug: category };
    }
    if (featured === "true") {
      where.featured = true;
    }
    if (isNew === "true") {
      where.isNew = true;
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
    switch (sort) {
      case "price_asc":  orderBy = { price: "asc" };       break;
      case "price_desc": orderBy = { price: "desc" };      break;
      case "newest":     orderBy = { createdAt: "desc" };  break;
    }

    const skip = (page - 1) * PAGE_SIZE;

    const [products, total] = await Promise.all([
      prisma.product.findMany({
        where,
        orderBy,
        skip,
        take: PAGE_SIZE,
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
            select: { id: true, name: true, slug: true, image: true },
          },
          images: {
            select: { id: true, url: true, alt: true, position: true },
            orderBy: { position: "asc" },
          },
          variants: {
            select: { id: true, color: true, size: true, stock: true },
          },
        },
      }),
      prisma.product.count({ where }),
    ]);

    return NextResponse.json({
      success: true,
      data: products.map((p) => ({
        ...p,
        price:     Number(p.price),
        salePrice: p.salePrice ? Number(p.salePrice) : null,
      })),
      pagination: {
        page,
        limit: PAGE_SIZE,
        total,
        pages: Math.ceil(total / PAGE_SIZE),
      },
    });
  } catch (error) {
    console.error("Erro ao buscar produtos:", error);
    return NextResponse.json(
      { success: false, error: "Erro ao buscar produtos" },
      { status: 500 }
    );
  }
}
