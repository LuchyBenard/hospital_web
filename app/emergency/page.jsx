import { emergencyHotlines, hospitalInfo } from "@/constants";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";

export const metadata = {
  title: "24/7 Emergency & Level I Trauma Center",
  description:
    "Round-the-clock emergency medical services, rapid resuscitation bays, certified trauma surgeons, and acute stroke triage.",
};

export default function EmergencyPage() {
  return (
    <main className="container-content py-12 sm:py-16">
      {/* Emergency Header */}
      <div className="mb-10 rounded-xl border border-emergency bg-emergency-light p-6 sm:p-10">
        <div className="grid items-center gap-8 lg:grid-cols-[1.5fr_1fr]">
          <div>
            <div className="flex items-center gap-2 mb-2 text-xs font-bold text-emergency">
              <span className="h-2.5 w-2.5 rounded-full bg-emergency animate-ping" />
              24/7/365 IMMEDIATE RESUSCITATION &amp; TRAUMA TRIAGE
            </div>
            <h1 className="text-2xl sm:text-4xl font-bold text-fg mb-4">
              Emergency Medicine &amp; Level I Trauma Center
            </h1>
            <p className="text-sm sm:text-base leading-relaxed text-fg mb-6">
              If you are experiencing a life-threatening medical emergency, including
              severe chest pain, signs of stroke, difficulty breathing, or severe
              trauma, call our direct dispatch hotline or dial 911 immediately.
            </p>
            <div className="flex flex-wrap gap-3">
              <a
                href={`tel:${hospitalInfo.phone.emergency.replace(/[^0-9]/g, "")}`}
                className="inline-flex items-center justify-center gap-2 rounded-md bg-emergency px-6 py-3 text-sm font-bold text-white shadow-sm hover:opacity-90"
              >
                Call Trauma Dispatch: {hospitalInfo.phone.emergency}
              </a>
              <a
                href={hospitalInfo.address.directionsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center rounded-md border border-line bg-surface px-6 py-3 text-sm font-semibold text-fg hover:bg-bg"
              >
                Emergency Directions &amp; GPS &rarr;
              </a>
            </div>
          </div>
          <div className="hidden lg:block">
            <Image
              src="/images/emergency-response.svg"
              alt="Illustration of a Providence General ambulance responding to an emergency call"
              width={560}
              height={260}
              unoptimized
              className="h-auto w-full"
            />
          </div>
        </div>
      </div>

      {/* Emergency Hotlines Directory */}
      <div className="mb-14">
        <h2 className="text-xl sm:text-2xl font-bold text-fg mb-6">
          Dedicated Hospital Hotlines
        </h2>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {emergencyHotlines.map((hotline, idx) => (
            <Card
              key={idx}
              className={`flex flex-col justify-between p-5 ${
                hotline.urgent ? "border-emergency bg-surface" : "bg-surface"
              }`}
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span
                    className={`badge text-xs ${
                      hotline.urgent ? "badge-emergency" : "badge-info"
                    }`}
                  >
                    {hotline.urgent ? "Priority 1" : "Support Line"}
                  </span>
                  <span className="text-xs text-mute">24/7 Available</span>
                </div>
                <h3 className="text-sm font-bold text-fg mb-1">{hotline.title}</h3>
                <p className="text-xs text-mute mb-4">{hotline.subtitle}</p>
              </div>

              <div className="border-t border-line pt-3">
                <a
                  href={`tel:${hotline.phone.replace(/[^0-9]/g, "")}`}
                  className="inline-flex w-full items-center justify-center gap-1.5 rounded bg-bg py-2 text-xs font-bold text-fg hover:bg-accent hover:text-white transition-colors"
                >
                  <svg
                    width="12"
                    height="12"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                  </svg>
                  {hotline.phone}
                </a>
              </div>
            </Card>
          ))}
        </div>
      </div>

      {/* Triage Guidance: Emergency vs Urgent Care */}
      <div className="mb-14 grid gap-8 md:grid-cols-2">
        <Card className="p-6 border-emergency">
          <span className="badge badge-emergency mb-2">Emergency Department (ER)</span>
          <h3 className="text-lg font-bold text-fg mb-3">When to Come to the ER</h3>
          <ul className="space-y-2 text-xs text-mute">
            <li className="flex items-start gap-2">
              <span className="text-emergency font-bold">&#10007;</span>
              <span>Crushing chest pain, left arm pain, or severe pressure</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-emergency font-bold">&#10007;</span>
              <span>Sudden facial drooping, arm weakness, slurred speech (Stroke)</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-emergency font-bold">&#10007;</span>
              <span>Severe shortness of breath or persistent respiratory distress</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-emergency font-bold">&#10007;</span>
              <span>Major trauma, compound fractures, deep uncontrolled bleeding</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-emergency font-bold">&#10007;</span>
              <span>Loss of consciousness, seizures, or acute confusion</span>
            </li>
          </ul>
        </Card>

        <Card className="p-6 border-info">
          <span className="badge badge-info mb-2">Outpatient / Urgent Care</span>
          <h3 className="text-lg font-bold text-fg mb-3">When to Book an Outpatient Visit</h3>
          <ul className="space-y-2 text-xs text-mute">
            <li className="flex items-start gap-2">
              <span className="text-info font-bold">&#10003;</span>
              <span>Routine health reviews, physicals, and blood pressure checks</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-info font-bold">&#10003;</span>
              <span>Minor sprains, strains, or sports injury evaluations</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-info font-bold">&#10003;</span>
              <span>Mild cough, cold symptoms, allergies, or minor skin rashes</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-info font-bold">&#10003;</span>
              <span>Prescription refills, laboratory panels, or imaging reviews</span>
            </li>
          </ul>
          <div className="mt-4 pt-3 border-t border-line">
            <Link href="/appointments" className="text-xs font-semibold text-accent hover:underline">
              Book Outpatient Consultation &rarr;
            </Link>
          </div>
        </Card>
      </div>

      {/* Arrival & Parking Guidance */}
      <Card className="p-6 sm:p-8 bg-bg">
        <h3 className="text-lg font-bold text-fg mb-2">
          Emergency Entrance & Valet Drop-off
        </h3>
        <p className="text-xs sm:text-sm text-mute leading-relaxed mb-4">
          The emergency entrance is located at{" "}
          <strong className="text-fg">{hospitalInfo.address.street}</strong> (Ground
          Floor East Entrance). Dedicated 24/7 emergency parking and rapid patient
          drop-off bays are immediately accessible from Evergreen Medical Parkway.
        </p>
        <div className="flex flex-wrap gap-4 text-xs">
          <div className="font-semibold text-fg">
            Trauma Desk Coordinator: Ext. 9110
          </div>
          <div className="text-mute">
            Ambulance Bay Access: Security Guard Station Gate 2
          </div>
        </div>
      </Card>
    </main>
  );
}
