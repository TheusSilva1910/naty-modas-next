import type { MenuItem, TopBarItem } from "@/types";

/** Mensagens da barra superior promocional */
export const topBarItems: TopBarItem[] = [
  { icon: "✈", label: "Frete para todo o Brasil · acima de R$ 299" },
  { icon: "◆", label: "Em até 6x sem juros" },
  { icon: "♡", label: "Atendimento via WhatsApp" },
];

/** Menu principal de navegação */
export const mainMenu: MenuItem[] = [
  { label: "Novidades", href: "/novidades", highlight: "primary" },
  { label: "Vestidos", href: "/vestidos" },
  { label: "Conjuntos", href: "/conjuntos" },
  { label: "Blusas", href: "/blusas" },
  { label: "Calças", href: "/calcas" },
  { label: "Saias", href: "/saias" },
  { label: "Acessórios", href: "/acessorios" },
  { label: "Promoções", href: "/promocoes", highlight: "gold" },
];

/** Ações do usuário (canto direito do header) */
export const userActions = [
  { icon: "◯", label: "Minha conta", href: "/conta" },
  { icon: "♡", label: "Favoritos", href: "/favoritos" },
  { icon: "⛬", label: "Sacola", href: "/sacola", badge: 2 },
];

/** Telefone WhatsApp principal */
export const whatsapp = {
  display: "(11) 98364-4683",
  href: "https://wa.me/5511983644683",
};
