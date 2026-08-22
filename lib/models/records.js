// Data-access layer for patient medical records & diagnostics.

import { demoRecords } from "@/constants";

let recordsStore = [...demoRecords];

export function listRecords({ patientId, category } = {}) {
  let result = [...recordsStore];

  if (patientId) {
    result = result.filter((r) => r.patientId === patientId);
  }

  if (category && category !== "All") {
    result = result.filter(
      (r) => r.category.toLowerCase() === category.toLowerCase()
    );
  }

  return result.sort((a, b) => new Date(b.date) - new Date(a.date));
}

export function getRecordById(id) {
  if (!id) return null;
  return recordsStore.find((r) => r.id === id) || null;
}
