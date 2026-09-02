// Auth init and session helpers.
// Real mode uses Firebase Auth (email/password). Demo mode kicks in only when
// Firebase is not configured (firebaseEnabled === false), so the site still
// works as a self-contained demo. Everything goes through this module.

import { auth, db, firebaseEnabled } from "@/lib/firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { setDoc, doc } from "firebase/firestore";
import { demoUser } from "@/constants";

const SESSION_KEY = "ibuild.session";

// ---------------------------------------------------------------------------
// Demo mode session (localStorage). Only used when Firebase is disabled.
// ---------------------------------------------------------------------------

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

// ---------------------------------------------------------------------------
// Auth actions. Return a normalized { id, name, email } user object consumed
// by the auth context. In demo mode they mimic a successful login so the
// portal is browsable without a backend.
// ---------------------------------------------------------------------------

export function isRealAuth() {
  return firebaseEnabled && auth !== null;
}

export async function signUp(name, email, password) {
  if (isRealAuth()) {
    const cred = await createUserWithEmailAndPassword(auth, email, password);
    await seedUserProfile(cred.user.uid, { name, email });
    return normalizeUser(cred.user, { name, email });
  }
  const created = { ...demoUser, name, email };
  setSession(created);
  return created;
}

export async function signIn(email, password) {
  if (isRealAuth()) {
    const cred = await signInWithEmailAndPassword(auth, email, password);
    return normalizeUser(cred.user);
  }
  if (!email || !password) throw new Error("Email and password required");
  const authenticated = { ...demoUser, email };
  setSession(authenticated);
  return authenticated;
}

export async function signOutUser() {
  if (isRealAuth()) {
    await signOut(auth);
  }
  clearSession();
}

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function normalizeUser(fbUser, profile = {}) {
  return {
    id: fbUser.uid,
    uid: fbUser.uid,
    name: profile.name || fbUser.displayName || fbUser.email?.split("@")[0] || "Patient",
    email: fbUser.email || profile.email || "",
  };
}

async function seedUserProfile(uid, { name, email }) {
  if (!db) return;
  await setDoc(
    doc(db, "users", uid),
    { name, email, role: "patient", createdAt: new Date().toISOString() },
    { merge: true }
  );
}
