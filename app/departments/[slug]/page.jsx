import { getDepartmentBySlug, listDepartments } from "@/lib/models/departments";
import { listDoctors } from "@/lib/models/doctors";
import { DoctorCard } from "@/components/hospital/doctor-card";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";

export function generateStaticParams() {
  return listDepartments().map((d) => ({ slug: d.slug }));
}

export function generateMetadata({ params }) {
  const dept = getDepartmentBySlug(params.slug);
  if (!dept) return { title: "Department Not Found" };
  return {
    title: dept.name,
    description: dept.description,
  };
}

export default function DepartmentDetailPage({ params }) {
  const dept = getDepartmentBySlug(params.slug);
  if (!dept) notFound();

  const deptDoctors = listDoctors({ departmentSlug: params.slug });

  return (
    <main className="container-content py-12 sm:py-16">
      {/* Breadcrumb */}
      <div className="mb-6 flex items-center gap-2 text-xs text-mute">
        <Link href="/departments" className="hover:text-fg hover:underline">
          &larr; All Departments
        </Link>
        <span>/</span>
        <span className="text-fg font-medium">{dept.shortName}</span>
      </div>

      {/* Header Banner */}
      <div className="rounded-xl border border-line bg-surface p-6 sm:p-10 mb-10">
        <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-start">
          <div className="max-w-2xl">
            <div className="flex items-center gap-2 mb-3">
              <span className="badge badge-accent">{dept.location}</span>
              {dept.emergencySupported && (
                <span className="badge badge-emergency">24/7 Acute Care</span>
              )}
            </div>
            <h1 className="text-2xl sm:text-4xl font-bold text-fg mb-4">
              {dept.name}
            </h1>
            <p className="t-lead text-sm sm:text-base leading-relaxed mb-6">
              {dept.description}
            </p>
            <div className="grid grid-cols-2 gap-4 border-t border-line pt-4 text-xs sm:text-sm">
              <div>
                <span className="text-mute block">Department Head:</span>
                <span className="font-semibold text-fg">{dept.headOfDept}</span>
              </div>
              <div>
                <span className="text-mute block">Direct Clinical Desk:</span>
                <span className="font-semibold text-accent">{dept.phoneExt}</span>
              </div>
            </div>
          </div>

          <div className="rounded-lg border border-line bg-bg p-5 lg:w-72 shrink-0">
            <div className="text-xs font-bold uppercase tracking-wider text-mute mb-2">
              Appointment Scheduling
            </div>
            <p className="text-xs text-mute mb-4">
              Book a direct outpatient evaluation or specialist consultation in{" "}
              {dept.shortName}.
            </p>
            <Link
              href={`/appointments?department=${encodeURIComponent(dept.slug)}`}
              className="block"
            >
              <Button className="w-full" size="sm">
                Schedule in {dept.shortName}
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* Services & Clinical Scope */}
      <div className="mb-12">
        <h2 className="text-xl sm:text-2xl font-bold text-fg mb-6">
          Clinical Capabilities & Specialized Treatments
        </h2>
        <div className="grid gap-4 sm:grid-cols-2">
          {dept.services.map((srv, idx) => (
            <Card key={idx} className="flex items-start gap-3 p-4">
              <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded bg-accent-light text-accent font-bold text-xs">
                {idx + 1}
              </div>
              <div>
                <h4 className="text-sm font-semibold text-fg">{srv}</h4>
                <p className="text-xs text-mute mt-0.5">
                  Administered by board-certified physicians using accredited hospital protocols.
                </p>
              </div>
            </Card>
          ))}
        </div>
      </div>

      {/* Doctors in this Department */}
      <div>
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-fg">
              Physicians & Clinical Specialists
            </h2>
            <p className="text-xs sm:text-sm text-mute">
              Board-certified practitioners on staff in {dept.name}.
            </p>
          </div>
          <Link href="/doctors">
            <Button variant="secondary" size="sm">
              All Doctors
            </Button>
          </Link>
        </div>

        {deptDoctors.length > 0 ? (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {deptDoctors.map((doc) => (
              <DoctorCard key={doc.id} doctor={doc} />
            ))}
          </div>
        ) : (
          <Card className="p-6 text-center text-sm text-mute">
            No active physician profiles listed for this specialty. Please call the
            department coordinator at {dept.phoneExt}.
          </Card>
        )}
      </div>
    </main>
  );
}
