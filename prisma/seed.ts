import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const categories = [
  {
    name: "Vestidos",
    image:
      "https://images.unsplash.com/photo-1496747611176-843222e1e57c?auto=format&fit=crop&w=900&q=80",
  },
  {
    name: "Conjuntos",
    image:
      "https://images.unsplash.com/photo-1485968579580-b6d095142e6e?auto=format&fit=crop&w=900&q=80",
  },
  {
    name: "Blusas",
    image:
      "https://images.unsplash.com/photo-1434389677669-e08b4cac3105?auto=format&fit=crop&w=900&q=80",
  },
  {
    name: "Calças",
    image:
      "https://images.unsplash.com/photo-1506629905607-d405d7d3b0d2?auto=format&fit=crop&w=900&q=80",
  },
  {
    name: "Saias",
    image:
      "https://images.unsplash.com/photo-1529139574466-a303027c1d8b?auto=format&fit=crop&w=900&q=80",
  },
  {
    name: "Shorts",
    image:
      "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=900&q=80",
  },
  {
    name: "Acessórios",
    image:
      "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?auto=format&fit=crop&w=900&q=80",
  },
  {
    name: "Promoções",
    image:
      "https://images.unsplash.com/photo-1445205170230-053b83016050?auto=format&fit=crop&w=900&q=80",
  },
];

type SeedProduct = {
  name: string;
  category: string;
  description: string;
  price: number;
  salePrice?: number;
  featured?: boolean;
  isNew?: boolean;
  bestSeller?: boolean;
  images: string[];
  variants: {
    color: string;
    size: string;
    stock: number;
  }[];
};

