import Link from "next/link";
import { Placeholder } from "./Placeholder";
import { formatBRL } from "@/lib/format";
import type { Product } from "@/types";

interface ProductCardProps {
  product: Product;
  /** Densidade — "compact" usa para grids 4 colunas, "wide" para 2 colunas mobile */
  density?: "compact" | "wide";
}

/**
 * Card de produto reutilizável.
 *
 * Estrutura:
 *  - Placeholder de imagem (aspect 3/4) com badge opcional + botão de favoritos
 *  - Nome em Playfair
 *  - Preço atual + preço antigo (se houver)
 *  - Parcelamento
 *  - Botão "Comprar" outline (apenas em densidade compact)
 */
export function ProductCard({ product, density = "compact" }: ProductCardProps) {
  const badgeClass =
    product.badge?.type === "sale"
      ? "bg-naty-rose-deep"
      : product.badge?.type === "soldout"
      ? "bg-naty-text"
      : "bg-naty-gold";

  return (
    <article className="group">
      <Placeholder
        variant={product.imageVariant}
        imageUrl={product.imageUrl}
        imageAlt={product.name}
        label={product.name.toUpperCase()}
        className="aspect-[3/4]"
      >
        {product.badge && (
          <span
            className={`absolute top-3 right-3 ${badgeClass} text-white text-[9px] px-2.5 py-1.5 tracking-[0.2em] uppercase`}
          >
            {product.badge.label}
          </span>
        )}
        <button
          type="button"
          aria-label="Adicionar aos favoritos"
          className="absolute bottom-3 right-3 w-9 h-9 rounded-full
                     bg-white/90 flex items-center justify-center
                     text-naty-rose-deep transition-transform
                     hover:scale-110"
        >
          ♡
        </button>
      </Placeholder>

      <div className="pt-4">
        <Link
          href={`/produto/${product.slug ?? product.id}`}
          className="font-display text-[16px] text-naty-text hover:text-naty-rose-deep transition-colors"
        >
          {product.name}
        </Link>

        <div className="mt-1.5 flex items-baseline gap-2.5">
          <span className="text-[18px] text-naty-rose-deep font-medium">
            {formatBRL(product.price)}
          </span>
          {product.oldPrice && (
            <span className="text-[11px] text-naty-muted line-through">
              {formatBRL(product.oldPrice)}
            </span>
          )}
        </div>

        {product.installments && (
          <div className="text-[11px] text-naty-muted mt-1">
            {product.installments.count}x de {formatBRL(product.installments.value)} sem juros
          </div>
        )}

        {density === "compact" && (
          <button
            type="button"
            className="mt-3.5 w-full border border-naty-text py-3 text-[10px]
                       tracking-[0.28em] uppercase hover:bg-naty-text hover:text-white
                       transition-colors"
          >
            Comprar
          </button>
        )}
      </div>
    </article>
  );
}
