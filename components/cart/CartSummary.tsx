"use client";

import { useMemo, useState } from "react";
import { formatBRL } from "@/lib/format";
import type { CartItem } from "@/types";

interface CartSummaryProps {
  items: CartItem[];
}

/**
 * Resumo do pedido com cupom + CEP. Estado local.
 * Cupom "NATY10" → 10% off como exemplo.
 */
export function CartSummary({ items }: CartSummaryProps) {
  const [coupon, setCoupon] = useState("NATY10");
  const [applied, setApplied] = useState(true);
  const [cep, setCep] = useState("");

  const subtotal = useMemo(
    () => items.reduce((sum, it) => sum + it.price * it.qty, 0),
    [items]
  );
  const discount = applied ? subtotal * 0.1 : 0;
  const total = subtotal - discount;
  const pix = total * 0.9;
  const installmentValue = total / 6;

  return (
    <aside className="bg-naty-blushSoft p-7 md:p-9 self-start md:sticky md:top-6">
      <h2 className="font-display text-[20px] md:text-[22px] text-naty-text mb-6 font-medium">
        Resumo do pedido
      </h2>

      <Row label={`Subtotal (${items.length} ${items.length === 1 ? "item" : "itens"})`} value={formatBRL(subtotal)} />
      {applied && (
        <Row label="Desconto cupom" value={`− ${formatBRL(discount)}`} accent />
      )}
      <Row label="Frete" value={<span className="text-naty-muted">a calcular</span>} />

      {/* CEP */}
      <Field label="CEP de entrega">
        <div className="flex">
          <input
            value={cep}
            onChange={(e) => setCep(e.target.value)}
            placeholder="00000-000"
            className="flex-1 px-3.5 py-3 border border-naty-line bg-white text-[12px] outline-none focus:border-naty-gold"
          />
          <button
            type="button"
            className="bg-naty-text text-white px-4 text-[11px] tracking-[0.18em] uppercase"
          >
            OK
          </button>
        </div>
      </Field>

      {/* Cupom */}
      <Field label="Cupom de desconto">
        <div className="flex">
          <input
            value={coupon}
            onChange={(e) => setCoupon(e.target.value.toUpperCase())}
            className={`flex-1 px-3.5 py-3 border bg-white text-[12px] tracking-[0.1em] outline-none ${
              applied
                ? "border-naty-gold text-naty-rose-deep font-medium"
                : "border-naty-line"
            }`}
          />
          <button
            type="button"
            onClick={() => setApplied(!applied)}
            className="bg-naty-gold text-white px-4 text-[11px] tracking-[0.18em] uppercase"
          >
            {applied ? "✓" : "OK"}
          </button>
        </div>
        {applied && (
          <div className="text-[11px] text-naty-gold mt-1.5">
            ✓ Cupom aplicado · 10% off
          </div>
        )}
      </Field>

      <div className="naty-hairline my-5" />

      <div className="flex justify-between items-baseline">
        <span className="font-display text-[18px]">Total</span>
        <div className="text-right">
          <div className="font-display text-[26px] md:text-[28px] text-naty-rose-deep font-medium">
            {formatBRL(total)}
          </div>
          <div className="text-[11px] text-naty-muted mt-0.5">
            ou 6x de {formatBRL(installmentValue)} sem juros
          </div>
          <div className="text-[11px] text-naty-gold mt-1">
            à vista no PIX: <strong>{formatBRL(pix)}</strong>
          </div>
        </div>
      </div>

      <button type="button" className="btn-primary w-full mt-5">
        Finalizar compra
      </button>
      <button type="button" className="btn-whats w-full mt-2.5">
        <span aria-hidden>⏵</span> Comprar pelo WhatsApp
      </button>

      <div className="flex items-center gap-2.5 mt-6 text-[11px] text-naty-text/70">
        <span className="text-naty-gold">✦</span> Pagamento 100% seguro · SSL
      </div>
    </aside>
  );
}

function Row({
  label,
  value,
  accent,
}: {
  label: string;
  value: React.ReactNode;
  accent?: boolean;
}) {
  return (
    <div className="flex justify-between mb-3.5 text-[13px]">
      <span>{label}</span>
      <span className={accent ? "text-naty-gold" : ""}>{value}</span>
    </div>
  );
}

function Field({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="my-5">
      <div className="text-[11px] tracking-[0.22em] text-naty-muted mb-2 uppercase">
        {label}
      </div>
      {children}
    </div>
  );
}
