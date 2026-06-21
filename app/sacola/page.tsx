import { Footer } from "@/components/Footer";
import { CartPageClient } from "./CartPageClient";

export const metadata = {
  title: "Sua sacola · Naty Modas",
  robots: { index: false },
};

export default function CartPage() {
  return (
    <>
      <CartPageClient />
      <Footer />
    </>
  );
}
