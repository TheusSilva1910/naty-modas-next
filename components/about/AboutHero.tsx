import { Placeholder } from "../Placeholder";
import { aboutContent } from "@/data/about";

/** Bloco hero da página "Sobre" — foto da proprietária + citação. */
export function AboutHero() {
  return (
    <section className="grid md:grid-cols-2 md:min-h-[600px]">
      <Placeholder
        variant="rose"
        label="FUNDADORA · NATY"
        className="h-[440px] md:h-full"
      />
      <div className="bg-naty-blush flex flex-col justify-center px-8 py-16 md:px-18 lg:px-24">
        <div className="eyebrow">Nossa história</div>
        <h1 className="font-display text-[40px] md:text-[56px] text-naty-text mt-4 font-medium leading-[1.05]">
          Cada peça <em className="not-italic text-naty-rose-deep">tem uma</em> história.
        </h1>
        <blockquote className="font-display italic text-[18px] md:text-[20px] text-naty-text/80 leading-[1.6] mt-8 border-l-2 border-naty-gold pl-6">
          “{aboutContent.founder.quote}”
        </blockquote>
        <footer className="mt-5 text-[12px] text-naty-text">
          <div className="font-medium">{aboutContent.founder.name}</div>
          <div className="text-naty-gold tracking-[0.2em] text-[10px] mt-1 uppercase">
            {aboutContent.founder.role}
          </div>
        </footer>
      </div>
    </section>
  );
}
