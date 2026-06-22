import type { Metadata } from "next";
import { Suspense } from "react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { ProductCard } from "@/components/ProductCard";
import { StateMessage } from "@/components/StateMessage";
import { SearchBar } from "@/components/SearchBar";
import { mainMenu, topBarItems, whatsapp } from "@/data/menu";
import { getProducts } from "@/lib/api";

interface PageProps {
  searchParams?: { q?: string };
}

export function generateMetadata({ searchParams }: PageProps): Metadata {
  const q = searchParams?.q ?? "";
  return {
    title: q ? `"${q}" · Busca · Naty Modas` : "Buscar · Naty Modas",
    robots: { index: false },
  };
}

export const dynamic = "force-dynamic";

export default async function SearchPage({ searchParams }: PageProps) {
  const query = searchParams?.q?.trim() ?? "";
  const { data: products, error } = query
    ? await getProducts(`?search=${encodeURIComponent(query)}`)
    : { data: [], error: null };

  return (
    <>
      <Header menu={mainMenu} topBarItems={topBarItems} phone={whatsapp.display} />

      <main className="bg-white min-h-screen">
        <div className="bg-naty-blushSoft py-8 md:py-10 px-4 md:px-14">
          <h1 className="font-display text-[32px] md:text-[42px] text-naty-text font-medium mb-5">
            Buscar
          </h1>
          <Suspense>
            <SearchBar initialQuery={query} />
          </Suspense>
        </div>

        <div className="px-4 md:px-14 py-10">
          {error && (
            <StateMessage title="Erro ao buscar" description={error} />
          )}

          {!error && query && products.length === 0 && (
            <StateMessage
              title={`Nenhum resultado para "${query}"`}
              description="Tente palavras diferentes ou navegue pelas categorias."
            />
          )}

          {!query && (
            <StateMessage
              title="Digite o que você procura"
              description="Use a barra acima para buscar por nome de peça, cor ou coleção."
            />
          )}

          {products.length > 0 && (
            <>
              <p className="text-[13px] text-naty-muted mb-6">
                {products.length} resultado{products.length !== 1 ? "s" : ""} para{" "}
                <strong>&ldquo;{query}&rdquo;</strong>
              </p>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-5">
                {products.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            </>
          )}
        </div>
      </main>

      <Footer />
    </>
  );
}
