// Firebase client init (default backend per skills/backend.md).
// Initializes once from NEXT_PUBLIC_* env. When those are blank the app runs
// on dummy data only; exports stay null so no call throws at import time.
import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const config = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

const hasConfig = Boolean(config.apiKey && config.projectId);

export const firebaseEnabled = hasConfig;

export const app = hasConfig ? (getApps().length ? getApp() : initializeApp(config)) : null;
export const auth = hasConfig ? getAuth(app) : null;
export const db = hasConfig ? getFirestore(app) : null;
