import Link from "next/link";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Logo } from "@/components/Logo";
import { CheckoutSteps } from "@/components/cart/CheckoutSteps";
import { FreeShippingBar } from "@/components/cart/FreeShippingBar";
import { CartItem } from "@/components/cart/CartItem";
import { CartSummary } from "@/components/cart/CartSummary";
import { Placeholder } from "@/components/Placeholder";

import { mainMenu, topBarItems, whatsapp } from "@/data/menu";
import { sampleCart } from "@/data/cart";
import { formatBRL } from "@/lib/format";

export default function CartPage() {
  const subtotal = sampleCart.reduce((s, i) => s + i.price * i.qty, 0);
  const itemCount = sampleCart.length;

  return (
    <>
      {/* Header reduzido específico do checkout */}
      <header className="bg-white border-b border-naty-blush">
        <div className="max-w-[1440px] mx-auto px-4 md:px-14 py-6 grid grid-cols-[1fr_auto_1fr] items-center">
          <Link
            href="/"
            className="text-[11px] tracking-[0.2em] text-naty-muted hover:text-naty-rose-deep uppercase justify-self-start"
          >
            ← Continuar comprando
          </Link>
          <Logo size="md" />
          <span className="justify-self-end text-[11px] tracking-[0.18em] text-naty-gold uppercase">
            {itemCount} itens
          </span>
        </div>
      </header>

      <CheckoutSteps current={1} />

      <main className="max-w-[1440px] mx-auto grid lg:grid-cols-[2fr_1fr] gap-10 lg:gap-14 px-4 md:px-14 py-10 md:py-14">
        {/* Itens */}
        <section>
          <h1 className="font-display text-[30px] md:text-[36px] text-naty-text font-medium m-0">
            Sua sacola{" "}
            <span className="text-naty-gold text-[18px]">({itemCount} itens)</span>
          </h1>
          <div className="mt-3 mb-8">
            <FreeShippingBar subtotal={subtotal} />
          </div>

          {sampleCart.map((item) => (
            <CartItem key={item.productId} item={item} />
          ))}

          {/* Sugestão */}
          <div className="mt-8 bg-naty-blush p-6 md:p-7 flex items-center gap-5">
            <Placeholder
              variant="rose"
              className="w-[88px] aspect-[3/4] flex-none"
            />
            <div className="flex-1">
              <div className="text-[10px] tracking-[0.24em] text-naty-gold uppercase">
                Combina com sua sacola
              </div>
              <div className="font-display text-[16px] md:text-[18px] text-naty-text mt-1">
                Brinco Pérola Naty
              </div>
              <div className="text-[13px] text-naty-rose-deep mt-1">
                {formatBRL(89)}
              </div>
            </div>
            <button
              type="button"
              className="border border-naty-gold px-4 md:px-6 py-3.5 text-[11px] tracking-[0.24em] uppercase hover:bg-naty-gold hover:text-white transition-colors"
            >
              + Adicionar
            </button>
          </div>
        </section>

        <CartSummary items={sampleCart} />
      </main>

      <Footer />
    </>
  );
}

/** Não indexar carrinho. */
export const metadata = {
  title: "Sua sacola · Naty Modas",
  robots: { index: false },
};
