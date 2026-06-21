import { Header } from "@/components/Header";
import { HeroBanner } from "@/components/HeroBanner";
import { CategorySection } from "@/components/CategorySection";
import { ProductSection } from "@/components/ProductSection";
import { InstitutionalBanner } from "@/components/InstitutionalBanner";
import { LooksSection } from "@/components/LooksSection";
import { ReviewsSection } from "@/components/ReviewsSection";
import { InstagramFeed } from "@/components/InstagramFeed";
import { Newsletter } from "@/components/Newsletter";
import { Footer } from "@/components/Footer";
import { StateMessage } from "@/components/StateMessage";

import { mainMenu, topBarItems, whatsapp } from "@/data/menu";
import {
  getBanners,
  getCategories,
  getProducts,
  getReviews,
} from "@/lib/api";
import type { Look, Product } from "@/types";

export const dynamic = "force-dynamic";

function buildLooks(products: Product[]): Look[] {
  return products.slice(0, 3).map((product) => ({
    id: product.id,
    title: product.name,
    pieces: product.sizes?.length || 1,
    total: product.price,
    imageUrl: product.imageUrl,
  }));
}

export default async function HomePage() {
  const [categories, featured, newProducts, banners, reviews] =
    await Promise.all([
      getCategories(),
      getProducts("?featured=true"),
      getProducts("?new=true"),
      getBanners(),
      getReviews(),
    ]);

  const errors = [
    categories.error,
    featured.error,
    newProducts.error,
    banners.error,
    reviews.error,
  ].filter(Boolean);

  const hero = banners.data[0];
  const lookProducts =
    featured.data.length > 0 ? featured.data : newProducts.data;

  return (
    <>
      <Header
        menu={mainMenu}
        topBarItems={topBarItems}
        phone={whatsapp.display}
        cartCount={2}
      />

      <main>
        {errors.length > 0 && (
          <div className="px-4 md:px-14 py-6">
            <StateMessage
              title="Não foi possível carregar todos os dados"
              description={errors.join(" ")}
            />
          </div>
        )}

        {hero ? (
          <HeroBanner slide={hero} />
        ) : (
          <section className="px-4 md:px-14 py-12">
            <StateMessage
              title="Nenhum banner ativo"
              description="Cadastre banners ativos para preencher o destaque principal."
            />
          </section>
        )}

        <CategorySection categories={categories.data} />

        <ProductSection
          title="Mais Vendidos"
          eyebrow="Quem usa ama"
          products={featured.data}
          surface="blush"
          ctaHref="/mais-vendidos"
        />

        <InstitutionalBanner
          eyebrow="A Marca"
          title="Moda criada para mulheres"
          emphasis="autênticas."
          description="Cada peça é pensada com carinho para acompanhar a sua história — do trabalho ao encontro especial, da viagem à festa."
          cta={{ label: "Conheça a marca", href: "/sobre" }}
        />

        <ProductSection
          title="Novidades"
          eyebrow="Acabaram de chegar"
          products={newProducts.data}
          ctaHref="/novidades"
        />

        <LooksSection looks={buildLooks(lookProducts)} />

        {reviews.data.length > 0 ? (
          <ReviewsSection reviews={reviews.data} />
        ) : (
          <section className="bg-naty-blush py-16 md:py-24 px-4 md:px-14">
            <StateMessage
              title="Ainda não há avaliações"
              description="As avaliações reais aparecerão aqui quando clientes avaliarem os produtos."
            />
          </section>
        )}

        <InstagramFeed />

        <Newsletter />
      </main>

      <Footer />
    </>
  );
}
