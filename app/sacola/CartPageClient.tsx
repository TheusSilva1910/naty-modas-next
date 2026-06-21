"use client";

import Link from "next/link";
import { Logo } from "@/components/Logo";
import { CheckoutSteps } from "@/components/cart/CheckoutSteps";
import { FreeShippingBar } from "@/components/cart/FreeShippingBar";
import { CartItem } from "@/components/cart/CartItem";
import { CartSummary } from "@/components/cart/CartSummary";
import { StateMessage } from "@/components/StateMessage";
import { useCart } from "@/contexts/CartContext";

export function CartPageClient() {
  const { items, removeItem, updateQty, subtotal, itemCount } = useCart();

  return (
    <>
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
            {itemCount} {itemCount === 1 ? "item" : "itens"}
          </span>
        </div>
      </header>

      <CheckoutSteps current={1} />

      <main className="max-w-[1440px] mx-auto grid lg:grid-cols-[2fr_1fr] gap-10 lg:gap-14 px-4 md:px-14 py-10 md:py-14">
        <section>
          <h1 className="font-display text-[30px] md:text-[36px] text-naty-text font-medium m-0">
            Sua sacola{" "}
            <span className="text-naty-gold text-[18px]">({itemCount} {itemCount === 1 ? "item" : "itens"})</span>
          </h1>
          <div className="mt-3 mb-8">
            <FreeShippingBar subtotal={subtotal} />
          </div>

          {items.length === 0 ? (
            <StateMessage
              title="Sua sacola está vazia"
              description="Explore nossa coleção e adicione peças que você vai amar."
            />
          ) : (
            items.map((item) => (
              <CartItem
                key={`${item.productId}-${item.color}-${item.size}`}
                item={item}
                onRemove={(id, color, size) => removeItem(id, color, size)}
                onQtyChange={(id, color, size, qty) => updateQty(id, color, size, qty)}
              />
            ))
          )}
        </section>

        <CartSummary />
      </main>
    </>
  );
}
