"use client";

import { useState, useMemo } from "react";
import { services, hospitalInfo } from "@/constants";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const categories = [
  "All",
  "Critical Care",
  "Diagnostics",
  "Surgical Care",
  "Wellness & Prevention",
  "Outpatient",
  "Pharmacy",
];

export default function ServicesPage() {
  const [activeCategory, setActiveCategory] = useState("All");

  const filteredServices = useMemo(() => {
    if (activeCategory === "All") return services;
    return services.filter(
      (s) => s.category.toLowerCase() === activeCategory.toLowerCase()
    );
  }, [activeCategory]);

  return (
    <main className="container-content py-12 sm:py-16">
      <div className="mb-10 max-w-2xl">
        <span className="badge badge-accent mb-2">Clinical Care & Diagnostics</span>
        <h1 className="t-display text-3xl sm:text-4xl text-fg mb-4">
          Hospital Services & Facilities
        </h1>
        <p className="t-lead text-sm sm:text-base">
          From Level I Trauma and 3T MRI diagnostics to da Vinci robotic surgery and
          24/7 inpatient pharmacy support, Providence General Hospital is engineered
          for clinical precision.
        </p>
      </div>

      {/* Category Tabs */}
      <div className="mb-10 flex flex-wrap gap-2 border-b border-line pb-4">
        {categories.map((cat) => (
          <button
            key={cat}
            type="button"
            onClick={() => setActiveCategory(cat)}
            className={`rounded-md px-3.5 py-1.5 text-xs font-semibold transition-colors ${
              activeCategory === cat
                ? "bg-accent text-accent-fg"
                : "bg-surface text-mute hover:text-fg hover:bg-bg border border-line"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Services Grid */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {filteredServices.map((service) => (
          <Card
            key={service.id}
            className="flex flex-col justify-between p-6 transition-shadow hover:shadow-md"
          >
            <div>
              <div className="mb-3 flex items-center justify-between">
                <span className="badge badge-info text-xs">{service.category}</span>
                <span className="badge badge-accent text-xs">{service.badge}</span>
              </div>
              <h3 className="text-lg font-bold text-fg mb-2">{service.name}</h3>
              <p className="text-xs leading-relaxed text-mute mb-4">
                {service.description}
              </p>
            </div>

            <div className="border-t border-line pt-4 flex gap-2">
              <Link href="/appointments" className="flex-1">
                <Button size="sm" className="w-full">
                  Book or Inquire
                </Button>
              </Link>
            </div>
          </Card>
        ))}
      </div>

      {/* Pharmacy & Emergency Notice */}
      <div className="mt-16 grid gap-6 sm:grid-cols-2">
        <Card className="border-accent bg-accent-light p-6">
          <span className="badge badge-accent mb-2">24/7 Pharmacy</span>
          <h3 className="text-lg font-bold text-fg mb-2">
            In-House Inpatient & Outpatient Pharmacy
          </h3>
          <p className="text-xs leading-relaxed text-mute mb-4">
            Our hospital pharmacy is staffed around the clock for emergency medication
            fulfillment, prescription counseling, and digital refills.
          </p>
          <div className="text-xs font-semibold text-accent">
            Pharmacy Desk: {hospitalInfo.hours.pharmacy}
          </div>
        </Card>

        <Card className="border-emergency bg-emergency-light p-6">
          <span className="badge badge-emergency mb-2">Emergency Triage</span>
          <h3 className="text-lg font-bold text-emergency mb-2">
            24/7 Trauma & Resuscitation Center
          </h3>
          <p className="text-xs leading-relaxed text-fg mb-4">
            If you or a family member are experiencing chest pain, severe shortness of
            breath, or signs of stroke, contact emergency services immediately.
          </p>
          <a
            href={`tel:${hospitalInfo.phone.emergency.replace(/[^0-9]/g, "")}`}
            className="inline-flex items-center gap-1.5 text-xs font-bold text-emergency hover:underline"
          >
            Call Emergency Dispatch: {hospitalInfo.phone.emergency} &rarr;
          </a>
        </Card>
      </div>
    </main>
  );
}
