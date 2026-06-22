import { prisma } from "@/lib/prisma";
import { formatBRL } from "@/lib/format";

export const metadata = { title: "Cupons · Admin · Naty Modas" };

export default async function AdminCoupons() {
  const coupons = await prisma.coupon.findMany({
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-8">
        <h1 className="font-display text-[28px]">Cupons</h1>
        <span className="text-[13px] text-gray-500">{coupons.length} cupom{coupons.length !== 1 ? "ns" : ""}</span>
      </div>

      <div className="bg-white border border-gray-200 rounded overflow-x-auto">
        <table className="w-full text-[13px]">
          <thead>
            <tr className="border-b border-gray-100 text-gray-500 text-[11px] uppercase tracking-wider">
              <th className="text-left px-6 py-3">Código</th>
              <th className="text-left px-6 py-3">Tipo</th>
              <th className="text-left px-6 py-3">Valor</th>
              <th className="text-left px-6 py-3">Pedido mín.</th>
              <th className="text-left px-6 py-3">Usos</th>
              <th className="text-left px-6 py-3">Validade</th>
              <th className="text-left px-6 py-3">Status</th>
            </tr>
          </thead>
          <tbody>
            {coupons.map((coupon) => (
              <tr key={coupon.id} className="border-b border-gray-50 hover:bg-gray-50">
                <td className="px-6 py-3 font-mono font-medium tracking-wider">{coupon.code}</td>
                <td className="px-6 py-3">
                  {coupon.type === "PERCENTAGE" ? "%" : "R$"} fixo
                </td>
                <td className="px-6 py-3">
                  {coupon.type === "PERCENTAGE"
                    ? `${Number(coupon.value)}%`
                    : formatBRL(Number(coupon.value))}
                </td>
                <td className="px-6 py-3">
                  {coupon.minOrderValue
                    ? formatBRL(Number(coupon.minOrderValue))
                    : <span className="text-gray-400">—</span>}
                </td>
                <td className="px-6 py-3">
                  {coupon.usageCount}
                  {coupon.usageLimit !== null && ` / ${coupon.usageLimit}`}
                </td>
                <td className="px-6 py-3">
                  {coupon.expiresAt
                    ? coupon.expiresAt.toLocaleDateString("pt-BR")
                    : <span className="text-gray-400">Sem limite</span>}
                </td>
                <td className="px-6 py-3">
                  <span className={`px-2 py-0.5 rounded text-[11px] font-medium ${
                    coupon.active ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-600"
                  }`}>
                    {coupon.active ? "Ativo" : "Inativo"}
                  </span>
                </td>
              </tr>
            ))}
            {coupons.length === 0 && (
              <tr>
                <td colSpan={7} className="px-6 py-12 text-center text-gray-400">
                  Nenhum cupom cadastrado
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
