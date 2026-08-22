import { listDepartments } from "@/lib/models/departments";
import { DepartmentCard } from "@/components/hospital/department-card";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export const metadata = {
  title: "Clinical Departments | Providence General Hospital",
  description:
    "Explore our 8 specialized medical departments, clinical teams, and advanced surgical facilities.",
};

export default function DepartmentsPage() {
  const depts = listDepartments();

  return (
    <main className="container-content py-12 sm:py-16">
      <div className="mb-10 max-w-2xl">
        <span className="badge badge-accent mb-2">Specialties & Pavilions</span>
        <h1 className="t-display text-3xl sm:text-4xl text-fg mb-4">
          Clinical Departments
        </h1>
        <p className="t-lead text-sm sm:text-base">
          From Level I Emergency Trauma to Robotic Orthopedic Joint Replacements,
          our specialized pavilions house board-certified physicians and dedicated
          diagnostic suites.
        </p>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {depts.map((dept) => (
          <DepartmentCard key={dept.id} department={dept} />
        ))}
      </div>

      <div className="mt-16 rounded-xl border border-line bg-surface p-8 text-center sm:p-10">
        <h3 className="text-xl font-bold text-fg mb-2">
          Need assistance finding the right medical specialty?
        </h3>
        <p className="text-sm text-mute max-w-xl mx-auto mb-6">
          Our clinical coordinators can evaluate your symptoms or physician referrals
          and connect you with the appropriate department head.
        </p>
        <div className="flex justify-center gap-3">
          <Link href="/appointments">
            <Button>Schedule a Consultation</Button>
          </Link>
          <Link href="/contact">
            <Button variant="secondary">Contact Hospital Desk</Button>
          </Link>
        </div>
      </div>
    </main>
  );
}
