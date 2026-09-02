"use client";

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { hospitalInfo } from "@/constants";
import Link from "next/link";

const symptomCategories = [
  { id: "chest", label: "Chest Pain / Heart Palpitations", desc: "Cardiovascular and thoracic symptoms" },
  { id: "neuro", label: "Headache, Dizziness, or Vision Changes", desc: "Neurological and cognitive signs" },
  { id: "resp", label: "Shortness of Breath or Cough", desc: "Pulmonary and respiratory symptoms" },
  { id: "ortho", label: "Joint Pain, Fracture, or Sports Injury", desc: "Musculoskeletal and trauma concerns" },
  { id: "fever", label: "High Fever, Infection, or Rash", desc: "Systemic and infectious symptoms" },
];

export default function SymptomCheckerPage() {
  const [step, setStep] = useState(1);
  const [selectedCat, setSelectedCat] = useState(null);
  const [hasRedFlags, setHasRedFlags] = useState(null);
  const [duration, setDuration] = useState("Under 2 hours");

  const reset = () => {
    setStep(1);
    setSelectedCat(null);
    setHasRedFlags(null);
    setDuration("Under 2 hours");
  };

  // Determine Triage Severity
  const isEmergency =
    selectedCat === "chest" ||
    (selectedCat === "neuro" && hasRedFlags === true) ||
    (selectedCat === "resp" && hasRedFlags === true);

  const isUrgentCare =
    !isEmergency &&
    (hasRedFlags === true || duration === "Under 2 hours" || selectedCat === "ortho");

  return (
    <main className="container-content py-12 sm:py-16">
      <div className="mb-10 max-w-2xl">
        <span className="badge badge-accent mb-2">Clinical Triage & Guidance</span>
        <h1 className="t-display text-3xl sm:text-4xl text-fg mb-4">
          Emergency Care & Symptom Decision Engine
        </h1>
        <p className="t-lead text-sm sm:text-base">
          Evaluate your symptoms to receive an instant clinical recommendation on whether
          to call 911, visit our 24/7 Level I Trauma ER, or schedule an outpatient visit.
        </p>
      </div>

      {/* Emergency Immediate Disclaimer */}
      <div className="mb-8 rounded-lg border border-emergency-light bg-emergency-light/40 p-4 text-xs text-emergency">
        <strong>Immediate Danger Warning:</strong> If you are experiencing sudden severe
        chest pain, facial drooping, one-sided weakness, or uncontrolled bleeding, do not
        use this tool. Call <strong className="underline">911</strong> immediately.
      </div>

      <Card className="max-w-2xl p-6 sm:p-8">
        {/* Step Indicator */}
        <div className="mb-6 flex items-center justify-between border-b border-line pb-4">
          <span className="text-xs font-bold text-accent uppercase tracking-wider">
            Step {step} of 3
          </span>
          <button
            type="button"
            onClick={reset}
            className="text-xs font-semibold text-mute hover:text-fg"
          >
            Start Over
          </button>
        </div>

        {/* Step 1: Select Category */}
        {step === 1 && (
          <div className="space-y-4">
            <h2 className="text-lg font-bold text-fg">
              What primary symptom are you experiencing?
            </h2>
            <div className="grid gap-3 sm:grid-cols-1">
              {symptomCategories.map((cat, idx) => (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => {
                    setSelectedCat(cat.id);
                    setStep(2);
                  }}
                  className="flex items-center justify-between rounded-lg border border-line bg-surface p-4 text-left transition-all hover:border-accent hover:bg-accent-light/30"
                >
                  <div>
                    <span className="text-sm font-bold text-fg block">{cat.label}</span>
                    <span className="text-xs text-mute">{cat.desc}</span>
                  </div>
                  <span className="text-xs font-semibold text-accent">&rarr;</span>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Step 2: Red Flags */}
        {step === 2 && (
          <div className="space-y-6">
            <h2 className="text-lg font-bold text-fg">
              Are you experiencing any of the following acute warning signs?
            </h2>

            <div className="rounded-lg bg-bg p-4 border border-line text-xs text-fg space-y-2">
              <div className="font-bold text-emergency">Check for any of these signs:</div>
              <ul className="list-disc list-inside space-y-1 text-mute">
                <li>Pain radiating to jaw, neck, back, or left arm</li>
                <li>Sudden severe shortness of breath or inability to speak</li>
                <li>Confusion, slurred speech, or loss of consciousness</li>
                <li>Fever above 103°F (39.4°C) with neck stiffness</li>
              </ul>
            </div>

            <div className="flex gap-4">
              <Button
                className="flex-1"
                onClick={() => {
                  setHasRedFlags(true);
                  setStep(3);
                }}
              >
                Yes, I have one or more of these signs
              </Button>
              <Button
                variant="secondary"
                className="flex-1"
                onClick={() => {
                  setHasRedFlags(false);
                  setStep(3);
                }}
              >
                No, none of these apply
              </Button>
            </div>
          </div>
        )}

        {/* Step 3: Triage Result */}
        {step === 3 && (
          <div className="space-y-6">
            {isEmergency ? (
              <div className="rounded-xl border-2 border-emergency bg-emergency-light/30 p-6 space-y-4">
                <div className="flex items-center gap-2">
                  <span className="badge badge-danger text-xs font-bold">
                    Level I Trauma Emergency
                  </span>
                </div>
                <h3 className="text-xl font-bold text-emergency">
                  Immediate Emergency Room Care Advised
                </h3>
                <p className="text-xs sm:text-sm text-fg leading-relaxed">
                  Based on your reported symptoms, you require immediate clinical
                  evaluation at the Providence Level I Trauma Center or by dialing 911.
                </p>

                <div className="flex flex-wrap gap-3 pt-2">
                  <a
                    href="tel:911"
                    className="rounded-md bg-emergency px-5 py-2.5 text-xs font-bold text-white shadow-sm hover:opacity-90"
                  >
                    Call 911 Immediately
                  </a>
                  <a
                    href={`tel:${hospitalInfo.phone.emergency.replace(/[^0-9]/g, "")}`}
                    className="rounded-md border border-emergency bg-surface px-5 py-2.5 text-xs font-bold text-emergency hover:bg-emergency-light"
                  >
                    Call Trauma Desk: {hospitalInfo.phone.emergency}
                  </a>
                </div>
              </div>
            ) : isUrgentCare ? (
              <div className="rounded-xl border border-warning bg-warning-light/40 p-6 space-y-4">
                <div className="flex items-center gap-2">
                  <span className="badge badge-warning text-xs font-bold">
                    Urgent Care Walk-In
                  </span>
                </div>
                <h3 className="text-xl font-bold text-fg">
                  Prompt Outpatient Evaluation Recommended
                </h3>
                <p className="text-xs sm:text-sm text-mute leading-relaxed">
                  Your symptoms do not indicate an immediate life threat, but require same-day
                  in-person attention at our Urgent Care Clinic (Estimated wait time: 15–25 mins).
                </p>

                <div className="flex flex-wrap gap-3 pt-2">
                  <Link href="/emergency">
                    <Button>View Urgent Care Locations</Button>
                  </Link>
                  <Link href="/appointments">
                    <Button variant="secondary">Book Today&apos;s Slot</Button>
                  </Link>
                </div>
              </div>
            ) : (
              <div className="rounded-xl border border-accent bg-accent-light/40 p-6 space-y-4">
                <div className="flex items-center gap-2">
                  <span className="badge badge-accent text-xs font-bold">
                    Routine / Telehealth Consultation
                  </span>
                </div>
                <h3 className="text-xl font-bold text-fg">
                  Schedule Specialist or Telehealth Visit
                </h3>
                <p className="text-xs sm:text-sm text-mute leading-relaxed">
                  Your symptoms are appropriate for a scheduled in-person clinic visit or a
                  virtual telehealth video consultation with one of our physicians.
                </p>

                <div className="flex flex-wrap gap-3 pt-2">
                  <Link href="/appointments">
                    <Button>Book Appointment Online</Button>
                  </Link>
                  <Link href="/doctors">
                    <Button variant="secondary">Browse Specialists</Button>
                  </Link>
                </div>
              </div>
            )}

            <div className="pt-4 border-t border-line text-center">
              <Button variant="ghost" size="sm" onClick={reset}>
                Restart Symptom Assessment
              </Button>
            </div>
          </div>
        )}
      </Card>
    </main>
  );
}
