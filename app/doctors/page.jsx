"use client";

import { useState, useMemo } from "react";
import { doctors, departments } from "@/constants";
import { DoctorCard } from "@/components/hospital/doctor-card";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

export default function DoctorsDirectoryPage() {
  const [selectedDept, setSelectedDept] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");

  const filteredDoctors = useMemo(() => {
    return doctors.filter((doc) => {
      const matchDept =
        selectedDept === "all" ||
        doc.departmentSlug.toLowerCase() === selectedDept.toLowerCase();

      const matchSearch =
        searchTerm === "" ||
        doc.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        doc.specialty.toLowerCase().includes(searchTerm.toLowerCase()) ||
        doc.bio.toLowerCase().includes(searchTerm.toLowerCase());

      return matchDept && matchSearch;
    });
  }, [selectedDept, searchTerm]);

  return (
    <main className="container-content py-12 sm:py-16">
      <div className="mb-10 max-w-2xl">
        <span className="badge badge-accent mb-2">Medical Staff & Faculty</span>
        <h1 className="t-display text-3xl sm:text-4xl text-fg mb-4">
          Physician & Specialist Directory
        </h1>
        <p className="t-lead text-sm sm:text-base">
          Find board-certified physicians, surgeons, and specialists at Providence
          General Hospital. Filter by medical specialty or search by name.
        </p>
      </div>

      {/* Filter Controls */}
      <Card className="mb-10 p-4 sm:p-6">
        <div className="grid gap-4 md:grid-cols-[1.5fr_1fr]">
          <div>
            <label className="text-xs font-semibold uppercase tracking-wider text-mute mb-1.5 block">
              Search by Physician Name or Keyword
            </label>
            <Input
              type="text"
              placeholder="e.g. Dr. Jenkins, Cardiology, robotic surgery..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <div>
            <label className="text-xs font-semibold uppercase tracking-wider text-mute mb-1.5 block">
              Filter by Department
            </label>
            <select
              className="input-clinical h-10 text-sm"
              value={selectedDept}
              onChange={(e) => setSelectedDept(e.target.value)}
            >
              <option value="all">All Departments & Specialties</option>
              {departments.map((d) => (
                <option key={d.id} value={d.slug}>
                  {d.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Quick specialty tags */}
        <div className="mt-4 flex flex-wrap gap-2 border-t border-line pt-4">
          <span className="text-xs text-mute py-1 font-medium">Quick filter:</span>
          <button
            type="button"
            onClick={() => setSelectedDept("all")}
            className={`rounded px-2.5 py-1 text-xs font-medium transition-colors ${
              selectedDept === "all"
                ? "bg-accent text-accent-fg"
                : "bg-bg text-mute hover:text-fg"
            }`}
          >
            All ({doctors.length})
          </button>
          {departments.map((d) => (
            <button
              key={d.id}
              type="button"
              onClick={() => setSelectedDept(d.slug)}
              className={`rounded px-2.5 py-1 text-xs font-medium transition-colors ${
                selectedDept === d.slug
                  ? "bg-accent text-accent-fg"
                  : "bg-bg text-mute hover:text-fg"
              }`}
            >
              {d.shortName}
            </button>
          ))}
        </div>
      </Card>

      {/* Doctor Grid */}
      {filteredDoctors.length > 0 ? (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {filteredDoctors.map((doc) => (
            <DoctorCard key={doc.id} doctor={doc} />
          ))}
        </div>
      ) : (
        <Card className="p-12 text-center">
          <h3 className="text-lg font-bold text-fg mb-2">No physicians match your filter</h3>
          <p className="text-xs sm:text-sm text-mute mb-4">
            Try adjusting your search keywords or select &quot;All Departments&quot;.
          </p>
          <button
            onClick={() => {
              setSelectedDept("all");
              setSearchTerm("");
            }}
            className="text-xs font-semibold text-accent hover:underline"
          >
            Clear all filters
          </button>
        </Card>
      )}
    </main>
  );
}
