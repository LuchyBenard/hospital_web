import Link from "next/link";
import { publicNav } from "@/constants";

const year = new Date().getFullYear();

export function Footer() {
  return (
    <footer className="site-footer border-t border-line bg-surface">
      <div className="container-content flex flex-col gap-6 py-10 sm:flex-row sm:items-start sm:justify-between">
        <div className="max-w-xs">
          <span className="text-base font-semibold tracking-tight">iBuild</span>
          <p className="mt-2 text-sm text-mute">
            A scaffold for fullstack apps that read as designed, not generated.
          </p>
        </div>
        <nav className="flex flex-col gap-2">
          <span className="text-sm font-medium">Pages</span>
          {publicNav
            .filter((item) => item.href !== "/login")
            .map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-sm text-mute hover:text-fg"
              >
                {item.label}
              </Link>
            ))}
        </nav>
      </div>
      <div className="container-content border-t border-line py-4">
        <p className="text-xs text-mute">
          &copy; {year} iBuild. Scaffolded with the iBuild collection.
        </p>
      </div>
    </footer>
  );
}
