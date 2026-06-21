"use client";

import { useState } from "react";
import { Placeholder } from "../Placeholder";
import { formatBRL } from "@/lib/format";
import type { CartItem as CartItemType } from "@/types";

interface CartItemProps {
  item: CartItemType;
  onRemove?: (productId: string) => void;
  onQtyChange?: (productId: string, qty: number) => void;
}

/** Item individual da sacola — desktop e mobile compartilham. */
export function CartItem({ item, onRemove, onQtyChange }: CartItemProps) {
  const [qty, setQty] = useState(item.qty);

  function updateQty(next: number) {
    const v = Math.max(1, next);
    setQty(v);
    onQtyChange?.(item.productId, v);
  }

  return (
    <div className="grid grid-cols-[100px_1fr_auto] md:grid-cols-[140px_1fr_auto] gap-4 md:gap-6 py-6 border-b border-naty-line">
      <Placeholder
        variant={item.imageVariant}
        className="aspect-[3/4]"
      />

      <div>
        <div className="text-[10px] tracking-[0.24em] text-naty-gold uppercase">
          {item.category}
        </div>
        <div className="font-display text-[16px] md:text-[20px] text-naty-text mt-1.5">
          {item.name}
        </div>
        <div className="text-[12px] text-naty-muted mt-2 flex gap-4 flex-wrap">
          <span>
            Cor: <strong className="text-naty-text">{item.color}</strong>
          </span>
          <span>
            Tamanho: <strong className="text-naty-text">{item.size}</strong>
          </span>
        </div>
        <div className="flex items-center gap-4 md:gap-6 mt-4 flex-wrap">
          <div className="flex items-center border border-naty-line">
            <button
              type="button"
              onClick={() => updateQty(qty - 1)}
              className="px-3 py-1.5"
              aria-label="Diminuir"
            >
              −
            </button>
            <span className="px-3 py-1.5 min-w-7 text-center text-[13px]">
              {qty}
            </span>
            <button
              type="button"
              onClick={() => updateQty(qty + 1)}
              className="px-3 py-1.5"
              aria-label="Aumentar"
            >
              +
            </button>
          </div>
          <button
            type="button"
            onClick={() => onRemove?.(item.productId)}
            className="text-[12px] text-naty-muted underline underline-offset-4"
          >
            remover
          </button>
          <button
            type="button"
            className="hidden md:inline text-[12px] text-naty-gold underline underline-offset-4"
          >
            salvar para depois
          </button>
        </div>
      </div>

      <div className="text-right">
        <div className="font-display text-[18px] md:text-[22px] text-naty-rose-deep font-medium">
          {formatBRL(item.price * qty)}
        </div>
        <div className="text-[11px] text-naty-muted mt-1">
          {item.installments.count}x {formatBRL(item.installments.value)}
        </div>
      </div>
    </div>
  );
}
