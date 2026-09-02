import Link from "next/link";
import { Card } from "@/components/ui/card";

export function DepartmentCard({ department }) {
  if (!department) return null;

  return (
    <Card className="flex flex-col justify-between h-full lift transition-shadow hover:shadow-md p-6">
      <div>
        <div className="flex items-center justify-between gap-2 mb-3">
          <span className="badge badge-accent text-xs font-semibold">
            {department.location}
          </span>
          {department.emergencySupported && (
            <span className="badge badge-emergency text-xs">
              24/7 Acute Care
            </span>
          )}
        </div>

        <h3 className="mb-1.5 text-lg font-bold tracking-tight text-fg">
          {department.name}
        </h3>

        <p className="mb-4 text-xs leading-relaxed text-mute">
          {department.description}
        </p>

        {department.services && department.services.length > 0 && (
          <div className="mb-4 flex flex-wrap gap-1.5">
            {department.services.slice(0, 3).map((srv, idx) => (
              <span
                key={idx}
                className="inline-block rounded bg-bg px-2 py-1 text-[11px] font-medium text-mute border border-line"
              >
                {srv}
              </span>
            ))}
          </div>
        )}

        <div className="mb-4 rounded bg-bg p-3 text-xs border border-line">
          <div className="text-mute text-[11px]">Department Head:</div>
          <div className="font-semibold text-fg mt-0.5">{department.headOfDept}</div>
        </div>
      </div>

      <div className="border-t border-line pt-3 mt-auto">
        <Link
          href={`/departments/${department.slug}`}
          className="inline-flex items-center gap-1 text-xs font-bold text-accent hover:underline"
        >
          View Specialties & Doctors &rarr;
        </Link>
      </div>
    </Card>
  );
}
