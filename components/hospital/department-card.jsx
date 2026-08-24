import Link from "next/link";
import { Card } from "@/components/ui/card";
import { DepartmentIcon } from "@/components/hospital/department-icon";

export function DepartmentCard({ department }) {
  if (!department) return null;

  return (
    <Card className="flex flex-col justify-between transition-shadow hover:shadow-md">
      <div>
        <div className="relative mb-4 flex h-24 items-center justify-center rounded-lg bg-accent-light">
          <span className="text-accent">
            <DepartmentIcon name={department.icon} size={34} />
          </span>
          {department.emergencySupported && (
            <span className="badge badge-emergency absolute right-3 top-3 text-xs">
              24/7 Acute
            </span>
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
