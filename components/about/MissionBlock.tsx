import { aboutContent } from "@/data/about";

/** Bloco "Nossa missão" no fundo blush, layout duas colunas. */
export function MissionBlock() {
  return (
    <section className="bg-naty-blush py-16 md:py-24 px-4 md:px-14">
      <div className="max-w-[1100px] mx-auto grid md:grid-cols-[1fr_2fr] gap-10 md:gap-16">
        <div>
          <div className="eyebrow">A jornada</div>
          <h2 className="font-display text-[28px] md:text-[40px] text-naty-text mt-2 font-medium leading-[1.15]">
            Nossa <em className="not-italic text-naty-rose-deep">história</em>.
          </h2>
          <div className="naty-hairline mt-5 max-w-[140px]" />
          <div className="mt-10 p-7 bg-white">
            <div className="text-[11px] tracking-[0.28em] text-naty-gold uppercase">
              Missão
            </div>
            <p className="font-display italic text-[18px] leading-[1.5] mt-3 text-naty-text">
              “{aboutContent.mission}”
            </p>
          </div>
        </div>
        <div className="flex flex-col gap-6 text-[14px] leading-[1.85] text-naty-text/85">
          {aboutContent.story.map((para, i) => (
            <p key={i}>{para}</p>
          ))}
        </div>
      </div>
    </section>
  );
}
