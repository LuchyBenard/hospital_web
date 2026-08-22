"use client";

import { useState } from "react";
import { hospitalInfo, departments } from "@/constants";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input, Field } from "@/components/ui/input";

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [subject, setSubject] = useState("General Inquiry");
  const [message, setMessage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <main className="container-content py-12 sm:py-16">
      <div className="mb-10 max-w-2xl">
        <span className="badge badge-accent mb-2">Hospital Contacts & Directory</span>
        <h1 className="t-display text-3xl sm:text-4xl text-fg mb-4">
          Contact Providence Health
        </h1>
        <p className="t-lead text-sm sm:text-base">
          Our administrative, billing, and patient navigation teams are available to
          assist you with appointments, records, and hospital visits.
        </p>
      </div>

      <div className="grid gap-8 lg:grid-cols-[1.2fr_1.5fr]">
        {/* Hospital Contact Info & Hours */}
        <div className="space-y-6">
          <Card className="p-6 sm:p-8">
            <h3 className="text-lg font-bold text-fg mb-4">Hospital Location</h3>
            <div className="space-y-2 text-xs sm:text-sm text-mute mb-4">
              <div className="font-semibold text-fg">{hospitalInfo.name}</div>
              <div>{hospitalInfo.address.street}</div>
              <div>
                {hospitalInfo.address.city}, {hospitalInfo.address.state}{" "}
                {hospitalInfo.address.zip}
              </div>
            </div>
            <a
              href={hospitalInfo.address.directionsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs font-semibold text-accent hover:underline"
            >
              Open in Google Maps &rarr;
            </a>
          </Card>

          <Card className="p-6 sm:p-8">
            <h3 className="text-lg font-bold text-fg mb-4">Direct Phone Directory</h3>
            <div className="space-y-3 text-xs sm:text-sm">
              <div className="flex justify-between border-b border-line pb-2">
                <span className="text-mute">Appointments & Scheduling:</span>
                <a
                  href={`tel:${hospitalInfo.phone.appointments.replace(/[^0-9]/g, "")}`}
                  className="font-bold text-accent"
                >
                  {hospitalInfo.phone.appointments}
                </a>
              </div>
              <div className="flex justify-between border-b border-line pb-2">
                <span className="text-mute">General Hospital Desk:</span>
                <span className="font-semibold text-fg">{hospitalInfo.phone.general}</span>
              </div>
              <div className="flex justify-between border-b border-line pb-2">
                <span className="text-mute">Emergency Dispatch (24/7):</span>
                <span className="font-bold text-emergency">{hospitalInfo.phone.emergency}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-mute">Email Inquiries:</span>
                <span className="font-semibold text-fg">{hospitalInfo.email}</span>
              </div>
            </div>
          </Card>

          <Card className="p-6 sm:p-8">
            <h3 className="text-lg font-bold text-fg mb-4">Visiting & Outpatient Hours</h3>
            <div className="space-y-3 text-xs sm:text-sm text-mute">
              <div>
                <span className="font-semibold text-fg block">General Inpatient Units:</span>
                {hospitalInfo.hours.visitingHours}
              </div>
              <div>
                <span className="font-semibold text-fg block">Outpatient Clinics:</span>
                {hospitalInfo.hours.outpatient}
              </div>
              <div>
                <span className="font-semibold text-fg block">Diagnostic Imaging & Labs:</span>
                {hospitalInfo.hours.diagnostics}
              </div>
            </div>
          </Card>
        </div>

        {/* Inquiry Form */}
        <div>
          <Card className="p-6 sm:p-10">
            <h3 className="text-xl font-bold text-fg mb-2">Send a Message</h3>
            <p className="text-xs sm:text-sm text-mute mb-6">
              For non-emergency inquiries, patient feedback, or medical records
              assistance.
            </p>

            {submitted ? (
              <div className="rounded-lg border border-accent bg-accent-light p-6 text-center">
                <div className="mb-2 text-2xl font-bold text-accent">&#10003;</div>
                <h4 className="text-base font-bold text-fg mb-1">
                  Thank You, {name || "Patient"}
                </h4>
                <p className="text-xs text-mute mb-4">
                  Your inquiry has been routed to our patient services team. A
                  coordinator will reach out within one business day.
                </p>
                <Button
                  variant="secondary"
                  size="sm"
                  onClick={() => {
                    setSubmitted(false);
                    setMessage("");
                  }}
                >
                  Send Another Inquiry
                </Button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid gap-4 sm:grid-cols-2">
                  <Field label="Full Name" htmlFor="cName">
                    <Input
                      id="cName"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="e.g. Eleanor Vance"
                      required
                    />
                  </Field>
                  <Field label="Email Address" htmlFor="cEmail">
                    <Input
                      id="cEmail"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="you@example.com"
                      required
                    />
                  </Field>
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <Field label="Phone Number" htmlFor="cPhone">
                    <Input
                      id="cPhone"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="+1 (555) 000-0000"
                    />
                  </Field>
                  <div>
                    <label className="text-xs font-semibold uppercase tracking-wider text-mute mb-1.5 block">
                      Inquiry Department
                    </label>
                    <select
                      className="input-clinical h-10 text-sm"
                      value={subject}
                      onChange={(e) => setSubject(e.target.value)}
                    >
                      <option value="General Inquiry">General Patient Desk</option>
                      <option value="Appointments & Scheduling">
                        Appointments & Scheduling
                      </option>
                      <option value="Billing & Insurance">Billing & Insurance</option>
                      <option value="Medical Records">Medical Records Request</option>
                      {departments.map((d) => (
                        <option key={d.id} value={d.name}>
                          {d.name}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <label className="text-xs font-semibold uppercase tracking-wider text-mute mb-1.5 block">
                    Message / Question *
                  </label>
                  <textarea
                    className="input-clinical"
                    rows={4}
                    placeholder="How can our clinical or administrative staff help you?"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    required
                  />
                </div>

                <div className="pt-2">
                  <Button type="submit" size="lg" className="w-full">
                    Submit Inquiry
                  </Button>
                </div>
              </form>
            )}
          </Card>
        </div>
      </div>
    </main>
  );
}
