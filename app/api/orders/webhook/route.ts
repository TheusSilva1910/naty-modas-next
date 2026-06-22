import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getPayment } from "@/lib/mercadopago";
import { sendOrderConfirmation } from "@/lib/email";

export async function POST(request: Request) {
  try {
    const body = await request.json() as {
      type?: string;
      data?: { id?: string };
      action?: string;
    };

    // Only handle payment events
    if (body.type !== "payment" || !body.data?.id) {
      return NextResponse.json({ received: true });
    }

    const payment = await getPayment(String(body.data.id));
    const orderId = payment.external_reference;

    if (!orderId) return NextResponse.json({ received: true });

    const order = await prisma.order.findUnique({
      where: { id: orderId },
      include: { items: { include: { product: { select: { name: true } } } } },
    });

    if (!order) return NextResponse.json({ received: true });

    const status = payment.status;
    const paymentId = String(payment.id);

    // Map MP status → our status
    const paymentStatus =
      status === "approved" ? "APPROVED" :
      status === "rejected" ? "REJECTED" :
      "PENDING";

    const orderStatus =
      status === "approved" ? "PAID" :
      status === "rejected" ? "CANCELED" :
      order.status;

    await prisma.order.update({
      where: { id: orderId },
      data: { paymentStatus, status: orderStatus, paymentId },
    });

    // Send confirmation email on approval
    if (status === "approved" && order.paymentStatus !== "APPROVED") {
      await sendOrderConfirmation({
        to: order.customerEmail,
        customerName: order.customerName,
        orderId: order.id,
        total: Number(order.total),
        items: order.items.map((item) => ({
          name: item.product.name,
          quantity: item.quantity,
          price: Number(item.price),
        })),
      });

      // Decrement stock
      await prisma.$transaction(
        order.items
          .filter((item) => item.variantId)
          .map((item) =>
            prisma.productVariant.update({
              where: { id: item.variantId! },
              data: { stock: { decrement: item.quantity } },
            })
          )
      );
    }

    return NextResponse.json({ received: true });
  } catch (error) {
    console.error("[webhook]", error);
    return NextResponse.json({ error: "Webhook error" }, { status: 500 });
  }
}
