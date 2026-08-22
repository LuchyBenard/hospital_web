// Data-access layer for hospital clinical and diagnostic services.

import { services } from "@/constants";

export function listServices({ category } = {}) {
  let result = [...services];
  if (category && category !== "All") {
    result = result.filter((s) => s.category.toLowerCase() === category.toLowerCase());
  }
  return result;
}

export function getServiceById(id) {
  if (!id) return null;
  return services.find((s) => s.id === id) || null;
}
