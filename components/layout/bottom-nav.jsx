"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { appNav } from "@/constants";
import { cn } from "@/lib/utils";

// Logged-in mobile nav. Fixed bottom bar; hidden on desktop.
export function BottomNav() {
  const pathname = usePathname();

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 border-t border-line bg-surface md:hidden">
      <div className="flex">
        {appNav.map((item) => {
          const active =
            item.href === "/dashboard"
              ? pathname === "/dashboard"
              : pathname.startsWith(item.href);
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex flex-1 flex-col items-center gap-1 py-2 text-xs font-medium",
                active ? "text-accent" : "text-mute"
              )}
            >
              {item.label}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
