"use client";

import { useState } from "react";
import { useAuth } from "@/contexts/auth-context";
import { updateCurrentUser } from "@/lib/models/users";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input, Field } from "@/components/ui/input";

export default function PatientProfilePage() {
  const { user } = useAuth();
  const [editing, setEditing] = useState(false);
  const [saving, setSaving] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [form, setForm] = useState({
    name: user?.name || "",
    email: user?.email || "",
    phone: user?.phone || "",
    dateOfBirth: user?.dateOfBirth || "",
    gender: user?.gender || "",
    bloodGroup: user?.bloodGroup || "",
    allergies: (user?.allergies || []).join(", "),
    primaryPhysician: user?.primaryPhysician || "",
    insuranceProvider: user?.insuranceProvider || "",
    emergencyName: user?.emergencyContact?.name || "",
    emergencyRelationship: user?.emergencyContact?.relationship || "",
    emergencyPhone: user?.emergencyContact?.phone || "",
  });
  const [profile, setProfile] = useState(user);

  if (!user) return null;

  const handleChange = (key) => (e) =>
    setForm((f) => ({ ...f, [key]: e.target.value }));

  const startEditing = () => {
    setForm({
      name: profile?.name || "",
      email: profile?.email || "",
      phone: profile?.phone || "",
      dateOfBirth: profile?.dateOfBirth || "",
      gender: profile?.gender || "",
      bloodGroup: profile?.bloodGroup || "",
      allergies: (profile?.allergies || []).join(", "),
      primaryPhysician: profile?.primaryPhysician || "",
      insuranceProvider: profile?.insuranceProvider || "",
      emergencyName: profile?.emergencyContact?.name || "",
      emergencyRelationship: profile?.emergencyContact?.relationship || "",
      emergencyPhone: profile?.emergencyContact?.phone || "",
    });
    setEditing(true);
  };

  const handleSave = () => {
    setSaving(true);
    setTimeout(() => {
      const updated = updateCurrentUser({
        name: form.name,
        email: form.email,
        phone: form.phone,
        dateOfBirth: form.dateOfBirth,
        gender: form.gender,
        bloodGroup: form.bloodGroup,
        allergies: form.allergies
          .split(",")
          .map((a) => a.trim())
          .filter(Boolean),
        primaryPhysician: form.primaryPhysician,
        insuranceProvider: form.insuranceProvider,
        emergencyContact: {
          name: form.emergencyName,
          relationship: form.emergencyRelationship,
          phone: form.emergencyPhone,
        },
      });
      setProfile(updated);
      setEditing(false);
      setSaving(false);
      setToastMessage("Profile updated successfully.");
      setTimeout(() => setToastMessage(""), 4000);
    }, 600);
  };

  const cancelEditing = () => {
    setEditing(false);
    setToastMessage("");
  };

  return (
    <div className="space-y-6 max-w-3xl">
      <div className="flex items-start justify-between gap-4">
        <div>
          <span className="badge badge-accent mb-1">Confidential Medical File</span>
          <h1 className="text-2xl sm:text-3xl font-bold text-fg">
            Patient Profile & Demographics
          </h1>
          <p className="text-xs sm:text-sm text-mute">
            Official patient registration, insurance policy, and clinical emergency contacts.
          </p>
        </div>
        <Button
          size="sm"
          variant="secondary"
          onClick={editing ? cancelEditing : startEditing}
        >
          {editing ? "Cancel" : "Edit Profile"}
        </Button>
      </div>

      {toastMessage && (
        <div className="rounded-md border border-success bg-success-light p-3 text-xs font-semibold text-success">
          {toastMessage}
        </div>
      )}

      <div className="grid gap-6 sm:grid-cols-2">
        {/* Personal & Clinical Identifiers */}
        <Card className="p-6 space-y-4">
          <h3 className="text-base font-bold text-fg border-b border-line pb-2">
            Clinical Identification
          </h3>
          {editing ? (
            <div className="space-y-3">
              <Field label="Full Legal Name" htmlFor="edit-name">
                <Input id="edit-name" value={form.name} onChange={handleChange("name")} />
              </Field>
              <Field label="Date of Birth" htmlFor="edit-dob">
                <Input id="edit-dob" type="date" value={form.dateOfBirth} onChange={handleChange("dateOfBirth")} />
              </Field>
              <Field label="Gender" htmlFor="edit-gender">
                <Input id="edit-gender" value={form.gender} onChange={handleChange("gender")} />
              </Field>
              <Field label="Blood Group" htmlFor="edit-blood">
                <Input id="edit-blood" value={form.bloodGroup} onChange={handleChange("bloodGroup")} />
              </Field>
              <Field label="Documented Allergies (comma separated)" htmlFor="edit-allergies">
                <Input id="edit-allergies" value={form.allergies} onChange={handleChange("allergies")} />
              </Field>
            </div>
          ) : (
            <>
              <Row label="Full Legal Name" value={profile?.name} />
              <Row label="Medical Record Number" value={profile?.mrn || "MRN-48920-A"} isMono />
              <Row label="Date of Birth" value={profile?.dateOfBirth || "1988-04-14"} />
              <Row label="Gender" value={profile?.gender || "Female"} />
              <Row label="Blood Group" value={profile?.bloodGroup || "O+"} isAccent />
              <Row
                label="Documented Allergies"
                value={(profile?.allergies || ["Penicillin", "Latex"]).join(", ")}
                isDanger
              />
            </>
          )}
        </Card>

        {/* Contact & Care Team */}
        <Card className="p-6 space-y-4">
          <h3 className="text-base font-bold text-fg border-b border-line pb-2">
            Physician & Contact Info
          </h3>
          {editing ? (
            <div className="space-y-3">
              <Field label="Email Address" htmlFor="edit-email">
                <Input id="edit-email" type="email" value={form.email} onChange={handleChange("email")} />
              </Field>
              <Field label="Phone Number" htmlFor="edit-phone">
                <Input id="edit-phone" value={form.phone} onChange={handleChange("phone")} />
              </Field>
              <Field label="Primary Care Physician" htmlFor="edit-physician">
                <Input id="edit-physician" value={form.primaryPhysician} onChange={handleChange("primaryPhysician")} />
              </Field>
            </div>
          ) : (
            <>
              <Row label="Email Address" value={profile?.email} />
              <Row label="Phone Number" value={profile?.phone || "+1 (555) 234-5678"} />
              <Row
                label="Primary Care Physician"
                value={profile?.primaryPhysician || "Dr. Sarah Jenkins"}
              />
              <Row
                label="Registered Since"
                value={
                  profile?.createdAt
                    ? new Date(profile.createdAt).toLocaleDateString()
                    : "2026-01-12"
                }
              />
            </>
          )}
        </Card>

        {/* Insurance Information */}
        <Card className="p-6 space-y-4 sm:col-span-2">
          <h3 className="text-base font-bold text-fg border-b border-line pb-2">
            Insurance & Emergency Contact
          </h3>
          {editing ? (
            <div className="grid gap-4 sm:grid-cols-2">
              <Field label="Primary Insurance Policy" htmlFor="edit-insurance">
                <Input
                  id="edit-insurance"
                  value={form.insuranceProvider}
                  onChange={handleChange("insuranceProvider")}
                />
              </Field>
              <div className="space-y-3">
                <Field label="Emergency Contact Name" htmlFor="edit-ec-name">
                  <Input
                    id="edit-ec-name"
                    value={form.emergencyName}
                    onChange={handleChange("emergencyName")}
                  />
                </Field>
                <div className="grid grid-cols-2 gap-3">
                  <Field label="Relationship" htmlFor="edit-ec-rel">
                    <Input
                      id="edit-ec-rel"
                      value={form.emergencyRelationship}
                      onChange={handleChange("emergencyRelationship")}
                    />
                  </Field>
                  <Field label="Phone" htmlFor="edit-ec-phone">
                    <Input
                      id="edit-ec-phone"
                      value={form.emergencyPhone}
                      onChange={handleChange("emergencyPhone")}
                    />
                  </Field>
                </div>
              </div>
            </div>
          ) : (
            <div className="grid gap-4 sm:grid-cols-2 text-xs sm:text-sm">
              <div>
                <span className="text-mute block">Primary Insurance Policy:</span>
                <span className="font-semibold text-fg block mt-0.5">
                  {profile?.insuranceProvider || "BlueCross Premera Gold (Policy #NY-9921448)"}
                </span>
                <span className="badge badge-success text-xs mt-1.5">
                  Verified & In-Network
                </span>
              </div>
              <div>
                <span className="text-mute block">Designated Emergency Contact:</span>
                <span className="font-semibold text-fg block mt-0.5">
                  {profile?.emergencyContact?.name || "Thomas Quinn"} (
                  {profile?.emergencyContact?.relationship || "Spouse"})
                </span>
                <span className="text-mute block mt-0.5">
                  {profile?.emergencyContact?.phone || "+1 (555) 876-5432"}
                </span>
              </div>
            </div>
          )}

          {editing && (
            <div className="flex justify-end gap-3 border-t border-line pt-4">
              <Button variant="secondary" size="sm" onClick={cancelEditing}>
                Cancel
              </Button>
              <Button size="sm" onClick={handleSave} disabled={saving}>
                {saving ? "Saving..." : "Save Changes"}
              </Button>
            </div>
          )}
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