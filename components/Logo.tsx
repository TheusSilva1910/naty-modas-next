interface LogoProps {
  size?: "sm" | "md" | "lg";
  className?: string;
}

/**
 * Logotipo tipográfico da Naty Modas — "NATY" rosê em Playfair,
 * com "MODAS" pequeno em dourado entre duas linhas finas.
 *
 * Reproduz o sentimento da logo circular original em formato horizontal
 * para uso em header, footer e checkout.
 */
export function Logo({ size = "md", className = "" }: LogoProps) {
  const sizes = {
    sm: { naty: "text-[22px]", modas: "text-[8px]",  line: "w-4" },
    md: { naty: "text-[32px]", modas: "text-[10px]", line: "w-6" },
    lg: { naty: "text-[38px]", modas: "text-[11px]", line: "w-8" },
  } as const;
  const s = sizes[size];

  return (
    <div className={`text-center ${className}`}>
      <div
        className={`font-display text-naty-rose tracking-[0.32em] leading-none font-medium ${s.naty}`}
      >
        NATY
      </div>
      <div className="flex items-center justify-center gap-2 mt-1">
        <span className={`h-px bg-naty-gold ${s.line}`} />
        <span
          className={`font-display text-naty-gold tracking-[0.34em] ${s.modas}`}
        >
          MODAS
        </span>
        <span className={`h-px bg-naty-gold ${s.line}`} />
      </div>
    </div>
  );
}
