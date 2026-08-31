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
