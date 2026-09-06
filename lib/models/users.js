// Data-access layer for users. Dummy, single source of truth for user reads.
// Components and API routes go through these functions, never the store.

import { demoUser } from "@/constants";
import { getSession, setSession } from "@/lib/auth";

const users = {
  [demoUser.id]: demoUser,
};

export function getUser(id) {
  return users[id] || null;
}

export function getCurrentUser() {
  return users[demoUser.id] || null;
}

// Demo-mode persistence: patches the in-memory store and mirrors the change
// into the localStorage session so edits survive a reload.
export function updateCurrentUser(patch) {
  const current = { ...getCurrentUser(), ...patch };
  users[demoUser.id] = current;

  const session = getSession();
  if (session) setSession({ ...session, ...patch });

  return current;
}