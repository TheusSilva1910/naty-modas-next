import { NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/prisma";

const schema = z.object({
  code: z.string().min(1, "Informe o código do cupom"),
  subtotal: z.number().positive("Subtotal inválido"),
});

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { code, subtotal } = schema.parse(body);

    const coupon = await prisma.coupon.findUnique({
      where: { code: code.toUpperCase().trim() },
    });

    if (!coupon || !coupon.active) {
      return NextResponse.json(
        { success: false, error: "Cupom inválido ou inativo" },
        { status: 404 }
      );
    }

    if (coupon.expiresAt && coupon.expiresAt < new Date()) {
      return NextResponse.json(
        { success: false, error: "Cupom expirado" },
        { status: 400 }
      );
    }

    if (coupon.minOrderValue && subtotal < Number(coupon.minOrderValue)) {
      return NextResponse.json(
        {
          success: false,
          error: `Pedido mínimo de R$ ${Number(coupon.minOrderValue).toFixed(2).replace(".", ",")} para este cupom`,
        },
        { status: 400 }
      );
    }

    if (coupon.usageLimit !== null && coupon.usageCount >= coupon.usageLimit) {
      return NextResponse.json(
        { success: false, error: "Cupom esgotado" },
        { status: 400 }
      );
    }

    const couponValue = Number(coupon.value);
    const discount =
      coupon.type === "PERCENTAGE"
        ? Math.min(subtotal * (couponValue / 100), subtotal)
        : Math.min(couponValue, subtotal);

    return NextResponse.json({
      success: true,
      data: {
        code: coupon.code,
        type: coupon.type,
        value: couponValue,
        discount: parseFloat(discount.toFixed(2)),
        label:
          coupon.type === "PERCENTAGE"
            ? `${couponValue}% off`
            : `R$ ${couponValue.toFixed(2).replace(".", ",")} off`,
      },
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { success: false, error: "Dados inválidos", details: error.issues },
        { status: 400 }
      );
    }
    console.error("Erro ao validar cupom:", error);
    return NextResponse.json(
      { success: false, error: "Erro ao validar cupom" },
      { status: 500 }
    );
  }
}
