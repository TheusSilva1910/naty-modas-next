"use client";

import Link from "next/link";
import { signOut } from "next-auth/react";
import { formatBRL } from "@/lib/format";

const statusLabels: Record<string, string> = {
  PENDING:   "Pendente",
  PAID:      "Pago",
  SHIPPED:   "Enviado",
  DELIVERED: "Entregue",
  CANCELED:  "Cancelado",
};

const statusColors: Record<string, string> = {
  PENDING:   "bg-yellow-100 text-yellow-800",
  PAID:      "bg-green-100 text-green-800",
  SHIPPED:   "bg-blue-100 text-blue-800",
  DELIVERED: "bg-green-200 text-green-900",
  CANCELED:  "bg-red-100 text-red-800",
};

interface Order {
  id: string;
  total: number;
  status: string;
  createdAt: Date;
  _count: { items: number };
}

interface Props {
  user: { name?: string | null; email?: string | null; role?: string };
  orders: Order[];
}

export function AccountDashboard({ user, orders }: Props) {
  const firstName = user.name?.split(" ")[0] ?? "cliente";

  return (
    <div className="max-w-[900px] mx-auto">
      {/* Header da conta */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <div className="eyebrow mb-1">Minha conta</div>
          <h1 className="font-display text-[32px] md:text-[40px] text-naty-text font-medium">
            Olá, {firstName}!
          </h1>
          <p className="text-[13px] text-naty-muted mt-1">{user.email}</p>
        </div>
        <button
          onClick={() => signOut({ callbackUrl: "/" })}
          className="text-[12px] tracking-[0.18em] uppercase text-naty-muted
                     hover:text-naty-rose-deep transition-colors border-b border-current pb-0.5"
        >
          Sair
        </button>
      </div>

      {/* Cards rápidos */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-10">
        <QuickLink href="/conta/pedidos" icon="📦" label="Meus pedidos" />
        <QuickLink href="/favoritos" icon="♡" label="Favoritos" />
        <QuickLink href="/conta/enderecos" icon="📍" label="Endereços" />
      </div>

      {/* Pedidos recentes */}
      <div className="bg-white p-6 md:p-8">
        <h2 className="font-display text-[20px] font-medium mb-5">Pedidos recentes</h2>

        {orders.length === 0 ? (
          <div className="py-8 text-center">
            <p className="text-naty-muted text-[14px] mb-4">
              Você ainda não fez nenhum pedido.
            </p>
            <Link href="/" className="btn-primary">
              Explorar coleções
            </Link>
          </div>
        ) : (
          <div className="flex flex-col gap-3">
            {orders.map((order) => (
              <Link
                key={order.id}
                href={`/pedido/${order.id}`}
                className="flex items-center justify-between p-4 border border-naty-line
                           hover:border-naty-gold transition-colors"
              >
                <div>
                  <div className="text-[13px] font-medium">
                    Pedido #{order.id.slice(-8).toUpperCase()}
                  </div>
                  <div className="text-[12px] text-naty-muted mt-0.5">
                    {order._count.items} {order._count.items === 1 ? "item" : "itens"} ·{" "}
                    {new Date(order.createdAt).toLocaleDateString("pt-BR")}
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <span className={`px-2 py-0.5 rounded text-[11px] font-medium ${statusColors[order.status] ?? "bg-gray-100 text-gray-600"}`}>
                    {statusLabels[order.status] ?? order.status}
                  </span>
                  <span className="text-[14px] font-medium text-naty-rose-deep">
                    {formatBRL(order.total)}
                  </span>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

function QuickLink({ href, icon, label }: { href: string; icon: string; label: string }) {
  return (
    <Link
      href={href}
      className="bg-white p-5 flex flex-col items-center gap-3 text-center
                 border border-naty-line hover:border-naty-gold transition-colors"
    >
      <span className="text-[28px]">{icon}</span>
      <span className="text-[12px] tracking-[0.18em] uppercase text-naty-text">{label}</span>
    </Link>
  );
}
