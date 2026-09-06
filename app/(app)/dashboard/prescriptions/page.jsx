"use client";

import { useState } from "react";
import { useAuth } from "@/contexts/auth-context";
import {
  listPrescriptions,
  requestRefill,
  advanceRefillStage,
  submitRenewalRequest,
  listRenewalRequests,
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

const renewalReasons = [
  "Refills exhausted",
  "Dose adjustment needed",
  "Lost or damaged medication",
  "Travel refill",
];

export default function PatientPrescriptionsPage() {
  const { user } = useAuth();
  const patientId = user?.id || "patient-001";
  const [prescriptions, setPrescriptions] = useState(() =>
    listPrescriptions({ patientId })
  );
  const [renewals, setRenewals] = useState(() =>
    listRenewalRequests({ patientId })
  );
  const [toastMessage, setToastMessage] = useState("");
  const [busyId, setBusyId] = useState(null);
  const [showRenewalForm, setShowRenewalForm] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [renewalForm, setRenewalForm] = useState({
    medication: "",
    reason: renewalReasons[0],
    notes: "",
  });

  const refreshPrescriptions = () => {
    setPrescriptions(listPrescriptions({ patientId }));
  };

  const refreshRenewals = () => {
    setRenewals(listRenewalRequests({ patientId }));
  };

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(""), 5000);
  };

  const handleRefill = (id) => {
    setBusyId(id);
    setTimeout(() => {
      const res = requestRefill(id);
      refreshPrescriptions();
      showToast(res.message);
      setBusyId(null);
    }, 400);
  };

  const handleSimulateProgress = (id, currentStage) => {
    const nextStage = currentStage < 4 ? currentStage + 1 : 1;
    advanceRefillStage(id, nextStage);
    refreshPrescriptions();
  };

  const handleRenewalChange = (key) => (e) =>
    setRenewalForm((f) => ({ ...f, [key]: e.target.value }));

  const handleSubmitRenewal = (e) => {
    e.preventDefault();
    if (!renewalForm.medication.trim()) return;
    setSubmitting(true);
    setTimeout(() => {
      const request = submitRenewalRequest({
        patientId,
        medication: renewalForm.medication.trim(),
        reason: renewalForm.reason,
        notes: renewalForm.notes.trim(),
      });
      refreshRenewals();
      setSubmitting(false);
      setShowRenewalForm(false);
      setRenewalForm({ medication: "", reason: renewalReasons[0], notes: "" });
      showToast(
        `Renewal request ${request.id} submitted. Tracking code: ${request.trackingCode}`
      );
    }, 500);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-start justify-between gap-4">
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
        <Button size="sm" onClick={() => setShowRenewalForm(true)}>
          Request E-Renewal
        </Button>
      </div>

      {toastMessage && (
        <div className="rounded-md border border-success bg-success-light p-3 text-xs font-semibold text-success">
          {toastMessage}
        </div>
      )}

      {/* E-Renewal Request Form */}
      {showRenewalForm && (
        <Card className="border-accent p-6 sm:p-8">
          <div className="mb-4 flex items-start justify-between">
            <div>
              <span className="badge badge-accent mb-1">E-Prescription Renewal</span>
              <h2 className="text-lg font-bold text-fg">
                Request Medication Renewal
              </h2>
              <p className="text-xs text-mute">
                When automatic refills are exhausted, your clinician can authorize a new
                prescription electronically within 24–48 hours.
              </p>
            </div>
            <button
              type="button"
              onClick={() => setShowRenewalForm(false)}
              className="text-mute hover:text-fg text-lg font-bold"
            >
              &times;
            </button>
          </div>

          <form onSubmit={handleSubmitRenewal} className="space-y-4">
            <label className="block text-xs font-semibold uppercase tracking-wider text-mute">
              Medication
            </label>
            <select
              className="input-clinical h-11 text-sm"
              value={renewalForm.medication}
              onChange={handleRenewalChange("medication")}
              required
            >
              <option value="">-- Select active medication --</option>
              {prescriptions.map((rx) => (
                <option key={rx.id} value={`${rx.medication} (${rx.dosage})`}>
                  {rx.medication} ({rx.dosage})
                </option>
              ))}
            </select>

            <label className="block text-xs font-semibold uppercase tracking-wider text-mute">
              Reason for Renewal
            </label>
            <select
              className="input-clinical h-11 text-sm"
              value={renewalForm.reason}
              onChange={handleRenewalChange("reason")}
            >
              {renewalReasons.map((reason) => (
                <option key={reason} value={reason}>
                  {reason}
                </option>
              ))}
            </select>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-mute mb-1.5">
                Clinical Notes to Pharmacist (Optional)
              </label>
              <textarea
                className="input-clinical"
                rows={3}
                placeholder="Recent dose changes, side effects, or any pharmacy instructions..."
                value={renewalForm.notes}
                onChange={handleRenewalChange("notes")}
              />
            </div>

            <div className="flex justify-end gap-3 border-t border-line pt-4">
              <Button variant="secondary" size="sm" onClick={() => setShowRenewalForm(false)}>
                Cancel
              </Button>
              <Button type="submit" size="sm" disabled={submitting}>
                {submitting ? "Submitting Request..." : "Submit Renewal Request"}
              </Button>
            </div>
          </form>
        </Card>
      )}

      {/* Renewal Requests Tracker */}
      {renewals.length > 0 && (
        <Card className="p-6">
          <div className="mb-4">
            <span className="badge badge-info mb-1">Renewal Requests</span>
            <h2 className="text-lg font-bold text-fg">Prescription Renewal Tracker</h2>
            <p className="text-xs text-mute">
              Track the status of your electronic renewal requests with their unique
              tracking codes.
            </p>
          </div>

          <div className="space-y-3">
            {renewals.map((req) => (
              <div
                key={req.id}
                className="flex items-center justify-between gap-3 rounded-lg border border-line bg-bg p-4"
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <StatusBadge
                      status={req.status === "Pending Review" ? "Pending" : req.status}
                    />
                    <span className="text-xs font-mono text-mute">{req.id}</span>
                  </div>
                  <div className="text-sm font-bold text-fg">{req.medication}</div>
                  <div className="text-xs text-mute">
                    {req.reason} &bull; Submitted{" "}
                    {new Date(req.requestedAt).toLocaleDateString()} &bull; Est. review:{" "}
                    {req.expectedReview}
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-[10px] font-semibold uppercase tracking-wider text-mute">
                    Tracking Code
                  </div>
                  <div className="font-mono text-sm font-bold text-accent">
                    {req.trackingCode}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Card>
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
                          rx.refillsRemaining > 0 ? "text-success" : "text-emergency"
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
                  {rx.refillsRemaining <= 0 && !rx.refillRequested && (
                    <Button
                      size="sm"
                      variant="secondary"
                      onClick={() => {
                        setRenewalForm((f) => ({
                          ...f,
                          medication: `${rx.medication} (${rx.dosage})`,
                        }));
                        setShowRenewalForm(true);
                      }}
                    >
                      Renew Prescription
                    </Button>
                  )}
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