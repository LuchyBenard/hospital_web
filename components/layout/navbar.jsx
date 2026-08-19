"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { publicNav } from "@/constants";
import { cn } from "@/lib/utils";
import { MobileMenu } from "@/components/layout/mobile-menu";

export function Navbar() {
  const pathname = usePathname();
  // (auth) routes render their own centered layout with no Navbar.
  if (pathname === "/login" || pathname === "/signup") return null;
  const isActive = (href) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <header className="sticky top-0 z-40 border-b border-line bg-surface/90 backdrop-blur">
      <div className="container-content flex h-16 items-center justify-between">
        <Link href="/" className="text-base font-semibold tracking-tight">
          iBuild
        </Link>
        <nav className="hidden items-center gap-1 md:flex">
          {publicNav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "rounded-md px-3 py-2 text-sm font-medium transition-colors",
                isActive(item.href)
                  ? "text-accent"
                  : "text-mute hover:text-fg"
              )}
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <MobileMenu items={publicNav} active={isActive} />
      </div>
    </header>
  );
}
