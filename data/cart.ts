import type { CartItem } from "@/types";

/**
 * Carrinho simulado — em produção isto viria de um store
 * (Zustand / Redux) ou de uma cookie/sessão server-side.
 */
export const sampleCart: CartItem[] = [
  {
    productId: "liana-midi",
    name: "Vestido Liana Midi",
    category: "Vestidos",
    color: "Rosê Nude",
    size: "P",
    price: 289.9,
    installments: { count: 6, value: 48.32 },
    qty: 1,
    imageVariant: "rose",
  },
  {
    productId: "florenca",
    name: "Conjunto Florença",
    category: "Conjuntos",
    color: "Off White",
    size: "M",
    price: 419,
    installments: { count: 6, value: 69.83 },
    qty: 1,
    imageVariant: "cream",
  },
];

export const freeShippingThreshold = 299;

export const checkoutSteps = [
  { id: 1, label: "Sacola" },
  { id: 2, label: "Entrega" },
  { id: 3, label: "Pagamento" },
  { id: 4, label: "Confirmação" },
];
