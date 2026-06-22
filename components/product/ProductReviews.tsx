import type { ProductReviewItem } from "@/types";
import { ReviewForm } from "./ReviewForm";

interface ProductReviewsProps {
  productId: string;
  rating: number;
  reviewCount: number;
  reviews: ProductReviewItem[];
  isLoggedIn: boolean;
}

function Stars({ rating, size = "sm" }: { rating: number; size?: "sm" | "lg" }) {
  const cls = size === "lg" ? "text-[28px]" : "text-[14px]";
  return (
    <span className="flex">
      {[1, 2, 3, 4, 5].map((s) => (
        <span key={s} className={`${cls} ${s <= rating ? "text-naty-gold" : "text-naty-line"}`}>
          ★
        </span>
      ))}
    </span>
  );
}

export function ProductReviews({
  productId, rating, reviewCount, reviews, isLoggedIn,
}: ProductReviewsProps) {
  return (
    <section className="px-4 md:px-14 py-12 md:py-16 border-t border-naty-line">
      <div className="grid md:grid-cols-[280px_1fr] gap-10 md:gap-16 max-w-[1100px]">
        {/* Summary */}
        <div>
          <div className="eyebrow mb-3">Avaliações</div>
          <div className="flex items-end gap-3 mb-2">
            <span className="font-display text-[56px] leading-none text-naty-text">
              {rating > 0 ? rating.toFixed(1) : "—"}
            </span>
            {rating > 0 && <Stars rating={Math.round(rating)} size="lg" />}
          </div>
          <p className="text-[13px] text-naty-muted mb-8">
            {reviewCount === 0
              ? "Sem avaliações ainda"
              : `${reviewCount} avaliação${reviewCount !== 1 ? "ões" : ""}`}
          </p>

          {isLoggedIn ? (
            <>
              <p className="text-[13px] text-naty-text mb-4 font-medium">
                Deixe sua avaliação
              </p>
              <ReviewForm productId={productId} />
            </>
          ) : (
            <p className="text-[13px] text-naty-muted">
              <a href="/conta" className="underline hover:text-naty-rose-deep">Faça login</a> para avaliar este produto.
            </p>
          )}
        </div>

        {/* Review list */}
        <div>
          {reviews.length === 0 ? (
            <p className="text-[14px] text-naty-muted">
              Seja a primeira a avaliar esta peça!
            </p>
          ) : (
            <ul className="flex flex-col gap-6">
              {reviews.map((review) => (
                <li key={review.id} className="border-b border-naty-line pb-6 last:border-0">
                  <div className="flex items-center gap-3 mb-2">
                    <Stars rating={review.rating} />
                    <span className="text-[13px] font-medium">{review.author}</span>
                    <span className="text-[11px] text-naty-muted ml-auto">
                      {new Date(review.date).toLocaleDateString("pt-BR")}
                    </span>
                  </div>
                  {review.comment && (
                    <p className="text-[14px] leading-[1.75] text-naty-text">{review.comment}</p>
                  )}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </section>
  );
}
