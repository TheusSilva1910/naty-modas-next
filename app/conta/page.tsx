import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { AuthForm } from "@/components/auth/AuthForm";
import { AccountDashboard } from "@/components/auth/AccountDashboard";
import { mainMenu, topBarItems, whatsapp } from "@/data/menu";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export const metadata = {
  title: "Minha conta · Naty Modas",
};

export default async function AccountPage() {
  const session = await auth();

  let orders: {
    id: string;
    total: number;
    status: string;
    createdAt: Date;
    _count: { items: number };
  }[] = [];

  if (session?.user?.id) {
    orders = await prisma.order.findMany({
      where: { userId: session.user.id },
      orderBy: { createdAt: "desc" },
      take: 5,
      select: {
        id: true,
        total: true,
        status: true,
        createdAt: true,
        _count: { select: { items: true } },
      },
    }).then((list) =>
      list.map((o) => ({ ...o, total: Number(o.total) }))
    );
  }

  return (
    <>
      <Header menu={mainMenu} topBarItems={topBarItems} phone={whatsapp.display} />

      <main className="bg-naty-blushSoft min-h-[80vh] px-4 md:px-14 py-12 md:py-20">
        {session?.user ? (
          <AccountDashboard user={session.user} orders={orders} />
        ) : (
          <div className="grid md:grid-cols-2 max-w-[1100px] mx-auto bg-white">
            {/* Lado visual */}
            <div className="hidden md:flex flex-col justify-between bg-naty-blush p-12 lg:p-16 relative">
              <div className="eyebrow">Boutique online</div>
              <div className="my-10">
                <h2 className="font-display text-[36px] lg:text-[44px] text-naty-text font-medium leading-[1.15]">
                  Sua jornada com a{" "}
                  <em className="not-italic text-naty-rose-deep">Naty Modas</em>{" "}
                  começa aqui.
                </h2>
                <p className="text-[14px] leading-[1.7] text-naty-text/75 mt-6 max-w-[360px]">
                  Acompanhe pedidos, salve favoritos, receba descontos exclusivos
                  e ganhe pontos a cada compra no Clube Naty.
                </p>
              </div>
              <div className="naty-hairline" />
              <ul className="mt-8 grid gap-3.5 text-[12px] tracking-[0.04em] text-naty-text">
                <li><span className="text-naty-gold mr-2.5">♡</span>10% de desconto na primeira compra</li>
                <li><span className="text-naty-gold mr-2.5">✦</span>Acesso antecipado a coleções</li>
                <li><span className="text-naty-gold mr-2.5">⏵</span>Atendimento prioritário no WhatsApp</li>
              </ul>
            </div>

            {/* Form */}
            <div className="flex items-center justify-center p-6 md:p-10">
              <AuthForm />
            </div>
          </div>
        )}
      </main>

      <Footer />
    </>
  );
}
