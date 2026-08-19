// Auth init and session helpers.
// The app is scaffolded with dummy data, so session state is a mock kept in
// localStorage. When Firebase is enabled, swap these for firebase/auth calls;
// the auth-context is the only consumer and already goes through this module.

import { demoUser } from "@/constants";

const SESSION_KEY = "ibuild.session";

export function getSession() {
  if (typeof window === "undefined") return null;
  try {
    const raw = window.localStorage.getItem(SESSION_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

export function setSession(user) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(SESSION_KEY, JSON.stringify(user));
}

export function clearSession() {
  if (typeof window === "undefined") return;
  window.localStorage.removeItem(SESSION_KEY);
}

// Dummy credential check. Replace with Firebase/Auth provider on wiring.
export function mockAuthenticate(email, password) {
  if (!email || !password) return null;
  return { ...demoUser, email };
}
