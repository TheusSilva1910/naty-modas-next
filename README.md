# Naty Modas — Next.js + TypeScript + Tailwind

E-commerce premium feminino criado a partir do design board original.
Arquitetura simples, componentes pequenos, dados separados em `data/`,
identidade visual da marca aplicada via Tailwind config.

## Como rodar

```bash
npm install
npm run dev
```

Acesse `http://localhost:3000`.

## Estrutura

```
naty-modas-next/
├── app/
│   ├── layout.tsx        # Fontes Playfair + Montserrat (next/font)
│   ├── page.tsx          # Home — monta todas as seções
│   └── globals.css       # Tailwind + utilitários da marca (.eyebrow, .btn-primary…)
│
├── components/           # Componentes UI reutilizáveis
│   ├── Header.tsx           ─ Header completo (desktop + mobile drawer)
│   ├── TopBar.tsx           ─ Barra superior promocional
│   ├── Logo.tsx             ─ Logotipo "NATY MODAS" em 3 tamanhos
│   ├── HeroBanner.tsx       ─ Hero split 50/50
│   ├── CategorySection.tsx  ─ Grid de categorias (carrossel no mobile)
│   ├── ProductCard.tsx      ─ Card de produto com badge + favoritos
│   ├── ProductSection.tsx   ─ Wrapper "Mais Vendidos" / "Novidades"
│   ├── InstitutionalBanner.tsx
│   ├── LooksSection.tsx     ─ Looks completos
│   ├── ReviewsSection.tsx   ─ Depoimentos com estrelas
│   ├── InstagramFeed.tsx
│   ├── Newsletter.tsx       ─ Captura "Clube Naty" (client component)
│   ├── Footer.tsx
│   └── Placeholder.tsx      ─ Imagem temporária rosê/creme/escura
│
├── data/                 # Conteúdo separado do JSX
│   ├── menu.ts           ─ Menu principal + barra superior + WhatsApp
│   ├── categories.ts
│   ├── products.ts       ─ Best sellers, novidades + formatBRL
│   ├── hero.ts
│   ├── looks.ts
│   ├── reviews.ts
│   ├── instagram.ts
│   └── footer.ts         ─ Seções, pagamentos, redes sociais
│
├── types/
│   └── index.ts          ─ Product, Category, HeroSlide, MenuItem, Look, Review…
│
├── tailwind.config.ts    ─ Cores da marca, fontes, padrões de placeholder
├── postcss.config.mjs
├── next.config.ts
├── tsconfig.json
└── package.json
```

## Sistema visual

### Cores (Tailwind tokens)

| Token             | Hex     | Uso                                |
| ----------------- | ------- | ---------------------------------- |
| `naty-rose`       | #D98A99 | Cor principal — logo, hovers       |
| `naty-rose-deep`  | #C76D80 | Botões, preços, ações primárias    |
| `naty-gold`       | #C9A15A | Detalhes, divisórias, eyebrows     |
| `naty-blush`      | #F8EFF1 | Fundo de seções hero/institucional |
| `naty-blushSoft`  | #FBF6F7 | Fundos de produtos                 |
| `naty-text`       | #5A5A5A | Texto principal                    |
| `naty-dark`       | #3A2E30 | Footer                             |
| `naty-whats`      | #25D366 | Botão WhatsApp                     |

### Tipografia

- **Títulos** → `font-display` (Playfair Display)
- **Textos**  → `font-sans` (Montserrat)

Carregadas via `next/font/google` em `app/layout.tsx`, expostas como
`var(--font-playfair)` e `var(--font-montserrat)`.

### Utilitários customizados

Definidos em `app/globals.css`:

- `.eyebrow` — dourado, tracking widest, uppercase
- `.btn-primary` — botão sólido rosê escuro
- `.btn-outline` — botão outline com borda dourada
- `.btn-whats` — botão WhatsApp verde
- `.naty-hairline` — linha decorativa dourada com gradient fade
- `.naty-divider` — divisor com tracinhos laterais

### Placeholders de imagem

O componente `<Placeholder />` mantém o padrão de tracinhos rosê/dourado
do design board original em 3 variantes (`rose`, `cream`, `dark`).
Em produção, substituir por `<Image />` do `next/image`.

## Responsividade

Cada componente foi projetado para 3 breakpoints:

- **Mobile** (≤ 767px) — drawer menu, carrosséis horizontais, sticky CTAs
- **Tablet** (768–1023px) — grids reduzidos (3 cols)
- **Desktop** (1024px+) — grid completo (6 cols categorias / 4 cols produtos)

A largura máxima do layout é 1440px (`max-w-[1440px]`).

## Adicionando produtos reais

```ts
// data/products.ts
{
  id: "slug-do-produto",
  name: "Nome da Peça",
  category: "Vestidos",
  price: 289.90,
  oldPrice: 349,
  installments: { count: 6, value: 48.32 },
  badge: { type: "new", label: "Novo" }, // "new" | "sale" | "soldout"
  imageUrl: "/produtos/slug.jpg",
}
```

Depois substituir o `<Placeholder />` dentro do `ProductCard.tsx`
por `<Image src={product.imageUrl} … />`.

## Próximos passos sugeridos

- [ ] Página de categoria (`app/[categoria]/page.tsx`) com filtros laterais
- [ ] Página de produto (`app/produto/[id]/page.tsx`) com galeria + tabela de medidas
- [ ] Página de carrinho com cálculo de frete + cupom
- [ ] Login / Cadastro
- [ ] Página Sobre com foto da proprietária + história
- [ ] Integração com CMS (Shopify / Nuvemshop / WooCommerce)
- [ ] Integração com gateway de pagamento (Pagar.me / Mercado Pago)
- [ ] Wishlist persistente (localStorage ou conta)
