"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { publicNav, hospitalInfo } from "@/constants";
import { cn } from "@/lib/utils";
import { useAuth } from "@/contexts/auth-context";
import { MobileMenu } from "@/components/layout/mobile-menu";
import { EmergencyBanner } from "@/components/hospital/emergency-banner";
import { Button } from "@/components/ui/button";

export function Navbar() {
  const pathname = usePathname();
  const { user } = useAuth();

  // (auth) routes render their own centered layout with no Navbar
  if (pathname === "/login" || pathname === "/signup") return null;

  const isActive = (href) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <>
      <EmergencyBanner />
      <header className="sticky top-0 z-40 border-b border-line bg-surface/95 backdrop-blur shadow-xs">
        <div className="container-content flex h-16 items-center justify-between">
          <Link href="/" className="flex items-center gap-2.5">
            <div className="flex h-9 w-9 items-center justify-center rounded-md bg-accent text-accent-fg font-bold shadow-sm">
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M12 6v12" />
                <path d="M6 12h12" />
              </svg>
            </div>
            <div className="flex flex-col">
              <span className="text-base font-bold tracking-tight text-fg leading-none">
                {hospitalInfo.name}
              </span>
              <span className="text-xs font-medium text-mute">
                Level I Trauma & Clinical Center
              </span>
            </div>
          </Link>

          <nav className="hidden items-center gap-1 lg:flex">
            {publicNav
              .filter((item) => item.href !== "/login")
              .map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "rounded-md px-3 py-2 text-sm font-medium transition-colors",
                    isActive(item.href)
                      ? "text-accent bg-accent-light font-semibold"
                      : "text-mute hover:text-fg hover:bg-bg"
                  )}
                >
                  {item.label}
                </Link>
              ))}
          </nav>

          <div className="hidden items-center gap-3 md:flex">
            {user ? (
              <Link href="/dashboard">
                <Button size="sm" variant="secondary">
                  Patient Portal ({user.name.split(" ")[0]})
                </Button>
              </Link>
            ) : (
              <Link href="/login">
                <Button size="sm" variant="secondary">
                  Patient Sign In
                </Button>
              </Link>
            )}
            <Link href="/appointments">
              <Button size="sm">Book Appointment</Button>
            </Link>
          </div>

          <MobileMenu items={publicNav} active={isActive} />
        </div>
      </header>
    </>
  );
}
