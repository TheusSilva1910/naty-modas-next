import { redirect } from "next/navigation";
import Link from "next/link";
import { auth } from "@/lib/auth";

const navLinks = [
  { href: "/admin", label: "Dashboard" },
  { href: "/admin/produtos", label: "Produtos" },
  { href: "/admin/pedidos", label: "Pedidos" },
  { href: "/admin/banners", label: "Banners" },
  { href: "/admin/cupons", label: "Cupons" },
];

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();

  if (!session?.user || session.user.role !== "ADMIN") {
    redirect("/conta");
  }

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <aside className="w-56 shrink-0 bg-naty-text text-white flex flex-col">
        <div className="px-6 py-5 border-b border-white/10">
          <span className="font-display text-[16px] text-naty-gold tracking-widest">
            NATY MODAS
          </span>
          <div className="text-[10px] text-white/50 tracking-wider mt-0.5 uppercase">
            Painel admin
          </div>
        </div>
        <nav className="flex-1 py-4">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="flex items-center px-6 py-3 text-[13px] text-white/70
                         hover:text-white hover:bg-white/5 transition-colors"
            >
              {link.label}
            </Link>
          ))}
        </nav>
        <div className="px-6 py-4 border-t border-white/10 text-[11px] text-white/40">
          {session.user.name ?? session.user.email}
        </div>
      </aside>

      {/* Main content */}
      <main className="flex-1 overflow-auto">
        {children}
      </main>
    </div>
  );
}
