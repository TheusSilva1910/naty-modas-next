import { NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";
import { createPreference } from "@/lib/mercadopago";

const itemSchema = z.object({
  productId: z.string(),
  variantId: z.string().optional(),
  name: z.string(),
  quantity: z.number().int().positive(),
  price: z.number().positive(),
});

const schema = z.object({
  items: z.array(itemSchema).min(1),
  couponCode: z.string().optional(),
  customerName: z.string().min(2),
  customerEmail: z.string().email(),
  customerPhone: z.string().optional(),
  shipping: z.object({
    zipcode: z.string(),
    street: z.string(),
    number: z.string(),
    complement: z.string().optional(),
    district: z.string(),
    city: z.string(),
    state: z.string(),
    price: z.number().min(0),
  }),
});

export async function POST(request: Request) {
  try {
    const session = await auth();
    const body = await request.json();
    const data = schema.parse(body);

    const subtotal = data.items.reduce((s, i) => s + i.price * i.quantity, 0);

    // Validate coupon
    let couponId: string | undefined;
    let discount = 0;
    if (data.couponCode) {
      const coupon = await prisma.coupon.findUnique({
        where: { code: data.couponCode.toUpperCase().trim() },
      });
      if (coupon && coupon.active) {
        const v = Number(coupon.value);
        discount =
          coupon.type === "PERCENTAGE"
            ? Math.min(subtotal * (v / 100), subtotal)
            : Math.min(v, subtotal);
        couponId = coupon.id;
      }
    }

    const total = subtotal + data.shipping.price - discount;

    const order = await prisma.order.create({
      data: {
        userId: session?.user?.id,
        status: "PENDING",
        paymentStatus: "PENDING",
        customerName: data.customerName,
        customerEmail: data.customerEmail,
        customerPhone: data.customerPhone,
        subtotal,
        shippingPrice: data.shipping.price,
        discount,
        total,
        couponId,
        shippingZipcode:    data.shipping.zipcode,
        shippingStreet:     data.shipping.street,
        shippingNumber:     data.shipping.number,
        shippingComplement: data.shipping.complement,
        shippingDistrict:   data.shipping.district,
        shippingCity:       data.shipping.city,
        shippingState:      data.shipping.state,
        items: {
          create: data.items.map((item) => ({
            productId: item.productId,
            variantId: item.variantId,
            quantity: item.quantity,
            price: item.price,
          })),
        },
      },
    });

    // Increment coupon usage
    if (couponId) {
      await prisma.coupon.update({
        where: { id: couponId },
        data: { usageCount: { increment: 1 } },
      });
    }

    // Create Mercado Pago preference
    const appUrl = process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000";
    const preference = await createPreference({
      orderId: order.id,
      items: data.items.map((item) => ({
        id: item.productId,
        title: item.name,
        quantity: item.quantity,
        unit_price: item.price,
      })),
      payer: {
        name: data.customerName,
        email: data.customerEmail,
        phone: data.customerPhone ? { number: data.customerPhone } : undefined,
      },
      appUrl,
    });

    return NextResponse.json({
      success: true,
      data: {
        orderId: order.id,
        initPoint: preference.init_point,
        sandboxInitPoint: preference.sandbox_init_point,
      },
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { success: false, error: "Dados inválidos", details: error.issues },
        { status: 400 }
      );
    }
    console.error("[POST /api/orders]", error);
    return NextResponse.json(
      { success: false, error: "Erro ao criar pedido" },
      { status: 500 }
    );
  }
}
