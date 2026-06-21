import { formatBRL } from "@/lib/format";

const FREE_SHIPPING_THRESHOLD = 299;

interface FreeShippingBarProps {
  subtotal: number;
}

/** Barra de progresso até o frete grátis. */
export function FreeShippingBar({ subtotal }: FreeShippingBarProps) {
  const missing = Math.max(0, FREE_SHIPPING_THRESHOLD - subtotal);
  const progress = Math.min(100, (subtotal / FREE_SHIPPING_THRESHOLD) * 100);
  const reached = missing === 0;

  return (
    <div>
      <p className="text-[13px] text-naty-muted">
        {reached ? (
          <>
            🎉 Você ganhou <strong className="text-naty-rose-deep">frete grátis</strong>!
          </>
        ) : (
          <>
            Falta apenas{" "}
            <strong className="text-naty-rose-deep">{formatBRL(missing)}</strong>{" "}
            para você ganhar frete grátis ✨
          </>
        )}
      </p>
      <div className="h-1.5 bg-naty-blush mt-3 relative overflow-hidden">
        <div
          style={{ width: `${progress}%` }}
          className="absolute inset-y-0 left-0 bg-gradient-to-r from-naty-rose to-naty-gold transition-all duration-500"
        />
      </div>
    </div>
  );
}
