"use client";

import { createContext, useContext, useEffect, useState, useCallback } from "react";
import {
  getSession,
  setSession,
  clearSession,
  mockAuthenticate,
} from "@/lib/auth";
import { demoUser } from "@/constants";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setUser(getSession());
    setLoading(false);
  }, []);

  const login = useCallback(async (email, password) => {
    const authenticated = mockAuthenticate(email, password);
    if (!authenticated) throw new Error("Invalid credentials");
    setSession(authenticated);
    setUser(authenticated);
    return authenticated;
  }, []);

  const signup = useCallback(async (name, email, password) => {
    if (!name || !email || !password) throw new Error("All fields required");
    const created = { ...demoUser, name, email };
    setSession(created);
    setUser(created);
    return created;
  }, []);

  const logout = useCallback(() => {
    clearSession();
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
