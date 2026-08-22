// Data-access layer for hospital physicians and clinical specialists.

import { doctors } from "@/constants";

export function listDoctors({ departmentSlug, departmentId, specialty, search } = {}) {
  let result = [...doctors];

  if (departmentSlug) {
    result = result.filter(
      (doc) => doc.departmentSlug.toLowerCase() === departmentSlug.toLowerCase()
    );
  }

  if (departmentId) {
    result = result.filter((doc) => doc.departmentId === departmentId);
  }

  if (specialty) {
    result = result.filter(
      (doc) => doc.specialty.toLowerCase() === specialty.toLowerCase()
    );
  }

  if (search) {
    const q = search.toLowerCase();
    result = result.filter(
      (doc) =>
        doc.name.toLowerCase().includes(q) ||
        doc.specialty.toLowerCase().includes(q) ||
        doc.title.toLowerCase().includes(q) ||
        doc.bio.toLowerCase().includes(q)
    );
  }

  return result;
}

export function getDoctorById(id) {
  if (!id) return null;
  return doctors.find((doc) => doc.id === id) || null;
}
