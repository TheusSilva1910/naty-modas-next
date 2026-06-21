import { Placeholder } from "./Placeholder";
import { formatBRL } from "@/lib/format";
import type { Look } from "@/types";

interface LooksSectionProps {
  looks: Look[];
}

export function LooksSection({ looks }: LooksSectionProps) {
  if (looks.length === 0) {
    return null;
  }

  return (
    <section className="py-16 md:py-24 px-4 md:px-14">
      <header className="text-center mb-10 md:mb-12">
        <div className="eyebrow">Inspiração</div>
        <h2 className="font-display text-[28px] md:text-[38px] text-naty-text mt-2 font-medium">
          Looks Completos
        </h2>
      </header>

      <div className="hidden md:grid grid-cols-3 gap-6">
        {looks.map((look) => (
          <LookCard key={look.id} look={look} />
        ))}
      </div>
      <div className="md:hidden flex gap-4 overflow-x-auto pb-2 -mx-4 px-4">
        {looks.map((look) => (
          <div key={look.id} className="flex-none w-[220px]">
            <LookCard look={look} compact />
          </div>
        ))}
      </div>
    </section>
  );
}

function LookCard({ look, compact = false }: { look: Look; compact?: boolean }) {
  return (
    <Placeholder
      variant={look.imageVariant}
      imageUrl={look.imageUrl}
      imageAlt={look.title}
      label={`LOOK - ${look.title.toUpperCase()}`}
      className={compact ? "h-[300px]" : "h-[520px]"}
    >
      <div className="absolute bottom-6 left-6 right-6 bg-white/95 px-5 py-4">
        <div className="font-display text-[16px] text-naty-text">
          {look.title}
        </div>
        <div className="text-[11px] tracking-[0.2em] text-naty-gold mt-1 uppercase">
          {look.pieces} peças - {formatBRL(look.total)}
        </div>
      </div>
    </Placeholder>
  );
}
