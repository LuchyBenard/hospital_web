"use client";

import { useAuth } from "@/contexts/auth-context";
import { Card } from "@/components/ui/card";

export default function PatientProfilePage() {
  const { user } = useAuth();
  if (!user) return null;

  return (
    <div className="space-y-6 max-w-3xl">
      <div>
        <span className="badge badge-accent mb-1">Confidential Medical File</span>
        <h1 className="text-2xl sm:text-3xl font-bold text-fg">
          Patient Profile & Demographics
        </h1>
        <p className="text-xs sm:text-sm text-mute">
          Official patient registration, insurance policy, and clinical emergency contacts.
        </p>
      </div>

      <div className="grid gap-6 sm:grid-cols-2">
        {/* Personal & Clinical Identifiers */}
        <Card className="p-6 space-y-4">
          <h3 className="text-base font-bold text-fg border-b border-line pb-2">
            Clinical Identification
          </h3>
          <Row label="Full Legal Name" value={user.name} />
          <Row label="Medical Record Number" value={user.mrn || "MRN-48920-A"} isMono />
          <Row label="Date of Birth" value={user.dateOfBirth || "1988-04-14"} />
          <Row label="Gender" value={user.gender || "Female"} />
          <Row label="Blood Group" value={user.bloodGroup || "O+"} isAccent />
          <Row
            label="Documented Allergies"
            value={(user.allergies || ["Penicillin", "Latex"]).join(", ")}
            isDanger
          />
        </Card>

        {/* Contact & Care Team */}
        <Card className="p-6 space-y-4">
          <h3 className="text-base font-bold text-fg border-b border-line pb-2">
            Physician & Contact Info
          </h3>
          <Row label="Email Address" value={user.email} />
          <Row label="Phone Number" value={user.phone || "+1 (555) 234-5678"} />
          <Row
            label="Primary Care Physician"
            value={user.primaryPhysician || "Dr. Sarah Jenkins"}
          />
          <Row
            label="Registered Since"
            value={
              user.createdAt
                ? new Date(user.createdAt).toLocaleDateString()
                : "2026-01-12"
            }
          />
        </Card>

        {/* Insurance Information */}
        <Card className="p-6 space-y-4 sm:col-span-2">
          <h3 className="text-base font-bold text-fg border-b border-line pb-2">
            Insurance & Emergency Contact
          </h3>
          <div className="grid gap-4 sm:grid-cols-2 text-xs sm:text-sm">
            <div>
              <span className="text-mute block">Primary Insurance Policy:</span>
              <span className="font-semibold text-fg block mt-0.5">
                {user.insuranceProvider || "BlueCross Premera Gold (Policy #NY-9921448)"}
              </span>
              <span className="badge badge-success text-xs mt-1.5">
                Verified & In-Network
              </span>
            </div>
            <div>
              <span className="text-mute block">Designated Emergency Contact:</span>
              <span className="font-semibold text-fg block mt-0.5">
                {user.emergencyContact?.name || "Thomas Quinn"} (
                {user.emergencyContact?.relationship || "Spouse"})
              </span>
              <span className="text-mute block mt-0.5">
                {user.emergencyContact?.phone || "+1 (555) 876-5432"}
              </span>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}

function Row({ label, value, isMono, isAccent, isDanger }) {
  return (
    <div className="flex items-center justify-between py-1 text-xs sm:text-sm">
      <span className="text-mute">{label}:</span>
      <span
        className={`font-medium ${isMono ? "font-mono font-bold" : ""} ${
          isAccent ? "font-bold text-accent" : ""
        } ${isDanger ? "font-semibold text-emergency" : "text-fg"}`}
      >
        {value}
      </span>
    </div>
  );
}
