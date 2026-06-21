import Link from "next/link";
import { Logo } from "./Logo";
import { footerSections, paymentMethods, socials } from "@/data/footer";

export function Footer() {
  return (
    <footer className="bg-naty-dark text-[#d8c8cb]">
      <div className="max-w-[1440px] mx-auto px-4 md:px-14 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-[2fr_1fr_1fr_1fr_1fr] gap-10 md:gap-12">
          {/* Coluna marca */}
          <div>
            <div className="text-left">
              <div className="font-display text-[24px] text-white tracking-[0.32em] leading-none">
                NATY
              </div>
              <div className="font-display text-[10px] text-naty-gold tracking-[0.32em] mt-0.5">
                MODAS
              </div>
            </div>
            <p className="text-[12px] leading-[1.7] mt-5 opacity-75 max-w-[280px]">
              Moda feminina autêntica, criada com carinho em São Paulo desde 2019.
            </p>
            <div className="flex gap-3.5 mt-6">
              {socials.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  aria-label={s.label}
                  className="w-[34px] h-[34px] border border-naty-gold rounded-full
                             flex items-center justify-center text-naty-gold text-[13px]
                             hover:bg-naty-gold hover:text-naty-dark transition-colors"
                >
                  {s.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Colunas de links */}
          {footerSections.map((sec) => (
            <div key={sec.title}>
              <div className="text-[11px] tracking-[0.24em] text-naty-gold mb-4 uppercase">
                {sec.title}
              </div>
              <div className="flex flex-col gap-2.5 text-[12px]">
                {sec.links.map((l) => (
                  <Link
                    key={l.label}
                    href={l.href}
                    className="hover:text-naty-gold transition-colors"
                  >
                    {l.label}
                  </Link>
                ))}
              </div>
            </div>
          ))}

          {/* Métodos de pagamento */}
          <div>
            <div className="text-[11px] tracking-[0.24em] text-naty-gold mb-4 uppercase">
              Pagamento
            </div>
            <div className="flex flex-wrap gap-2">
              {paymentMethods.map((m) => (
                <span
                  key={m}
                  className="w-[42px] h-[28px] bg-white/[0.08] rounded-sm
                             inline-flex items-center justify-center text-[9px]"
                >
                  {m}
                </span>
              ))}
            </div>
          </div>
        </div>

        <div className="h-px bg-naty-gold/30 my-10" />

        <div className="flex flex-col md:flex-row justify-between gap-3 text-[10px] tracking-[0.12em] opacity-60 uppercase">
          <span>© 2026 Naty Modas · Todos os direitos reservados</span>
          <span>CNPJ XX.XXX.XXX/0001-XX</span>
        </div>
      </div>
    </footer>
  );
}
