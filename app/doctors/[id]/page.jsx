import { getDoctorById, listDoctors } from "@/lib/models/doctors";
import { getDepartmentById } from "@/lib/models/departments";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { notFound } from "next/navigation";

export function generateStaticParams() {
  return listDoctors().map((d) => ({ id: d.id }));
}

export function generateMetadata({ params }) {
  const doctor = getDoctorById(params.id);
  if (!doctor) return { title: "Doctor Not Found | Providence Health" };
  return {
    title: `${doctor.name} (${doctor.specialty}) | Providence General Hospital`,
    description: doctor.bio,
  };
}

export default function DoctorProfilePage({ params }) {
  const doctor = getDoctorById(params.id);
  if (!doctor) notFound();

  const dept = getDepartmentById(doctor.departmentId);

  return (
    <main className="container-content py-12 sm:py-16">
      {/* Breadcrumb */}
      <div className="mb-6 flex items-center gap-2 text-xs text-mute">
        <Link href="/doctors" className="hover:text-fg hover:underline">
          &larr; All Doctors
        </Link>
        <span>/</span>
        <span className="text-fg font-medium">{doctor.name}</span>
      </div>

      <div className="grid gap-8 lg:grid-cols-[1.5fr_1fr]">
        {/* Main Clinical Profile */}
        <div className="space-y-8">
          <Card className="p-6 sm:p-8">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
              <div>
                <span className="badge badge-accent mb-2">{doctor.specialty}</span>
                <h1 className="text-2xl sm:text-3xl font-bold text-fg mb-1">
                  {doctor.name}
                </h1>
                <p className="text-sm font-medium text-mute mb-3">{doctor.title}</p>
                {dept && (
                  <Link
                    href={`/departments/${dept.slug}`}
                    className="text-xs font-semibold text-accent hover:underline"
                  >
                    Department: {dept.name} &rarr;
                  </Link>
                )}
              </div>

              <div className="flex sm:flex-col items-end gap-2 shrink-0">
                <div className="flex items-center gap-1 rounded bg-bg px-2.5 py-1 text-sm font-semibold text-fg">
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="#0f766e"
                    stroke="#0f766e"
                    strokeWidth="1"
                  >
                    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                  </svg>
                  <span>{doctor.rating}</span>
                  <span className="text-xs text-mute">({doctor.reviewCount} reviews)</span>
                </div>
                <div className="text-xs font-semibold text-accent">
                  Fee: {doctor.consultationFee}
                </div>
              </div>
            </div>

            <div className="mt-6 border-t border-line pt-6">
              <h3 className="text-base font-bold text-fg mb-3">
                Clinical Background & Biography
              </h3>
              <p className="text-sm leading-relaxed text-mute">{doctor.bio}</p>
            </div>

            <div className="mt-6 grid gap-4 border-t border-line pt-6 sm:grid-cols-2 text-xs sm:text-sm">
              <div>
                <span className="text-mute block">Credentials & Education:</span>
                <span className="font-semibold text-fg">{doctor.qualifications}</span>
              </div>
              <div>
                <span className="text-mute block">Experience:</span>
                <span className="font-semibold text-fg">{doctor.experienceYears} Years Clinical Practice</span>
              </div>
              <div>
                <span className="text-mute block">Languages:</span>
                <span className="font-semibold text-fg">
                  {doctor.languages.join(", ")}
                </span>
              </div>
              <div>
                <span className="text-mute block">Contact Email:</span>
                <span className="font-semibold text-accent">{doctor.contactEmail}</span>
              </div>
            </div>
          </Card>

          {/* Clinical Schedule */}
          <Card className="p-6 sm:p-8">
            <h3 className="text-base font-bold text-fg mb-4">
              Regular Clinic Hours & Availability
            </h3>
            <div className="space-y-4">
              <div>
                <span className="text-xs font-semibold uppercase tracking-wider text-mute mb-2 block">
                  Available Clinic Days
                </span>
                <div className="flex flex-wrap gap-2">
                  {doctor.availableDays.map((day, i) => (
                    <span key={i} className="badge badge-info text-xs">
                      {day}
                    </span>
                  ))}
                </div>
              </div>

              <div>
                <span className="text-xs font-semibold uppercase tracking-wider text-mute mb-2 block">
                  Typical Consultation Time Slots
                </span>
                <div className="flex flex-wrap gap-2">
                  {doctor.availableSlots.map((slot, i) => (
                    <span key={i} className="badge badge-accent text-xs">
                      {slot}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </Card>
        </div>

        {/* Booking Sidebar Card */}
        <div>
          <Card className="sticky top-24 p-6 shadow-sm">
            <h3 className="text-lg font-bold text-fg mb-2">
              Book with {doctor.name}
            </h3>
            <p className="text-xs text-mute leading-relaxed mb-6">
              Select an available appointment slot for an in-person clinic visit or
              secure video consultation.
            </p>

            <div className="space-y-3 rounded-lg bg-bg p-4 mb-6 text-xs">
              <div className="flex justify-between">
                <span className="text-mute">Consultation:</span>
                <span className="font-bold text-fg">{doctor.consultationFee}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-mute">Location:</span>
                <span className="font-medium text-fg">{dept?.location || "Main Pavilion"}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-mute">Status:</span>
                <span className="font-semibold text-success">Accepting New Patients</span>
              </div>
            </div>

            <Link
              href={`/appointments?doctor=${encodeURIComponent(doctor.id)}&department=${encodeURIComponent(
                doctor.departmentSlug
              )}`}
              className="block"
            >
              <Button size="lg" className="w-full">
                Schedule Appointment Now
              </Button>
            </Link>

            <div className="mt-4 text-center">
              <span className="text-xs text-mute">
                Need urgent triage?{" "}
                <Link href="/emergency" className="text-emergency font-semibold hover:underline">
                  Call 24/7 ER
                </Link>
              </span>
            </div>
          </Card>
        </div>
      </div>
    </main>
  );
}
