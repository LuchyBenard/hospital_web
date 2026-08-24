import { hospitalInfo } from "@/constants";
import Link from "next/link";
import Image from "next/image";

const trustPoints = [
  "Encrypted access to labs, imaging, and prescriptions",
  "Same trusted staff as your in-person care team",
  "Available day and night, from any device",
];

// Split-screen patient & staff auth layout: brand panel + form column.
export default function AuthLayout({ children }) {
  return (
    <main className="flex min-h-[calc(100vh-4rem)] items-center justify-center px-4 py-12">
      <div className="grid w-full max-w-4xl overflow-hidden rounded-xl border border-line bg-surface shadow-sm lg:grid-cols-[1fr_1fr]">
        {/* Brand panel */}
        <div className="relative hidden flex-col justify-between bg-fg p-10 lg:flex">
          <Link href="/" className="inline-flex items-center gap-2.5">
            <Image
              src="/logo.svg"
              alt=""
              width={36}
              height={36}
              unoptimized
            />
            <span className="text-sm font-bold tracking-tight text-white">
              {hospitalInfo.shortName}
            </span>
          </Link>

          <div className="my-8 overflow-hidden rounded-lg">
            <Image
              src="/images/portal-care.svg"
              alt="Illustration of a medical record protected by a security shield"
              width={480}
              height={360}
              unoptimized
              className="h-auto w-full"
            />
          </div>

          <div>
            <ul className="space-y-2.5">
              {trustPoints.map((point) => (
                <li key={point} className="flex items-start gap-2 text-xs leading-relaxed text-onDark">
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#9DC1F0"
                    strokeWidth="3"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="mt-0.5 shrink-0"
                  >
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                  {point}
                </li>
              ))}
            </ul>
            <p className="mt-6 border-t border-onDark pt-4 text-xs text-onDark-muted">
              Need help signing in? Call {hospitalInfo.phone.general}
            </p>
          </div>
        </div>

        {/* Form column */}
        <div className="p-8 sm:p-10">
          <div className="mb-8 flex flex-col items-center text-center">
            <Link href="/" className="inline-flex items-center gap-2 lg:hidden">
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
            <div className="hidden text-xs font-semibold uppercase tracking-wider text-mute lg:block">
              Secure Patient &amp; Clinical Care Portal
            </div>
          </div>
          {children}
        </div>
      </div>
    </main>
  );
}
