import type { FilterTag } from "@/types";

interface FilterChipsProps {
  tags: FilterTag[];
  onClear?: () => void;
}

/**
 * Chips de filtros ativos no topo do grid de categoria.
 */
export function FilterChips({ tags, onClear }: FilterChipsProps) {
  if (!tags.length) return null;

  return (
    <div className="flex flex-wrap gap-2.5 mb-6">
      {tags.map((t) => (
        <span
          key={`${t.type}-${t.label}`}
          className="border border-naty-gold px-3.5 py-2 text-[11px] tracking-[0.14em] uppercase"
        >
          {t.label} <span className="ml-1 cursor-pointer text-naty-muted">✕</span>
        </span>
      ))}
      <button
        type="button"
        onClick={onClear}
        className="text-[11px] py-2 tracking-[0.14em] text-naty-rose-deep border-b border-naty-gold self-center uppercase"
      >
        limpar tudo
      </button>
    </div>
  );
}
