import { Placeholder } from "./Placeholder";
import type { Review } from "@/types";

interface ReviewsSectionProps {
  reviews: Review[];
}

export function ReviewsSection({ reviews }: ReviewsSectionProps) {
  return (
    <section className="bg-naty-blush py-16 md:py-24 px-4 md:px-14">
      <header className="text-center mb-10 md:mb-14">
        <div className="eyebrow">Que dizem sobre nós</div>
        <h2 className="font-display text-[28px] md:text-[38px] text-naty-text mt-2 font-medium">
          Nossas Clientes
        </h2>
      </header>

      <div className="grid md:grid-cols-3 gap-6 md:gap-8">
        {reviews.map((r) => (
          <article key={r.id} className="bg-white p-9">
            <div
              className="text-naty-gold tracking-[0.3em] text-[14px] mb-4"
              aria-label={`${r.rating} de 5 estrelas`}
            >
              {"★ ".repeat(r.rating).trim()}
            </div>
            <p className="font-display italic text-[17px] leading-[1.6] text-naty-text m-0">
              “{r.quote}”
            </p>
            <div className="flex items-center gap-3.5 mt-6">
              <Placeholder
                variant="cream"
                className="w-[42px] h-[42px] rounded-full"
              />
              <div>
                <div className="text-[13px] text-naty-text font-medium">
                  {r.author}
                </div>
                {r.location && (
                  <div className="text-[10px] tracking-[0.2em] text-naty-gold mt-0.5 uppercase">
                    {r.location}
                  </div>
                )}
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
