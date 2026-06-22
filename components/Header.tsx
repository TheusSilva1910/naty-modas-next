"use client";

import Link from "next/link";
import { useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { Logo } from "./Logo";
import { TopBar } from "./TopBar";
import { useCart } from "@/contexts/CartContext";
import type { MenuItem, TopBarItem } from "@/types";

interface HeaderProps {
  menu: MenuItem[];
  topBarItems: TopBarItem[];
  phone?: string;
}

const userActions = [
  { icon: "◯", label: "Minha conta", href: "/conta" },
  { icon: "♡", label: "Favoritos",   href: "/favoritos" },
] as const;

/**
 * Header principal — duas variações coexistindo via Tailwind:
 *  · Desktop (md+): logo centralizada, busca à esquerda, ações à direita, menu abaixo.
 *  · Mobile: hambúrguer, logo central compacta, busca + sacola.
 */
function menuItemClass(m: MenuItem, pathname: string, mobile = false): string {
  const isActive = m.href === "/" ? pathname === "/" : pathname.startsWith(m.href);
  const base = mobile ? "" : "pb-1.5 transition-colors";

  if (isActive) {
    return `${base} text-naty-rose-deep ${mobile ? "" : "border-b-2 border-naty-rose-deep"}`.trim();
  }
  if (m.highlight === "primary") {
    return `${base} text-naty-rose-deep hover:opacity-80`.trim();
  }
  if (m.highlight === "gold") {
    return `${base} text-naty-gold hover:text-naty-rose-deep`.trim();
  }
  return `${base} hover:text-naty-rose-deep`.trim();
}

export function Header({ menu, topBarItems, phone }: HeaderProps) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const pathname = usePathname();
  const router = useRouter();
  const { itemCount: cartCount } = useCart();

  function handleSearch(e: React.FormEvent) {
    e.preventDefault();
    const q = searchQuery.trim();
    if (q) router.push(`/busca?q=${encodeURIComponent(q)}`);
  }

  return (
    <header className="bg-white">
      <TopBar items={topBarItems} phone={phone} />

      {/* Header desktop */}
      <div className="hidden md:block border-b border-naty-blush">
        <div className="max-w-[1440px] mx-auto px-14 py-6">
          <div className="grid grid-cols-[1fr_auto_1fr] items-center gap-6">
            {/* Busca */}
            <form onSubmit={handleSearch} className="relative max-w-[280px]">
              <input
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Buscar peças, coleções..."
                className="w-full bg-naty-blush border border-naty-line pl-10 pr-4 py-3
                           text-[12px] tracking-[0.04em] outline-none
                           focus:border-naty-rose-deep transition-colors"
              />
              <button
                type="submit"
                aria-label="Buscar"
                className="absolute left-3.5 top-1/2 -translate-y-1/2 text-naty-gold"
              >
                ⌕
              </button>
            </form>

            <Link href="/" aria-label="Naty Modas">
              <Logo size="lg" />
            </Link>

            {/* Ações */}
            <nav
              className="flex justify-end items-center gap-7 text-[12px] tracking-[0.12em] uppercase"
              aria-label="Conta"
            >
              {userActions.map((a) => (
                <Link
                  key={a.label}
                  href={a.href}
                  className="flex items-center gap-2 hover:text-naty-rose-deep transition-colors"
                >
                  <span className="text-naty-gold" aria-hidden>{a.icon}</span>
                  {a.label}
                </Link>
              ))}
              <Link
                href="/sacola"
                className="relative flex items-center gap-2 hover:text-naty-rose-deep transition-colors"
              >
                <span className="text-naty-gold" aria-hidden>⛬</span>
                Sacola
                {cartCount > 0 && (
                  <span className="inline-flex items-center justify-center
                                   bg-naty-rose-deep text-white text-[9px]
                                   rounded-full w-4 h-4 ml-1">
                    {cartCount}
                  </span>
                )}
              </Link>
            </nav>
          </div>

          {/* Menu */}
          <nav
            className="mt-6 flex justify-center gap-11 text-[12px] tracking-[0.22em] font-medium uppercase"
            aria-label="Categorias"
          >
            {menu.map((m) => (
              <Link
                key={m.label}
                href={m.href}
                className={menuItemClass(m, pathname)}
              >
                {m.label}
              </Link>
            ))}
          </nav>
        </div>
      </div>

      {/* Header mobile */}
      <div className="md:hidden border-b border-naty-blush">
        <div className="flex items-center justify-between px-4 py-3.5">
          <button
            type="button"
            aria-label="Abrir menu"
            onClick={() => setMobileOpen(true)}
            className="text-[20px] text-naty-text"
          >
            ☰
          </button>
          <Link href="/" aria-label="Naty Modas">
            <Logo size="sm" />
          </Link>
          <div className="flex gap-4 text-[16px] text-naty-gold">
            <button aria-label="Buscar" onClick={() => router.push("/busca")}>⌕</button>
            <Link href="/sacola" className="relative" aria-label="Sacola">
              ⛬
              {cartCount > 0 && (
                <span className="absolute -top-1.5 -right-2 inline-flex items-center justify-center
                                 bg-naty-rose-deep text-white text-[8px]
                                 rounded-full w-3.5 h-3.5">
                  {cartCount}
                </span>
              )}
            </Link>
          </div>
        </div>
      </div>

      {/* Menu lateral mobile */}
      {mobileOpen && (
        <div
          className="fixed inset-0 z-50 bg-black/40 md:hidden"
          onClick={() => setMobileOpen(false)}
        >
          <aside
            className="absolute left-0 top-0 bottom-0 w-[82%] bg-white p-6 overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-center mb-8">
              <Logo size="sm" />
              <button
                onClick={() => setMobileOpen(false)}
                aria-label="Fechar"
                className="text-naty-text text-xl"
              >
                ✕
              </button>
            </div>
            <nav className="flex flex-col gap-4 text-[14px] tracking-[0.18em] uppercase">
              {menu.map((m) => (
                <Link
                  key={m.label}
                  href={m.href}
                  className={menuItemClass(m, pathname, true)}
                >
                  {m.label}
                </Link>
              ))}
            </nav>
            <div className="naty-hairline my-8" />
            <nav className="flex flex-col gap-3 text-[13px] text-naty-muted">
              <Link href="/conta">Minha conta</Link>
              <Link href="/favoritos">Favoritos</Link>
              <Link href="/sacola">Sacola ({cartCount})</Link>
            </nav>
          </aside>
        </div>
      )}
    </header>
  );
}
