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

interface PageProps {
  params: { slug: string };
}

export const dynamic = "force-dynamic";

export default async function ProductPage({ params }: PageProps) {
  const { data: product, error } = await getProductBySlug(params.slug);

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
