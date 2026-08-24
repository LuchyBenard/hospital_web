import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { hospitalInfo } from "@/constants";

export const metadata = {
  title: "Insurance & Transparent Billing",
  description:
    "Review accepted health insurance networks, transparent consultation fee schedules, and financial assistance programs.",
};

const acceptedPlans = [
  "Medicare & Medicaid (Part A & B)",
  "BlueCross BlueShield / Premera",
  "Aetna Health & Choice POS",
  "Cigna Healthcare Network",
  "UnitedHealthcare Choice Plus",
  "Humana Premier & Gold Plus",
  "Oxford Health Plans",
  "Empire HealthChoice Assurance",
];

const feeTiers = [
  {
    name: "General Outpatient Consultation",
    price: "$140 – $180",
    note: "Comprehensive physical evaluation, medical history review, and routine care.",
  },
  {
    name: "Specialist & Surgical Evaluation",
    price: "$180 – $220",
    note: "Consultation with cardiology, neurosurgery, orthopedics, or oncology department heads.",
  },
  {
    name: "Telehealth Virtual Care",
    price: "$85 – $120",
    note: "Encrypted HD video appointments for follow-ups, medication reviews, and non-emergency care.",
  },
];

export default function PricingPage() {
  return (
    <main className="container-content py-12 sm:py-16">
      <div className="mb-10 max-w-2xl">
        <span className="badge badge-accent mb-2">Billing & Affordability</span>
        <h1 className="t-display text-3xl sm:text-4xl text-fg mb-4">
          Insurance Networks & Transparent Pricing
        </h1>
        <p className="t-lead text-sm sm:text-base">
          Providence General Hospital is committed to pricing transparency. We work
          with major commercial insurance providers, Medicare, and self-pay patients.
        </p>
      </div>

      {/* Fee Schedule */}
      <div className="mb-14">
        <h2 className="text-xl font-bold text-fg mb-6">Standard Outpatient Consultation Fees</h2>
        <div className="grid gap-6 sm:grid-cols-3">
          {feeTiers.map((t) => (
            <Card key={t.name} className="flex flex-col justify-between p-6">
              <div>
                <h3 className="text-base font-bold text-fg">{t.name}</h3>
                <p className="text-2xl font-bold text-accent font-mono my-3">{t.price}</p>
                <p className="text-xs text-mute leading-relaxed mb-4">{t.note}</p>
              </div>
              <Link href="/appointments">
                <Button size="sm" className="w-full">
                  Schedule Consultation
                </Button>
              </Link>
            </Card>
          ))}
        </div>
      </div>

      {/* Accepted Insurance Providers */}
      <div className="grid gap-8 md:grid-cols-2">
        <Card className="p-6 sm:p-8">
          <h3 className="text-lg font-bold text-fg mb-3">Accepted In-Network Insurance</h3>
          <p className="text-xs text-mute mb-4 leading-relaxed">
            We bill directly to most major carriers. Copayments and deductibles are
            calculated at check-in.
          </p>
          <div className="grid gap-2 sm:grid-cols-2 text-xs">
            {acceptedPlans.map((plan, i) => (
              <div key={i} className="flex items-center gap-1.5 font-medium text-fg">
                <span className="text-accent font-bold">&#10003;</span>
                <span>{plan}</span>
              </div>
            ))}
          </div>
        </Card>

        <Card className="p-6 sm:p-8 bg-bg border-line">
          <h3 className="text-lg font-bold text-fg mb-3">Financial Assistance & Payment Plans</h3>
          <p className="text-xs text-mute leading-relaxed mb-4">
            Under the Providence Health Community Charter, no patient is turned away
            due to inability to pay for emergency or critical medical services.
            Interest-free installment payment plans are available.
          </p>
          <div className="text-xs font-semibold text-fg mb-1">
            Financial Counseling Desk: {hospitalInfo.phone.general} (Ext. 2040)
          </div>
          <div className="text-xs text-mute">
            Hours: Mon – Fri: 8:00 AM – 5:00 PM
          </div>
        </Card>
      </div>
    </main>
  );
}
