"use client";

import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/auth-context";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

export default function SettingsPage() {
  const { logout } = useAuth();
  const router = useRouter();

  const onLogout = async () => {
    await logout();
    router.push("/login");
  };

  return (
    <div className="max-w-xl">
      <h1 className="mb-6 text-2xl font-semibold">Settings</h1>
      <Card>
        <h3 className="mb-2">Session</h3>
        <p className="mb-4 text-sm text-mute">
          Sign out of the current session on this device.
        </p>
        <Button variant="secondary" onClick={onLogout}>
          Sign out
        </Button>
      </Card>
    </div>
  );
}
