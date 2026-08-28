import Link from "next/link";
import { hospitalInfo, emergencyHotlines, departments, legalNav } from "@/constants";

const year = new Date().getFullYear();

export function Footer() {
  return (
    <footer className="site-footer border-t border-line bg-surface">
      <div className="container-content py-12">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {/* Col 1: Hospital Overview */}
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-md bg-accent text-accent-fg font-bold">
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                >
                  <path d="M12 6v12" />
                  <path d="M6 12h12" />
                </svg>
              </div>
              <span className="text-base font-bold tracking-tight text-fg">
                {hospitalInfo.name}
              </span>
            </div>
            <p className="text-xs leading-relaxed text-mute">
              {hospitalInfo.tagline} Established {hospitalInfo.establishedYear}. Licensed{" "}
              {hospitalInfo.licenseNumber}.
            </p>
            <div className="space-y-1 text-xs text-mute">
              <div>{hospitalInfo.address.street}</div>
              <div>
                {hospitalInfo.address.city}, {hospitalInfo.address.state}{" "}
                {hospitalInfo.address.zip}
              </div>
              <div className="pt-1 font-medium text-fg">
                General: {hospitalInfo.phone.general}
              </div>
            </div>
          </div>

          {/* Col 2: Key Specialties */}
          <div className="space-y-3">
            <span className="text-sm font-semibold text-fg">Medical Departments</span>
            <nav className="flex flex-col space-y-1.5 text-xs text-mute">
              {departments.slice(0, 6).map((dept) => (
                <Link
                  key={dept.id}
                  href={`/departments/${dept.slug}`}
                  className="hover:text-accent hover:underline"
                >
                  {dept.name}
                </Link>
              ))}
              <Link
                href="/departments"
                className="font-semibold text-accent hover:underline"
              >
                View all departments &rarr;
              </Link>
            </nav>
          </div>

          {/* Col 3: Hours & Quick Access */}
          <div className="space-y-3">
            <span className="text-sm font-semibold text-fg">Clinical Hours</span>
            <div className="space-y-2 text-xs text-mute">
              <div>
                <span className="font-semibold text-emergency">Emergency Desk:</span>
                <div>{hospitalInfo.hours.emergency}</div>
              </div>
              <div>
                <span className="font-medium text-fg">Outpatient Clinics:</span>
                <div>{hospitalInfo.hours.outpatient}</div>
              </div>
              <div>
                <span className="font-medium text-fg">Visiting Hours:</span>
                <div>{hospitalInfo.hours.visitingHours}</div>
              </div>
            </div>
          </div>

          {/* Col 4: Emergency Contacts & Accreditations */}
          <div className="space-y-3">
            <span className="text-sm font-semibold text-emergency">
              24/7 Emergency Dispatch
            </span>
            <div className="space-y-2">
              {emergencyHotlines.slice(0, 2).map((hotline, idx) => (
                <div key={idx} className="rounded border border-line bg-bg p-2 text-xs">
                  <div className="font-semibold text-emergency">{hotline.title}</div>
                  <a
                    href={`tel:${hotline.phone.replace(/[^0-9]/g, "")}`}
                    className="font-bold text-fg hover:text-accent"
                  >
                    {hotline.phone}
                  </a>
                </div>
              ))}
            </div>
            <div className="pt-2">
              <span className="text-xs font-semibold text-fg">Accreditations</span>
              <ul className="mt-1 space-y-1 text-xs text-mute">
                {hospitalInfo.accreditations.map((acc, i) => (
                  <li key={i} className="flex items-start gap-1">
                    <span className="text-accent">&#10003;</span> {acc}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-10 flex flex-col items-center justify-between gap-3 border-t border-line pt-6 text-xs text-mute sm:flex-row">
          <p>&copy; {year} {hospitalInfo.name}. All rights reserved.</p>
          <div className="flex flex-wrap justify-center gap-4">
            {legalNav.map((item) => (
              <Link key={item.href} href={item.href} className="hover:underline">
                {item.label}
              </Link>
            ))}
            <Link href="/login" className="hover:underline">
              Patient Portal
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
