import Link from "next/link";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { AboutHero } from "@/components/about/AboutHero";
import { MissionBlock } from "@/components/about/MissionBlock";
import { BrandValues } from "@/components/about/BrandValues";
import { InstagramFeed } from "@/components/InstagramFeed";
import { Newsletter } from "@/components/Newsletter";

import { mainMenu, topBarItems, whatsapp } from "@/data/menu";

export default function AboutPage() {
  return (
    <>
      <Header
        menu={mainMenu}
        topBarItems={topBarItems}
        phone={whatsapp.display}
      />

      <main>
        <AboutHero />
        <MissionBlock />
        <BrandValues />

        {/* CTA dupla — WhatsApp + Instagram */}
        <section className="bg-naty-blushSoft py-16 md:py-20 px-4 md:px-14 text-center">
          <div className="eyebrow">Vamos conversar</div>
          <h2 className="font-display text-[28px] md:text-[36px] text-naty-text mt-2 font-medium">
            Estamos por aqui sempre que precisar
          </h2>
          <div className="flex flex-wrap gap-4 justify-center mt-8">
            <Link
              href={whatsapp.href}
              className="btn-whats"
            >
              <span aria-hidden>⏵</span> {whatsapp.display}
            </Link>
            <Link
              href="https://instagram.com/bynatymodas_"
              className="btn-outline"
            >
              ⌾ @bynatymodas_
            </Link>
          </div>
        </section>

        <InstagramFeed />
        <Newsletter />
      </main>

      <Footer />
    </>
  );
}

export const metadata = {
  title: "Sobre · Naty Modas",
  description:
    "Conheça a história da Naty Modas — boutique feminina premium criada em São Paulo desde 2019.",
};
