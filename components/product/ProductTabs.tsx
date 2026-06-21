import type { ProductFull } from "@/types";
import { SizeTable } from "./SizeTable";

interface ProductTabsProps {
  product: ProductFull;
}

export function ProductTabs({ product }: ProductTabsProps) {
  const specs = [
    { label: "Composição", value: product.composition },
    { label: "Forro", value: product.lining },
    { label: "Lavagem", value: product.washing },
    { label: "Modelagem", value: product.fit },
    { label: "Modelo veste", value: product.modelInfo },
  ].filter((spec): spec is { label: string; value: string } =>
    Boolean(spec.value)
  );

  return (
    <section className="bg-naty-blushSoft py-12 md:py-16 px-4 md:px-14">
      <div className="grid md:grid-cols-2 gap-10 md:gap-16">
        <div>
          <div className="text-[11px] tracking-[0.28em] text-naty-gold uppercase">
            Sobre a peça
          </div>
          <h3 className="font-display text-[24px] md:text-[28px] text-naty-text mt-2.5 mb-5 font-medium">
            Descrição
          </h3>
          <p className="text-[14px] leading-[1.85] text-naty-text m-0">
            {product.description}
          </p>
          {specs.length > 0 && (
            <dl className="mt-6 grid grid-cols-[auto_1fr] gap-x-6 gap-y-2.5 text-[13px]">
              {specs.map((spec) => (
                <Spec key={spec.label} label={spec.label} value={spec.value} />
              ))}
            </dl>
          )}
        </div>

        <SizeTable />
      </div>
    </section>
  );
}

function Spec({ label, value }: { label: string; value: string }) {
  return (
    <>
      <dt className="text-naty-muted">{label}</dt>
      <dd>{value}</dd>
    </>
  );
}
