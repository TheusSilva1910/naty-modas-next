/* Tipos centrais do e-commerce Naty Modas */

export type BadgeType = "new" | "sale" | "soldout";

export interface Product {
  id: string;
  slug?: string;
  name: string;
  category: string;
  categorySlug?: string;
  price: number;
  salePrice?: number;
  oldPrice?: number;
  installments?: {
    count: number;
    value: number;
  };
  badge?: {
    type: BadgeType;
    label: string;
  };
  /** Variante visual do placeholder. Em produção, trocar por url da imagem. */
  imageVariant?: "rose" | "cream" | "dark";
  imageUrl?: string;
  images?: ProductGalleryImage[];
  colors?: string[];
  sizes?: string[];
}

export interface Category {
  id: string;
  name: string;
  count: number;
  href: string;
  imageVariant?: "rose" | "cream" | "dark";
  imageUrl?: string;
}

export interface HeroSlide {
  eyebrow: string;
  title: string;
  titleEmphasis?: string;
  description: string;
  cta: { label: string; href: string };
  secondaryCta?: { label: string; href: string };
  imageVariant?: "rose" | "cream" | "dark";
  imageUrl?: string;
}

export interface MenuItem {
  label: string;
  href: string;
  highlight?: "primary" | "gold";
}

export interface TopBarItem {
  icon: string;
  label: string;
}

export interface Look {
  id: string;
  title: string;
  pieces: number;
  total: number;
  imageVariant?: "rose" | "cream" | "dark";
  imageUrl?: string;
}

export interface Review {
  id: string;
  rating: number;
  quote: string;
  author: string;
  location: string;
}

export interface FooterSection {
  title: string;
  links: { label: string; href: string }[];
}

/* ──────── Detalhe de produto ──────── */

export interface ProductColor {
  name: string;
  hex: string;
}

export interface ProductSize {
  label: string;
  available: boolean;
}

export interface ProductGalleryImage {
  variant?: "rose" | "cream" | "dark";
  imageUrl?: string;
}

export interface ProductReviewItem {
  id: string;
  author: string;
  rating: number;
  comment: string;
  date: string;
}

export interface ProductFull extends Product {
  description: string;
  composition?: string;
  lining?: string;
  washing?: string;
  fit?: string;
  modelInfo?: string;
  rating: number;
  reviewCount: number;
  gallery: ProductGalleryImage[];
  availableColors: ProductColor[];
  availableSizes: ProductSize[];
  related?: Product[];
  relatedIds?: string[];
  reviewList?: ProductReviewItem[];
}

export interface SizeRow {
  size: string;
  bust: string;
  waist: string;
  hip: string;
  length: string;
}

/* ──────── Filtros / Listagem ──────── */

export interface FilterTag {
  type: "size" | "color" | "tag";
  label: string;
}

export interface CategoryFilter {
  id: string;
  label: string;
  count: number;
}

/* ──────── Carrinho ──────── */

export interface CartItem {
  productId: string;
  name: string;
  category: string;
  color: string;
  size: string;
  price: number;
  installments: { count: number; value: number };
  qty: number;
  imageVariant?: "rose" | "cream" | "dark";
  imageUrl?: string;
}

/* ──────── Sobre ──────── */

export interface BrandValue {
  icon: string;
  title: string;
  description: string;
}
