"use client";

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { hospitalInfo } from "@/constants";
import Link from "next/link";

const pavilions = [
  {
    id: "pav-a",
    name: "Pavilion A &bull; Heart & Vascular Tower",
    code: "PAV-A",
    color: "border-accent",
    floors: [
      { floor: "Level 1", departments: "Main Lobby, Patient Admitting, Valet Desk, Outpatient Pharmacy" },
      { floor: "Level 2", departments: "Cardiology Clinic, Non-Invasive Cardiac Lab, ECG & Echo Suites" },
      { floor: "Level 3", departments: "Cardiac Catheterization Labs, Electrophysiology Suite" },
      { floor: "Level 4", departments: "Cardiovascular ICU (CVICU), Post-Surgical Step-Down" },
    ],
  },
  {
    id: "pav-b",
    name: "Pavilion B &bull; Neuroscience & Diagnostic Pavilion",
    code: "PAV-B",
    color: "border-info",
    floors: [
      { floor: "Ground Floor", departments: "Diagnostic Imaging (3T MRI, 128-Slice CT, X-Ray)" },
      { floor: "Level 1", departments: "Neurology & Stroke Clinic, EEG & EMG Laboratories" },
      { floor: "Level 2", departments: "Orthopedics, Physical Therapy & Rehabilitation Gym" },
      { floor: "Level 3", departments: "Oncology Infusion Center & Clinical Trials Unit" },
    ],
  },
  {
    id: "pav-c",
    name: "Pavilion C &bull; Women & Children's Pavilion",
    code: "PAV-C",
    color: "border-warning",
    floors: [
      { floor: "Level 1", departments: "Pediatric Outpatient Clinic & Adolescent Wellness" },
      { floor: "Level 2", departments: "Labor, Delivery & Family Postpartum Suites" },
      { floor: "Level 3", departments: "Level III Neonatal Intensive Care Unit (NICU)" },
    ],
  },
  {
    id: "pav-er",
    name: "Emergency & Level I Trauma Pavilion",
    code: "PAV-ER",
    color: "border-emergency",
    floors: [
      { floor: "Ground Floor", departments: "24/7 Level I Adult & Pediatric Trauma Bays, Resuscitation Rooms, Ambulance Bay" },
      { floor: "Level 1", departments: "Emergency Radiology & Fast-Track Triage Desk" },
    ],
  },
];

const wayfinderRoutes = {
  "Main Entrance->Cardiology Clinic": {
    steps: [
      "Enter through Pavilion A Main Entrance (Level 1).",
      "Pass the Patient Admitting desk and take Elevator Bank A to Level 2.",
      "Turn left off the elevator; follow the blue ceiling signs to Suite 210.",
    ],
    time: "3 minutes",
    accessible: "100% ADA Wheelchair Accessible (Elevator Bank A)",
  },
  "Main Entrance->Diagnostic Imaging (MRI/CT)": {
    steps: [
      "Enter Pavilion A Main Lobby and cross the glass sky-bridge to Pavilion B.",
      "Take Elevator Bank B down to the Ground Floor.",
      "Check in at the Diagnostic Imaging reception window on your right.",
    ],
    time: "5 minutes",
    accessible: "100% ADA Accessible (Level Skybridge & Elevator B)",
  },
  "Emergency Parking->Pediatric Unit": {
    steps: [
      "From Visitor Parking Garage P2, take the covered pedestrian walkway to Pavilion C.",
      "Enter Pavilion C Lobby on Level 1.",
      "Proceed straight ahead past the fountain into the Pediatric Care Center.",
    ],
    time: "4 minutes",
    accessible: "Full ramp access from Garage P2",
  },
  "Visitor Parking Garage->Outpatient Pharmacy": {
    steps: [
      "Take the Parking Garage elevator to Level 1 Ground Exit.",
      "Follow the covered breezeway directly into Pavilion A Main Entrance.",
      "The Providence In-House Pharmacy counter is immediately on your left.",
    ],
    time: "2 minutes",
    accessible: "Level walk with automatic sliding doors",
  },
};

