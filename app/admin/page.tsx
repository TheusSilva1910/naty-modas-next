import { prisma } from "@/lib/prisma";
import { formatBRL } from "@/lib/format";

export const metadata = { title: "Dashboard · Admin · Naty Modas" };

async function getStats() {
  const [orders, products, customers, revenue] = await Promise.all([
    prisma.order.count(),
    prisma.product.count({ where: { active: true } }),
    prisma.user.count({ where: { role: "CUSTOMER" } }),
    prisma.order.aggregate({
      where: { paymentStatus: "APPROVED" },
      _sum: { total: true },
    }),
  ]);

  const recentOrders = await prisma.order.findMany({
    take: 8,
    orderBy: { createdAt: "desc" },
    select: {
      id: true,
      customerName: true,
      total: true,
      status: true,
      paymentStatus: true,
      createdAt: true,
    },
  });

  return {
    orders,
    products,
    customers,
    revenue: Number(revenue._sum.total ?? 0),
    recentOrders,
  };
}

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

export default async function AdminDashboard() {
  const stats = await getStats();

  return (
    <div className="p-8">
      <h1 className="font-display text-[28px] mb-8">Dashboard</h1>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-5 mb-10">
        <StatCard label="Pedidos totais" value={String(stats.orders)} />
        <StatCard label="Receita aprovada" value={formatBRL(stats.revenue)} />
        <StatCard label="Produtos ativos" value={String(stats.products)} />
        <StatCard label="Clientes" value={String(stats.customers)} />
      </div>

      <div className="bg-white border border-gray-200 rounded">
        <div className="px-6 py-4 border-b border-gray-100">
          <h2 className="font-medium text-[16px]">Pedidos recentes</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-[13px]">
            <thead>
              <tr className="border-b border-gray-100 text-gray-500 text-[11px] uppercase tracking-wider">
                <th className="text-left px-6 py-3">Pedido</th>
                <th className="text-left px-6 py-3">Cliente</th>
                <th className="text-left px-6 py-3">Total</th>
                <th className="text-left px-6 py-3">Status</th>
                <th className="text-left px-6 py-3">Data</th>
              </tr>
            </thead>
            <tbody>
              {stats.recentOrders.map((order) => (
                <tr key={order.id} className="border-b border-gray-50 hover:bg-gray-50">
                  <td className="px-6 py-3 font-mono text-[11px]">
                    #{order.id.slice(-8).toUpperCase()}
                  </td>
                  <td className="px-6 py-3">{order.customerName}</td>
                  <td className="px-6 py-3">{formatBRL(Number(order.total))}</td>
                  <td className="px-6 py-3">
                    <span className={`px-2 py-0.5 rounded text-[11px] font-medium ${statusColors[order.status] ?? ""}`}>
                      {statusLabels[order.status] ?? order.status}
                    </span>
                  </td>
                  <td className="px-6 py-3 text-gray-500">
                    {order.createdAt.toLocaleDateString("pt-BR")}
                  </td>
                </tr>
              ))}
              {stats.recentOrders.length === 0 && (
                <tr>
                  <td colSpan={5} className="px-6 py-8 text-center text-gray-400">
                    Nenhum pedido ainda
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

function StatCard({ label, value }: { label: string; value: string }) {
  return (
    <div className="bg-white border border-gray-200 rounded p-6">
      <div className="text-[11px] uppercase tracking-wider text-gray-500 mb-2">{label}</div>
      <div className="font-display text-[28px] text-naty-text">{value}</div>
    </div>
  );
}
