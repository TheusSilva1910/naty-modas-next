import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const reviews = await prisma.review.findMany({
      select: {
        id: true,
        rating: true,
        comment: true,
        user: {
          select: {
            name: true,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
      take: 6,
    });

    return NextResponse.json({
      success: true,
      data: reviews
        .filter((review) => Boolean(review.comment))
        .map((review) => ({
          id: review.id,
          rating: review.rating,
          quote: review.comment,
          author: review.user.name,
          location: null,
        })),
    });
  } catch (error) {
    console.error("Erro ao buscar avaliações:", error);

    return NextResponse.json(
      {
        success: false,
        error: "Erro ao buscar avaliações",
      },
      { status: 500 }
    );
  }
}
