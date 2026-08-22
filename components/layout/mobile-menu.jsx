"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { hospitalInfo } from "@/constants";
import { Button } from "@/components/ui/button";

// Hamburger drawer for mobile navigation
export function MobileMenu({ items, active }) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    if (!open) return;
    const onClick = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    };
    const onKey = (e) => e.key === "Escape" && setOpen(false);
    document.addEventListener("mousedown", onClick);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onClick);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <div className="lg:hidden" ref={ref}>
      <button
        type="button"
        aria-label="Toggle navigation menu"
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
        className="inline-flex h-10 w-10 items-center justify-center rounded-md border border-line bg-surface text-fg"
      >
        <svg
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
        >
          {open ? (
            <>
              <line x1="6" y1="6" x2="18" y2="18" />
              <line x1="18" y1="6" x2="6" y2="18" />
            </>
          ) : (
            <>
              <line x1="4" y1="7" x2="20" y2="7" />
              <line x1="4" y1="12" x2="20" y2="12" />
              <line x1="4" y1="17" x2="20" y2="17" />
            </>
          )}
        </svg>
      </button>

      {open ? (
        <div className="absolute left-0 right-0 top-16 border-b border-line bg-surface shadow-lg z-50">
          <nav className="container-content flex flex-col py-4 space-y-1">
            {items.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className={
                  "rounded-md px-3 py-2.5 text-sm font-medium transition-colors " +
                  (active(item.href)
                    ? "bg-accent-light text-accent font-semibold"
                    : "text-fg hover:bg-bg")
                }
              >
                {item.label}
              </Link>
            ))}
            <div className="pt-4 border-t border-line space-y-2">
              <Link
                href="/appointments"
                onClick={() => setOpen(false)}
                className="block"
              >
                <Button size="sm" className="w-full">
                  Book an Appointment
                </Button>
              </Link>
              <a
                href={`tel:${hospitalInfo.phone.emergency.replace(/[^0-9]/g, "")}`}
                className="flex items-center justify-center gap-2 rounded-md bg-emergency-light py-2 text-xs font-bold text-emergency"
              >
                Emergency Dispatch: {hospitalInfo.phone.emergency}
              </a>
            </div>
          </nav>
        </div>
      ) : null}
    </div>
  );
}
