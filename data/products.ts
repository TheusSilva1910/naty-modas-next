import type { Product } from "@/types";

/** Mais vendidos (homepage) */
export const bestSellers: Product[] = [
  {
    id: "liana-midi",
    name: "Vestido Liana Midi",
    category: "Vestidos",
    price: 289.9,
    oldPrice: 349,
    installments: { count: 6, value: 48.32 },
    badge: { type: "new", label: "Novo" },
    imageVariant: "rose",
  },
  {
    id: "florenca",
    name: "Conjunto Florença",
    category: "Conjuntos",
    price: 419,
    installments: { count: 6, value: 69.83 },
    imageVariant: "cream",
  },
  {
    id: "amelie-seda",
    name: "Blusa Amélie Seda",
    category: "Blusas",
    price: 198.9,
    installments: { count: 4, value: 49.72 },
    badge: { type: "sale", label: "−15%" },
    imageVariant: "rose",
  },
  {
    id: "camille-plissada",
    name: "Saia Camille Plissada",
    category: "Saias",
    price: 259,
    installments: { count: 5, value: 51.8 },
    imageVariant: "dark",
  },
];

/** Novidades */
export const newArrivals: Product[] = [
  {
    id: "sofia",
    name: "Vestido Sofia",
    category: "Vestidos",
    price: 319,
    installments: { count: 6, value: 53.17 },
    badge: { type: "new", label: "Novo" },
    imageVariant: "cream",
  },
  {
    id: "renata",
    name: "Vestido Renata",
    category: "Vestidos",
    price: 268,
    installments: { count: 5, value: 53.6 },
    imageVariant: "rose",
  },
  {
    id: "helena",
    name: "Vestido Helena",
    category: "Vestidos",
    price: 410,
    installments: { count: 6, value: 68.33 },
    badge: { type: "new", label: "Novo" },
    imageVariant: "dark",
  },
  {
    id: "olivia",
    name: "Vestido Olívia",
    category: "Vestidos",
    price: 349.9,
    installments: { count: 6, value: 58.32 },
    imageVariant: "cream",
  },
];

/** Helpers de formatação BR */
export function formatBRL(value: number): string {
  return value.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });
}
