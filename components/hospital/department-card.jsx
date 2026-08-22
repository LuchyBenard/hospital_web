import Link from "next/link";
import { Card } from "@/components/ui/card";

export function DepartmentCard({ department }) {
  if (!department) return null;

  return (
    <Card className="flex flex-col justify-between transition-shadow hover:shadow-md">
      <div>
        <div className="mb-3 flex items-center justify-between">
          <div className="flex h-10 w-10 items-center justify-center rounded-md bg-accent-light text-accent">
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
            </svg>
          </div>
          {department.emergencySupported && (
            <span className="badge badge-emergency text-xs">24/7 Acute</span>
          )}
        </div>

        <h3 className="mb-1 text-base font-semibold tracking-tight text-fg">
          {department.name}
        </h3>
        <p className="mb-3 text-xs text-mute">{department.location}</p>

        <p className="mb-4 text-xs leading-relaxed text-mute">
          {department.description}
        </p>

        <div className="mb-4 space-y-1 rounded bg-bg p-2.5 text-xs">
          <div className="text-xs font-medium text-mute">Department Head:</div>
          <div className="font-semibold text-fg">{department.headOfDept}</div>
        </div>
      </div>

      <div className="border-t border-line pt-3">
        <Link
          href={`/departments/${department.slug}`}
          className="inline-flex items-center gap-1 text-xs font-semibold text-accent hover:underline"
        >
          View Specialties & Doctors &rarr;
        </Link>
      </div>
    </Card>
  );
}
