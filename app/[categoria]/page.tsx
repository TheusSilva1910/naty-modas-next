import { notFound } from "next/navigation";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Breadcrumb } from "@/components/Breadcrumb";
import { FiltersSidebar } from "@/components/filters/FiltersSidebar";
import { FilterChips } from "@/components/filters/FilterChips";
import { SortDropdown } from "@/components/filters/SortDropdown";
import { ProductCard } from "@/components/ProductCard";
import { Pagination } from "@/components/Pagination";
import { StateMessage } from "@/components/StateMessage";

import { mainMenu, topBarItems, whatsapp } from "@/data/menu";
import { getCategories, getProducts } from "@/lib/api";
import { getColorHex } from "@/lib/product-colors";
import type { Category, CategoryFilter, Product, ProductColor } from "@/types";

interface PageProps {
  params: { categoria: string };
}

export const dynamic = "force-dynamic";

function getSizeOptions(products: Product[]) {
  return Array.from(new Set(products.flatMap((product) => product.sizes ?? [])));
}

function getColorOptions(products: Product[]): ProductColor[] {
  return Array.from(
    new Set(products.flatMap((product) => product.colors ?? []))
  ).map((color) => ({
    name: color,
    hex: getColorHex(color),
  }));
}

function getPriceRange(products: Product[]) {
  if (products.length === 0) {
    return undefined;
  }

  const prices = products.map((product) => product.price);

  return {
    min: Math.floor(Math.min(...prices)),
    max: Math.ceil(Math.max(...prices)),
  };
}

function getCategoryFilters(categories: Category[]): CategoryFilter[] {
  return categories.map((category) => ({
    id: category.id,
    label: category.name,
    count: category.count,
  }));
}

export default async function CategoryPage({ params }: PageProps) {
  const slug = params.categoria;
  const [categoriesResult, productsResult] = await Promise.all([
    getCategories(),
    getProducts(`?category=${slug}`),
  ]);

  const category = categoriesResult.data.find((item) => item.id === slug);

  if (!category && !categoriesResult.error) {
    notFound();
  }

  const products = productsResult.data;
  const errors = [categoriesResult.error, productsResult.error].filter(Boolean);

  return (
    <>
      <Header
        menu={mainMenu}
        topBarItems={topBarItems}
        phone={whatsapp.display}
        cartCount={2}
      />

      <main className="bg-white">
        <div className="bg-naty-blushSoft py-8 md:py-10 px-4 md:px-14">
          <Breadcrumb
            items={[
              { label: "Home", href: "/" },
              { label: category?.name ?? "Categoria" },
            ]}
          />
          <div className="mt-5 flex flex-col md:flex-row md:justify-between md:items-end gap-5">
            <div>
              <h1 className="font-display text-[36px] md:text-[48px] text-naty-text font-medium m-0">
                {category?.name ?? "Categoria"}
              </h1>
              <div className="flex items-center gap-2.5 mt-2.5">
                <span className="h-px w-6 bg-naty-gold" />
                <span className="text-[12px] text-naty-muted">
                  {products.length} peças
                </span>
              </div>
            </div>
            <SortDropdown />
          </div>
        </div>

        <div className="grid lg:grid-cols-[260px_1fr] gap-8 lg:gap-12 px-4 md:px-14 py-10 md:py-12">
          <div className="hidden lg:block">
            <FiltersSidebar
              sizeOptions={getSizeOptions(products)}
              colorOptions={getColorOptions(products)}
              categoryFilters={getCategoryFilters(categoriesResult.data)}
              priceRange={getPriceRange(products)}
            />
          </div>

          <div className="grid grid-cols-2 lg:hidden border-y border-naty-line -mx-4 mb-4 text-[11px] tracking-[0.22em] uppercase">
            <button className="py-3.5 border-r border-naty-line">Filtros</button>
            <button className="py-3.5">Ordenar</button>
          </div>

          <div>
            <FilterChips tags={[]} />

            {errors.length > 0 && (
              <div className="mb-6">
                <StateMessage
                  title="Não foi possível carregar a categoria"
                  description={errors.join(" ")}
                />
              </div>
            )}

            {products.length > 0 ? (
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5">
                {products.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            ) : (
              <StateMessage
                title="Nenhuma peça nesta categoria"
                description="Quando produtos forem vinculados a esta categoria, eles aparecerão aqui."
              />
            )}

            <div className="mt-12">
              <Pagination current={1} total={1} />
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}
