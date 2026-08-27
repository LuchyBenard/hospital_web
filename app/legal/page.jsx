import Link from "next/link";
import { Card } from "@/components/ui/card";
import { legalNav } from "@/constants";

const summaries = {
  "Privacy Policy":
    "How we collect, use, protect, and share your health and personal information, and your rights under HIPAA and applicable law.",
  "Terms of Use":
    "The rules that govern your use of this website, including medical information disclaimers and acceptable use.",
  Accessibility:
    "Our commitment to making this website usable by everyone, including assistive technologies and feedback channels.",
};

export const metadata = {
  title: "Policies & Legal",
  description:
    "Providence General Hospital privacy policy, website terms of use, and accessibility statement.",
};

export default function LegalIndexPage() {
  return (
    <main className="container-content py-12 sm:py-16">
      <div className="mx-auto max-w-3xl">
        <header className="mb-8">
          <span className="badge badge-accent mb-2">Policies</span>
          <h1 className="text-2xl sm:text-3xl font-bold text-fg mb-3">
            Policies & Legal Information
          </h1>
          <p className="t-lead text-sm sm:text-base">
            The documents below explain how Providence General Hospital handles
            your information, the terms that apply when you use this website,
            and our commitment to digital accessibility.
          </p>
        </header>

        <div className="grid gap-4 sm:grid-cols-3">
          {legalNav.map((item) => (
            <Link key={item.href} href={item.href}>
              <Card className="h-full lift transition-shadow hover:shadow-md">
                <h2 className="mb-1.5 text-sm font-bold text-fg">{item.label}</h2>
                <p className="text-xs leading-relaxed text-mute">
                  {summaries[item.label]}
                </p>
                <span className="mt-3 inline-block text-xs font-semibold text-accent">
                  Read more &rarr;
                </span>
              </Card>
            </Link>
          ))}
        </div>

        <p className="mt-8 text-xs text-mute">
          Questions about these policies? Call our front desk at{" "}
          <span className="font-medium text-fg">(800) 555-0199</span> or email{" "}
          <a href="mailto:privacy@providencegeneral.org" className="text-accent hover:underline">
            privacy@providencegeneral.org
          </a>.
        </p>
      </div>
    </main>
  );
}
