import Link from "next/link";
import { Placeholder } from "./Placeholder";

interface InstitutionalBannerProps {
  eyebrow: string;
  title: string;
  emphasis?: string;
  description: string;
  cta: { label: string; href: string };
  imageVariant?: "rose" | "cream" | "dark";
}

/** Banner institucional "Moda criada para mulheres autênticas" */
export function InstitutionalBanner({
  eyebrow,
  title,
  emphasis,
  description,
  cta,
  imageVariant = "rose",
}: InstitutionalBannerProps) {
  return (
    <section className="grid md:grid-cols-[5fr_7fr] md:h-[480px]">
      <div className="bg-naty-blush flex flex-col justify-center px-8 py-16 md:px-18 md:py-22 lg:px-[72px]">
        <div className="eyebrow">{eyebrow}</div>
        <h2 className="font-display text-[32px] md:text-[46px] text-naty-text mt-4 font-medium leading-[1.15]">
          {title}{" "}
          {emphasis && (
            <em className="not-italic text-naty-rose-deep">{emphasis}</em>
          )}
        </h2>
        <p className="text-[14px] leading-[1.8] text-naty-text/70 mt-6 mb-8">
          {description}
        </p>
        <Link href={cta.href} className="btn-outline self-start">
          {cta.label}
        </Link>
      </div>

      <Placeholder
        variant={imageVariant}
        label="LIFESTYLE · DUAS MODELOS"
        className="h-[300px] md:h-full"
      />
    </section>
  );
}
