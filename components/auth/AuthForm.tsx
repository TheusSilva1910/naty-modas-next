"use client";

import { useState, FormEvent } from "react";
import Link from "next/link";

type Mode = "login" | "signup";

/**
 * Formulário de login / cadastro com alternância entre os dois modos.
 * Validação mínima — em produção, integrar com NextAuth ou auth provider.
 */
export function AuthForm() {
  const [mode, setMode] = useState<Mode>("login");

  function onSubmit(e: FormEvent) {
    e.preventDefault();
    // TODO: integrar com backend
  }

  return (
    <div className="bg-white p-8 md:p-12 max-w-[480px] w-full mx-auto">
      {/* Tabs */}
      <div className="flex border-b border-naty-line mb-9">
        {(["login", "signup"] as const).map((m) => (
          <button
            key={m}
            type="button"
            onClick={() => setMode(m)}
            className={`flex-1 pb-4 text-[12px] tracking-[0.28em] uppercase transition-colors ${
              mode === m
                ? "text-naty-rose-deep border-b-2 border-naty-rose-deep -mb-px"
                : "text-naty-muted hover:text-naty-text"
            }`}
          >
            {m === "login" ? "Entrar" : "Criar conta"}
          </button>
        ))}
      </div>

      <header className="text-center mb-8">
        <div className="text-[11px] tracking-[0.32em] text-naty-gold uppercase">
          {mode === "login" ? "Bem-vinda de volta" : "Faça parte do clube"}
        </div>
        <h1 className="font-display text-[28px] md:text-[32px] text-naty-text mt-2 font-medium">
          {mode === "login" ? "Entrar na sua conta" : "Criar uma conta"}
        </h1>
      </header>

      <form onSubmit={onSubmit} className="flex flex-col gap-5">
        {mode === "signup" && (
          <Field label="Nome completo" type="text" placeholder="Como podemos te chamar?" />
        )}
        <Field label="E-mail" type="email" placeholder="voce@exemplo.com" />
        <Field
          label="Senha"
          type="password"
          placeholder="Mínimo 8 caracteres"
        />
        {mode === "signup" && (
          <Field label="Confirmar senha" type="password" placeholder="Repita a senha" />
        )}

        {mode === "login" && (
          <div className="flex justify-between text-[11px]">
            <label className="flex items-center gap-2 text-naty-muted">
              <input type="checkbox" className="accent-naty-rose-deep" />
              Lembrar de mim
            </label>
            <Link href="/recuperar" className="text-naty-gold border-b border-naty-gold pb-0.5">
              Esqueci minha senha
            </Link>
          </div>
        )}

        {mode === "signup" && (
          <label className="flex items-start gap-2.5 text-[11px] text-naty-muted leading-relaxed">
            <input type="checkbox" defaultChecked className="accent-naty-rose-deep mt-0.5" />
            <span>
              Quero receber novidades e descontos exclusivos por e-mail.
            </span>
          </label>
        )}

        <button type="submit" className="btn-primary w-full mt-2">
          {mode === "login" ? "Entrar" : "Criar minha conta"}
        </button>

        <div className="text-center text-[11px] text-naty-muted tracking-[0.16em] uppercase my-1">
          ou
        </div>

        <button
          type="button"
          className="border border-naty-line py-3.5 text-[12px] tracking-[0.18em] uppercase hover:border-naty-gold transition-colors"
        >
          Continuar com Google
        </button>
      </form>

      <p className="text-center text-[11px] text-naty-muted mt-8">
        Ao continuar, você concorda com nossos{" "}
        <Link href="/termos" className="text-naty-rose-deep">
          Termos
        </Link>{" "}
        e{" "}
        <Link href="/privacidade" className="text-naty-rose-deep">
          Política de Privacidade
        </Link>
        .
      </p>
    </div>
  );
}

function Field({
  label,
  type,
  placeholder,
}: {
  label: string;
  type: string;
  placeholder?: string;
}) {
  return (
    <label className="block">
      <span className="text-[11px] tracking-[0.22em] text-naty-text uppercase">
        {label}
      </span>
      <input
        type={type}
        required
        placeholder={placeholder}
        className="mt-2 w-full px-4 py-3.5 border border-naty-line bg-naty-blushSoft text-[13px] outline-none focus:border-naty-gold focus:bg-white transition-colors"
      />
    </label>
  );
}
