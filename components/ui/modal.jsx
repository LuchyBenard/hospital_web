"use client";

import { useEffect } from "react";
import { cn } from "@/lib/utils";

// Listens for Escape and an explicit close. Used by mobile-menu and overlays.
export function Modal({ open, onClose, title, children, className }) {
  useEffect(() => {
    if (!open) return;
    const onKey = (e) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
    >
      <div
        className="modal-backdrop-in absolute inset-0 bg-fg/30 backdrop-blur-sm"
        onClick={onClose}
      />
      <div
        className={cn(
          "modal-panel-in relative z-10 w-full max-w-md rounded-lg border border-line bg-surface p-6 shadow-lg",
          className
        )}
      >
        {title ? (
          <h3 className="mb-4 text-lg font-semibold">{title}</h3>
        ) : null}
        {children}
      </div>
    </div>
  );
}
