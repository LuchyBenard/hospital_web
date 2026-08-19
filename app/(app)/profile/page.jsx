"use client";

import { useAuth } from "@/contexts/auth-context";
import { Card } from "@/components/ui/card";

export default function ProfilePage() {
  const { user } = useAuth();
  if (!user) return null;

  return (
    <div className="max-w-xl">
      <h1 className="mb-6 text-2xl font-semibold">Profile</h1>
      <Card className="divide-y divide-line">
        <Row label="Name" value={user.name} />
        <Row label="Email" value={user.email} />
        <Row label="Role" value={user.role} />
        <Row label="Member since" value={new Date(user.createdAt).toLocaleDateString()} />
      </Card>
    </div>
  );
}

function Row({ label, value }) {
  return (
    <div className="flex items-center justify-between py-3 first:pt-0 last:pb-0">
      <span className="text-sm text-mute">{label}</span>
      <span className="text-sm font-medium">{value}</span>
    </div>
  );
}
