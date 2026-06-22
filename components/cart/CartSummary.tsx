"use client";

import Link from "next/link";
import { useState } from "react";
import { formatBRL } from "@/lib/format";
import { useCart } from "@/contexts/CartContext";

interface CouponResult {
  code: string;
  type: string;
  value: number;
  discount: number;
  label: string;
}

export function CartSummary() {
  const { items, subtotal } = useCart();

  const [couponCode, setCouponCode] = useState("");
  const [coupon, setCoupon] = useState<CouponResult | null>(null);
  const [couponError, setCouponError] = useState("");
  const [couponLoading, setCouponLoading] = useState(false);
  const [cep, setCep] = useState("");

  async function applyCoupon() {
    if (!couponCode.trim()) return;
    setCouponLoading(true);
    setCouponError("");
    setCoupon(null);

    try {
      const res = await fetch("/api/coupons/validate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ code: couponCode, subtotal }),
      });
      const data = await res.json();

      if (!data.success) {
        setCouponError(data.error ?? "Cupom inválido");
      } else {
        setCoupon(data.data);
      }
    } catch {
      setCouponError("Erro ao validar cupom");
    } finally {
      setCouponLoading(false);
    }
  }

  function removeCoupon() {
    setCoupon(null);
    setCouponCode("");
    setCouponError("");
  }

  const discount = coupon?.discount ?? 0;
  const total = subtotal - discount;
  const pix = total * 0.9;
  const installmentValue = total / 6;

  return (
    <aside className="bg-naty-blushSoft p-7 md:p-9 self-start md:sticky md:top-6">
      <h2 className="font-display text-[20px] md:text-[22px] text-naty-text mb-6 font-medium">
        Resumo do pedido
      </h2>

      <Row
        label={`Subtotal (${items.length} ${items.length === 1 ? "item" : "itens"})`}
        value={formatBRL(subtotal)}
      />
      {discount > 0 && (
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
        {coupon ? (
          <div className="flex items-center justify-between px-3.5 py-3 border border-naty-gold bg-white">
            <span className="text-[12px] text-naty-rose-deep font-medium tracking-[0.1em]">
              {coupon.code}
            </span>
            <div className="flex items-center gap-3">
              <span className="text-[11px] text-naty-gold">✓ {coupon.label}</span>
              <button
                type="button"
                onClick={removeCoupon}
                className="text-[11px] text-naty-muted underline"
              >
                remover
              </button>
            </div>
          </div>
        ) : (
          <div className="flex">
            <input
              value={couponCode}
              onChange={(e) => setCouponCode(e.target.value.toUpperCase())}
              onKeyDown={(e) => e.key === "Enter" && applyCoupon()}
              placeholder="CÓDIGO"
              className="flex-1 px-3.5 py-3 border border-naty-line bg-white text-[12px] tracking-[0.1em] outline-none focus:border-naty-gold"
            />
            <button
              type="button"
              onClick={applyCoupon}
              disabled={couponLoading}
              className="bg-naty-gold text-white px-4 text-[11px] tracking-[0.18em] uppercase disabled:opacity-60"
            >
              {couponLoading ? "..." : "OK"}
            </button>
          </div>
        )}
        {couponError && (
          <div className="text-[11px] text-red-500 mt-1.5">{couponError}</div>
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

      <Link href="/checkout" className="btn-primary w-full mt-5 text-center">
        Finalizar compra
      </Link>
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
