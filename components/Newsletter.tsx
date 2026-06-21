"use client";

import { useState, FormEvent } from "react";

interface NewsletterProps {
  title?: string;
  eyebrow?: string;
  description?: string;
}

/**
 * Bloco "Clube Naty" — captura de e-mail com 10% de desconto.
 * Estado local com feedback após envio (sem backend real).
 */
export function Newsletter({
  title = "Receba 10% de desconto",
  eyebrow = "Clube Naty",
  description = "Cadastre-se e seja a primeira a saber das novidades e lançamentos.",
}: NewsletterProps) {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);

  function onSubmit(e: FormEvent) {
    e.preventDefault();
    if (!email) return;
    setSent(true);
    setEmail("");
  }

  return (
    <section className="bg-naty-rose-deep text-white text-center px-4 md:px-14 py-16 md:py-18">
      <div className="text-[11px] tracking-[0.36em] uppercase opacity-80">
        {eyebrow}
      </div>
      <h3 className="font-display text-[26px] md:text-[32px] mt-2.5 font-medium">
        {title}
      </h3>
      <p className="text-[13px] opacity-90 mt-2 mb-7 max-w-md mx-auto">
        {description}
      </p>

      {sent ? (
        <p className="font-display italic text-[18px]">
          Obrigada! Em breve você terá novidades nossas ♡
        </p>
      ) : (
        <form
          onSubmit={onSubmit}
          className="flex flex-col sm:flex-row justify-center gap-2 sm:gap-0 max-w-md mx-auto"
        >
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="seu melhor e-mail"
            className="flex-1 px-5 py-4 bg-white/15 text-white placeholder-white/70
                       text-[12px] tracking-[0.06em] outline-none
                       focus:bg-white/25 transition-colors"
          />
          <button
            type="submit"
            className="bg-naty-gold text-white px-9 py-4 text-[11px]
                       tracking-[0.32em] uppercase hover:opacity-90 transition"
          >
            Cadastrar
          </button>
        </form>
      )}
    </section>
  );
}
