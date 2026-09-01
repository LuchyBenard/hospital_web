"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { publicNav, hospitalInfo } from "@/constants";
import { cn } from "@/lib/utils";
import { useAuth } from "@/contexts/auth-context";
import { MobileMenu } from "@/components/layout/mobile-menu";
import { ThemeToggle } from "@/components/layout/theme-toggle";
import { EmergencyBanner } from "@/components/hospital/emergency-banner";
import { SearchModal } from "@/components/layout/search-modal";
import { Button } from "@/components/ui/button";

export function Navbar() {
  const pathname = usePathname();
  const { user } = useAuth();
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  // (auth) routes render their own centered layout with no Navbar
  if (pathname === "/login" || pathname === "/signup") return null;

  const isActive = (href) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <>
      <EmergencyBanner />
      <header className="sticky top-0 z-40 border-b border-line bg-surface-95 backdrop-blur shadow-xs">
        <div className="container-content flex h-16 items-center justify-between gap-4">
          {/* Logo & Hospital Brand */}
          <Link href="/" className="flex items-center gap-2.5 shrink-0">
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
                Providence Health
              </span>
            </div>
          </Link>

          {/* Clean Center Navigation */}
          <nav className="hidden items-center gap-1 xl:gap-2 lg:flex">
            {publicNav.map((item) => (
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

          {/* Right Action Bar (Search, Theme, Patient Portal, CTA) */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Global Search Button */}
            <button
              type="button"
              onClick={() => setIsSearchOpen(true)}
              className="flex items-center gap-2 rounded-lg border border-line bg-bg px-2.5 py-1.5 text-xs text-mute transition-colors hover:border-accent hover:text-fg"
              title="Search Directory (Cmd+K)"
            >
              <svg
                className="h-3.5 w-3.5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <span className="hidden xl:inline">Search...</span>
              <kbd className="hidden sm:inline-block rounded border border-line bg-surface px-1.5 py-0.5 text-[10px] font-mono text-mute">
                ⌘K
              </kbd>
            </button>

            <ThemeToggle />

            <div className="hidden items-center gap-2 sm:flex">
              {user ? (
                <Link href="/dashboard">
                  <Button size="sm" variant="secondary">
                    Portal ({user.name.split(" ")[0]})
                  </Button>
                </Link>
              ) : (
                <Link href="/login">
                  <Button size="sm" variant="ghost" className="text-xs font-medium text-mute hover:text-fg">
                    Patient Sign In
                  </Button>
                </Link>
              )}
              <Link href="/appointments">
                <Button
                  size="sm"
                  className="bg-accent text-accent-fg font-bold shadow-sm hover:opacity-90 px-3.5"
                >
                  Book Appointment
                </Button>
              </Link>
            </div>
          </div>

          <MobileMenu items={publicNav} active={isActive} />
        </div>
      </header>

      {/* Global Instant Search Modal */}
      <SearchModal
        isOpen={isSearchOpen}
        onClose={(val) => setIsSearchOpen(typeof val === "boolean" ? val : false)}
      />
    </>
  );
}
