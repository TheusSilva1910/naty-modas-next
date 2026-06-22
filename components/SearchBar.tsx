"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export function SearchBar({ initialQuery = "" }: { initialQuery?: string }) {
  const router = useRouter();
  const [query, setQuery] = useState(initialQuery);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const q = query.trim();
    if (q) router.push(`/busca?q=${encodeURIComponent(q)}`);
  }

  return (
    <form onSubmit={handleSubmit} className="flex max-w-xl">
      <input
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Buscar peças, coleções, cores..."
        className="flex-1 bg-white border border-naty-line px-4 py-3.5 text-[13px] outline-none focus:border-naty-rose-deep transition-colors"
        autoFocus
      />
      <button
        type="submit"
        className="bg-naty-text text-white px-6 text-[11px] tracking-[0.2em] uppercase"
      >
        Buscar
      </button>
    </form>
  );
}
