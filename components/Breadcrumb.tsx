import Link from "next/link";

interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
}

export function Breadcrumb({ items }: BreadcrumbProps) {
  return (
    <nav
      aria-label="Você está em"
      className="text-[11px] tracking-[0.16em] text-naty-muted uppercase"
    >
      {items.map((it, i) => {
        const isLast = i === items.length - 1;
        return (
          <span key={it.label}>
            {it.href && !isLast ? (
              <Link href={it.href} className="hover:text-naty-rose-deep">
                {it.label}
              </Link>
            ) : (
              <span className={isLast ? "text-naty-rose-deep" : ""}>{it.label}</span>
            )}
            {!isLast && <span className="mx-2">·</span>}
          </span>
        );
      })}
    </nav>
  );
}
