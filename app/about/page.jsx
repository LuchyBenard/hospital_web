import { hospitalInfo } from "@/constants";
import { Card } from "@/components/ui/card";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export const metadata = {
  title: "About Us | Providence General Hospital",
  description:
    "Learn about Providence General Hospital's 40-year history of clinical excellence, Magnet nursing recognition, and community health mission.",
};

export default function AboutPage() {
  return (
    <main className="container-content py-12 sm:py-16 max-w-4xl">
      <div className="mb-10">
        <span className="badge badge-accent mb-2">Our History & Mission</span>
        <h1 className="t-display text-3xl sm:text-4xl text-fg mb-4">
          Forty Years of Medical Leadership & Compassionate Care
        </h1>
        <p className="t-lead text-sm sm:text-base leading-relaxed">
          Founded in {hospitalInfo.establishedYear}, {hospitalInfo.name} has grown from
          a regional community clinic into a nationally accredited tertiary medical
          center and Level I Trauma Hub.
        </p>
      </div>

      <div className="space-y-8">
        <Card className="p-6 sm:p-8">
          <h2 className="text-xl font-bold text-fg mb-3">Our Core Clinical Mission</h2>
          <p className="text-sm text-mute leading-relaxed mb-4">
            To provide evidence-based, compassionate medical care of the highest quality
            to every patient who enters our doors, regardless of background or
            circumstance. We combine advanced biomedical technology with deep human
            empathy to improve patient outcomes and community well-being.
          </p>
          <div className="grid gap-4 sm:grid-cols-3 border-t border-line pt-4 text-xs sm:text-sm">
            <div>
              <span className="font-bold text-accent block">Clinical Excellence</span>
              <span className="text-mute">
                Top 5% in national cardiac and stroke survival benchmarks.
              </span>
            </div>
            <div>
              <span className="font-bold text-accent block">Patient-Centered</span>
              <span className="text-mute">
                Individualized treatment plans built around family goals.
              </span>
            </div>
            <div>
              <span className="font-bold text-accent block">24/7 Readiness</span>
              <span className="text-mute">
                Level I trauma surgeons and catheterization teams on site around the clock.
              </span>
            </div>
          </div>
        </Card>

        <Card className="p-6 sm:p-8">
          <h2 className="text-xl font-bold text-fg mb-3">Accreditations & Certifications</h2>
          <p className="text-sm text-mute leading-relaxed mb-4">
            Our hospital operates under rigorous state and national clinical oversight:
          </p>
          <ul className="space-y-2 text-xs sm:text-sm text-fg">
            {hospitalInfo.accreditations.map((acc, i) => (
              <li key={i} className="flex items-center gap-2">
                <span className="text-accent font-bold">&#10003;</span>
                <span>{acc}</span>
              </li>
            ))}
            <li className="flex items-center gap-2">
              <span className="text-accent font-bold">&#10003;</span>
              <span>New York State Department of Health License #{hospitalInfo.licenseNumber}</span>
            </li>
          </ul>
        </Card>

        <div className="rounded-xl border border-line bg-surface p-8 text-center sm:p-10">
          <h3 className="text-xl font-bold text-fg mb-2">
            Experience world-class healthcare at Providence
          </h3>
          <p className="text-sm text-mute max-w-xl mx-auto mb-6">
            Explore our specialized departments, meet our physicians, or book an
            outpatient consultation online.
          </p>
          <div className="flex justify-center gap-3">
            <Link href="/appointments">
              <Button>Book Consultation</Button>
            </Link>
            <Link href="/doctors">
              <Button variant="secondary">Browse Medical Staff</Button>
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
