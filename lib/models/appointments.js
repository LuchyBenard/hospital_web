// Data-access layer for patient appointments.
// Supports listing, status filtering, creating, and cancelling appointments.

import { demoAppointments } from "@/constants";

let appointmentsStore = [...demoAppointments];

export function listAppointments({ patientId, status } = {}) {
  let result = [...appointmentsStore];

  if (patientId) {
    result = result.filter((a) => a.patientId === patientId);
  }

  if (status && status !== "All") {
    result = result.filter(
      (a) => a.status.toLowerCase() === status.toLowerCase()
    );
  }

  return result.sort((a, b) => new Date(b.date) - new Date(a.date));
}

export function getAppointmentById(id) {
  if (!id) return null;
  return appointmentsStore.find((a) => a.id === id) || null;
}

export function createAppointment(data) {
  const newApt = {
    id: `apt-${Date.now()}`,
    patientId: data.patientId || "patient-001",
    patientName: data.patientName || "Ada Quinn",
    doctorId: data.doctorId || "doc-sarah-jenkins",
    doctorName: data.doctorName || "Dr. Sarah Jenkins",
    doctorSpecialty: data.doctorSpecialty || "Cardiology",
    departmentName: data.departmentName || "Cardiology & Vascular Medicine",
    date: data.date || new Date().toISOString().split("T")[0],
    time: data.time || "10:00 AM",
    location: data.location || "Pavilion A, Room 314",
    status: "Upcoming",
    type: data.type || "General Consultation",
    notes: data.notes || "Booked through Providence Health Portal",
    createdAt: new Date().toISOString(),
  };

  appointmentsStore = [newApt, ...appointmentsStore];
  return newApt;
}

export function cancelAppointment(id) {
  const idx = appointmentsStore.findIndex((a) => a.id === id);
  if (idx === -1) return false;
  appointmentsStore[idx] = {
    ...appointmentsStore[idx],
    status: "Cancelled",
  };
  return true;
}
