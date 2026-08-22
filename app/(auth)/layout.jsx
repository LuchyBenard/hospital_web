import { hospitalInfo } from "@/constants";
import Link from "next/link";

// Centered patient & staff auth layout
export default function AuthLayout({ children }) {
  return (
    <main className="flex min-h-[calc(100vh-4rem)] items-center justify-center px-4 py-12">
      <div className="w-full max-w-md">
        <div className="mb-8 text-center">
          <Link href="/" className="inline-flex items-center gap-2 mb-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-md bg-accent text-accent-fg font-bold">
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
              >
                <path d="M12 6v12" />
                <path d="M6 12h12" />
              </svg>
            </div>
            <span className="text-lg font-bold tracking-tight text-fg">
              {hospitalInfo.name}
            </span>
          </Link>
          <div className="text-xs font-semibold text-mute">
            Secure Patient & Clinical Care Portal
          </div>
        </div>
        {children}
      </div>
    </main>
  );
}
