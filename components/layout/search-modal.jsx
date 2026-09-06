"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { doctors, departments, services, hospitalInfo } from "@/constants";

const staticSearchItems = [
  { title: "24/7 Level I Trauma Emergency", category: "Emergency", href: "/emergency" },
  { title: "Symptom Decision Engine & Triage", category: "Clinical Tools", href: "/symptom-checker" },
  { title: "Campus Wayfinder & Pavilion Map", category: "Hospital Navigation", href: "/campus-map" },
  { title: "Procedure Cost & Insurance Estimator", category: "Pricing & Billing", href: "/pricing/estimator" },
  { title: "Book an Appointment", category: "Appointments", href: "/appointments" },
  { title: "Patient & Health Resources", category: "Patient Education", href: "/resources" },
  { title: "Health Library & Patient Education", category: "Patient Education", href: "/health-library" },
  { title: "Plan Your Visit & Directions", category: "Hospital Navigation", href: "/visit" },
  { title: "Patient Portal Login", category: "Portal", href: "/login" },
];

export function SearchModal({ isOpen, onClose }) {
  const [query, setQuery] = useState("");
  const router = useRouter();

  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        if (isOpen) onClose();
        else onClose(true);
      }
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const q = query.toLowerCase().trim();

  // Search Results
  const docResults = q
    ? doctors.filter(
        (d) =>
          d.name.toLowerCase().includes(q) ||
          d.specialty.toLowerCase().includes(q) ||
          d.department.toLowerCase().includes(q)
      )
    : [];

  const deptResults = q
    ? departments.filter(
        (d) =>
          d.name.toLowerCase().includes(q) ||
          d.summary.toLowerCase().includes(q)
      )
    : [];

  const servResults = q
    ? services.filter(
        (s) =>
          s.name.toLowerCase().includes(q) ||
          s.description.toLowerCase().includes(q)
      )
    : [];

  const toolResults = q
    ? staticSearchItems.filter(
        (t) =>
          t.title.toLowerCase().includes(q) ||
          t.category.toLowerCase().includes(q)
      )
    : staticSearchItems.slice(0, 4);

  const handleSelect = (href) => {
    router.push(href);
    onClose();
    setQuery("");
  };

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center bg-black/50 p-4 pt-16 sm:pt-24 backdrop-blur-xs">
      <div className="w-full max-w-xl rounded-xl border border-line bg-surface p-4 shadow-2xl space-y-4">
        {/* Search Input */}
        <div className="relative flex items-center border-b border-line pb-3">
          <svg
            className="h-5 w-5 text-mute ml-1 shrink-0"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search doctors, departments, symptoms, services, or tools..."
            className="w-full bg-transparent pl-3 pr-8 text-sm sm:text-base text-fg placeholder:text-mute focus:outline-none"
            autoFocus
          />
          <button
            onClick={() => onClose()}
            className="text-xs font-bold text-mute hover:text-fg"
          >
            ESC
          </button>
        </div>

        {/* Results Container */}
        <div className="max-h-80 overflow-y-auto space-y-3 pr-1 text-xs">
          {/* Doctors */}
          {docResults.length > 0 && (
            <div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-mute mb-1.5 block">
                Physicians & Specialists
              </span>
              <div className="space-y-1">
                {docResults.map((d) => (
                  <button
                    key={d.id}
                    onClick={() => handleSelect(`/doctors/${d.id}`)}
                    className="w-full flex items-center justify-between rounded-lg p-2.5 text-left transition-colors hover:bg-accent-light/50"
                  >
                    <div>
                      <span className="font-bold text-fg block">{d.name}</span>
                      <span className="text-mute">{d.specialty} &bull; {d.department}</span>
                    </div>
                    <span className="text-accent font-semibold text-[11px]">&rarr;</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Departments */}
          {deptResults.length > 0 && (
            <div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-mute mb-1.5 block">
                Specialty Centers
              </span>
              <div className="space-y-1">
                {deptResults.map((d) => (
                  <button
                    key={d.id}
                    onClick={() => handleSelect(`/departments/${d.slug}`)}
                    className="w-full flex items-center justify-between rounded-lg p-2.5 text-left transition-colors hover:bg-accent-light/50"
                  >
                    <div>
                      <span className="font-bold text-fg block">{d.name}</span>
                      <span className="text-mute line-clamp-1">{d.summary}</span>
                    </div>
                    <span className="text-accent font-semibold text-[11px]">&rarr;</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Tools & Resources */}
          {toolResults.length > 0 && (
            <div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-mute mb-1.5 block">
                {q ? "Tools & Pages" : "Quick Hospital Navigation"}
              </span>
              <div className="space-y-1">
                {toolResults.map((t, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleSelect(t.href)}
                    className="w-full flex items-center justify-between rounded-lg p-2.5 text-left transition-colors hover:bg-bg"
                  >
                    <div>
                      <span className="font-semibold text-fg block">{t.title}</span>
                      <span className="text-mute">{t.category}</span>
                    </div>
                    <span className="text-mute text-[11px]">&rarr;</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Empty State */}
          {q &&
            docResults.length === 0 &&
            deptResults.length === 0 &&
            servResults.length === 0 &&
            toolResults.length === 0 && (
              <div className="p-6 text-center text-mute">
                No hospital results found for &ldquo;{query}&rdquo;.
              </div>
            )}
        </div>

        {/* Footer Hint */}
        <div className="border-t border-line pt-2 text-[11px] text-mute flex justify-between">
          <span>Navigate with mouse or keyboard</span>
          <span>Providence Health Directory</span>
        </div>
      </div>
    </div>
  );
}
