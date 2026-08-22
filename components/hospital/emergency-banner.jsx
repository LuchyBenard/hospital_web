import Link from "next/link";
import { hospitalInfo } from "@/constants";

export function EmergencyBanner() {
  return (
    <div className="border-b border-line bg-emergency-light py-2.5">
      <div className="container-content flex flex-col items-center justify-between gap-2 text-xs sm:flex-row sm:text-sm">
        <div className="flex items-center gap-2 text-emergency">
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
            <line x1="12" y1="9" x2="12" y2="13" />
            <line x1="12" y1="17" x2="12.01" y2="17" />
          </svg>
          <span className="font-semibold tracking-wide">
            24/7 EMERGENCY & LEVEL I TRAUMA CENTER:
          </span>
          <span className="text-fg">Immediate Resuscitation & Acute Triage</span>
        </div>
        <div className="flex items-center gap-3">
          <a
            href={`tel:${hospitalInfo.phone.emergency.replace(/[^0-9]/g, "")}`}
            className="inline-flex items-center gap-1.5 font-bold text-emergency hover:underline"
          >
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
            </svg>
            {hospitalInfo.phone.emergency}
          </a>
          <span className="text-mute">|</span>
          <Link
            href="/emergency"
            className="text-xs font-semibold text-emergency hover:underline"
          >
            View Protocols &rarr;
          </Link>
        </div>
      </div>
    </div>
  );
}
