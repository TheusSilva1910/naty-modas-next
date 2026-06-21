import type { CategoryFilter, ProductColor } from "@/types";

export const sizeOptions = ["PP", "P", "M", "G", "GG", "38", "40", "42"] as const;

export const colorOptions: ProductColor[] = [
  { name: "Rosê Nude",   hex: "#D98A99" },
  { name: "Rosê Forte",  hex: "#C76D80" },
  { name: "Off White",   hex: "#F8EFF1" },
  { name: "Dourado",     hex: "#C9A15A" },
  { name: "Preto",       hex: "#3a2e30" },
  { name: "Caqui",       hex: "#7a6a55" },
  { name: "Azul Sereno", hex: "#9aabb5" },
  { name: "Branco",      hex: "#ffffff" },
];

export const categoryFilters: CategoryFilter[] = [
  { id: "novidades",  label: "Novidades",  count: 28 },
  { id: "promocoes",  label: "Promoções",  count: 14 },
  { id: "festa",      label: "Festa",      count: 36 },
  { id: "casual",     label: "Casual",     count: 64 },
  { id: "trabalho",   label: "Trabalho",   count: 42 },
];

export const sortOptions = [
  "Mais relevantes",
  "Menor preço",
  "Maior preço",
  "Novidades",
];

export const priceRange = { min: 120, max: 480 };
