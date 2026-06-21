"use client";

import { useState } from "react";
import { useRouter, useSearchParams, usePathname } from "next/navigation";
import type { CategoryFilter, ProductColor } from "@/types";

interface FiltersSidebarProps {
  sizeOptions?: string[];
  colorOptions?: ProductColor[];
  categoryFilters?: CategoryFilter[];
  priceRange?: { min: number; max: number };
}

export function FiltersSidebar({
  sizeOptions = [],
  colorOptions = [],
  categoryFilters = [],
  priceRange,
}: FiltersSidebarProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [selectedSize, setSelectedSize] = useState(
    searchParams.get("size") ?? ""
  );
  const [selectedColor, setSelectedColor] = useState(
    searchParams.get("color") ?? ""
  );
  const [activeTags, setActiveTags] = useState<Set<string>>(
    new Set(searchParams.getAll("tag"))
  );

  function toggleTag(id: string) {
    setActiveTags((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  }

  function applyFilters() {
    const params = new URLSearchParams(searchParams.toString());

    if (selectedSize) params.set("size", selectedSize);
    else params.delete("size");

    if (selectedColor) params.set("color", selectedColor);
    else params.delete("color");

    params.delete("tag");
    activeTags.forEach((t) => params.append("tag", t));

    params.delete("page");
    router.push(`${pathname}?${params.toString()}`);
  }

  function clearFilters() {
    setSelectedSize("");
    setSelectedColor("");
    setActiveTags(new Set());
    const params = new URLSearchParams(searchParams.toString());
    params.delete("size");
    params.delete("color");
    params.delete("tag");
    params.delete("page");
    router.push(`${pathname}?${params.toString()}`);
  }

  const hasActive =
    selectedSize || selectedColor || activeTags.size > 0;

  return (
    <aside aria-label="Filtros">
      <div className="flex items-center justify-between mb-6">
        <div className="text-[11px] tracking-[0.24em] text-naty-gold uppercase">
          Filtros
        </div>
        {hasActive && (
          <button
            type="button"
            onClick={clearFilters}
            className="text-[11px] text-naty-muted underline underline-offset-4"
          >
            limpar
          </button>
        )}
      </div>

      {sizeOptions.length > 0 && (
        <Group title="Tamanho">
          <div className="grid grid-cols-4 gap-2">
            {sizeOptions.map((size) => (
              <button
                key={size}
                type="button"
                onClick={() =>
                  setSelectedSize(selectedSize === size ? "" : size)
                }
                className={`text-[11px] py-2.5 border transition-colors ${
                  selectedSize === size
                    ? "border-naty-rose-deep text-naty-rose-deep"
                    : "border-naty-line hover:border-naty-gold"
                }`}
              >
                {size}
              </button>
            ))}
          </div>
        </Group>
      )}

      {colorOptions.length > 0 && (
        <Group title="Cor">
          <div className="flex flex-wrap gap-2.5">
            {colorOptions.map((color) => {
              const active = selectedColor === color.name;
              return (
                <button
                  key={color.name}
                  type="button"
                  title={color.name}
                  onClick={() =>
                    setSelectedColor(selectedColor === color.name ? "" : color.name)
                  }
                  style={{ background: color.hex }}
                  className={`w-[26px] h-[26px] rounded-full transition-shadow ${
                    active
                      ? "outline outline-2 outline-white shadow-[0_0_0_1px_#C9A15A]"
                      : color.hex === "#ffffff" || color.hex === "#F8EFF1"
                      ? "border border-naty-line"
                      : ""
                  }`}
                />
              );
            })}
          </div>
        </Group>
      )}

      {priceRange && (
        <Group title="Faixa de preço">
          <div className="h-0.5 bg-naty-line relative">
            <div className="absolute left-[18%] right-[32%] inset-y-0 bg-naty-rose-deep" />
            <div className="absolute left-[18%] -top-1.5 w-3 h-3 bg-white border-2 border-naty-rose-deep rounded-full" />
            <div className="absolute right-[32%] -top-1.5 w-3 h-3 bg-white border-2 border-naty-rose-deep rounded-full" />
          </div>
          <div className="flex justify-between mt-3.5 text-[11px] text-naty-muted">
            <span>R$ {priceRange.min}</span>
            <span>R$ {priceRange.max}</span>
          </div>
        </Group>
      )}

      {categoryFilters.length > 0 && (
        <Group title="Categoria">
          <div className="flex flex-col gap-2.5 text-[13px]">
            {categoryFilters.map((filter) => {
              const checked = activeTags.has(filter.id);
              return (
                <label
                  key={filter.id}
                  className="flex items-center gap-2.5 cursor-pointer"
                >
                  <span
                    className={`w-3.5 h-3.5 border inline-block ${
                      checked
                        ? "border-naty-rose-deep bg-naty-rose-deep"
                        : "border-naty-line"
                    }`}
                  />
                  <input
                    type="checkbox"
                    checked={checked}
                    onChange={() => toggleTag(filter.id)}
                    className="sr-only"
                  />
                  <span>{filter.label}</span>
                  <span className="ml-auto text-naty-muted text-[11px]">
                    {filter.count}
                  </span>
                </label>
              );
            })}
          </div>
        </Group>
      )}

      <button
        type="button"
        onClick={applyFilters}
        className="w-full bg-naty-rose-deep text-white py-3.5 text-[11px] tracking-[0.28em] uppercase hover:bg-naty-rose transition-colors"
      >
        Aplicar filtros
      </button>
    </aside>
  );
}

function Group({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="mb-7">
      <div className="font-display text-[15px] mb-3.5 text-naty-text">{title}</div>
      {children}
    </div>
  );
}
