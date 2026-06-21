import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const banners = await prisma.banner.findMany({
      where: {
        active: true,
      },
      select: {
        id: true,
        title: true,
        subtitle: true,
        image: true,
        buttonText: true,
        buttonLink: true,
        position: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return NextResponse.json({
      success: true,
      data: banners,
    });
  } catch (error) {
    console.error("Erro ao buscar banners:", error);

    return NextResponse.json(
      {
        success: false,
        error: "Erro ao buscar banners",
      },
      { status: 500 }
    );
  }
}