const products: SeedProduct[] = [
  {
    name: "Vestido Liana Midi",
    category: "Vestidos",
    description:
      "Vestido midi em tecido fluido com cintura marcada, decote delicado e caimento elegante para eventos diurnos e encontros especiais.",
    price: 289.9,
    salePrice: 249.9,
    featured: true,
    bestSeller: true,
    images: [
      "https://images.unsplash.com/photo-1496747611176-843222e1e57c?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1502716119720-b23a93e5fe1b?auto=format&fit=crop&w=900&q=80",
    ],
    variants: [
      { color: "Rosê Nude", size: "P", stock: 12 },
      { color: "Rosê Nude", size: "M", stock: 8 },
      { color: "Preto", size: "G", stock: 5 },
    ],
  },
  {
    name: "Vestido Sofia Acetinado",
    category: "Vestidos",
    description:
      "Vestido acetinado com alças finas reguláveis e modelagem suave, ideal para jantares, festas e composições sofisticadas.",
    price: 329.9,
    featured: true,
    isNew: true,
    images: [
      "https://images.unsplash.com/photo-1485968579580-b6d095142e6e?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?auto=format&fit=crop&w=900&q=80",
    ],
    variants: [
      { color: "Off White", size: "P", stock: 6 },
      { color: "Off White", size: "M", stock: 7 },
      { color: "Dourado", size: "G", stock: 3 },
    ],
  },
  {
    name: "Conjunto Florença Linho",
    category: "Conjuntos",
    description:
      "Conjunto em linho misto com top estruturado e calça pantacourt, pensado para looks frescos com presença premium.",
    price: 419.9,
    featured: true,
    bestSeller: true,
    images: [
      "https://images.unsplash.com/photo-1539109136881-3be0616acf4b?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1529139574466-a303027c1d8b?auto=format&fit=crop&w=900&q=80",
    ],
    variants: [
      { color: "Caqui", size: "P", stock: 5 },
      { color: "Caqui", size: "M", stock: 8 },
      { color: "Off White", size: "G", stock: 4 },
    ],
  },
  {
    name: "Conjunto Marina Alfaiataria",
    category: "Conjuntos",
    description:
      "Conjunto de alfaiataria com colete alongado e calça reta, perfeito para trabalho, eventos e produções urbanas.",
    price: 459.9,
    salePrice: 399.9,
    images: [
      "https://images.unsplash.com/photo-1506629905607-d405d7d3b0d2?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1520975954732-35dd22299614?auto=format&fit=crop&w=900&q=80",
    ],
    variants: [
      { color: "Preto", size: "P", stock: 7 },
      { color: "Preto", size: "M", stock: 6 },
      { color: "Rosê Forte", size: "G", stock: 2 },
    ],
  },
  {
    name: "Blusa Amélie Seda",
    category: "Blusas",
    description:
      "Blusa em toque de seda com gola laço e acabamento refinado, uma peça versátil para trabalho e ocasiões especiais.",
    price: 198.9,
    featured: true,
    isNew: true,
    images: [
      "https://images.unsplash.com/photo-1434389677669-e08b4cac3105?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1495385794356-15371f348c31?auto=format&fit=crop&w=900&q=80",
    ],
    variants: [
      { color: "Rosê Nude", size: "P", stock: 10 },
      { color: "Off White", size: "M", stock: 9 },
      { color: "Preto", size: "G", stock: 6 },
    ],
  },
  {
    name: "Blusa Clara Canelada",
    category: "Blusas",
    description:
      "Blusa canelada de manga curta com shape ajustado e toque macio, feita para compor looks elegantes no dia a dia.",
    price: 149.9,
    bestSeller: true,
    images: [
      "https://images.unsplash.com/photo-1551488831-00ddcb6c6bd3?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=900&q=80",
    ],
    variants: [
      { color: "Branco", size: "P", stock: 13 },
      { color: "Branco", size: "M", stock: 11 },
      { color: "Preto", size: "G", stock: 8 },
    ],
  },
  {
    name: "Calça Helena Wide Leg",
    category: "Calças",
    description:
      "Calça wide leg de cintura alta com tecido encorpado e caimento alongado, ideal para combinações sofisticadas.",
    price: 269.9,
    isNew: true,
    images: [
      "https://images.unsplash.com/photo-1506629905607-d405d7d3b0d2?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?auto=format&fit=crop&w=900&q=80",
    ],
    variants: [
      { color: "Caqui", size: "38", stock: 6 },
      { color: "Caqui", size: "40", stock: 7 },
      { color: "Preto", size: "42", stock: 4 },
    ],
  },
  {
    name: "Calça Aurora Alfaiataria",
    category: "Calças",
    description:
      "Calça de alfaiataria com pregas frontais, cintura média e acabamento limpo para produções elegantes.",
    price: 299.9,
    featured: true,
    images: [
      "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1582418702059-97ebafb35d09?auto=format&fit=crop&w=900&q=80",
    ],
    variants: [
      { color: "Preto", size: "38", stock: 9 },
      { color: "Preto", size: "40", stock: 6 },
      { color: "Off White", size: "42", stock: 3 },
    ],
  },
  {
    name: "Saia Camille Plissada",
    category: "Saias",
    description:
      "Saia midi plissada com movimento leve, cintura confortável e proposta romântica para diferentes ocasiões.",
    price: 259.9,
    bestSeller: true,
    images: [
      "https://images.unsplash.com/photo-1529139574466-a303027c1d8b?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=900&q=80",
    ],
    variants: [
      { color: "Rosê Nude", size: "P", stock: 5 },
      { color: "Rosê Nude", size: "M", stock: 5 },
      { color: "Preto", size: "G", stock: 4 },
    ],
  },
  {
    name: "Saia Valentina Couro Eco",
    category: "Saias",
    description:
      "Saia curta em couro ecológico com recortes discretos, pensada para looks noturnos e composições modernas.",
    price: 219.9,
    salePrice: 189.9,
    images: [
      "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1520975682031-a12f65d4f7ec?auto=format&fit=crop&w=900&q=80",
    ],
    variants: [
      { color: "Preto", size: "P", stock: 7 },
      { color: "Preto", size: "M", stock: 6 },
      { color: "Caqui", size: "G", stock: 2 },
    ],
  },
  {
    name: "Shorts Lara Alfaiataria",
    category: "Shorts",
    description:
      "Shorts de alfaiataria com cintura alta e pregas frontais, perfeito para dias quentes com acabamento arrumado.",
    price: 189.9,
    isNew: true,
    images: [
      "https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=900&q=80",
    ],
    variants: [
      { color: "Off White", size: "36", stock: 8 },
      { color: "Off White", size: "38", stock: 8 },
      { color: "Caqui", size: "40", stock: 4 },
    ],
  },
  {
    name: "Shorts Nina Jeans",
    category: "Shorts",
    description:
      "Shorts jeans com lavagem clara, barra dobrada e modelagem confortável para composições casuais.",
    price: 169.9,
    bestSeller: true,
    images: [
      "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1520975867597-0af37a22e31e?auto=format&fit=crop&w=900&q=80",
    ],
    variants: [
      { color: "Azul Sereno", size: "36", stock: 12 },
      { color: "Azul Sereno", size: "38", stock: 10 },
      { color: "Azul Sereno", size: "40", stock: 5 },
    ],
  },
  {
    name: "Bolsa Elisa Matelassê",
    category: "Acessórios",
    description:
      "Bolsa pequena matelassê com alça de corrente e fechamento estruturado, ideal para completar looks elegantes.",
    price: 239.9,
    featured: true,
    images: [
      "https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1590874103328-eac38a683ce7?auto=format&fit=crop&w=900&q=80",
    ],
    variants: [
      { color: "Preto", size: "Único", stock: 14 },
      { color: "Dourado", size: "Único", stock: 6 },
    ],
  },
  {
    name: "Brinco Pérola Naty",
    category: "Acessórios",
    description:
      "Brinco de pérola sintética com banho dourado, leve e delicado para uso diário ou eventos especiais.",
    price: 89.9,
    bestSeller: true,
    images: [
      "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1506630448388-4e683c67ddb0?auto=format&fit=crop&w=900&q=80",
    ],
    variants: [
      { color: "Dourado", size: "Único", stock: 20 },
      { color: "Off White", size: "Único", stock: 12 },
    ],
  },
  {
    name: "Vestido Renata Promo",
    category: "Promoções",
    description:
      "Vestido curto com manga bufante e cintura ajustada, selecionado para a vitrine promocional da temporada.",
    price: 279.9,
    salePrice: 199.9,
    featured: true,
    images: [
      "https://images.unsplash.com/photo-1502716119720-b23a93e5fe1b?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?auto=format&fit=crop&w=900&q=80",
    ],
    variants: [
      { color: "Rosê Forte", size: "P", stock: 4 },
      { color: "Rosê Forte", size: "M", stock: 3 },
      { color: "Preto", size: "G", stock: 2 },
    ],
  },
  {
    name: "Blazer Olivia Promo",
    category: "Promoções",
    description:
      "Blazer alongado com lapela clássica e tecido estruturado, peça-chave em condição especial de lançamento.",
    price: 389.9,
    salePrice: 299.9,
    bestSeller: true,
    images: [
      "https://images.unsplash.com/photo-1520975954732-35dd22299614?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?auto=format&fit=crop&w=900&q=80",
    ],
    variants: [
      { color: "Preto", size: "P", stock: 5 },
      { color: "Preto", size: "M", stock: 4 },
      { color: "Off White", size: "G", stock: 2 },
    ],
  },
];

