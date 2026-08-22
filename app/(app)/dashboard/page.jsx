"use client";

import { useAuth } from "@/contexts/auth-context";
import { listAppointments } from "@/lib/models/appointments";
import { listRecords } from "@/lib/models/records";
import { listPrescriptions } from "@/lib/models/prescriptions";
import { StatusBadge } from "@/components/hospital/status-badge";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function PatientDashboardPage() {
  const { user } = useAuth();
  const appointments = listAppointments({ patientId: user?.id || "patient-001" });
  const records = listRecords({ patientId: user?.id || "patient-001" });
  const prescriptions = listPrescriptions({ patientId: user?.id || "patient-001" });

  const nextAppointment = appointments.find((a) => a.status === "Upcoming");

  return (
    <div className="space-y-8">
      {/* Patient Welcome Banner */}
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <span className="badge badge-accent mb-1">Secure Patient Portal</span>
          <h1 className="text-2xl sm:text-3xl font-bold text-fg">
            Welcome back, {user?.name || "Patient"}
          </h1>
          <p className="text-xs sm:text-sm text-mute">
            MRN: <span className="font-mono font-bold text-fg">{user?.mrn || "MRN-48920-A"}</span>{" "}
            &bull; Primary Physician:{" "}
            <span className="font-semibold text-fg">
              {user?.primaryPhysician || "Dr. Sarah Jenkins"}
            </span>
          </p>
        </div>

        <div className="flex gap-2">
          <Link href="/appointments">
            <Button size="sm">Book New Appointment</Button>
          </Link>
          <Link href="/dashboard/records">
            <Button size="sm" variant="secondary">
              View Lab Reports
            </Button>
          </Link>
        </div>
      </div>

      {/* Next Appointment Alert */}
      {nextAppointment && (
        <Card className="border-accent bg-accent-light p-6">
          <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="badge badge-success text-xs">Next Upcoming Visit</span>
                <span className="text-xs font-semibold text-accent">
                  {nextAppointment.type}
                </span>
              </div>
              <h3 className="text-lg font-bold text-fg">
                {nextAppointment.doctorName} &bull; {nextAppointment.departmentName}
              </h3>
              <p className="text-xs text-mute">
                Scheduled for{" "}
                <strong className="text-fg">{nextAppointment.date}</strong> at{" "}
                <strong className="text-fg">{nextAppointment.time}</strong> in{" "}
                <span>{nextAppointment.location}</span>
              </p>
            </div>

            <div className="flex gap-2">
              <Link href="/dashboard/appointments">
                <Button size="sm">Manage Visit</Button>
              </Link>
            </div>
          </div>
        </Card>
      )}

      {/* Patient Health Summary Badges */}
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
        <Card className="p-4">
          <span className="text-xs text-mute font-medium block mb-1">Blood Group</span>
          <span className="text-lg font-bold text-accent">{user?.bloodGroup || "O+"}</span>
          <span className="text-xs text-mute block mt-1">Confirmed on file</span>
        </Card>

        <Card className="p-4">
          <span className="text-xs text-mute font-medium block mb-1">Allergies</span>
          <div className="flex flex-wrap gap-1 mt-1">
            {(user?.allergies || ["Penicillin", "Latex"]).map((alg, i) => (
              <span key={i} className="badge badge-emergency text-xs">
                {alg}
              </span>
            ))}
          </div>
        </Card>

        <Card className="p-4">
          <span className="text-xs text-mute font-medium block mb-1">Insurance</span>
          <span className="text-xs font-bold text-fg block truncate">
            {user?.insuranceProvider?.split("(")[0] || "BlueCross Premera"}
          </span>
          <span className="text-xs text-success block mt-1">Active Coverage</span>
        </Card>

        <Card className="p-4">
          <span className="text-xs text-mute font-medium block mb-1">Emergency Contact</span>
          <span className="text-xs font-bold text-fg block">
            {user?.emergencyContact?.name || "Thomas Quinn"} (
            {user?.emergencyContact?.relationship || "Spouse"})
          </span>
          <span className="text-xs text-mute block mt-1">
            {user?.emergencyContact?.phone || "+1 (555) 876-5432"}
          </span>
        </Card>
      </div>

      {/* Grid: Recent Records & Active Medications */}
      <div className="grid gap-8 lg:grid-cols-2">
        {/* Recent Medical Records */}
        <Card className="p-6">
          <div className="mb-4 flex items-center justify-between border-b border-line pb-3">
            <div>
              <h3 className="text-base font-bold text-fg">Recent Medical Records</h3>
              <p className="text-xs text-mute">Diagnostic labs and imaging summaries</p>
            </div>
            <Link
              href="/dashboard/records"
              className="text-xs font-semibold text-accent hover:underline"
            >
              View all &rarr;
            </Link>
          </div>

          <div className="space-y-3">
            {records.slice(0, 3).map((rec) => (
              <div
                key={rec.id}
                className="rounded-lg border border-line p-3 transition-colors hover:bg-bg"
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="font-semibold text-xs text-fg">{rec.title}</span>
                  <StatusBadge status={rec.status} />
                </div>
                <div className="text-xs text-mute mb-2">
                  {rec.department} &bull; {rec.date}
                </div>
                <p className="text-xs text-mute leading-relaxed line-clamp-2">
                  {rec.summary}
                </p>
              </div>
            ))}
          </div>
        </Card>

        {/* Active Prescriptions */}
        <Card className="p-6">
          <div className="mb-4 flex items-center justify-between border-b border-line pb-3">
            <div>
              <h3 className="text-base font-bold text-fg">Active Prescriptions</h3>
              <p className="text-xs text-mute">Medications and refill schedules</p>
            </div>
            <Link
              href="/dashboard/prescriptions"
              className="text-xs font-semibold text-accent hover:underline"
            >
              Manage Rx &rarr;
            </Link>
          </div>

          <div className="space-y-3">
            {prescriptions.map((rx) => (
              <div
                key={rx.id}
                className="rounded-lg border border-line p-3 transition-colors hover:bg-bg"
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="font-semibold text-xs text-fg">
                    {rx.medication} ({rx.dosage})
                  </span>
                  <StatusBadge status={rx.status} />
                </div>
                <div className="text-xs text-mute mb-1">
                  Schedule: <span className="text-fg">{rx.frequency}</span>
                </div>
                <div className="flex items-center justify-between text-xs pt-1 border-t border-line">
                  <span className="text-mute">
                    Prescribed by: {rx.prescribingDoctor}
                  </span>
                  <span className="font-semibold text-accent">
                    {rx.refillsRemaining} refills left
                  </span>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}
