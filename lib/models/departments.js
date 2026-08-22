// Data-access layer for hospital departments.
// Single source of truth querying constants.js data.

import { departments } from "@/constants";

export function listDepartments() {
  return [...departments];
}

export function getDepartmentBySlug(slug) {
  if (!slug) return null;
  return departments.find((d) => d.slug.toLowerCase() === slug.toLowerCase()) || null;
}

export function getDepartmentById(id) {
  if (!id) return null;
  return departments.find((d) => d.id === id) || null;
}
