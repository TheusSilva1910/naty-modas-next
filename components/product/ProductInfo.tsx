"use client";

import { useState } from "react";
import { formatBRL } from "@/lib/format";
import type { ProductFull } from "@/types";

interface ProductInfoProps {
  product: ProductFull;
}

/**
 * Painel lateral direito com nome, preço, seletores de cor/tamanho e CTAs.
 * Toda a interação (cor/tamanho/quantidade) é controlada localmente.
 */
export function ProductInfo({ product }: ProductInfoProps) {
  const [selectedColor, setSelectedColor] = useState(
    product.availableColors[0] ?? null
  );
  const [selectedSize, setSelectedSize] = useState(
    product.availableSizes.find((s) => s.available)?.label ?? ""
  );
  const [qty, setQty] = useState(1);

  const pixPrice = product.price * 0.9;

  return (
    <div className="md:pt-2 md:pl-4">
      <div className="text-[11px] tracking-[0.28em] text-naty-gold uppercase">
        Coleção Primavera
      </div>
      <h1 className="font-display text-[26px] md:text-[38px] text-naty-text mt-2.5 font-medium leading-[1.2]">
        {product.name}
      </h1>
      <div className="flex items-center gap-3.5 mt-3.5">
        <span className="text-naty-gold tracking-[0.2em] text-[13px]" aria-label={`${product.rating} de 5`}>
          {"★ ".repeat(product.rating).trim()}
        </span>
        <span className="text-[11px] text-naty-muted">
          {product.reviewCount} avaliações
        </span>
      </div>

      {/* Preço */}
      <div className="mt-7 flex items-baseline gap-3.5 flex-wrap">
        <span className="font-display text-[28px] md:text-[34px] text-naty-rose-deep font-medium">
          {formatBRL(product.price)}
        </span>
        {product.oldPrice && (
          <>
            <span className="text-[13px] text-naty-muted line-through">
              {formatBRL(product.oldPrice)}
            </span>
            <span className="bg-naty-blush text-naty-rose-deep px-2.5 py-1 text-[11px] tracking-[0.18em] uppercase">
              −{Math.round((1 - product.price / product.oldPrice) * 100)}%
            </span>
          </>
        )}
      </div>
      {product.installments && (
        <div className="text-[12px] text-naty-text/70 mt-2">
          ou {product.installments.count}x de{" "}
          <strong className="text-naty-text">
            {formatBRL(product.installments.value)}
          </strong>{" "}
          sem juros
        </div>
      )}
      <div className="text-[11px] text-naty-gold mt-1">
        ★ 10% OFF no PIX · {formatBRL(pixPrice)}
      </div>

      <div className="h-px bg-naty-line my-8" />

      {/* Cor */}
      {product.availableColors.length > 0 && selectedColor && (
        <div className="mb-6">
          <div className="text-[11px] tracking-[0.24em] mb-3.5 uppercase">
            Cor:{" "}
            <strong className="text-naty-text">{selectedColor.name}</strong>
          </div>
          <div className="flex flex-wrap gap-3">
            {product.availableColors.map((c) => {
              const active = c.name === selectedColor.name;
              return (
                <button
                  key={c.name}
                  type="button"
                  title={c.name}
                  onClick={() => setSelectedColor(c)}
                  style={{ background: c.hex }}
                  className={`w-[42px] h-[42px] rounded-full transition-shadow ${
                    active
                      ? "outline outline-2 outline-white shadow-[0_0_0_1px_#C9A15A]"
                      : c.hex === "#F8EFF1" || c.hex === "#ffffff"
                      ? "border border-naty-line"
                      : ""
                  }`}
                />
              );
            })}
          </div>
        </div>
      )}

      {/* Tamanho */}
      {product.availableSizes.length > 0 && (
      <div className="mb-6">
        <div className="flex justify-between items-baseline mb-3.5">
          <span className="text-[11px] tracking-[0.24em] uppercase">Tamanho</span>
          <a className="text-[11px] text-naty-gold border-b border-naty-gold pb-0.5" href="#medidas">
            Guia de medidas
          </a>
        </div>
        <div className="grid grid-cols-5 gap-2.5">
          {product.availableSizes.map((s) => {
            const active = s.label === selectedSize;
            return (
              <button
                key={s.label}
                type="button"
                disabled={!s.available}
                onClick={() => setSelectedSize(s.label)}
                className={`py-3.5 text-[12px] border text-center transition-colors ${
                  !s.available
                    ? "text-naty-line line-through cursor-not-allowed"
                    : active
                    ? "border-naty-rose-deep border-[1.5px] text-naty-rose-deep"
                    : "border-naty-line hover:border-naty-gold"
                }`}
              >
                {s.label}
              </button>
            );
          })}
        </div>
      </div>
      )}

      {/* Quantidade + comprar */}
      <div className="flex gap-3.5 mb-2.5">
        <div className="flex items-center border border-naty-line">
          <button type="button" onClick={() => setQty(Math.max(1, qty - 1))} className="px-4 py-3.5">
            −
          </button>
          <span className="px-4 py-3.5 min-w-9 text-center">{qty}</span>
          <button type="button" onClick={() => setQty(qty + 1)} className="px-4 py-3.5">
            +
          </button>
        </div>
        <button type="button" className="btn-primary flex-1">
          Comprar agora
        </button>
      </div>
      <button type="button" className="btn-whats w-full mt-2.5">
        <span aria-hidden>⏵</span> Comprar pelo WhatsApp
      </button>
      <button
        type="button"
        className="mt-2.5 w-full border border-naty-text py-4 text-[11px] tracking-[0.32em] uppercase hover:bg-naty-text hover:text-white transition-colors"
      >
        ♡ Adicionar aos favoritos
      </button>

      {/* CEP */}
      <div className="mt-8 p-5 bg-naty-blush">
        <div className="text-[11px] tracking-[0.24em] text-naty-text mb-2.5 uppercase">
          Calcular frete e prazo
        </div>
        <div className="flex">
          <input
            placeholder="Seu CEP"
            className="flex-1 px-4 py-3 border border-naty-line bg-white text-[12px] outline-none focus:border-naty-gold"
          />
          <button
            type="button"
            className="bg-naty-text text-white px-6 text-[11px] tracking-[0.22em] uppercase"
          >
            OK
          </button>
        </div>
      </div>

      {/* Trust badges */}
      <div className="grid grid-cols-3 gap-3.5 mt-6 pt-6 border-t border-naty-line text-[11px] text-naty-text/70 text-center">
        <Trust icon="⤿" lines={["Troca grátis", "em 30 dias"]} />
        <Trust icon="✦" lines={["Compra", "100% segura"]} />
        <Trust icon="✈" lines={["Envio em", "até 24h"]} />
      </div>
    </div>
  );
}

function Trust({ icon, lines }: { icon: string; lines: string[] }) {
  return (
    <div>
      <div className="text-naty-gold text-[18px]">{icon}</div>
      {lines.map((l, i) => (
        <div key={i}>{l}</div>
      ))}
    </div>
  );
}
