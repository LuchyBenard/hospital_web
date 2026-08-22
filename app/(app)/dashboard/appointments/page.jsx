"use client";

import { useState } from "react";
import { useAuth } from "@/contexts/auth-context";
import { listAppointments, cancelAppointment } from "@/lib/models/appointments";
import { StatusBadge } from "@/components/hospital/status-badge";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function PatientAppointmentsPage() {
  const { user } = useAuth();
  const [filter, setFilter] = useState("All");
  const [appointments, setAppointments] = useState(() =>
    listAppointments({ patientId: user?.id || "patient-001" })
  );
  const [message, setMessage] = useState("");

  const handleCancel = (id) => {
    if (confirm("Are you sure you want to cancel this scheduled appointment?")) {
      cancelAppointment(id);
      setAppointments(listAppointments({ patientId: user?.id || "patient-001" }));
      setMessage("Appointment has been cancelled.");
      setTimeout(() => setMessage(""), 4000);
    }
  };

  const filtered = appointments.filter((apt) => {
    if (filter === "All") return true;
    return apt.status.toLowerCase() === filter.toLowerCase();
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <span className="badge badge-accent mb-1">Schedule & Visits</span>
          <h1 className="text-2xl sm:text-3xl font-bold text-fg">
            My Appointments
          </h1>
          <p className="text-xs sm:text-sm text-mute">
            Manage your scheduled hospital visits, doctor follow-ups, and telehealth
            sessions.
          </p>
        </div>

        <Link href="/appointments">
          <Button size="sm">Schedule New Appointment</Button>
        </Link>
      </div>

      {message && (
        <div className="rounded-md border border-info bg-info-light p-3 text-xs font-semibold text-info">
          {message}
        </div>
      )}

      {/* Filter Tabs */}
      <div className="flex gap-2 border-b border-line pb-3">
        {["All", "Upcoming", "Completed", "Cancelled"].map((tab) => (
          <button
            key={tab}
            type="button"
            onClick={() => setFilter(tab)}
            className={`rounded-md px-3.5 py-1.5 text-xs font-semibold transition-colors ${
              filter === tab
                ? "bg-accent text-accent-fg"
                : "bg-surface text-mute hover:text-fg border border-line"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Appointments List */}
      {filtered.length > 0 ? (
        <div className="space-y-4">
          {filtered.map((apt) => (
            <Card key={apt.id} className="p-6 transition-shadow hover:shadow-sm">
              <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-start">
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <StatusBadge status={apt.status} />
                    <span className="text-xs font-mono text-mute">{apt.id}</span>
                    <span className="text-xs text-mute">&bull;</span>
                    <span className="text-xs font-semibold text-accent">
                      {apt.type}
                    </span>
                  </div>

                  <h3 className="text-lg font-bold text-fg">
                    {apt.doctorName}{" "}
                    <span className="text-xs font-normal text-mute">
                      ({apt.doctorSpecialty})
                    </span>
                  </h3>

                  <div className="grid gap-2 text-xs sm:grid-cols-2">
                    <div>
                      <span className="text-mute">Department:</span>{" "}
                      <span className="font-medium text-fg">{apt.departmentName}</span>
                    </div>
                    <div>
                      <span className="text-mute">Location:</span>{" "}
                      <span className="font-medium text-fg">{apt.location}</span>
                    </div>
                    <div>
                      <span className="text-mute">Date:</span>{" "}
                      <strong className="text-fg">{apt.date}</strong>
                    </div>
                    <div>
                      <span className="text-mute">Time:</span>{" "}
                      <strong className="text-fg">{apt.time}</strong>
                    </div>
                  </div>

                  {apt.notes && (
                    <div className="rounded bg-bg p-2 text-xs text-mute mt-2">
                      <span className="font-semibold text-fg">Visit Notes:</span>{" "}
                      {apt.notes}
                    </div>
                  )}
                </div>

                {apt.status === "Upcoming" && (
                  <div className="flex sm:flex-col gap-2 shrink-0">
                    <Button
                      variant="secondary"
                      size="sm"
                      onClick={() => handleCancel(apt.id)}
                      className="text-danger hover:bg-emergency-light"
                    >
                      Cancel Visit
                    </Button>
                  </div>
                )}
              </div>
            </Card>
          ))}
        </div>
      ) : (
        <Card className="p-12 text-center">
          <h3 className="text-base font-bold text-fg mb-1">
            No appointments found in this view
          </h3>
          <p className="text-xs text-mute mb-4">
            You currently have no {filter.toLowerCase()} appointments scheduled.
          </p>
          <Link href="/appointments">
            <Button size="sm">Book an Appointment</Button>
          </Link>
        </Card>
      )}
    </div>
  );
}
