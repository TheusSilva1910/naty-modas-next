import { prisma } from "@/lib/prisma";
import { formatBRL } from "@/lib/format";

export const metadata = { title: "Produtos · Admin · Naty Modas" };

export default async function AdminProducts() {
  const products = await prisma.product.findMany({
    orderBy: { createdAt: "desc" },
    select: {
      id: true,
      name: true,
      slug: true,
      price: true,
      salePrice: true,
      active: true,
      featured: true,
      isNew: true,
      category: { select: { name: true } },
      images: { select: { url: true }, orderBy: { position: "asc" }, take: 1 },
      _count: { select: { variants: true, reviews: true } },
    },
  });

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-8">
        <h1 className="font-display text-[28px]">Produtos</h1>
        <span className="text-[13px] text-gray-500">{products.length} produtos</span>
      </div>

      <div className="bg-white border border-gray-200 rounded overflow-x-auto">
        <table className="w-full text-[13px]">
          <thead>
            <tr className="border-b border-gray-100 text-gray-500 text-[11px] uppercase tracking-wider">
              <th className="text-left px-6 py-3">Produto</th>
              <th className="text-left px-6 py-3">Categoria</th>
              <th className="text-left px-6 py-3">Preço</th>
              <th className="text-left px-6 py-3">Variantes</th>
              <th className="text-left px-6 py-3">Avaliações</th>
              <th className="text-left px-6 py-3">Status</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product.id} className="border-b border-gray-50 hover:bg-gray-50">
                <td className="px-6 py-3">
                  <div className="flex items-center gap-3">
                    {product.images[0] && (
                      <img
                        src={product.images[0].url}
                        alt={product.name}
                        className="w-10 h-12 object-cover rounded shrink-0"
                      />
                    )}
                    <div>
                      <div className="font-medium">{product.name}</div>
                      <div className="text-[11px] text-gray-400 font-mono">{product.slug}</div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-3 text-gray-600">{product.category.name}</td>
                <td className="px-6 py-3">
                  {product.salePrice ? (
                    <div>
                      <span className="text-naty-rose-deep font-medium">
                        {formatBRL(Number(product.salePrice))}
                      </span>
                      <span className="text-gray-400 line-through text-[11px] ml-2">
                        {formatBRL(Number(product.price))}
                      </span>
                    </div>
                  ) : (
                    formatBRL(Number(product.price))
                  )}
                </td>
                <td className="px-6 py-3 text-center">{product._count.variants}</td>
                <td className="px-6 py-3 text-center">{product._count.reviews}</td>
                <td className="px-6 py-3">
                  <div className="flex flex-wrap gap-1">
                    {product.active ? (
                      <span className="px-2 py-0.5 bg-green-100 text-green-800 text-[11px] rounded">Ativo</span>
                    ) : (
                      <span className="px-2 py-0.5 bg-gray-100 text-gray-600 text-[11px] rounded">Inativo</span>
                    )}
                    {product.featured && (
                      <span className="px-2 py-0.5 bg-naty-gold/20 text-naty-gold text-[11px] rounded">Destaque</span>
                    )}
                    {product.isNew && (
                      <span className="px-2 py-0.5 bg-blue-100 text-blue-800 text-[11px] rounded">Novo</span>
                    )}
                  </div>
                </td>
              </tr>
            ))}
            {products.length === 0 && (
              <tr>
                <td colSpan={6} className="px-6 py-12 text-center text-gray-400">
                  Nenhum produto cadastrado
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
