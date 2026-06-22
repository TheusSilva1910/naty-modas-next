"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useCart } from "@/contexts/CartContext";
import { formatBRL } from "@/lib/format";

interface AddressData {
  zipcode: string;
  street: string;
  number: string;
  complement: string;
  district: string;
  city: string;
  state: string;
}

const EMPTY_ADDRESS: AddressData = {
  zipcode: "", street: "", number: "", complement: "",
  district: "", city: "", state: "",
};

const SHIPPING_PRICE = 19.9;

export function CheckoutForm({
  initialName,
  initialEmail,
}: {
  initialName?: string;
  initialEmail?: string;
}) {
  const { items, subtotal, clearCart } = useCart();
  const router = useRouter();

  const [name, setName] = useState(initialName ?? "");
  const [email, setEmail] = useState(initialEmail ?? "");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState<AddressData>(EMPTY_ADDRESS);
  const [cepLoading, setCepLoading] = useState(false);
  const [cepError, setCepError] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const total = subtotal + SHIPPING_PRICE;

  async function lookupCep(cep: string) {
    const digits = cep.replace(/\D/g, "");
    if (digits.length !== 8) return;
    setCepLoading(true);
    setCepError("");
    try {
      const res = await fetch(`https://viacep.com.br/ws/${digits}/json/`);
      const data = await res.json() as {
        erro?: boolean;
        logradouro?: string;
        bairro?: string;
        localidade?: string;
        uf?: string;
      };
      if (data.erro) {
        setCepError("CEP não encontrado");
      } else {
        setAddress((prev) => ({
          ...prev,
          street:   data.logradouro ?? "",
          district: data.bairro     ?? "",
          city:     data.localidade ?? "",
          state:    data.uf         ?? "",
        }));
      }
    } catch {
      setCepError("Erro ao buscar CEP");
    } finally {
      setCepLoading(false);
    }
  }

  function setAddr(field: keyof AddressData) {
    return (e: React.ChangeEvent<HTMLInputElement>) =>
      setAddress((prev) => ({ ...prev, [field]: e.target.value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (items.length === 0) return;
    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          customerName: name,
          customerEmail: email,
          customerPhone: phone || undefined,
          items: items.map((item) => ({
            productId: item.productId,
            name: item.name,
            quantity: item.qty,
            price: item.price,
          })),
          shipping: { ...address, price: SHIPPING_PRICE },
        }),
      });

      const data = await res.json() as {
        success: boolean;
        error?: string;
        data?: { orderId: string; initPoint: string; sandboxInitPoint?: string };
      };

      if (!data.success || !data.data) {
        setError(data.error ?? "Erro ao criar pedido");
        return;
      }

      clearCart();

      const url = data.data.sandboxInitPoint ?? data.data.initPoint;
      window.location.href = url;
    } catch {
      setError("Erro de conexão. Tente novamente.");
    } finally {
      setLoading(false);
    }
  }

  if (items.length === 0) {
    return (
      <div className="text-center py-16">
        <p className="text-naty-muted mb-4">Sua sacola está vazia.</p>
        <button onClick={() => router.push("/")} className="btn-primary">
          Continuar comprando
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="grid lg:grid-cols-[1fr_380px] gap-10 items-start">
      {/* Left column */}
      <div className="flex flex-col gap-8">
        {/* Contact */}
        <section>
          <h2 className="font-display text-[20px] mb-5 font-medium">Contato</h2>
          <div className="grid sm:grid-cols-2 gap-4">
            <Field label="Nome completo" required>
              <input value={name} onChange={(e) => setName(e.target.value)}
                required className="naty-input" />
            </Field>
            <Field label="E-mail" required>
              <input type="email" value={email} onChange={(e) => setEmail(e.target.value)}
                required className="naty-input" />
            </Field>
            <Field label="WhatsApp / Telefone">
              <input value={phone} onChange={(e) => setPhone(e.target.value)}
                placeholder="(00) 00000-0000" className="naty-input" />
            </Field>
          </div>
        </section>

        {/* Address */}
        <section>
          <h2 className="font-display text-[20px] mb-5 font-medium">Endereço de entrega</h2>
          <div className="grid sm:grid-cols-2 gap-4">
            <Field label="CEP" required>
              <div className="flex">
                <input
                  value={address.zipcode}
                  onChange={(e) => {
                    setAddr("zipcode")(e);
                    if (e.target.value.replace(/\D/g, "").length === 8) {
                      lookupCep(e.target.value);
                    }
                  }}
                  placeholder="00000-000"
                  required
                  className="naty-input flex-1"
                />
                {cepLoading && (
                  <span className="px-3 flex items-center text-naty-muted text-[12px]">…</span>
                )}
              </div>
              {cepError && <p className="text-[11px] text-red-500 mt-1">{cepError}</p>}
            </Field>

            <Field label="Rua / Logradouro" required className="sm:col-span-2">
              <input value={address.street} onChange={setAddr("street")} required className="naty-input" />
            </Field>

            <Field label="Número" required>
              <input value={address.number} onChange={setAddr("number")} required className="naty-input" />
            </Field>
            <Field label="Complemento">
              <input value={address.complement} onChange={setAddr("complement")} placeholder="Apto, bloco..." className="naty-input" />
            </Field>
            <Field label="Bairro" required>
              <input value={address.district} onChange={setAddr("district")} required className="naty-input" />
            </Field>
            <Field label="Cidade" required>
              <input value={address.city} onChange={setAddr("city")} required className="naty-input" />
            </Field>
            <Field label="Estado" required>
              <input value={address.state} onChange={setAddr("state")} maxLength={2} required className="naty-input uppercase" />
            </Field>
          </div>
        </section>
      </div>

      {/* Right column — order summary */}
      <aside className="bg-naty-blushSoft p-7 self-start sticky top-6">
        <h2 className="font-display text-[20px] mb-5 font-medium">Resumo</h2>

        <ul className="flex flex-col gap-3 mb-5 text-[13px]">
          {items.map((item) => (
            <li key={`${item.productId}-${item.color}-${item.size}`}
              className="flex justify-between gap-4">
              <span className="flex-1 text-naty-text">
                {item.name}
                {(item.color || item.size) && (
                  <span className="text-naty-muted"> ({[item.color, item.size].filter(Boolean).join(" / ")})</span>
                )}
                {" "}× {item.qty}
              </span>
              <span className="shrink-0">{formatBRL(item.price * item.qty)}</span>
            </li>
          ))}
        </ul>

        <div className="naty-hairline mb-4" />

        <div className="flex justify-between text-[13px] mb-2">
          <span>Subtotal</span><span>{formatBRL(subtotal)}</span>
        </div>
        <div className="flex justify-between text-[13px] mb-4">
          <span>Frete</span><span>{formatBRL(SHIPPING_PRICE)}</span>
        </div>

        <div className="naty-hairline mb-4" />

        <div className="flex justify-between items-baseline mb-6">
          <span className="font-display text-[18px]">Total</span>
          <span className="font-display text-[26px] text-naty-rose-deep font-medium">
            {formatBRL(total)}
          </span>
        </div>

        {error && <p className="text-[12px] text-red-500 mb-3">{error}</p>}

        <button
          type="submit"
          disabled={loading}
          className="btn-primary w-full disabled:opacity-60"
        >
          {loading ? "Processando..." : "Ir para pagamento"}
        </button>

        <p className="text-[11px] text-naty-muted text-center mt-3">
          Você será redirecionada para o Mercado Pago
        </p>
      </aside>
    </form>
  );
}

function Field({
  label, required, children, className,
}: {
  label: string; required?: boolean; children: React.ReactNode; className?: string;
}) {
  return (
    <div className={className}>
      <label className="block text-[11px] tracking-[0.2em] text-naty-muted uppercase mb-1.5">
        {label}{required && " *"}
      </label>
      {children}
    </div>
  );
}
