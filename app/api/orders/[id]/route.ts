import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";

interface Ctx { params: { id: string } }

export async function GET(_req: Request, { params }: Ctx) {
  try {
    const session = await auth();

    const order = await prisma.order.findUnique({
      where: { id: params.id },
      include: {
        items: {
          include: {
            product: {
              select: {
                name: true,
                slug: true,
                images: { select: { url: true }, orderBy: { position: "asc" }, take: 1 },
              },
            },
            variant: { select: { color: true, size: true } },
          },
        },
      },
    });

    if (!order) {
      return NextResponse.json({ success: false, error: "Pedido não encontrado" }, { status: 404 });
    }

    // Only allow if owner or admin
    const isOwner = session?.user?.id && order.userId === session.user.id;
    const isAdmin = session?.user?.role === "ADMIN";
    if (!isOwner && !isAdmin) {
      return NextResponse.json({ success: false, error: "Sem permissão" }, { status: 403 });
    }

    return NextResponse.json({
      success: true,
      data: {
        ...order,
        subtotal: Number(order.subtotal),
        shippingPrice: Number(order.shippingPrice),
        discount: Number(order.discount),
        total: Number(order.total),
        items: order.items.map((item) => ({
          ...item,
          price: Number(item.price),
        })),
      },
    });
  } catch (error) {
    console.error("[GET /api/orders/:id]", error);
    return NextResponse.json({ success: false, error: "Erro ao buscar pedido" }, { status: 500 });
  }
}
