"use client";

import { createContext, useContext, useEffect, useState, useCallback } from "react";
import {
  getSession,
  signIn,
  signUp,
  signOutUser,
  isRealAuth,
} from "@/lib/auth";
import { auth } from "@/lib/firebase";
import { onAuthStateChanged } from "firebase/auth";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (isRealAuth() && auth) {
      // Real mode: Firebase Auth drives session state.
      const unsubscribe = onAuthStateChanged(auth, (fbUser) => {
        if (fbUser) {
          setUser({
            id: fbUser.uid,
            uid: fbUser.uid,
            name: fbUser.displayName || fbUser.email?.split("@")[0] || "Patient",
            email: fbUser.email,
          });
        } else {
          setUser(null);
        }
        setLoading(false);
      });
      return unsubscribe;
    }

    // Demo mode: read the localStorage session.
    setUser(getSession());
    setLoading(false);
  }, []);

  const login = useCallback(async (email, password) => {
    const session = await signIn(email, password);
    setUser(session);
    return session;
  }, []);

  const signup = useCallback(async (name, email, password) => {
    const session = await signUp(name, email, password);
    setUser(session);
    return session;
  }, []);

  const logout = useCallback(async () => {
    await signOutUser();
    setUser(null);
  }, []);

  return (
    <AuthContext.Provider value={{ user, loading, login, logout, signup }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
