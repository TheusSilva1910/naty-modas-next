"use client";

import { sortOptions } from "@/data/filters";

interface SortDropdownProps {
  value?: string;
  onChange?: (v: string) => void;
}

export function SortDropdown({ value, onChange }: SortDropdownProps) {
  return (
    <div className="flex gap-6 items-center">
      <span className="text-[11px] tracking-[0.2em] text-naty-text uppercase">
        Ordenar por
      </span>
      <select
        value={value}
        onChange={(e) => onChange?.(e.target.value)}
        className="border border-naty-line bg-white px-4 py-2.5 text-[12px] outline-none focus:border-naty-gold"
      >
        {sortOptions.map((o) => (
          <option key={o}>{o}</option>
        ))}
      </select>
    </div>
  );
}
