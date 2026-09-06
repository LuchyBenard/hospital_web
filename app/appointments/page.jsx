"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { departments, doctors, hospitalInfo } from "@/constants";
import { createAppointment } from "@/lib/models/appointments";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input, Field } from "@/components/ui/input";
import { Spinner } from "@/components/ui/spinner";
import { cn } from "@/lib/utils";
import Link from "next/link";

const STEPS = [
  { step: 1, label: "Physician" },
  { step: 2, label: "Schedule" },
  { step: 3, label: "Details" },
  { step: 4, label: "Review" },
];

function AppointmentFormContent() {
  const searchParams = useSearchParams();
  const initialDoctorId = searchParams.get("doctor") || "";
  const initialDeptSlug = searchParams.get("department") || "";

  const [step, setStep] = useState(1);
  const [selectedDeptSlug, setSelectedDeptSlug] = useState(initialDeptSlug);
  const [selectedDoctorId, setSelectedDoctorId] = useState(initialDoctorId);
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [type, setType] = useState("In-Person Consultation");
  const [patientName, setPatientName] = useState("Ada Quinn");
  const [patientEmail, setPatientEmail] = useState("ada@example.com");
  const [patientPhone, setPatientPhone] = useState("+1 (555) 234-5678");
  const [notes, setNotes] = useState("");
  const [confirmedAppointment, setConfirmedAppointment] = useState(null);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");

  // Filter doctors based on selected department
  const availableDoctors = doctors.filter((doc) => {
    if (!selectedDeptSlug) return true;
    return doc.departmentSlug.toLowerCase() === selectedDeptSlug.toLowerCase();
  });

  const selectedDoctor = doctors.find((d) => d.id === selectedDoctorId);
  const deptObj = departments.find((d) => d.slug === selectedDeptSlug) || null;

  useEffect(() => {
    if (initialDoctorId) {
      const doc = doctors.find((d) => d.id === initialDoctorId);
      if (doc) {
        setSelectedDeptSlug(doc.departmentSlug);
        setSelectedDoctorId(doc.id);
        if (doc.availableSlots && doc.availableSlots.length > 0) {
          setTime(doc.availableSlots[0]);
        }
      }
    }
  }, [initialDoctorId]);

  const canProceed = () => {
    if (step === 1) {
      return Boolean(selectedDeptSlug && selectedDoctorId);
    }
    if (step === 2) {
      return Boolean(date && time);
    }
    if (step === 3) {
      return Boolean(patientName && patientEmail && patientPhone);
    }
    return true;
  };

  const handleNext = () => {
    setError("");
    if (!canProceed()) {
      setError("Please complete all required fields before continuing.");
      return;
    }
    setStep((s) => Math.min(4, s + 1));
  };

  const handleBack = () => {
    setError("");
    setStep((s) => Math.max(1, s - 1));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setBusy(true);

    const doctorObj = doctors.find((d) => d.id === selectedDoctorId);

    const newApt = createAppointment({
      patientId: "patient-001",
      patientName,
      doctorId: doctorObj?.id || "doc-sarah-jenkins",
      doctorName: doctorObj?.name || "Dr. Sarah Jenkins",
      doctorSpecialty: doctorObj?.specialty || "Cardiology",
      departmentName: deptObj?.name || "Cardiology & Vascular Medicine",
      date: date || new Date(Date.now() + 86400000 * 3).toISOString().split("T")[0],
      time: time || "10:00 AM",
      location: deptObj?.location || "Main Clinical Pavilion",
      type,
      notes: notes || "General Consultation",
    });

    setTimeout(() => {
      setConfirmedAppointment(newApt);
      setBusy(false);
    }, 400);
  };

  if (confirmedAppointment) {
    return (
      <Card className="max-w-2xl border-accent p-8 sm:p-10">
        <div className="mb-6 flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-success-light text-success font-bold">
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <polyline points="20 6 9 17 4 12" />
            </svg>
          </div>
          <div>
            <span className="badge badge-success mb-1">Appointment Confirmed</span>
            <h2 className="text-xl font-bold text-fg">
              Your Consultation is Scheduled
            </h2>
          </div>
        </div>

        <div className="rounded-lg border border-line bg-bg p-6 space-y-3 mb-6 text-sm">
          <div className="flex justify-between border-b border-line pb-2">
            <span className="text-mute">Confirmation ID:</span>
            <span className="font-mono font-bold text-fg">
              {confirmedAppointment.id}
            </span>
          </div>
          <div className="flex justify-between border-b border-line pb-2">
            <span className="text-mute">Patient:</span>
            <span className="font-semibold text-fg">
              {confirmedAppointment.patientName}
            </span>
          </div>
          <div className="flex justify-between border-b border-line pb-2">
            <span className="text-mute">Physician:</span>
            <span className="font-semibold text-accent">
              {confirmedAppointment.doctorName} ({confirmedAppointment.doctorSpecialty})
            </span>
          </div>
          <div className="flex justify-between border-b border-line pb-2">
            <span className="text-mute">Department:</span>
            <span className="font-medium text-fg">
              {confirmedAppointment.departmentName}
            </span>
          </div>
          <div className="flex justify-between border-b border-line pb-2">
            <span className="text-mute">Date & Time:</span>
            <span className="font-semibold text-fg">
              {confirmedAppointment.date} at {confirmedAppointment.time}
            </span>
          </div>
          <div className="flex justify-between border-b border-line pb-2">
            <span className="text-mute">Location:</span>
            <span className="font-medium text-fg">
              {confirmedAppointment.location}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-mute">Type:</span>
            <span className="font-medium text-fg">{confirmedAppointment.type}</span>
          </div>
        </div>

        <div className="flex flex-wrap gap-3">
          <Link href="/dashboard/appointments" className="flex-1">
            <Button className="w-full">View in Patient Portal</Button>
          </Link>
          <Button
            variant="secondary"
            onClick={() => {
              setConfirmedAppointment(null);
              setSelectedDoctorId("");
              setStep(1);
            }}
            className="flex-1"
          >
            Book Another Appointment
          </Button>
        </div>
      </Card>
    );
  }

  return (
    <div className="grid gap-8 lg:grid-cols-[1.5fr_1fr]">
      <div className="space-y-6">
        {/* Step Progress Indicator */}
        <Card className="p-5">
          <div className="grid grid-cols-4 gap-2 text-center">
            {STEPS.map((stg) => {
              const isDone = step > stg.step;
              const isCurrent = step === stg.step;
              return (
                <div key={stg.step} className="space-y-1">
                  <div
                    className={cn(
                      "mx-auto flex h-8 w-8 items-center justify-center rounded-full text-sm font-bold transition-colors",
                      isDone
                        ? "bg-accent text-accent-fg"
                        : isCurrent
                        ? "bg-accent-light text-accent border border-accent"
                        : "bg-bg text-mute border border-line"
                    )}
                  >
                    {isDone ? "✓" : stg.step}
                  </div>
                  <div
                    className={cn(
                      "text-xs font-semibold hidden sm:block",
                      isCurrent ? "text-accent" : isDone ? "text-fg" : "text-mute"
                    )}
                  >
                    {stg.label}
                  </div>
                </div>
              );
            })}
          </div>
          <div className="mt-3 text-center text-[11px] font-semibold uppercase tracking-wider text-mute">
            Step {step} of 4 &bull; {STEPS[step - 1].label}
          </div>
        </Card>

        <form onSubmit={handleSubmit}>
          {/* Step 1: Physician */}
          {step === 1 && (
            <Card className="p-6 sm:p-8 space-y-5">
              <h3 className="text-base font-bold text-fg border-b border-line pb-3">
                1. Select Clinical Specialty & Physician
              </h3>

              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="text-xs font-semibold uppercase tracking-wider text-mute mb-1.5 block">
                    Medical Department *
                  </label>
                  <select
                    className="input-clinical h-10 text-sm"
                    value={selectedDeptSlug}
                    onChange={(e) => {
                      setSelectedDeptSlug(e.target.value);
                      setSelectedDoctorId("");
                    }}
                    required
                  >
                    <option value="">-- Choose Department --</option>
                    {departments.map((d) => (
                      <option key={d.id} value={d.slug}>
                        {d.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="text-xs font-semibold uppercase tracking-wider text-mute mb-1.5 block">
                    Physician / Specialist *
                  </label>
                  <select
                    className="input-clinical h-10 text-sm"
                    value={selectedDoctorId}
                    onChange={(e) => {
                      setSelectedDoctorId(e.target.value);
                      const doc = doctors.find((d) => d.id === e.target.value);
                      if (doc && doc.availableSlots?.length) {
                        setTime(doc.availableSlots[0]);
                      }
                    }}
                    required
                  >
                    <option value="">-- Choose Specialist --</option>
                    {availableDoctors.map((doc) => (
                      <option key={doc.id} value={doc.id}>
                        {doc.name} ({doc.specialty})
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="text-xs font-semibold uppercase tracking-wider text-mute mb-1.5 block">
                  Consultation Format
                </label>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => setType("In-Person Consultation")}
                    className={`rounded-md border p-3 text-left text-xs font-semibold transition-colors ${
                      type === "In-Person Consultation"
                        ? "border-accent bg-accent-light text-accent"
                        : "border-line bg-surface text-mute"
                    }`}
                  >
                    In-Person Hospital Visit
                  </button>
                  <button
                    type="button"
                    onClick={() => setType("Telehealth Virtual Care")}
                    className={`rounded-md border p-3 text-left text-xs font-semibold transition-colors ${
                      type === "Telehealth Virtual Care"
                        ? "border-accent bg-accent-light text-accent"
                        : "border-line bg-surface text-mute"
                    }`}
                  >
                    Telehealth Video Call
                  </button>
                </div>
              </div>

              {selectedDoctor && (
                <div className="rounded bg-bg p-4 text-xs space-y-1.5 border border-line">
                  <div className="flex justify-between">
                    <span className="text-mute">Consultation Fee:</span>
                    <span className="font-bold text-accent">
                      {selectedDoctor.consultationFee}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-mute">Clinic Days:</span>
                    <span className="font-semibold text-fg">
                      {selectedDoctor.availableDays.join(", ")}
                    </span>
                  </div>
                </div>
              )}
            </Card>
          )}

          {/* Step 2: Schedule */}
          {step === 2 && (
            <Card className="p-6 sm:p-8 space-y-5">
              <h3 className="text-base font-bold text-fg border-b border-line pb-3">
                2. Preferred Schedule & Time Slot
              </h3>

              <div className="grid gap-4 sm:grid-cols-2">
                <Field label="Preferred Date" htmlFor="date">
                  <Input
                    id="date"
                    type="date"
                    min={new Date().toISOString().split("T")[0]}
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    required
                  />
                </Field>

                <div>
                  <label className="text-xs font-semibold uppercase tracking-wider text-mute mb-1.5 block">
                    Available Time Slot *
                  </label>
                  <select
                    className="input-clinical h-10 text-sm"
                    value={time}
                    onChange={(e) => setTime(e.target.value)}
                    required
                  >
                    {selectedDoctor?.availableSlots ? (
                      selectedDoctor.availableSlots.map((slot, i) => (
                        <option key={i} value={slot}>
                          {slot}
                        </option>
                      ))
                    ) : (
                      <>
                        <option value="09:00 AM">09:00 AM</option>
                        <option value="10:30 AM">10:30 AM</option>
                        <option value="01:30 PM">01:30 PM</option>
                        <option value="03:00 PM">03:00 PM</option>
                      </>
                    )}
                  </select>
                </div>
              </div>

              <div className="rounded bg-bg p-4 text-xs text-mute leading-relaxed border border-line">
                {selectedDoctor ? (
                  <>
                    <strong className="text-fg block mb-1">
                      {selectedDoctor.name}
                    </strong>
                    Available slots are shown for{" "}
                    <span className="font-semibold text-fg">
                      {selectedDoctor.availableDays.join(", ")}.
                    </span>{" "}
                    Arrive 15 minutes early for registration.
                  </>
                ) : (
                  "Select a physician in Step 1 to see their live availability."
                )}
              </div>
            </Card>
          )}

          {/* Step 3: Patient Details */}
          {step === 3 && (
            <Card className="p-6 sm:p-8 space-y-5">
              <h3 className="text-base font-bold text-fg border-b border-line pb-3">
                3. Patient Details & Reason for Visit
              </h3>

              <div className="grid gap-4 sm:grid-cols-3">
                <Field label="Patient Name" htmlFor="patientName">
                  <Input
                    id="patientName"
                    value={patientName}
                    onChange={(e) => setPatientName(e.target.value)}
                    required
                  />
                </Field>
                <Field label="Email Address" htmlFor="patientEmail">
                  <Input
                    id="patientEmail"
                    type="email"
                    value={patientEmail}
                    onChange={(e) => setPatientEmail(e.target.value)}
                    required
                  />
                </Field>
                <Field label="Phone Number" htmlFor="patientPhone">
                  <Input
                    id="patientPhone"
                    value={patientPhone}
                    onChange={(e) => setPatientPhone(e.target.value)}
                    required
                  />
                </Field>
              </div>

              <div>
                <label className="text-xs font-semibold uppercase tracking-wider text-mute mb-1.5 block">
                  Symptoms or Reason for Consultation (Optional)
                </label>
                <textarea
                  className="input-clinical"
                  rows={3}
                  placeholder="Describe your symptoms, previous diagnoses, or referral notes..."
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                />
              </div>
            </Card>
          )}

          {/* Step 4: Review & Confirm */}
          {step === 4 && (
            <Card className="p-6 sm:p-8 space-y-5">
              <h3 className="text-base font-bold text-fg border-b border-line pb-3">
                4. Review Your Appointment
              </h3>

              <div className="rounded-lg border border-line bg-bg p-6 space-y-3 text-sm">
                <ReviewRow label="Department" value={deptObj?.name} />
                <ReviewRow
                  label="Physician"
                  value={`${selectedDoctor?.name || "Dr. Sarah Jenkins"} (${
                    selectedDoctor?.specialty || "Cardiology"
                  })`}
                />
                <ReviewRow label="Consultation Type" value={type} />
                <ReviewRow
                  label="Date & Time"
                  value={date ? `${date} at ${time}` : "Flexible date, time TBD"}
                />
                <ReviewRow label="Patient" value={patientName} />
                <ReviewRow label="Contact" value={`${patientEmail} / ${patientPhone}`} />
                {notes && <ReviewRow label="Reason for Visit" value={notes} />}
              </div>

              <div className="rounded-md border border-info bg-info-light p-3 text-xs text-fg leading-relaxed">
                <strong className="block mb-0.5">Before you confirm:</strong>
                A confirmation will be sent by SMS and email. You can cancel or
                reschedule from your Patient Portal any time up to 4 hours before
                the visit.
              </div>
            </Card>
          )}

          {error && (
            <div className="mt-4 rounded-md border border-emergency bg-emergency-light p-3 text-xs font-semibold text-emergency">
              {error}
            </div>
          )}

          {/* Wizard Navigation */}
          <div className="mt-5 flex items-center justify-between gap-3">
            <Button
              type="button"
              variant="secondary"
              onClick={handleBack}
              disabled={step === 1}
              className={cn(step === 1 && "invisible")}
            >
              &larr; Back
            </Button>

            {step < 4 ? (
              <Button type="button" size="lg" onClick={handleNext}>
                Continue &rarr;
              </Button>
            ) : (
              <Button type="submit" size="lg" disabled={busy}>
                {busy ? "Booking Appointment..." : "Confirm & Schedule Appointment"}
              </Button>
            )}
          </div>
        </form>
      </div>

      {/* Schedule Help Sidebar */}
      <div className="space-y-6">
        {selectedDoctor && (
          <Card className="p-6 border-accent bg-accent-light">
            <span className="badge badge-accent mb-2">Selected Physician</span>
            <h4 className="text-base font-bold text-fg">{selectedDoctor.name}</h4>
            <p className="text-xs text-mute mb-3">{selectedDoctor.title}</p>
            <div className="space-y-1.5 text-xs">
              <div className="flex justify-between">
                <span className="text-mute">Specialty:</span>
                <span className="font-semibold text-fg">{selectedDoctor.specialty}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-mute">Consultation:</span>
                <span className="font-bold text-accent">{selectedDoctor.consultationFee}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-mute">Clinic Days:</span>
                <span className="font-medium text-fg">
                  {selectedDoctor.availableDays.join(", ")}
                </span>
              </div>
            </div>
          </Card>
        )}

        <Card className="p-6">
          <h4 className="text-sm font-bold text-fg mb-2">
            Need Immediate Attention?
          </h4>
          <p className="text-xs leading-relaxed text-mute mb-4">
            If your condition is acute or life-threatening, do not wait for an
            outpatient appointment. Contact our 24/7 Level I trauma resuscitation bay.
          </p>
          <a
            href={`tel:${hospitalInfo.phone.emergency.replace(/[^0-9]/g, "")}`}
            className="flex items-center justify-center gap-2 rounded-md bg-emergency py-2.5 text-xs font-bold text-white hover:opacity-90"
          >
            Emergency Dispatch: {hospitalInfo.phone.emergency}
          </a>
        </Card>

        <Card className="p-6">
          <h4 className="text-sm font-bold text-fg mb-2">Hospital Appointment Desk</h4>
          <p className="text-xs text-mute mb-3">
            Questions about insurance eligibility, prior authorizations, or physician
            referrals?
          </p>
          <div className="text-xs font-bold text-fg">
            Call: {hospitalInfo.phone.appointments}
          </div>
          <div className="text-xs text-mute mt-1">
            Mon – Fri: 7:30 AM – 7:00 PM
          </div>
        </Card>
      </div>
    </div>
  );
}

function ReviewRow({ label, value }) {
  return (
    <div className="flex justify-between border-b border-line pb-2 last:border-b-0 last:pb-0">
      <span className="text-mute">{label}:</span>
      <span className="font-semibold text-fg text-right">{value}</span>
    </div>
  );
}

export default function AppointmentsBookingPage() {
  return (
    <main className="container-content py-12 sm:py-16">
      <div className="mb-10 max-w-2xl">
        <span className="badge badge-accent mb-2">Patient Care Scheduling</span>
        <h1 className="t-display text-3xl sm:text-4xl text-fg mb-4">
          Book an Appointment
        </h1>
        <p className="t-lead text-sm sm:text-base">
          Schedule an in-person clinical evaluation or secure telehealth consultation
          with our board-certified physicians.
        </p>
      </div>

      <Suspense
        fallback={
          <div className="flex justify-center p-12">
            <Spinner className="h-8 w-8" />
          </div>
        }
      >
        <AppointmentFormContent />
      </Suspense>
    </main>
  );
}