"use client";

import { useState } from "react";
import { useAuth } from "@/contexts/auth-context";
import {
  listPrescriptions,
  requestRefill,
  advanceRefillStage,
} from "@/lib/models/prescriptions";
import { hospitalInfo } from "@/constants";
import { StatusBadge } from "@/components/hospital/status-badge";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const stages = [
  { step: 1, label: "Requested", desc: "Submitted to pharmacy" },
  { step: 2, label: "Verified", desc: "Pharmacist safety review" },
  { step: 3, label: "Dispensing", desc: "Bottling & reconciliation" },
  { step: 4, label: "Ready", desc: "Drive-thru / counter pickup" },
];

export default function PatientPrescriptionsPage() {
  const { user } = useAuth();
  const [prescriptions, setPrescriptions] = useState(() =>
    listPrescriptions({ patientId: user?.id || "patient-001" })
  );
  const [toastMessage, setToastMessage] = useState("");
  const [busyId, setBusyId] = useState(null);

  const refresh = () => {
    setPrescriptions(listPrescriptions({ patientId: user?.id || "patient-001" }));
  };

  const handleRefill = (id) => {
    setBusyId(id);
    setTimeout(() => {
      const res = requestRefill(id);
      refresh();
      setToastMessage(res.message);
      setBusyId(null);
      setTimeout(() => setToastMessage(""), 5000);
    }, 400);
  };

  const handleSimulateProgress = (id, currentStage) => {
    const nextStage = currentStage < 4 ? currentStage + 1 : 1;
    advanceRefillStage(id, nextStage);
    refresh();
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <span className="badge badge-accent mb-1">Medication Management</span>
        <h1 className="text-2xl sm:text-3xl font-bold text-fg">
          Active Prescriptions & Refill Tracker
        </h1>
        <p className="text-xs sm:text-sm text-mute">
          Manage your daily medications, review dosage instructions, and track real-time
          refill progress from the 24/7 In-House Providence Pharmacy.
        </p>
      </div>

      {toastMessage && (
        <div className="rounded-md border border-success bg-success-light p-3 text-xs font-semibold text-success">
          {toastMessage}
        </div>
      )}

      {/* Prescriptions List */}
      <div className="space-y-6">
        {prescriptions.map((rx) => {
          const currentStage = rx.refillStage || (rx.refillRequested ? 1 : 0);

          return (
            <Card key={rx.id} className="p-6 transition-shadow hover:shadow-sm">
              <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-start">
                <div className="space-y-3 max-w-2xl flex-1">
                  <div className="flex items-center gap-2">
                    <StatusBadge status={rx.status} />
                    <span className="text-xs font-mono text-mute">{rx.id}</span>
                    {rx.refillRequested && (
                      <span className="badge badge-warning text-xs">
                        Refill In Progress (Stage {currentStage}/4)
                      </span>
                    )}
                  </div>

                  <div>
                    <h3 className="text-lg font-bold text-fg">
                      {rx.medication}{" "}
                      <span className="text-sm font-semibold text-accent">
                        ({rx.dosage})
                      </span>
                    </h3>
                    <div className="text-xs text-mute mt-1">
                      Prescribed by:{" "}
                      <span className="font-semibold text-fg">
                        {rx.prescribingDoctor}
                      </span>{" "}
                      &bull; <span>{rx.department}</span> &bull; Active since:{" "}
                      <span>{rx.startDate}</span>
                    </div>
                  </div>

                  <div className="grid gap-3 sm:grid-cols-2 rounded bg-bg p-3 text-xs">
                    <div>
                      <span className="text-mute block font-medium">Dosage & Timing:</span>
                      <span className="font-semibold text-fg">{rx.frequency}</span>
                    </div>
                    <div>
                      <span className="text-mute block font-medium">
                        Refills Available:
                      </span>
                      <span
                        className={`font-bold ${
                          rx.refillsRemaining > 0 ? "text-success" : "text-danger"
                        }`}
                      >
                        {rx.refillsRemaining} refills remaining
                      </span>
                    </div>
                    <div className="sm:col-span-2 pt-1 border-t border-line">
                      <span className="text-mute block font-medium">
                        Clinical Instructions:
                      </span>
                      <span className="text-fg">{rx.instructions}</span>
                    </div>
                  </div>

                  {/* Refill Stepper (Shown if Refill is Active or Requested) */}
                  {rx.refillRequested && (
                    <div className="mt-4 rounded-lg border border-line bg-surface p-4">
                      <div className="mb-3 flex items-center justify-between">
                        <span className="text-xs font-bold text-fg">
                          Pharmacy Refill Status
                        </span>
                        <button
                          type="button"
                          onClick={() => handleSimulateProgress(rx.id, currentStage)}
                          className="text-xs font-semibold text-accent hover:underline"
                        >
                          Simulate Next Step &rarr;
                        </button>
                      </div>

                      <div className="grid grid-cols-4 gap-2 text-center">
                        {stages.map((stg) => {
                          const isDone = currentStage >= stg.step;
                          const isCurrent = currentStage === stg.step;

                          return (
                            <div key={stg.step} className="space-y-1">
                              <div
                                className={`mx-auto flex h-7 w-7 items-center justify-center rounded-full text-xs font-bold transition-colors ${
                                  isDone
                                    ? "bg-accent text-accent-fg"
                                    : "bg-bg text-mute border border-line"
                                }`}
                              >
                                {isDone ? "✓" : stg.step}
                              </div>
                              <div
                                className={`text-xs font-semibold ${
                                  isCurrent
                                    ? "text-accent"
                                    : isDone
                                    ? "text-fg"
                                    : "text-mute"
                                }`}
                              >
                                {stg.label}
                              </div>
                              <div className="text-xs text-mute hidden sm:block text-[11px]">
                                {stg.desc}
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  )}
                </div>

                <div className="flex sm:flex-col gap-2 shrink-0">
                  <Button
                    size="sm"
                    disabled={
                      rx.refillsRemaining <= 0 || rx.refillRequested || busyId === rx.id
                    }
                    onClick={() => handleRefill(rx.id)}
                  >
                    {busyId === rx.id
                      ? "Submitting..."
                      : rx.refillRequested
                      ? "Refill In Progress"
                      : "Request Refill"}
                  </Button>
                </div>
              </div>
            </Card>
          );
        })}
      </div>

      {/* In-House Pharmacy Support Box */}
      <Card className="p-6 bg-bg border-line">
        <h4 className="text-sm font-bold text-fg mb-1">
          Providence In-House Pharmacy Services
        </h4>
        <p className="text-xs text-mute leading-relaxed mb-3">
          Prescriptions requested before 4:00 PM are verified and ready for drive-thru
          pickup or courier delivery within 2 hours.
        </p>
        <div className="text-xs font-semibold text-fg">
          Pharmacy Desk: {hospitalInfo.hours.pharmacy} &bull; Hotline:{" "}
          <span className="text-accent">
            {hospitalInfo.phone.general} (Ext. 1180)
          </span>
        </div>
      </Card>
    </div>
  );
}
