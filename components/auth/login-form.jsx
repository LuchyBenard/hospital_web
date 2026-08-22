"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useAuth } from "@/contexts/auth-context";
import { Button } from "@/components/ui/button";
import { Field, Input } from "@/components/ui/input";

export function LoginForm() {
  const { login } = useAuth();
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  const onSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setBusy(true);
    try {
      await login(email, password);
      router.push("/dashboard");
    } catch (err) {
      setError(err.message || "Could not sign in");
    } finally {
      setBusy(false);
    }
  };

  const fillDemo = () => {
    setEmail("ada@example.com");
    setPassword("password123");
  };

  return (
    <form onSubmit={onSubmit} className="space-y-4">
      {/* Demo Patient Quick-fill */}
      <div className="rounded-lg border border-accent bg-accent-light p-3 text-xs">
        <div className="flex items-center justify-between">
          <span className="font-semibold text-accent">Demo Patient: Ada Quinn</span>
          <button
            type="button"
            onClick={fillDemo}
            className="font-bold text-accent hover:underline"
          >
            Auto-fill Credentials
          </button>
        </div>
        <div className="text-mute mt-0.5">ada@example.com / password123</div>
      </div>

      <Field label="Email Address" htmlFor="email">
        <Input
          id="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="ada@example.com"
          required
        />
      </Field>

      <Field label="Password" htmlFor="password">
        <Input
          id="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="••••••••"
          required
        />
      </Field>

      {error ? <p className="text-xs font-semibold text-danger">{error}</p> : null}

      <Button type="submit" className="w-full" disabled={busy}>
        {busy ? "Signing in..." : "Sign In to Portal"}
      </Button>

      <div className="flex items-center justify-between pt-2 text-xs text-mute">
        <span>New to Providence?</span>
        <Link href="/signup" className="font-semibold text-accent hover:underline">
          Register Patient Account
        </Link>
      </div>
    </form>
  );
}
