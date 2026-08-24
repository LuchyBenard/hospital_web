import Link from "next/link";
import Image from "next/image";
import { hospitalInfo, departments, doctors, services, emergencyHotlines } from "@/constants";
import { DepartmentCard } from "@/components/hospital/department-card";
import { DoctorCard } from "@/components/hospital/doctor-card";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function HomePage() {
  return (
    <main>
      {/* Hero Section */}
      <section className="border-b border-line bg-surface py-16 sm:py-24">
        <div className="container-content">
          <div className="grid gap-12 lg:grid-cols-[1.2fr_1fr] items-center">
            <div>
              <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-line bg-bg px-3 py-1 text-xs font-semibold text-accent">
                <span className="h-2 w-2 rounded-full bg-accent animate-pulse" />
                MAGNET RECOGNIZED &bull; LEVEL I TRAUMA CENTER
              </div>
              <h1 className="t-display mb-6 text-fg">
                Advanced clinical medicine. Compassionate patient care.
              </h1>
              <p className="t-lead mb-8 max-w-xl">
                Providence General Hospital brings together leading board-certified
                specialists, precision robotic surgical technology, and 24/7 acute
                trauma readiness.
              </p>
              <div className="flex flex-wrap gap-3">
                <Link href="/appointments">
                  <Button size="lg">Schedule Appointment</Button>
                </Link>
                <Link href="/doctors">
                  <Button size="lg" variant="secondary">
                    Find a Doctor
                  </Button>
                </Link>
                <Link href="/emergency">
                  <Button
                    size="lg"
                    variant="secondary"
                    className="border-emergency text-emergency hover:bg-emergency-light"
                  >
                    Emergency Care
                  </Button>
                </Link>
              </div>
            </div>

            {/* Campus Art + Quick Access Card */}
            <div className="space-y-4">
              <div className="overflow-hidden rounded-xl border border-line bg-surface shadow-sm">
                <Image
                  src="/images/hero-facility.svg"
                  alt="Illustration of the Providence General Hospital campus with an ambulance at the emergency bay"
                  width={560}
                  height={420}
                  priority
                  unoptimized
                  className="h-auto w-full"
                />
              </div>
              <div className="space-y-4 rounded-xl border border-line bg-bg p-6 shadow-sm">
              <div className="flex items-center justify-between border-b border-line pb-4">
                <div>
                  <div className="text-xs font-bold uppercase tracking-wider text-mute">
                    Hospital Desk
                  </div>
                  <h3 className="text-lg font-bold text-fg">Quick Patient Services</h3>
                </div>
                <span className="badge badge-accent">Always Open</span>
              </div>

              <div className="grid gap-3 sm:grid-cols-2">
                <Link
                  href="/appointments"
                  className="rounded-lg border border-line bg-surface p-3.5 transition-colors hover:border-accent"
                >
                  <div className="font-semibold text-sm text-fg">Book Consultation</div>
                  <div className="text-xs text-mute mt-1">In-person & Telehealth</div>
                </Link>
                <Link
                  href="/doctors"
                  className="rounded-lg border border-line bg-surface p-3.5 transition-colors hover:border-accent"
                >
                  <div className="font-semibold text-sm text-fg">Doctor Directory</div>
                  <div className="text-xs text-mute mt-1">Specialists & Schedules</div>
                </Link>
                <Link
                  href="/departments"
                  className="rounded-lg border border-line bg-surface p-3.5 transition-colors hover:border-accent"
                >
                  <div className="font-semibold text-sm text-fg">Specialty Centers</div>
                  <div className="text-xs text-mute mt-1">Cardiology, Neuro, Surgery</div>
                </Link>
                <Link
                  href="/login"
                  className="rounded-lg border border-line bg-surface p-3.5 transition-colors hover:border-accent"
                >
                  <div className="font-semibold text-sm text-fg">Patient Portal</div>
                  <div className="text-xs text-mute mt-1">Lab Results & Records</div>
                </Link>
              </div>

              <div className="rounded-lg border border-line bg-emergency-light p-3.5">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-emergency">
                    Trauma Dispatch 24/7:
                  </span>
                  <a
                    href={`tel:${hospitalInfo.phone.emergency.replace(/[^0-9]/g, "")}`}
                    className="text-xs font-bold text-emergency hover:underline"
                  >
                    {hospitalInfo.phone.emergency}
                  </a>
                </div>
              </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Bar */}
      <section className="border-b border-line bg-surface py-8">
        <div className="container-content">
          <div className="grid grid-cols-2 gap-6 md:grid-cols-4">
            <div>
              <div className="text-2xl font-bold text-accent font-mono sm:text-3xl">
                40+ Years
              </div>
              <div className="text-xs text-mute mt-1 font-medium">
                Clinical Excellence Since {hospitalInfo.establishedYear}
              </div>
            </div>
            <div>
              <div className="text-2xl font-bold text-accent font-mono sm:text-3xl">
                8 Centers
              </div>
              <div className="text-xs text-mute mt-1 font-medium">
                Comprehensive Medical Specialties
              </div>
            </div>
            <div>
              <div className="text-2xl font-bold text-accent font-mono sm:text-3xl">
                150+ Doctors
              </div>
              <div className="text-xs text-mute mt-1 font-medium">
                Board-Certified Staff & Specialists
              </div>
            </div>
            <div>
              <div className="text-2xl font-bold text-emergency font-mono sm:text-3xl">
                Level I
              </div>
              <div className="text-xs text-mute mt-1 font-medium">
                Trauma & Stroke Resuscitation Bay
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Departments Section */}
      <section className="py-16 sm:py-20">
        <div className="container-content">
          <div className="mb-10 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
            <div>
              <span className="badge badge-accent mb-2">Clinical Specialties</span>
              <h2 className="text-2xl font-bold text-fg sm:text-3xl">
                Specialized Centers of Excellence
              </h2>
              <p className="t-lead max-w-2xl text-sm sm:text-base">
                Multidisciplinary clinical care spanning cardiology, neurology,
                pediatrics, orthopedics, oncology, and acute emergency medicine.
              </p>
            </div>
            <Link href="/departments">
              <Button variant="secondary" size="sm">
                All Departments &rarr;
              </Button>
            </Link>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {departments.slice(0, 4).map((dept) => (
              <DepartmentCard key={dept.id} department={dept} />
            ))}
          </div>
        </div>
      </section>

      {/* Doctors Spotlight Section */}
      <section className="border-t border-line bg-surface py-16 sm:py-20">
        <div className="container-content">
          <div className="mb-10 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
            <div>
              <span className="badge badge-accent mb-2">Medical Faculty</span>
              <h2 className="text-2xl font-bold text-fg sm:text-3xl">
                Meet Our Board-Certified Specialists
              </h2>
              <p className="t-lead max-w-2xl text-sm sm:text-base">
                Renowned leaders in surgery, diagnostics, and patient-centered
                treatment protocols.
              </p>
            </div>
            <Link href="/doctors">
              <Button variant="secondary" size="sm">
                View Full Medical Directory &rarr;
              </Button>
            </Link>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {doctors.slice(0, 4).map((doc) => (
              <DoctorCard key={doc.id} doctor={doc} />
            ))}
          </div>
        </div>
      </section>

      {/* Hospital Services Section */}
      <section className="border-t border-line py-16 sm:py-20">
        <div className="container-content">
          <div className="mb-10">
            <span className="badge badge-accent mb-2">Hospital Services</span>
            <h2 className="text-2xl font-bold text-fg sm:text-3xl">
              Comprehensive Inpatient & Outpatient Facilities
            </h2>
            <p className="t-lead max-w-2xl text-sm sm:text-base">
              Providing seamless diagnostics, robotic surgery, wellness assessments,
              and 24/7 on-site pharmacy support.
            </p>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {services.map((service) => (
              <Card
                key={service.id}
                className="flex flex-col justify-between transition-shadow hover:shadow-md"
              >
                <div>
                  <div className="mb-3 flex items-center justify-between">
                    <span className="badge badge-info text-xs">
                      {service.category}
                    </span>
                    <span className="text-xs font-semibold text-accent">
                      {service.badge}
                    </span>
                  </div>
                  <h3 className="mb-2 text-base font-bold text-fg">
                    {service.name}
                  </h3>
                  <p className="text-xs leading-relaxed text-mute">
                    {service.description}
                  </p>
                </div>
                <div className="mt-4 border-t border-line pt-3">
                  <Link
                    href="/appointments"
                    className="text-xs font-semibold text-accent hover:underline"
                  >
                    Inquire or Book &rarr;
                  </Link>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Patient Portal CTA Banner */}
      <section className="border-t border-line bg-surface py-16">
        <div className="container-content">
          <div className="grid items-center gap-10 rounded-xl border border-line bg-bg p-8 sm:p-12 lg:grid-cols-[1.35fr_1fr]">
            <div>
              <span className="badge badge-accent mb-3">Secure Patient Portal</span>
              <h2 className="text-2xl font-bold text-fg sm:text-3xl mb-4">
                Your medical records, one secure sign-in away
              </h2>
              <p className="t-lead text-sm sm:text-base mb-6 max-w-xl">
                View upcoming appointments, download diagnostic imaging reports,
                review active prescriptions, and communicate directly with your
                care team.
              </p>
              <div className="flex flex-wrap gap-3">
                <Link href="/login">
                  <Button size="lg">Sign In to Patient Portal</Button>
                </Link>
                <Link href="/signup">
                  <Button size="lg" variant="secondary">
                    Create Patient Account
                  </Button>
                </Link>
              </div>
            </div>
            <div className="hidden overflow-hidden rounded-lg lg:block">
              <Image
                src="/images/portal-care.svg"
                alt="Illustration of a medical record protected by a security shield"
                width={480}
                height={360}
                unoptimized
                className="h-auto w-full"
              />
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