const banners = [
  {
    position: "HOME_HERO",
    title: "Nova Coleção",
    subtitle:
      "Peças femininas com caimento elegante, toque premium e detalhes pensados para todos os momentos.",
    image:
      "https://images.unsplash.com/photo-1496747611176-843222e1e57c?auto=format&fit=crop&w=1200&q=85",
    buttonText: "Comprar agora",
    buttonLink: "/vestidos",
  },
  {
    position: "HOME_SECONDARY",
    title: "Essenciais da Semana",
    subtitle:
      "Looks versáteis para trabalho, eventos e dias especiais com a assinatura Naty Modas.",
    image:
      "https://images.unsplash.com/photo-1445205170230-053b83016050?auto=format&fit=crop&w=1200&q=85",
    buttonText: "Ver novidades",
    buttonLink: "/conjuntos",
  },
];

const reviewers = [
  {
    name: "Mariana Souza",
    email: "mariana.seed@naty-modas.test",
    rating: 5,
    productSlug: "vestido-liana-midi",
    comment:
      "O vestido tem um caimento impecável e chegou muito bem embalado. A peça parece de boutique.",
  },
  {
    name: "Beatriz Lima",
    email: "beatriz.seed@naty-modas.test",
    rating: 5,
    productSlug: "conjunto-florenca-linho",
    comment:
      "Comprei para um almoço especial e recebi muitos elogios. O tecido é leve e elegante.",
  },
  {
    name: "Camila Rocha",
    email: "camila.seed@naty-modas.test",
    rating: 4,
    productSlug: "blusa-amelie-seda",
    comment:
      "A blusa é linda e combina com várias peças. Gostei muito do acabamento.",
  },
  {
    name: "Fernanda Alves",
    email: "fernanda.seed@naty-modas.test",
    rating: 5,
    productSlug: "bolsa-elisa-matelasse",
    comment:
      "A bolsa é delicada e sofisticada. O tamanho é perfeito para sair à noite.",
  },
  {
    name: "Juliana Martins",
    email: "juliana.seed@naty-modas.test",
    rating: 5,
    productSlug: "calca-helena-wide-leg",
    comment:
      "A calça veste muito bem e alonga a silhueta. Já quero em outra cor.",
  },
];

