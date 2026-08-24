import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { DownloadButton } from "@/components/hospital/download-button";
import Link from "next/link";
import { hospitalInfo } from "@/constants";

export const metadata = {
  title: "Patient & Health Resources",
  description:
    "Patient guides, hospital admission checklists, pre-surgery instructions, downloadable forms, and wellness education.",
};

const patientGuides = [
  {
    title: "Hospital Stay & Inpatient Guide",
    category: "Admission",
    description:
      "What to bring, room amenities, visiting hours, dietary services, and discharge planning.",
    action: "View Guide",
  },
  {
    title: "Preparing for Surgery & Anesthesia",
    category: "Surgical Care",
    description:
      "Fasting guidelines, medication adjustments, what to expect on surgery day, and post-op recovery.",
    action: "View Instructions",
  },
  {
    title: "Diagnostic Imaging Preparation",
    category: "Diagnostics",
    description:
      "Guidelines for 3T MRI, CT scans with contrast, digital mammography, and ultrasound appointments.",
    action: "View Protocol",
  },
  {
    title: "Preventive Wellness by Age Group",
    category: "Wellness",
    description:
      "Recommended annual screenings, blood panels, immunizations, and cardiac risk assessments.",
    action: "View Schedule",
  },
];

const downloadableForms = [
  {
    name: "New Patient Registration & Demographics",
    code: "FORM-REG-2026",
    format: "PDF (180 KB)",
  },
  {
    name: "Medical Records Release Authorization",
    code: "FORM-MR-RELEASE",
    format: "PDF (145 KB)",
  },
  {
    name: "General Consent for Medical & Surgical Treatment",
    code: "FORM-CONSENT-GEN",
    format: "PDF (210 KB)",
  },
  {
    name: "Advance Healthcare Directive & Proxy Designation",
    code: "FORM-ADV-DIRECTIVE",
    format: "PDF (260 KB)",
  },
];

const faqs = [
  {
    q: "How early should I arrive before my scheduled appointment?",
    a: "We recommend arriving 15 minutes early for routine outpatient visits and 30 minutes early if you require new patient registration or diagnostic imaging prep.",
  },
  {
    q: "How can I access my lab results and diagnostic imaging reports?",
    a: "All finalized lab panels, echocardiograms, and imaging summaries are published securely to your Patient Portal account within 24 to 48 hours.",
  },
  {
    q: "What insurance plans are accepted at Providence General?",
    a: "We participate in all major commercial networks (BlueCross Premera, Aetna, Cigna, UnitedHealthcare) and Medicare/Medicaid. Visit our Insurance & Pricing page for full details.",
  },
  {
    q: "What are the visiting hours for general inpatient units vs ICU?",
    a: "General inpatient visiting hours are daily from 9:00 AM – 8:00 PM. ICU visiting hours are structured from 11:00 AM – 2:00 PM and 5:00 PM – 7:00 PM to ensure patient rest.",
  },
];

export default function ResourcesPage() {
  return (
    <main className="container-content py-12 sm:py-16">
      <div className="mb-10 max-w-2xl">
        <span className="badge badge-accent mb-2">Patient Care & Education</span>
        <h1 className="t-display text-3xl sm:text-4xl text-fg mb-4">
          Health & Patient Resources
        </h1>
        <p className="t-lead text-sm sm:text-base">
          Helpful guides, preparation instructions, downloadable intake forms, and
          answers to frequently asked questions about care at Providence General.
        </p>
      </div>

      {/* Patient Care Guides */}
      <div className="mb-14">
        <div className="mb-6">
          <h2 className="text-xl sm:text-2xl font-bold text-fg">
            Patient Guides & Care Protocols
          </h2>
          <p className="text-xs sm:text-sm text-mute">
            Essential instructions for hospital visits, surgery, and diagnostics.
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2">
          {patientGuides.map((guide, i) => (
            <Card key={i} className="flex flex-col justify-between p-6">
              <div>
                <span className="badge badge-info text-xs mb-3">
                  {guide.category}
                </span>
                <h3 className="text-base font-bold text-fg mb-2">
                  {guide.title}
                </h3>
                <p className="text-xs leading-relaxed text-mute mb-4">
                  {guide.description}
                </p>
              </div>
              <div className="border-t border-line pt-3">
                <Link
                  href="/contact"
                  className="text-xs font-semibold text-accent hover:underline"
                >
                  {guide.action} &rarr;
                </Link>
              </div>
            </Card>
          ))}
        </div>
      </div>

      {/* Downloadable Forms Section */}
      <div className="mb-14">
        <div className="mb-6">
          <h2 className="text-xl sm:text-2xl font-bold text-fg">
            Downloadable Patient Forms
          </h2>
          <p className="text-xs sm:text-sm text-mute">
            Complete your forms in advance to expedite your check-in process.
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          {downloadableForms.map((form, i) => (
            <Card
              key={i}
              className="flex items-center justify-between p-4 transition-colors hover:bg-bg"
            >
              <div className="space-y-1">
                <div className="text-sm font-bold text-fg">{form.name}</div>
                <div className="text-xs text-mute font-mono">
                  {form.code} &bull; {form.format}
                </div>
              </div>
              <DownloadButton name={form.name} />
            </Card>
          ))}
        </div>
      </div>

      {/* Frequently Asked Questions */}
      <div className="mb-14">
        <div className="mb-6">
          <h2 className="text-xl sm:text-2xl font-bold text-fg">
            Frequently Asked Questions
          </h2>
          <p className="text-xs sm:text-sm text-mute">
            Common questions about appointments, insurance, visiting hours, and records.
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          {faqs.map((faq, i) => (
            <Card key={i} className="p-6">
              <h3 className="text-sm font-bold text-fg mb-2">{faq.q}</h3>
              <p className="text-xs leading-relaxed text-mute">{faq.a}</p>
            </Card>
          ))}
        </div>
      </div>

      {/* Patient Portal & Assistance CTA */}
      <div className="rounded-xl border border-line bg-surface p-8 sm:p-10">
        <div className="flex flex-col justify-between gap-6 sm:flex-row sm:items-center">
          <div className="max-w-xl">
            <span className="badge badge-accent mb-2">Digital Healthcare Portal</span>
            <h3 className="text-xl font-bold text-fg mb-2">
              Manage your care online, 24/7
            </h3>
            <p className="text-xs sm:text-sm text-mute">
              Schedule appointments, review test results, request medication refills,
              and message your care team through the secure Providence Health portal.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Link href="/login">
              <Button>Sign In to Portal</Button>
            </Link>
            <Link href="/appointments">
              <Button variant="secondary">Book Appointment</Button>
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
