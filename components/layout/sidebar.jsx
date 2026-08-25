"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { appNav, hospitalInfo } from "@/constants";
import { cn } from "@/lib/utils";
import { useAuth } from "@/contexts/auth-context";
import { ThemeToggle } from "@/components/layout/theme-toggle";

// Logged-in patient portal desktop sidebar
export function Sidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const { user, logout } = useAuth();

  const handleLogout = () => {
    logout();
    router.push("/login");
  };

  return (
    <aside className="hidden w-64 shrink-0 flex-col justify-between border-r border-line bg-surface md:flex min-h-screen">
      <div>
        {/* Patient Profile Card Header */}
        <div className="border-b border-line p-4">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-accent text-accent-fg font-bold">
              {user?.name ? user.name.charAt(0) : "P"}
            </div>
            <div className="overflow-hidden">
              <div className="text-sm font-semibold text-fg truncate">
                {user?.name || "Patient"}
              </div>
              <div className="text-xs text-mute font-mono">
                {user?.mrn || "MRN-48920-A"}
              </div>
            </div>
          </div>
          {user?.bloodGroup && (
            <div className="mt-2.5 flex items-center gap-2">
              <span className="badge badge-accent text-xs">Blood: {user.bloodGroup}</span>
              <span className="badge badge-info text-xs">{user.gender || "Patient"}</span>
            </div>
          )}
        </div>

        {/* Navigation Menu */}
        <div className="p-3">
          <div className="px-3 py-2 text-xs font-semibold uppercase tracking-wider text-mute">
            Patient Portal
          </div>
          <nav className="flex flex-col gap-1">
            {appNav.map((item) => {
              const active =
                item.href === "/dashboard"
                  ? pathname === "/dashboard"
                  : pathname === item.href || pathname.startsWith(item.href + "/");
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "flex items-center gap-2.5 rounded-md px-3 py-2.5 text-sm font-medium transition-colors",
                    active
                      ? "bg-accent-light text-accent font-semibold"
                      : "text-mute hover:bg-bg hover:text-fg"
                  )}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>
        </div>
      </div>

      {/* Footer Support & Logout */}
      <div className="border-t border-line p-4 space-y-3">
        <div className="flex items-center justify-between gap-2 rounded bg-bg p-2.5 text-xs">
          <div>
            <div className="font-semibold text-fg">Care Desk 24/7</div>
            <div className="text-mute">{hospitalInfo.phone.appointments}</div>
          </div>
          <ThemeToggle />
        </div>
        <button
          onClick={handleLogout}
          type="button"
          className="flex w-full items-center justify-center gap-2 rounded-md border border-line py-2 text-xs font-medium text-mute transition-colors hover:bg-bg hover:text-danger"
        >
          Sign Out of Portal
        </button>
      </div>
    </aside>
  );
}
