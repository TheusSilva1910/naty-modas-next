import { NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";

export const dynamic = "force-dynamic";

export async function GET() {
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

    return NextResponse.json({
      success: true,
      data: reviews.map((r) => ({
        id: r.id,
        rating: r.rating,
        quote: r.comment,
        author: r.user.name,
        location: null,
      })),
    });
  } catch (error) {
    console.error("Erro ao buscar avaliações:", error);
    return NextResponse.json({ success: false, error: "Erro ao buscar avaliações" }, { status: 500 });
  }
}

const schema = z.object({
  productId: z.string().min(1),
  rating: z.number().int().min(1).max(5),
  comment: z.string().max(500).optional(),
});

export async function POST(request: Request) {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      return NextResponse.json({ success: false, error: "Login necessário" }, { status: 401 });
    }

    const body = await request.json();
    const { productId, rating, comment } = schema.parse(body);

    // Verify user purchased the product
    const purchased = await prisma.orderItem.findFirst({
      where: {
        productId,
        order: {
          userId: session.user.id,
          paymentStatus: "APPROVED",
        },
      },
    });

    if (!purchased) {
      return NextResponse.json(
        { success: false, error: "Só é possível avaliar produtos que você comprou" },
        { status: 403 }
      );
    }

    // Prevent duplicate reviews
    const existing = await prisma.review.findFirst({
      where: { userId: session.user.id, productId },
    });

    if (existing) {
      return NextResponse.json(
        { success: false, error: "Você já avaliou este produto" },
        { status: 409 }
      );
    }

    const review = await prisma.review.create({
      data: {
        userId: session.user.id,
        productId,
        rating,
        comment: comment ?? null,
      },
      select: {
        id: true,
        rating: true,
        comment: true,
        user: { select: { name: true } },
        createdAt: true,
      },
    });

    return NextResponse.json({ success: true, data: review }, { status: 201 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { success: false, error: "Dados inválidos", details: error.issues },
        { status: 400 }
      );
    }
    console.error("[POST /api/reviews]", error);
    return NextResponse.json({ success: false, error: "Erro ao salvar avaliação" }, { status: 500 });
  }
}
