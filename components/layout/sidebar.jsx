"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { appNav } from "@/constants";
import { cn } from "@/lib/utils";

// Logged-in desktop nav. Hidden on mobile (bottom-nav takes over there).
export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="hidden w-60 shrink-0 border-r border-line bg-surface md:block">
      <nav className="flex flex-col gap-1 p-4">
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
                "rounded-md px-3 py-2 text-sm font-medium transition-colors",
                active ? "bg-bg text-accent" : "text-mute hover:text-fg"
              )}
            >
              {item.label}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
