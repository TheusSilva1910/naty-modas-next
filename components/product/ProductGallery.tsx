"use client";

import { useState } from "react";
import { Placeholder } from "../Placeholder";
import type { ProductGalleryImage } from "@/types";

interface ProductGalleryProps {
  images: ProductGalleryImage[];
  productName: string;
  badge?: { type: string; label: string };
}

export function ProductGallery({
  images,
  productName,
  badge,
}: ProductGalleryProps) {
  const [active, setActive] = useState(0);
  const gallery = images.length > 0 ? images : [{}];
  const current = gallery[active] ?? gallery[0];

  return (
    <div className="grid md:grid-cols-[92px_1fr] gap-4 md:gap-8">
      <div className="hidden md:flex flex-col gap-3">
        {gallery.map((img, index) => (
          <button
            key={`${img.imageUrl ?? "placeholder"}-${index}`}
            type="button"
            onClick={() => setActive(index)}
            aria-label={`Foto ${index + 1}`}
            className={`aspect-[3/4] transition-all ${
              index === active
                ? "outline outline-1 outline-naty-rose-deep outline-offset-2"
                : "opacity-75 hover:opacity-100"
            }`}
          >
            <Placeholder
              variant={img.variant}
              imageUrl={img.imageUrl}
              imageAlt={`${productName} ${index + 1}`}
              label={String(index + 1).padStart(2, "0")}
              className="w-full h-full"
            />
          </button>
        ))}
      </div>

      <Placeholder
        variant={current.variant}
        imageUrl={current.imageUrl}
        imageAlt={productName}
        label={`${productName.toUpperCase()} - FOTO PRINCIPAL`}
        className="aspect-[3/4]"
      >
        {badge && (
          <span className="absolute top-4 right-4 bg-naty-gold text-white text-[10px] px-3 py-1.5 tracking-[0.24em] uppercase">
            {badge.label}
          </span>
        )}
        <button
          type="button"
          aria-label="Ampliar imagem"
          className="absolute bottom-4 right-4 w-[42px] h-[42px] rounded-full bg-white/90 flex items-center justify-center text-naty-rose-deep"
        >
          ⌕
        </button>

        <div className="md:hidden absolute bottom-4 left-0 right-0 flex justify-center gap-1.5">
          {gallery.map((_, index) => (
            <button
              key={index}
              type="button"
              onClick={() => setActive(index)}
              aria-label={`Ir para foto ${index + 1}`}
              className={`w-5 h-0.5 transition-colors ${
                index === active ? "bg-white" : "bg-white/40"
              }`}
            />
          ))}
        </div>
      </Placeholder>
    </div>
  );
}
