import type { Metadata } from "next";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { CheckoutForm } from "./CheckoutForm";
import { mainMenu, topBarItems, whatsapp } from "@/data/menu";
import { auth } from "@/lib/auth";

export const metadata: Metadata = {
  title: "Finalizar compra · Naty Modas",
  robots: { index: false },
};

export default async function CheckoutPage() {
  const session = await auth();

  return (
    <>
      <Header menu={mainMenu} topBarItems={topBarItems} phone={whatsapp.display} />

      <main className="bg-white min-h-screen">
        <div className="px-4 md:px-14 py-8 md:py-12 max-w-[1200px] mx-auto">
          <h1 className="font-display text-[32px] md:text-[42px] text-naty-text font-medium mb-8">
            Finalizar compra
          </h1>
          <CheckoutForm
            initialName={session?.user?.name ?? undefined}
            initialEmail={session?.user?.email ?? undefined}
          />
        </div>
      </main>

      <Footer />
    </>
  );
}
