import Link from "next/link";
import { Placeholder } from "./Placeholder";
import { StateMessage } from "./StateMessage";
import type { Category } from "@/types";

interface CategorySectionProps {
  categories: Category[];
  title?: string;
  eyebrow?: string;
}

export function CategorySection({
  categories,
  title = "Categorias",
  eyebrow = "Explore",
}: CategorySectionProps) {
  return (
    <section className="py-16 md:py-24 px-4 md:px-14">
      <header className="text-center mb-10 md:mb-12">
        <div className="eyebrow">{eyebrow}</div>
        <h2 className="font-display text-[28px] md:text-[42px] text-naty-text mt-2 font-medium">
          {title}
        </h2>
        <div className="naty-divider mt-3.5 text-naty-gold text-[10px]">
          ♡
        </div>
      </header>

      {categories.length > 0 ? (
        <>
          <div className="hidden md:grid grid-cols-3 lg:grid-cols-6 gap-5">
            {categories.map((category) => (
              <Link key={category.id} href={category.href} className="group block">
                <Placeholder
                  variant={category.imageVariant}
                  imageUrl={category.imageUrl}
                  imageAlt={category.name}
                  label={category.name.toUpperCase()}
                  className="h-[300px] transition-transform group-hover:scale-[1.02] duration-500"
                />
                <div className="text-center pt-4">
                  <div className="font-display text-[18px] text-naty-text">
                    {category.name}
                  </div>
                  <div className="text-[10px] tracking-[0.2em] text-naty-gold mt-1.5 uppercase">
                    {category.count} peças
                  </div>
                </div>
              </Link>
            ))}
          </div>

          <div className="md:hidden flex gap-3 overflow-x-auto pb-2 -mx-4 px-4">
            {categories.map((category) => (
              <Link
                key={category.id}
                href={category.href}
                className="flex-none w-[140px]"
              >
                <Placeholder
                  variant={category.imageVariant}
                  imageUrl={category.imageUrl}
                  imageAlt={category.name}
                  className="h-[180px]"
                />
                <div className="text-center pt-2 font-display text-[13px]">
                  {category.name}
                </div>
              </Link>
            ))}
          </div>
        </>
      ) : (
        <StateMessage
          title="Nenhuma categoria cadastrada"
          description="As categorias aparecerão aqui quando forem criadas no painel."
        />
      )}
    </section>
  );
}
