import Link from "next/link";
import { ProductCard } from "./ProductCard";
import { StateMessage } from "./StateMessage";
import type { Product } from "@/types";

interface ProductSectionProps {
  products: Product[];
  title: string;
  eyebrow: string;
  ctaLabel?: string;
  ctaHref?: string;
  /** Cor de fundo da seção. */
  surface?: "white" | "blush";
}

export function ProductSection({
  products,
  title,
  eyebrow,
  ctaLabel = "Ver tudo →",
  ctaHref = "#",
  surface = "white",
}: ProductSectionProps) {
  const bg = surface === "blush" ? "bg-naty-blushSoft" : "bg-white";

  return (
    <section className={`${bg} py-16 md:py-24 px-4 md:px-14`}>
      <div className="flex flex-col md:flex-row md:justify-between md:items-end gap-4 mb-8 md:mb-10">
        <div>
          <div className="eyebrow">{eyebrow}</div>
          <h2 className="font-display text-[28px] md:text-[38px] text-naty-text mt-2 font-medium">
            {title}
          </h2>
        </div>
        <Link
          href={ctaHref}
          className="text-[11px] tracking-[0.24em] text-naty-rose-deep
                     border-b border-naty-gold pb-1 self-start uppercase
                     hover:text-naty-gold transition-colors"
        >
          {ctaLabel}
        </Link>
      </div>

      {products.length > 0 ? (
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-7">
          {products.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      ) : (
        <StateMessage
          title="Nenhuma peça encontrada"
          description="Assim que novos produtos forem cadastrados, eles aparecerão aqui."
        />
      )}
    </section>
  );
}
