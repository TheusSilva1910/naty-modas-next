interface PaginationProps {
  current: number;
  total: number;
}

/**
 * Paginação simples com elipse no meio quando passa de 5 páginas.
 * Apenas visual — em produção, ligar a query string ou search params.
 */
export function Pagination({ current, total }: PaginationProps) {
  const pages = buildPages(current, total);

  return (
    <nav
      aria-label="Paginação"
      className="flex justify-center items-center gap-3.5 text-[12px] tracking-[0.16em] uppercase"
    >
      <button
        type="button"
        disabled={current === 1}
        className="disabled:text-naty-line text-naty-muted hover:text-naty-rose-deep"
      >
        ← Anterior
      </button>

      {pages.map((p, i) =>
        p === "…" ? (
          <span key={`gap-${i}`} className="w-[34px] h-[34px] inline-flex items-center justify-center">
            …
          </span>
        ) : (
          <button
            key={p}
            type="button"
            aria-current={p === current ? "page" : undefined}
            className={`w-[34px] h-[34px] inline-flex items-center justify-center transition-colors ${
              p === current
                ? "bg-naty-rose-deep text-white"
                : "hover:text-naty-rose-deep"
            }`}
          >
            {p}
          </button>
        )
      )}

      <button
        type="button"
        disabled={current === total}
        className="text-naty-rose-deep hover:text-naty-rose disabled:text-naty-line"
      >
        Próximo →
      </button>
    </nav>
  );
}

function buildPages(current: number, total: number): (number | "…")[] {
  if (total <= 5) return Array.from({ length: total }, (_, i) => i + 1);
  if (current <= 3) return [1, 2, 3, "…", total];
  if (current >= total - 2) return [1, "…", total - 2, total - 1, total];
  return [1, "…", current, "…", total];
}