function generateSlug(value: string) {
  return value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function generateSku(productSlug: string, color: string, size: string) {
  const colorCode = generateSlug(color).replace(/-/g, "").slice(0, 4);
  const sizeCode = generateSlug(size).replace(/-/g, "").toUpperCase();

  return `NATY-${productSlug.slice(0, 10).toUpperCase()}-${colorCode.toUpperCase()}-${sizeCode}`;
}

async function upsertProductImage({
  productId,
  url,
  alt,
  position,
}: {
  productId: string;
  url: string;
  alt: string;
  position: number;
}) {
  const existing = await prisma.productImage.findFirst({
    where: {
      productId,
      position,
    },
  });

  if (existing) {
    await prisma.productImage.update({
      where: { id: existing.id },
      data: { url, alt, position },
    });
    return;
  }

  await prisma.productImage.create({
    data: { productId, url, alt, position },
  });
}

async function upsertProductVariant({
  productId,
  color,
  size,
  sku,
  stock,
}: {
  productId: string;
  color: string;
  size: string;
  sku: string;
  stock: number;
}) {
  const existing = await prisma.productVariant.findFirst({
    where: {
      productId,
      color,
      size,
    },
  });

  if (existing) {
    await prisma.productVariant.update({
      where: { id: existing.id },
      data: { sku, stock },
    });
    return;
  }

  await prisma.productVariant.create({
    data: {
      productId,
      color,
      size,
      sku,
      stock,
    },
  });
}

async function upsertBanner(seed: (typeof banners)[number]) {
  const existing = await prisma.banner.findFirst({
    where: {
      position: seed.position,
    },
  });

  const data = {
    title: seed.title,
    subtitle: seed.subtitle,
    image: seed.image,
    buttonText: seed.buttonText,
    buttonLink: seed.buttonLink,
    position: seed.position,
    active: true,
  };

  if (existing) {
    await prisma.banner.update({
      where: { id: existing.id },
      data,
    });
    return;
  }

  await prisma.banner.create({ data });
}

async function upsertReview({
  userId,
  productId,
  rating,
  comment,
}: {
  userId: string;
  productId: string;
  rating: number;
  comment: string;
}) {
  const existing = await prisma.review.findFirst({
    where: {
      userId,
      productId,
    },
  });

  if (existing) {
    await prisma.review.update({
      where: { id: existing.id },
      data: { rating, comment },
    });
    return;
  }

  await prisma.review.create({
    data: {
      userId,
      productId,
      rating,
      comment,
    },
  });
}

async function main() {
  const categoryByName = new Map<string, { id: string; slug: string }>();
  const productBySlug = new Map<string, { id: string }>();

  for (const category of categories) {
    const slug = generateSlug(category.name);
    const record = await prisma.category.upsert({
      where: { slug },
      update: {
        name: category.name,
        image: category.image,
      },
      create: {
        name: category.name,
        slug,
        image: category.image,
      },
      select: {
        id: true,
        slug: true,
      },
    });

    categoryByName.set(category.name, record);
  }

  for (const seedProduct of products) {
    const category = categoryByName.get(seedProduct.category);

    if (!category) {
      throw new Error(`Categoria não encontrada: ${seedProduct.category}`);
    }

    const slug = generateSlug(seedProduct.name);
    const product = await prisma.product.upsert({
      where: { slug },
      update: {
        name: seedProduct.name,
        description: seedProduct.description,
        price: seedProduct.price,
        salePrice: seedProduct.salePrice ?? null,
        active: true,
        featured: seedProduct.featured ?? false,
        isNew: seedProduct.isNew ?? false,
        bestSeller: seedProduct.bestSeller ?? false,
        categoryId: category.id,
      },
      create: {
        name: seedProduct.name,
        slug,
        description: seedProduct.description,
        price: seedProduct.price,
        salePrice: seedProduct.salePrice ?? null,
        active: true,
        featured: seedProduct.featured ?? false,
        isNew: seedProduct.isNew ?? false,
        bestSeller: seedProduct.bestSeller ?? false,
        categoryId: category.id,
      },
      select: {
        id: true,
      },
    });

    productBySlug.set(slug, product);

    for (const [index, url] of seedProduct.images.entries()) {
      await upsertProductImage({
        productId: product.id,
        url,
        alt: seedProduct.name,
        position: index,
      });
    }

    for (const variant of seedProduct.variants) {
      await upsertProductVariant({
        productId: product.id,
        color: variant.color,
        size: variant.size,
        stock: variant.stock,
        sku: generateSku(slug, variant.color, variant.size),
      });
    }
  }

  for (const banner of banners) {
    await upsertBanner(banner);
  }

  for (const reviewer of reviewers) {
    const user = await prisma.user.upsert({
      where: { email: reviewer.email },
      update: {
        name: reviewer.name,
      },
      create: {
        name: reviewer.name,
        email: reviewer.email,
      },
      select: {
        id: true,
      },
    });

    const product = productBySlug.get(reviewer.productSlug);

    if (!product) {
      throw new Error(`Produto para review não encontrado: ${reviewer.productSlug}`);
    }

    await upsertReview({
      userId: user.id,
      productId: product.id,
      rating: reviewer.rating,
      comment: reviewer.comment,
    });
  }

  console.log(
    `Seed concluído: ${categories.length} categorias, ${products.length} produtos, ${banners.length} banners e ${reviewers.length} reviews.`
  );
}

main()
  .catch((error) => {
    console.error("Erro ao executar seed:", error);
    process.exitCode = 1;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