export default function CampusMapPage() {
  const [selectedPavilion, setSelectedPavilion] = useState("pav-a");
  const [startPoint, setStartPoint] = useState("Main Entrance");
  const [destination, setDestination] = useState("Cardiology Clinic");

  const routeKey = `${startPoint}->${destination}`;
  const route = wayfinderRoutes[routeKey] || {
    steps: [
      `Proceed from ${startPoint} towards the central info desk.`,
      `Follow directional signage towards ${destination}.`,
      "Ask any Providence volunteer wearing a clinical blue blazer for escort assistance.",
    ],
    time: "4–6 minutes",
    accessible: "Wheelchair escort available upon request at all entrances",
  };

  const currentPav = pavilions.find((p) => p.id === selectedPavilion);

  return (
    <main className="container-content py-12 sm:py-16">
      {/* Header */}
      <div className="mb-10 max-w-2xl">
        <span className="badge badge-accent mb-2">Hospital Campus & Navigation</span>
        <h1 className="t-display text-3xl sm:text-4xl text-fg mb-4">
          Campus Map & Wayfinder Guide
        </h1>
        <p className="t-lead text-sm sm:text-base">
          Find your way around Providence General Hospital&apos;s medical pavilions, clinical
          suites, diagnostic centers, and visitor parking decks.
        </p>
      </div>

      {/* Interactive Wayfinder Tool */}
      <Card className="p-6 sm:p-8 mb-12 border-accent-light bg-surface shadow-sm">
        <div className="mb-6 border-b border-line pb-4">
          <span className="badge badge-info mb-1">Step-by-Step Navigator</span>
          <h2 className="text-xl font-bold text-fg">Indoor Wayfinder & Route Planner</h2>
          <p className="text-xs text-mute">
            Select your entrance point and clinical destination for detailed walking directions.
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 mb-6">
          <div>
            <label className="text-xs font-semibold uppercase tracking-wider text-mute mb-1.5 block">
              Starting Point
            </label>
            <select
              className="input-clinical h-10 text-sm"
              value={startPoint}
              onChange={(e) => setStartPoint(e.target.value)}
            >
              <option value="Main Entrance">Main Entrance (Pavilion A)</option>
              <option value="Emergency Parking">Emergency Parking (Garage P1)</option>
              <option value="Visitor Parking Garage">Visitor Parking (Garage P2)</option>
            </select>
          </div>

          <div>
            <label className="text-xs font-semibold uppercase tracking-wider text-mute mb-1.5 block">
              Destination Clinic / Department
            </label>
            <select
              className="input-clinical h-10 text-sm"
              value={destination}
              onChange={(e) => setDestination(e.target.value)}
            >
              <option value="Cardiology Clinic">Cardiology Clinic (Pavilion A, Fl 2)</option>
              <option value="Diagnostic Imaging (MRI/CT)">Diagnostic Imaging (Pavilion B, Ground)</option>
              <option value="Pediatric Unit">Pediatric Unit (Pavilion C, Fl 1)</option>
              <option value="Outpatient Pharmacy">Outpatient Pharmacy (Pavilion A, Fl 1)</option>
            </select>
          </div>
        </div>

        {/* Calculated Route Instructions */}
        <div className="rounded-lg bg-bg p-5 border border-line space-y-3">
          <div className="flex flex-wrap items-center justify-between gap-2 border-b border-line pb-2">
            <span className="text-xs font-bold text-fg">
              Route: {startPoint} &rarr; {destination}
            </span>
            <div className="flex items-center gap-3 text-xs">
              <span className="font-semibold text-accent">Est. Walking Time: {route.time}</span>
              <span className="text-mute">&bull;</span>
              <span className="text-success font-medium">{route.accessible}</span>
            </div>
          </div>

          <ol className="space-y-2 text-xs sm:text-sm text-fg list-decimal list-inside leading-relaxed">
            {route.steps.map((step, idx) => (
              <li key={idx} className="pl-1">
                {step}
              </li>
            ))}
          </ol>
        </div>
      </Card>

      {/* Pavilion Directory Section */}
      <div className="space-y-6">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold text-fg">
            Hospital Pavilion & Floor Directory
          </h2>
          <p className="text-xs sm:text-sm text-mute">
            Explore department locations across our specialized care pavilions.
          </p>
        </div>

        {/* Pavilion Tabs */}
        <div className="flex flex-wrap gap-2 border-b border-line pb-3">
          {pavilions.map((pav) => (
            <button
              key={pav.id}
              type="button"
              onClick={() => setSelectedPavilion(pav.id)}
              className={`rounded-md px-4 py-2 text-xs font-semibold transition-colors ${
                selectedPavilion === pav.id
                  ? "bg-accent text-accent-fg"
                  : "bg-surface text-mute hover:text-fg border border-line"
              }`}
            >
              {pav.code}
            </button>
          ))}
        </div>

        {/* Selected Pavilion Details */}
        {currentPav && (
          <Card className={`p-6 sm:p-8 border-l-4 ${currentPav.color}`}>
            <div className="mb-4">
              <span className="text-xs font-mono font-bold text-accent">{currentPav.code}</span>
              <h3
                className="text-lg sm:text-xl font-bold text-fg"
                dangerouslySetInnerHTML={{ __html: currentPav.name }}
              />
            </div>

            <div className="space-y-3">
              {currentPav.floors.map((fl, i) => (
                <div
                  key={i}
                  className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 sm:gap-4 rounded bg-bg p-3 text-xs"
                >
                  <span className="font-bold text-accent shrink-0 sm:w-28">{fl.floor}</span>
                  <span className="text-fg flex-1">{fl.departments}</span>
                </div>
              ))}
            </div>
          </Card>
        )}
      </div>

      {/* Parking & Transit Information */}
      <div className="grid gap-6 sm:grid-cols-3 mt-12">
        <Card className="p-6">
          <h4 className="text-sm font-bold text-fg mb-2">Visitor Parking (Garage P2)</h4>
          <p className="text-xs text-mute leading-relaxed">
            Direct covered connection to Pavilions A, B, and C. Free parking for the first
            2 hours; valet available at Pavilion A entrance ($6/day).
          </p>
        </Card>

        <Card className="p-6">
          <h4 className="text-sm font-bold text-fg mb-2">Emergency Parking (Garage P1)</h4>
          <p className="text-xs text-mute leading-relaxed">
            Reserved exclusively for Emergency & Trauma patients with direct ground-level
            access into the ER Fast-Track triage bay.
          </p>
        </Card>

        <Card className="p-6">
          <h4 className="text-sm font-bold text-fg mb-2">Accessibility & Wheelchair Escorts</h4>
          <p className="text-xs text-mute leading-relaxed">
            All entrances feature automatic doors and wheelchair charging stations. Volunteer
            escorts are stationed at every pavilion desk 24/7.
          </p>
        </Card>
      </div>
    </main>
  );
}
