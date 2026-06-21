import type { FooterSection } from "@/types";

export const footerSections: FooterSection[] = [
  {
    title: "A Marca",
    links: [
      { label: "Sobre nós",       href: "/sobre" },
      { label: "Lookbook",        href: "/lookbook" },
      { label: "Looks completos", href: "/looks" },
      { label: "Blog",            href: "/blog" },
    ],
  },
  {
    title: "Ajuda",
    links: [
      { label: "Trocas e devoluções", href: "/trocas" },
      { label: "Formas de pagamento", href: "/pagamento" },
      { label: "Prazo de entrega",    href: "/entrega" },
      { label: "FAQ",                 href: "/faq" },
    ],
  },
  {
    title: "Contato",
    links: [
      { label: "WhatsApp · (11) 98364-4683", href: "https://wa.me/5511983644683" },
      { label: "contato@natymodas.com",       href: "mailto:contato@natymodas.com" },
      { label: "Seg–Sex · 9h às 18h",         href: "#" },
    ],
  },
];

export const paymentMethods = ["VISA", "MC", "ELO", "AMEX", "PIX", "BOL"] as const;

export const socials = [
  { label: "Instagram", icon: "⌾", href: "https://instagram.com/bynatymodas_" },
  { label: "WhatsApp",  icon: "⏵", href: "https://wa.me/5511983644683" },
  { label: "TikTok",    icon: "⌬", href: "#" },
];
