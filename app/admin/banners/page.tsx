import { prisma } from "@/lib/prisma";

export const metadata = { title: "Banners · Admin · Naty Modas" };

export default async function AdminBanners() {
  const banners = await prisma.banner.findMany({
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-8">
        <h1 className="font-display text-[28px]">Banners</h1>
        <span className="text-[13px] text-gray-500">{banners.length} banner{banners.length !== 1 ? "s" : ""}</span>
      </div>

      {banners.length === 0 ? (
        <div className="bg-white border border-gray-200 rounded p-12 text-center text-gray-400">
          Nenhum banner cadastrado. Adicione banners diretamente pelo banco de dados ou Prisma Studio.
        </div>
      ) : (
        <div className="grid gap-4">
          {banners.map((banner) => (
            <div key={banner.id} className="bg-white border border-gray-200 rounded p-5 flex items-center gap-5">
              <img
                src={banner.image}
                alt={banner.title}
                className="w-24 h-14 object-cover rounded shrink-0"
              />
              <div className="flex-1 min-w-0">
                <div className="font-medium text-[14px]">{banner.title}</div>
                {banner.subtitle && (
                  <div className="text-[12px] text-gray-500 mt-0.5">{banner.subtitle}</div>
                )}
                {banner.buttonText && banner.buttonLink && (
                  <div className="text-[11px] text-naty-gold mt-1">
                    → {banner.buttonText} ({banner.buttonLink})
                  </div>
                )}
              </div>
              <div className="flex flex-col items-end gap-2 shrink-0">
                <span className={`px-2 py-0.5 rounded text-[11px] font-medium ${
                  banner.active ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-600"
                }`}>
                  {banner.active ? "Ativo" : "Inativo"}
                </span>
                <span className="text-[11px] text-gray-400 uppercase tracking-wider">
                  {banner.position}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
