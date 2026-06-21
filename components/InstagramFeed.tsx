import Link from "next/link";
import { Placeholder } from "./Placeholder";
import { instagramPosts, instagramHandle } from "@/data/instagram";

export function InstagramFeed() {
  return (
    <section className="py-16 md:py-20 px-4 md:px-14">
      <header className="text-center mb-8 md:mb-9">
        <div className="eyebrow">Siga-nos</div>
        <h2 className="font-display text-[24px] md:text-[32px] text-naty-text mt-2 font-medium">
          {instagramHandle}
        </h2>
      </header>

      <div className="grid grid-cols-3 md:grid-cols-6 gap-1 md:gap-2">
        {instagramPosts.map((p) => (
          <Link key={p.id} href={p.href}>
            <Placeholder variant={p.variant} className="aspect-square" />
          </Link>
        ))}
      </div>
    </section>
  );
}
