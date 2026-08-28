// Data access for contact inquiries.
// Free-tier-first (skills/backend.md): writes persist to Firestore when
// Firebase is configured, otherwise to an in-memory store so the form works
// in the demo. Swap the `else` branch for the Firestore write when wiring.

import { db } from "@/lib/firebase";
import { collection, addDoc } from "firebase/firestore";

// In-memory fallback (demo). Not durable across restarts; clearly labeled.
const inMemoryStore = [];

export async function createInquiry({ name, email, phone, subject, message }) {
  const record = {
    name,
    email,
    phone: phone || null,
    subject,
    message,
    createdAt: new Date().toISOString(),
  };

  if (db) {
    await addDoc(collection(db, "inquiries"), record);
  } else {
    inMemoryStore.push(record);
  }

  return { id: `inq-${Date.now()}`, ...record };
}
