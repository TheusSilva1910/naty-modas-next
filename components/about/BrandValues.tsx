import { brandValues } from "@/data/about";

export function BrandValues() {
  return (
    <section className="py-16 md:py-24 px-4 md:px-14">
      <header className="text-center mb-12">
        <div className="eyebrow">Nossos valores</div>
        <h2 className="font-display text-[28px] md:text-[38px] text-naty-text mt-2 font-medium">
          O que nos move
        </h2>
      </header>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12">
        {brandValues.map((v) => (
          <article key={v.title} className="text-center">
            <div className="text-naty-gold text-[28px]">{v.icon}</div>
            <h3 className="font-display text-[18px] md:text-[20px] text-naty-text mt-4 font-medium">
              {v.title}
            </h3>
            <p className="text-[13px] leading-[1.7] text-naty-text/75 mt-3">
              {v.description}
            </p>
          </article>
        ))}
      </div>
    </section>
  );
}
