import type { ProductFull, SizeRow } from "@/types";

/**
 * Catálogo completo (com descrição, cores, tamanhos, etc.)
 * Em produção: vir de CMS ou API.
 */
export const productCatalog: Record<string, ProductFull> = {
  "liana-midi": {
    id: "liana-midi",
    name: "Vestido Liana Midi",
    category: "Vestidos",
    price: 289.9,
    oldPrice: 349,
    installments: { count: 6, value: 48.32 },
    badge: { type: "new", label: "Novo" },
    imageVariant: "rose",
    rating: 5,
    reviewCount: 87,
    description:
      "Vestido midi em viscose de toque acetinado, com decote V suave, mangas curtas franzidas e cintura marcada por amarração delicada nas costas. A modelagem em A valoriza a silhueta e proporciona movimento elegante, perfeito para almoços, aniversários e eventos vespertinos.",
    composition: "92% viscose · 8% elastano",
    lining: "Sim — 100% poliéster",
    washing: "À mão · água fria",
    fit: "Slim · cintura marcada",
    modelInfo: "P · 1,72m",
    gallery: [
      { variant: "rose" },
      { variant: "cream" },
      { variant: "rose" },
      { variant: "dark" },
      { variant: "rose" },
    ],
    availableColors: [
      { name: "Rosê Nude",  hex: "#D98A99" },
      { name: "Rosê Forte", hex: "#C76D80" },
      { name: "Preto",      hex: "#3a2e30" },
      { name: "Off White",  hex: "#F8EFF1" },
      { name: "Caqui",      hex: "#7a6a55" },
    ],
    availableSizes: [
      { label: "PP", available: true },
      { label: "P",  available: true },
      { label: "M",  available: true },
      { label: "G",  available: true },
      { label: "GG", available: false },
    ],
    relatedIds: ["sofia", "renata", "helena", "olivia"],
  },

  "florenca": {
    id: "florenca",
    name: "Conjunto Florença",
    category: "Conjuntos",
    price: 419,
    installments: { count: 6, value: 69.83 },
    imageVariant: "cream",
    rating: 5,
    reviewCount: 42,
    description:
      "Conjunto de cropped e calça pantacourt em linho misto. Caimento fluido com fitting impecável, ideal para casamentos diurnos e eventos vespertinos.",
    composition: "55% linho · 45% viscose",
    lining: "Apenas no cropped",
    washing: "Lavagem a seco",
    fit: "Regular",
    modelInfo: "M · 1,70m",
    gallery: [{ variant: "cream" }, { variant: "rose" }, { variant: "cream" }],
    availableColors: [
      { name: "Off White", hex: "#F8EFF1" },
      { name: "Caqui",     hex: "#7a6a55" },
      { name: "Rosê",      hex: "#D98A99" },
    ],
    availableSizes: [
      { label: "PP", available: true },
      { label: "P",  available: true },
      { label: "M",  available: true },
      { label: "G",  available: true },
      { label: "GG", available: true },
    ],
    relatedIds: ["liana-midi", "amelie-seda", "camille-plissada"],
  },

  "amelie-seda": {
    id: "amelie-seda",
    name: "Blusa Amélie Seda",
    category: "Blusas",
    price: 198.9,
    installments: { count: 4, value: 49.72 },
    badge: { type: "sale", label: "−15%" },
    imageVariant: "rose",
    rating: 5,
    reviewCount: 64,
    description:
      "Blusa em seda lavada com gola laço delicada. Versátil para o trabalho com saia midi ou para a noite com calça alfaiataria.",
    composition: "100% seda",
    lining: "Não possui",
    washing: "À mão · água fria",
    fit: "Solto",
    modelInfo: "P · 1,68m",
    gallery: [{ variant: "rose" }, { variant: "cream" }, { variant: "dark" }],
    availableColors: [
      { name: "Rosê",      hex: "#D98A99" },
      { name: "Preto",     hex: "#3a2e30" },
      { name: "Off White", hex: "#F8EFF1" },
    ],
    availableSizes: [
      { label: "PP", available: true },
      { label: "P",  available: true },
      { label: "M",  available: true },
      { label: "G",  available: true },
    ],
    relatedIds: ["sofia", "camille-plissada", "florenca"],
  },

  "camille-plissada": {
    id: "camille-plissada",
    name: "Saia Camille Plissada",
    category: "Saias",
    price: 259,
    installments: { count: 5, value: 51.8 },
    imageVariant: "dark",
    rating: 5,
    reviewCount: 31,
    description:
      "Saia midi plissada em chiffon com forro interno. Cintura alta com elástico embutido para conforto.",
    composition: "100% poliéster",
    lining: "Sim — viscose",
    washing: "À mão · água fria",
    fit: "Cintura alta",
    modelInfo: "M · 1,72m",
    gallery: [{ variant: "dark" }, { variant: "rose" }, { variant: "cream" }],
    availableColors: [
      { name: "Preto",     hex: "#3a2e30" },
      { name: "Off White", hex: "#F8EFF1" },
      { name: "Caqui",     hex: "#7a6a55" },
    ],
    availableSizes: [
      { label: "PP", available: true },
      { label: "P",  available: true },
      { label: "M",  available: true },
      { label: "G",  available: true },
      { label: "GG", available: true },
    ],
    relatedIds: ["amelie-seda", "florenca", "liana-midi"],
  },
};

/** Tabela de medidas padrão da marca */
export const sizeChart: SizeRow[] = [
  { size: "PP", bust: "82–86",  waist: "62–66", hip: "88–92",   length: "112" },
  { size: "P",  bust: "86–90",  waist: "66–70", hip: "92–96",   length: "113" },
  { size: "M",  bust: "90–94",  waist: "70–74", hip: "96–100",  length: "114" },
  { size: "G",  bust: "94–98",  waist: "74–78", hip: "100–104", length: "115" },
  { size: "GG", bust: "98–102", waist: "78–82", hip: "104–108", length: "116" },
];

/** Recupera produto completo a partir do id. Lança erro se não existir. */
export function getFullProduct(id: string): ProductFull {
  const p = productCatalog[id];
  if (!p) throw new Error(`Produto não encontrado: ${id}`);
  return p;
}

/** Lista todos os produtos como cards (para grids de categoria) */
export const allProducts = Object.values(productCatalog);
