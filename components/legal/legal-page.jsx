import Link from "next/link";
import { legalNav } from "@/constants";

// Shared shell for policy pages: consistent intro, in-page section nav,
// and a link back to the policy list.
export function LegalPage({ title, updated, children }) {
  return (
    <main className="container-content py-12 sm:py-16">
      <div className="mx-auto max-w-3xl">
        <nav aria-label="Legal" className="mb-8 text-xs text-mute">
          <Link href="/legal" className="hover:text-accent hover:underline">
            &larr; All Policies
          </Link>
        </nav>

        <header className="mb-8 border-b border-line pb-6">
          <h1 className="text-2xl sm:text-3xl font-bold text-fg mb-2">{title}</h1>
          <p className="text-xs text-mute">Last reviewed: {updated}</p>
        </header>

        <div className="prose-legal">{children}</div>

        <footer className="mt-12 border-t border-line pt-6">
          <p className="text-xs text-mute">Other policies:</p>
          <nav className="mt-2 flex flex-wrap gap-3 text-xs font-medium text-accent">
            {legalNav
              .filter((l) => l.label !== title)
              .map((l) => (
                <Link key={l.href} href={l.href} className="hover:underline">
                  {l.label}
                </Link>
              ))}
          </nav>
        </footer>
      </div>
    </main>
  );
}
