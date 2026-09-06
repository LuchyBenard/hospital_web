// Data-access layer for patient prescriptions & refills.

import { demoPrescriptions } from "@/constants";

let prescriptionsStore = [...demoPrescriptions];

export function listPrescriptions({ patientId, status } = {}) {
  let result = [...prescriptionsStore];

  if (status && status !== "All") {
    result = result.filter(
      (p) => p.status.toLowerCase() === status.toLowerCase()
    );
  }

  return result;
}

export function getPrescriptionById(id) {
  if (!id) return null;
  return prescriptionsStore.find((p) => p.id === id) || null;
}

export function requestRefill(id) {
  const rx = prescriptionsStore.find((p) => p.id === id);
  if (!rx) return { success: false, message: "Prescription not found" };
  if (rx.refillsRemaining <= 0) {
    return {
      success: false,
      message: "No refills remaining. Please schedule an appointment with your doctor.",
    };
  }

  rx.refillRequested = true;
  rx.refillRequestedAt = new Date().toISOString();
  rx.refillStage = 1; // 1: Requested, 2: Verification, 3: Dispensing, 4: Ready for Pickup
  return {
    success: true,
    message: `Refill request submitted for ${rx.medication}. Pharmacy notification sent.`,
    prescription: rx,
  };
}

export function advanceRefillStage(id, stage) {
  const rx = prescriptionsStore.find((p) => p.id === id);
  if (!rx) return null;
  rx.refillStage = stage;
  if (stage === 4) {
    rx.refillsRemaining = Math.max(0, rx.refillsRemaining - 1);
    rx.lastDispensedAt = new Date().toISOString();
  }
  return rx;
}

export function approveRefill(id) {
  const rx = prescriptionsStore.find((p) => p.id === id);
  if (!rx) return null;
  rx.refillStage = 2; // Verified by pharmacist
  return rx;
}

// ---------------------------------------------------------------------------
// E-prescription renewal requests (no remaining refills -> request a new Rx).
// ---------------------------------------------------------------------------

let renewalStore = [];

export function listRenewalRequests({ patientId, status } = {}) {
  let result = [...renewalStore];
  if (patientId) {
    result = result.filter((r) => r.patientId === patientId);
  }
  if (status && status !== "All") {
    result = result.filter((r) => r.status === status);
  }
  return result.sort((a, b) => new Date(b.requestedAt) - new Date(a.requestedAt));
}

export function submitRenewalRequest({ patientId, medication, reason, notes }) {
  const id = `RNW-${Date.now().toString().slice(-6)}`;
  const request = {
    id,
    patientId: patientId || "patient-001",
    medication,
    reason,
    notes: notes || "",
    status: "Pending Review",
    trackingCode: `TRK-${Date.now().toString(36).toUpperCase().slice(-6)}`,
    requestedAt: new Date().toISOString(),
    expectedReview: `${24 + Math.floor(Math.random() * 24)} hours`,
    reviewedBy: null,
    decision: null,
  };
  renewalStore = [request, ...renewalStore];
  return request;
}

export function reviewRenewalRequest(id, decision, reviewer = "Dr. Sarah Jenkins") {
  const req = renewalStore.find((r) => r.id === id);
  if (!req) return null;
  req.status = decision === "approved" ? "Approved" : "Denied";
  req.decision = decision;
  req.reviewedBy = reviewer;
  req.reviewedAt = new Date().toISOString();

  if (decision === "approved") {
    const rx = prescriptionsStore.find(
      (p) => p.medication.toLowerCase() === req.medication.toLowerCase()
    );
    if (rx) {
      rx.refillsRemaining = Math.max(3, rx.refillsRemaining + 3);
      rx.renewedOn = req.reviewedAt;
    }
  }
  return req;
}
