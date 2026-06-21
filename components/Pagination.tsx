import Link from "next/link";

interface PaginationProps {
  current: number;
  total: number;
  /** Parâmetros atuais da URL para preservar filtros/sort ao paginar */
  searchParams?: Record<string, string>;
  basePath?: string;
}

function buildUrl(
  page: number,
  basePath = "",
  params: Record<string, string> = {}
) {
  const q = new URLSearchParams({ ...params, page: String(page) });
  return `${basePath}?${q.toString()}`;
}

export function Pagination({
  current,
  total,
  searchParams = {},
  basePath = "",
}: PaginationProps) {
  if (total <= 1) return null;

  const pages = buildPages(current, total);
  const base = { ...searchParams };
  delete base.page;

  return (
    <nav
      aria-label="Paginação"
      className="flex justify-center items-center gap-3.5 text-[12px] tracking-[0.16em] uppercase"
    >
      {current > 1 ? (
        <Link
          href={buildUrl(current - 1, basePath, base)}
          className="text-naty-muted hover:text-naty-rose-deep"
        >
          ← Anterior
        </Link>
      ) : (
        <span className="text-naty-line">← Anterior</span>
      )}

      {pages.map((p, i) =>
        p === "…" ? (
          <span
            key={`gap-${i}`}
            className="w-[34px] h-[34px] inline-flex items-center justify-center"
          >
            …
          </span>
        ) : (
          <Link
            key={p}
            href={buildUrl(p, basePath, base)}
            aria-current={p === current ? "page" : undefined}
            className={`w-[34px] h-[34px] inline-flex items-center justify-center transition-colors ${
              p === current
                ? "bg-naty-rose-deep text-white"
                : "hover:text-naty-rose-deep"
            }`}
          >
            {p}
          </Link>
        )
      )}

      {current < total ? (
        <Link
          href={buildUrl(current + 1, basePath, base)}
          className="text-naty-rose-deep hover:text-naty-rose"
        >
          Próximo →
        </Link>
      ) : (
        <span className="text-naty-line">Próximo →</span>
      )}
    </nav>
  );
}

function buildPages(current: number, total: number): (number | "…")[] {
  if (total <= 5) return Array.from({ length: total }, (_, i) => i + 1);
  if (current <= 3) return [1, 2, 3, "…", total];
  if (current >= total - 2) return [1, "…", total - 2, total - 1, total];
  return [1, "…", current, "…", total];
}
