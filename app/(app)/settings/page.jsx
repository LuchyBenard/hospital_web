"use client";

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input, Field } from "@/components/ui/input";

export default function PatientSettingsPage() {
  const [smsAlerts, setSmsAlerts] = useState(true);
  const [emailAlerts, setEmailAlerts] = useState(true);
  const [rxAlerts, setRxAlerts] = useState(true);
  const [saved, setSaved] = useState(false);

  const handleSave = (e) => {
    e.preventDefault();
    setSaved(true);
    setTimeout(() => setSaved(false), 4000);
  };

  return (
    <div className="space-y-6 max-w-2xl">
      <div>
        <span className="badge badge-accent mb-1">Preferences & Security</span>
        <h1 className="text-2xl sm:text-3xl font-bold text-fg">Portal Settings</h1>
        <p className="text-xs sm:text-sm text-mute">
          Manage your communications, digital security, and emergency notification
          preferences.
        </p>
      </div>

      {saved && (
        <div className="rounded-md border border-success bg-success-light p-3 text-xs font-semibold text-success">
          Settings and notification preferences updated successfully.
        </div>
      )}

      <form onSubmit={handleSave} className="space-y-6">
        {/* Notification Preferences */}
        <Card className="p-6 space-y-4">
          <h3 className="text-base font-bold text-fg border-b border-line pb-2">
            Clinical Notification Channels
          </h3>

          <div className="space-y-3 text-xs sm:text-sm">
            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={smsAlerts}
                onChange={(e) => setSmsAlerts(e.target.checked)}
                className="h-4 w-4 rounded border-line text-accent"
              />
              <div>
                <span className="font-semibold text-fg block">
                  SMS Appointment Reminders
                </span>
                <span className="text-xs text-mute">
                  Receive text reminders 24 hours and 2 hours prior to scheduled clinic visits.
                </span>
              </div>
            </label>

            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={emailAlerts}
                onChange={(e) => setEmailAlerts(e.target.checked)}
                className="h-4 w-4 rounded border-line text-accent"
              />
              <div>
                <span className="font-semibold text-fg block">
                  Diagnostic Lab & Imaging Alerts
                </span>
                <span className="text-xs text-mute">
                  Get notified immediately when lab test results or imaging reports are finalized.
                </span>
              </div>
            </label>

            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={rxAlerts}
                onChange={(e) => setRxAlerts(e.target.checked)}
                className="h-4 w-4 rounded border-line text-accent"
              />
              <div>
                <span className="font-semibold text-fg block">
                  Prescription Refill & Pharmacy Updates
                </span>
                <span className="text-xs text-mute">
                  Receive pickup notifications and renewal reminders from Providence Pharmacy.
                </span>
              </div>
            </label>
          </div>
        </Card>

        {/* Security & Password */}
        <Card className="p-6 space-y-4">
          <h3 className="text-base font-bold text-fg border-b border-line pb-2">
            Security & Login
          </h3>
          <div className="grid gap-4 sm:grid-cols-2">
            <Field label="Current Password" htmlFor="curPass">
              <Input id="curPass" type="password" placeholder="••••••••" />
            </Field>
            <Field label="New Password" htmlFor="newPass">
              <Input id="newPass" type="password" placeholder="••••••••" />
            </Field>
          </div>
        </Card>

        <div className="flex justify-end">
          <Button type="submit">Save Preferences</Button>
        </div>
      </form>
    </div>
  );
}
