"use client";

import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { sortOptions } from "@/data/filters";

export function SortDropdown() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const current = searchParams.get("sort") ?? "";

  function handleChange(value: string) {
    const params = new URLSearchParams(searchParams.toString());
    if (value) {
      params.set("sort", value);
    } else {
      params.delete("sort");
    }
    params.delete("page");
    router.push(`${pathname}?${params.toString()}`);
  }

  return (
    <div className="flex gap-6 items-center">
      <span className="text-[11px] tracking-[0.2em] text-naty-text uppercase">
        Ordenar por
      </span>
      <select
        value={current}
        onChange={(e) => handleChange(e.target.value)}
        className="border border-naty-line bg-white px-4 py-2.5 text-[12px] outline-none focus:border-naty-gold"
      >
        {sortOptions.map((o) => (
          <option key={o.value} value={o.value}>
            {o.label}
          </option>
        ))}
      </select>
    </div>
  );
}
