import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { mainMenu, topBarItems, whatsapp } from "@/data/menu";
import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";
import { formatBRL } from "@/lib/format";

export const metadata: Metadata = {
  title: "Pedido confirmado · Naty Modas",
  robots: { index: false },
};

interface PageProps {
  params: { id: string };
  searchParams?: { status?: string };
}

export default async function OrderPage({ params, searchParams }: PageProps) {
  const session = await auth();
  const status = searchParams?.status ?? "";

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

  if (!order) notFound();

  const isOwner = session?.user?.id === order.userId;
  const isAdmin = session?.user?.role === "ADMIN";
  if (order.userId && !isOwner && !isAdmin) notFound();

  const isPaid = order.paymentStatus === "APPROVED" || status === "aprovado";
  const isFailed = order.paymentStatus === "REJECTED" || status === "falhou";

  const statusLabel = isPaid
    ? "Pagamento aprovado!"
    : isFailed
    ? "Pagamento não aprovado"
    : "Aguardando confirmação do pagamento";

  const statusColor = isPaid
    ? "text-green-700"
    : isFailed
    ? "text-red-600"
    : "text-naty-gold";

  return (
    <>
      <Header menu={mainMenu} topBarItems={topBarItems} phone={whatsapp.display} />

      <main className="bg-white min-h-screen">
        <div className="px-4 md:px-14 py-10 md:py-16 max-w-[720px] mx-auto">
          <div className="text-center mb-10">
            <div className="text-[48px] mb-4">{isPaid ? "✓" : isFailed ? "✕" : "⏳"}</div>
            <h1 className="font-display text-[30px] md:text-[38px] font-medium mb-3">
              {isPaid ? "Pedido confirmado!" : "Pedido recebido"}
            </h1>
            <p className={`text-[15px] font-medium ${statusColor}`}>{statusLabel}</p>
            <p className="text-[13px] text-naty-muted mt-2">
              Pedido #{order.id.slice(-8).toUpperCase()}
            </p>
          </div>

          {isPaid && (
            <div className="bg-green-50 border border-green-200 p-5 mb-8 text-[13px] text-green-800">
              Um e-mail de confirmação foi enviado para <strong>{order.customerEmail}</strong>.
            </div>
          )}

          {isFailed && (
            <div className="bg-red-50 border border-red-200 p-5 mb-8 text-[13px] text-red-700">
              Não conseguimos processar seu pagamento. Tente novamente ou escolha outra forma de pagamento.
              <div className="mt-3">
                <Link href="/sacola" className="btn-primary">
                  Tentar novamente
                </Link>
              </div>
            </div>
          )}

          <div className="border border-naty-line p-6 mb-6">
            <h2 className="font-display text-[18px] mb-4">Itens do pedido</h2>
            <ul className="flex flex-col gap-4">
              {order.items.map((item) => (
                <li key={item.id} className="flex items-center gap-4">
                  {item.product.images[0] && (
                    <img
                      src={item.product.images[0].url}
                      alt={item.product.name}
                      className="w-16 h-20 object-cover shrink-0"
                    />
                  )}
                  <div className="flex-1 min-w-0">
                    <p className="text-[14px] font-medium">{item.product.name}</p>
                    {item.variant && (
                      <p className="text-[12px] text-naty-muted">
                        {[item.variant.color, item.variant.size].filter(Boolean).join(" / ")}
                      </p>
                    )}
                    <p className="text-[12px] text-naty-muted">Qtd: {item.quantity}</p>
                  </div>
                  <span className="text-[14px] shrink-0">{formatBRL(Number(item.price) * item.quantity)}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="border border-naty-line p-6 mb-8">
            <h2 className="font-display text-[18px] mb-4">Endereço de entrega</h2>
            <p className="text-[13px] text-naty-muted">
              {order.shippingStreet}, {order.shippingNumber}
              {order.shippingComplement ? `, ${order.shippingComplement}` : ""}<br />
              {order.shippingDistrict} — {order.shippingCity}/{order.shippingState}<br />
              CEP {order.shippingZipcode}
            </p>
          </div>

          <div className="flex justify-between text-[14px] mb-2">
            <span>Subtotal</span><span>{formatBRL(Number(order.subtotal))}</span>
          </div>
          {Number(order.discount) > 0 && (
            <div className="flex justify-between text-[14px] mb-2 text-naty-gold">
              <span>Desconto</span><span>− {formatBRL(Number(order.discount))}</span>
            </div>
          )}
          <div className="flex justify-between text-[14px] mb-4">
            <span>Frete</span><span>{formatBRL(Number(order.shippingPrice))}</span>
          </div>
          <div className="flex justify-between text-[18px] font-display font-medium border-t border-naty-line pt-4">
            <span>Total</span>
            <span className="text-naty-rose-deep">{formatBRL(Number(order.total))}</span>
          </div>

          <div className="mt-10 text-center">
            <Link href="/" className="btn-primary">
              Continuar comprando
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}
