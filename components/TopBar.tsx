import type { TopBarItem } from "@/types";

interface TopBarProps {
  items: TopBarItem[];
  phone?: string;
}

/** Barra superior promocional — fundo rosê escuro */
export function TopBar({ items, phone }: TopBarProps) {
  return (
    <div className="bg-naty-rose-deep text-white text-[11px] tracking-[0.16em] uppercase">
      <div className="hidden md:flex max-w-[1440px] mx-auto px-14 py-2.5 justify-between items-center">
        <div className="flex gap-8">
          {items.map((it) => (
            <span key={it.label} className="flex items-center gap-2">
              <span aria-hidden>{it.icon}</span> {it.label}
            </span>
          ))}
        </div>
        {phone && <span>{phone}</span>}
      </div>

      {/* Mobile: apenas a mensagem mais importante */}
      <div className="md:hidden text-center py-2 px-3 text-[10px] tracking-[0.14em]">
        {items[0]?.label ?? ""}
      </div>
    </div>
  );
}
