type Variant = "rose" | "cream" | "dark";

interface PlaceholderProps {
  variant?: Variant;
  imageUrl?: string;
  imageAlt?: string;
  label?: string;
  className?: string;
  children?: React.ReactNode;
}

function cx(...parts: (string | false | undefined | null)[]) {
  return parts.filter(Boolean).join(" ");
}

export function Placeholder({
  variant = "rose",
  imageUrl,
  imageAlt = "",
  label,
  className,
  children,
}: PlaceholderProps) {
  const bg =
    variant === "cream"
      ? "bg-naty-stripe-cream"
      : variant === "dark"
      ? "bg-naty-stripe-dark"
      : "bg-naty-stripe";

  return (
    <div className={cx("relative overflow-hidden", bg, className)}>
      {imageUrl && (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={imageUrl}
          alt={imageAlt}
          className="absolute inset-0 h-full w-full object-cover"
        />
      )}
      {label && (
        <span
          className={cx(
            "absolute top-3 left-3 font-mono text-[10px] tracking-[0.04em] uppercase",
            variant === "dark" ? "text-white/50" : "text-[#7a5a5f]/55"
          )}
        >
          {label}
        </span>
      )}
      {children}
    </div>
  );
}
