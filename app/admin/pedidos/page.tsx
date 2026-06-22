import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { formatBRL } from "@/lib/format";

export const metadata = { title: "Pedidos · Admin · Naty Modas" };

const statusColors: Record<string, string> = {
  PENDING:   "bg-yellow-100 text-yellow-800",
  PAID:      "bg-green-100 text-green-800",
  SHIPPED:   "bg-blue-100 text-blue-800",
  DELIVERED: "bg-green-200 text-green-900",
  CANCELED:  "bg-red-100 text-red-800",
};

const statusLabels: Record<string, string> = {
  PENDING:   "Pendente",
  PAID:      "Pago",
  SHIPPED:   "Enviado",
  DELIVERED: "Entregue",
  CANCELED:  "Cancelado",
};

export default async function AdminOrders() {
  const orders = await prisma.order.findMany({
    orderBy: { createdAt: "desc" },
    take: 50,
    select: {
      id: true,
      customerName: true,
      customerEmail: true,
      total: true,
      status: true,
      paymentStatus: true,
      createdAt: true,
      _count: { select: { items: true } },
    },
  });

  return (
    <div className="p-8">
      <h1 className="font-display text-[28px] mb-8">Pedidos</h1>

      <div className="bg-white border border-gray-200 rounded overflow-x-auto">
        <table className="w-full text-[13px]">
          <thead>
            <tr className="border-b border-gray-100 text-gray-500 text-[11px] uppercase tracking-wider">
              <th className="text-left px-6 py-3">Pedido</th>
              <th className="text-left px-6 py-3">Cliente</th>
              <th className="text-left px-6 py-3">Itens</th>
              <th className="text-left px-6 py-3">Total</th>
              <th className="text-left px-6 py-3">Status</th>
              <th className="text-left px-6 py-3">Pagamento</th>
              <th className="text-left px-6 py-3">Data</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order.id} className="border-b border-gray-50 hover:bg-gray-50">
                <td className="px-6 py-3 font-mono text-[11px]">
                  <Link href={`/pedido/${order.id}`} className="hover:underline text-naty-rose-deep">
                    #{order.id.slice(-8).toUpperCase()}
                  </Link>
                </td>
                <td className="px-6 py-3">
                  <div>{order.customerName}</div>
                  <div className="text-[11px] text-gray-400">{order.customerEmail}</div>
                </td>
                <td className="px-6 py-3 text-center">{order._count.items}</td>
                <td className="px-6 py-3">{formatBRL(Number(order.total))}</td>
                <td className="px-6 py-3">
                  <span className={`px-2 py-0.5 rounded text-[11px] font-medium ${statusColors[order.status] ?? ""}`}>
                    {statusLabels[order.status] ?? order.status}
                  </span>
                </td>
                <td className="px-6 py-3">
                  <span className={`px-2 py-0.5 rounded text-[11px] font-medium ${
                    order.paymentStatus === "APPROVED"
                      ? "bg-green-100 text-green-800"
                      : order.paymentStatus === "REJECTED"
                      ? "bg-red-100 text-red-800"
                      : "bg-gray-100 text-gray-600"
                  }`}>
                    {order.paymentStatus}
                  </span>
                </td>
                <td className="px-6 py-3 text-gray-500">
                  {order.createdAt.toLocaleDateString("pt-BR")}
                </td>
              </tr>
            ))}
            {orders.length === 0 && (
              <tr>
                <td colSpan={7} className="px-6 py-12 text-center text-gray-400">
                  Nenhum pedido ainda
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
