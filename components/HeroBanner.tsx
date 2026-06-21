import Link from "next/link";
import { Placeholder } from "./Placeholder";
import type { HeroSlide } from "@/types";

interface HeroBannerProps {
  slide: HeroSlide;
}

export function HeroBanner({ slide }: HeroBannerProps) {
  return (
    <section className="grid md:grid-cols-2 md:h-[620px]">
      <Placeholder
        variant={slide.imageVariant}
        imageUrl={slide.imageUrl}
        imageAlt={slide.title}
        label={`HERO - ${slide.title.toUpperCase()}`}
        className="h-[440px] md:h-full"
      >
        <div className="absolute bottom-8 left-8 right-8 flex gap-2.5">
          <span className="w-8 h-0.5 bg-white" />
          <span className="w-8 h-0.5 bg-white/40" />
          <span className="w-8 h-0.5 bg-white/40" />
        </div>
      </Placeholder>

      <div className="bg-naty-blush flex flex-col justify-center px-8 py-16 md:px-22 md:py-24 lg:px-[88px]">
        <div className="eyebrow mb-6">{slide.eyebrow}</div>

        <h1 className="font-display text-5xl md:text-6xl lg:text-[72px] text-naty-text leading-[1.05] tracking-[-0.005em] font-medium m-0">
          {slide.title}
          {slide.titleEmphasis && (
            <>
              <br />
              <em className="not-italic text-naty-rose-deep font-medium">
                {slide.titleEmphasis}
              </em>
            </>
          )}
        </h1>

        <p className="text-[15px] leading-[1.7] text-naty-text/70 max-w-[380px] mt-7 mb-10">
          {slide.description}
        </p>

        <div className="flex flex-wrap items-center gap-4">
          <Link href={slide.cta.href} className="btn-primary">
            {slide.cta.label}
          </Link>
          {slide.secondaryCta && (
            <Link
              href={slide.secondaryCta.href}
              className="py-4 text-[11px] tracking-[0.32em] uppercase
                         border-b border-naty-gold hover:text-naty-rose-deep
                         transition-colors"
            >
              {slide.secondaryCta.label}
            </Link>
          )}
        </div>
      </div>
    </section>
  );
}
