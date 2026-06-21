"use client";

import { useState, type FormEvent } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";

type Mode = "login" | "signup";

export function AuthForm() {
  const router = useRouter();
  const [mode, setMode] = useState<Mode>("login");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  function switchMode(next: Mode) {
    setMode(next);
    setError("");
  }

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError("");
    setLoading(true);

    const form = new FormData(e.currentTarget);
    const email = form.get("email") as string;
    const password = form.get("password") as string;

    try {
      if (mode === "login") {
        const result = await signIn("credentials", {
          email,
          password,
          redirect: false,
        });
        if (result?.error) {
          setError("E-mail ou senha incorretos.");
        } else {
          router.push("/");
          router.refresh();
        }
      } else {
        const name = form.get("name") as string;
        const confirm = form.get("confirmPassword") as string;

        if (password !== confirm) {
          setError("Senhas não coincidem.");
          setLoading(false);
          return;
        }

        const res = await fetch("/api/auth/register", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ name, email, password }),
        });

        const data = await res.json();
        if (!data.success) {
          setError(data.error ?? "Erro ao criar conta.");
          setLoading(false);
          return;
        }

        const result = await signIn("credentials", {
          email,
          password,
          redirect: false,
        });

        if (!result?.error) {
          router.push("/");
          router.refresh();
        }
      }
    } catch {
      setError("Erro inesperado. Tente novamente.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="bg-white p-8 md:p-12 max-w-[480px] w-full mx-auto">
      {/* Tabs */}
      <div className="flex border-b border-naty-line mb-9">
        {(["login", "signup"] as const).map((m) => (
          <button
            key={m}
            type="button"
            onClick={() => switchMode(m)}
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

      {error && (
        <div className="mb-5 px-4 py-3 bg-red-50 border border-red-200 text-red-700 text-[12px]">
          {error}
        </div>
      )}

      <form onSubmit={onSubmit} className="flex flex-col gap-5">
        {mode === "signup" && (
          <Field name="name" label="Nome completo" type="text" placeholder="Como podemos te chamar?" />
        )}
        <Field name="email" label="E-mail" type="email" placeholder="voce@exemplo.com" />
        <Field name="password" label="Senha" type="password" placeholder="Mínimo 8 caracteres" />
        {mode === "signup" && (
          <Field name="confirmPassword" label="Confirmar senha" type="password" placeholder="Repita a senha" />
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
            <span>Quero receber novidades e descontos exclusivos por e-mail.</span>
          </label>
        )}

        <button
          type="submit"
          disabled={loading}
          className="btn-primary w-full mt-2 disabled:opacity-60"
        >
          {loading
            ? "Aguarde..."
            : mode === "login"
            ? "Entrar"
            : "Criar minha conta"}
        </button>
      </form>

      <p className="text-center text-[11px] text-naty-muted mt-8">
        Ao continuar, você concorda com nossos{" "}
        <Link href="/termos" className="text-naty-rose-deep">Termos</Link> e{" "}
        <Link href="/privacidade" className="text-naty-rose-deep">Política de Privacidade</Link>.
      </p>
    </div>
  );
}

function Field({
  name,
  label,
  type,
  placeholder,
}: {
  name: string;
  label: string;
  type: string;
  placeholder?: string;
}) {
  return (
    <label className="block">
      <span className="text-[11px] tracking-[0.22em] text-naty-text uppercase">{label}</span>
      <input
        name={name}
        type={type}
        required
        placeholder={placeholder}
        className="mt-2 w-full px-4 py-3.5 border border-naty-line bg-naty-blushSoft text-[13px] outline-none focus:border-naty-gold focus:bg-white transition-colors"
      />
    </label>
  );
}
