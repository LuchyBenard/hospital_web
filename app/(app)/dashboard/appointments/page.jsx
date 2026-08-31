"use client";

import { useState } from "react";
import { useAuth } from "@/contexts/auth-context";
import {
  listAppointments,
  cancelAppointment,
  rescheduleAppointment,
} from "@/lib/models/appointments";
import { StatusBadge } from "@/components/hospital/status-badge";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input, Field } from "@/components/ui/input";
import Link from "next/link";

export default function PatientAppointmentsPage() {
  const { user } = useAuth();
  const [filter, setFilter] = useState("All");
  const [appointments, setAppointments] = useState(() =>
    listAppointments({ patientId: user?.id || "patient-001" })
  );
  const [message, setMessage] = useState("");
  const [reschedulingApt, setReschedulingApt] = useState(null);
  const [newDate, setNewDate] = useState("");
  const [newTime, setNewTime] = useState("10:00 AM");

  const refreshList = () => {
    setAppointments(listAppointments({ patientId: user?.id || "patient-001" }));
  };

  const handleCancel = (id) => {
    if (confirm("Are you sure you want to cancel this scheduled appointment?")) {
      cancelAppointment(id);
      refreshList();
      setMessage("Appointment has been cancelled.");
      setTimeout(() => setMessage(""), 4000);
    }
  };

  const handleRescheduleSubmit = (e) => {
    e.preventDefault();
    if (!reschedulingApt || !newDate || !newTime) return;
    rescheduleAppointment(reschedulingApt.id, newDate, newTime);
    refreshList();
    setMessage(`Appointment rescheduled to ${newDate} at ${newTime}.`);
    setReschedulingApt(null);
    setTimeout(() => setMessage(""), 4000);
  };

  const downloadIcs = (apt) => {
    const startStr = apt.date.replace(/-/g, "") + "T100000Z";
    const endStr = apt.date.replace(/-/g, "") + "T110000Z";
    const icsContent = [
      "BEGIN:VCALENDAR",
      "VERSION:2.0",
      "PRODID:-//Providence General Hospital//Health Portal//EN",
      "BEGIN:VEVENT",
      `SUMMARY:Medical Visit: ${apt.doctorName} (${apt.departmentName})`,
      `DESCRIPTION:Clinical appointment for ${apt.type}. Location: ${apt.location}`,
      `LOCATION:${apt.location}`,
      `DTSTART:${startStr}`,
      `DTEND:${endStr}`,
      "STATUS:CONFIRMED",
      "END:VEVENT",
      "END:VCALENDAR",
    ].join("\r\n");

    const blob = new Blob([icsContent], { type: "text/calendar;charset=utf-8" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `appointment-${apt.id}.ics`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
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

                  {apt.encounterNotes && (
                    <div className="rounded bg-accent-light p-2.5 text-xs text-accent mt-2">
                      <span className="font-semibold block mb-0.5">
                        Clinical Encounter Summary:
                      </span>
                      {apt.encounterNotes}
                    </div>
                  )}
                </div>

                {/* Actions */}
                <div className="flex flex-wrap sm:flex-col gap-2 shrink-0">
                  {apt.type.toLowerCase().includes("telehealth") &&
                    apt.status === "Upcoming" && (
                      <Link href="/dashboard/telehealth">
                        <Button size="sm" className="w-full bg-success hover:opacity-90">
                          Join Video Call
                        </Button>
                      </Link>
                    )}

                  {apt.status === "Upcoming" && (
                    <>
                      <Button
                        variant="secondary"
                        size="sm"
                        onClick={() => {
                          setReschedulingApt(apt);
                          setNewDate(apt.date);
                          setNewTime(apt.time);
                        }}
                      >
                        Reschedule
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => downloadIcs(apt)}
                        className="text-xs"
                      >
                        Add to Calendar (.ics)
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleCancel(apt.id)}
                        className="text-danger hover:bg-emergency-light text-xs"
                      >
                        Cancel Visit
                      </Button>
                    </>
                  )}
                </div>
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

      {/* Reschedule Modal */}
      {reschedulingApt && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4 backdrop-blur-sm">
          <div className="w-full max-w-md rounded-xl border border-line bg-surface p-6 shadow-lg">
            <div className="mb-4 flex items-center justify-between border-b border-line pb-3">
              <h3 className="text-base font-bold text-fg">
                Reschedule Appointment
              </h3>
              <button
                onClick={() => setReschedulingApt(null)}
                className="text-mute hover:text-fg font-bold"
              >
                &times;
              </button>
            </div>

            <form onSubmit={handleRescheduleSubmit} className="space-y-4">
              <div className="text-xs text-mute">
                Rescheduling visit with{" "}
                <strong className="text-fg">{reschedulingApt.doctorName}</strong> (
                {reschedulingApt.departmentName})
              </div>

              <Field label="New Date" htmlFor="reschedDate">
                <Input
                  id="reschedDate"
                  type="date"
                  min={new Date().toISOString().split("T")[0]}
                  value={newDate}
                  onChange={(e) => setNewDate(e.target.value)}
                  required
                />
              </Field>

              <div>
                <label className="text-xs font-semibold uppercase tracking-wider text-mute mb-1.5 block">
                  New Time Slot
                </label>
                <select
                  className="input-clinical h-10 text-sm"
                  value={newTime}
                  onChange={(e) => setNewTime(e.target.value)}
                  required
                >
                  <option value="08:30 AM">08:30 AM</option>
                  <option value="09:30 AM">09:30 AM</option>
                  <option value="10:30 AM">10:30 AM</option>
                  <option value="11:30 AM">11:30 AM</option>
                  <option value="01:30 PM">01:30 PM</option>
                  <option value="03:00 PM">03:00 PM</option>
                  <option value="04:30 PM">04:30 PM</option>
                </select>
              </div>

              <div className="flex justify-end gap-2 pt-2 border-t border-line">
                <Button
                  type="button"
                  variant="secondary"
                  size="sm"
                  onClick={() => setReschedulingApt(null)}
                >
                  Cancel
                </Button>
                <Button type="submit" size="sm">
                  Save New Schedule
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
