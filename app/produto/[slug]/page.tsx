import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Breadcrumb } from "@/components/Breadcrumb";
import { ProductGallery } from "@/components/product/ProductGallery";
import { ProductInfo } from "@/components/product/ProductInfo";
import { ProductTabs } from "@/components/product/ProductTabs";
import { ProductSection } from "@/components/ProductSection";
import { StateMessage } from "@/components/StateMessage";

import { mainMenu, topBarItems, whatsapp } from "@/data/menu";
import { getProductBySlug } from "@/lib/api";
import { auth } from "@/lib/auth";
import { ProductReviews } from "@/components/product/ProductReviews";

const BASE_URL = process.env.NEXT_PUBLIC_APP_URL ?? "https://natymodas.com.br";

interface PageProps {
  params: { slug: string };
}

export const dynamic = "force-dynamic";

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { data: product } = await getProductBySlug(params.slug);
  if (!product) return { title: "Produto não encontrado · Naty Modas" };

  const title = `${product.name} · Naty Modas`;
  const description = product.description?.slice(0, 160) ?? `${product.name} — boutique feminina com estilo e elegância.`;
  const image = product.imageUrl;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url: `${BASE_URL}/produto/${product.slug}`,
      images: image ? [{ url: image, width: 800, height: 1000, alt: product.name }] : [],
      type: "website",
    },
    twitter: { card: "summary_large_image", title, description, images: image ? [image] : [] },
  };
}

export default async function ProductPage({ params }: PageProps) {
  const [{ data: product, error }, session] = await Promise.all([
    getProductBySlug(params.slug),
    auth(),
  ]);

  if (!product && !error) {
    notFound();
  }

  return (
    <>
      <Header
        menu={mainMenu}
        topBarItems={topBarItems}
        phone={whatsapp.display}
      />

      <main className="bg-white">
        {error && (
          <div className="px-4 md:px-14 py-6">
            <StateMessage
              title="Não foi possível carregar o produto"
              description={error}
            />
          </div>
        )}

        {product ? (
          <>
            <div className="px-4 md:px-14 py-6">
              <Breadcrumb
                items={[
                  { label: "Home", href: "/" },
                  {
                    label: product.category,
                    href: product.categorySlug
                      ? `/${product.categorySlug}`
                      : undefined,
                  },
                  { label: product.name },
                ]}
              />
            </div>

            <div className="grid md:grid-cols-2 gap-8 md:gap-12 px-4 md:px-14 pb-12 md:pb-16">
              <ProductGallery
                images={product.gallery}
                productName={product.name}
                badge={product.badge}
              />
              <ProductInfo product={product} />
            </div>

            <ProductTabs product={product} />

            <ProductReviews
              productId={product.id}
              rating={product.rating}
              reviewCount={product.reviewCount}
              reviews={product.reviewList ?? []}
              isLoggedIn={!!session?.user}
            />

            {product.related && product.related.length > 0 && (
              <ProductSection
                title="Produtos Relacionados"
                eyebrow="Você também pode gostar"
                products={product.related}
                ctaLabel=""
              />
            )}
          </>
        ) : (
          <div className="px-4 md:px-14 py-12">
            <StateMessage
              title="Produto não encontrado"
              description="Confira se o link está correto ou volte para a vitrine."
            />
          </div>
        )}
      </main>

      <Footer />
    </>
  );
}
