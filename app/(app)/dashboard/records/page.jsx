"use client";

import { useState } from "react";
import { useAuth } from "@/contexts/auth-context";
import { listRecords, listVitalTrends } from "@/lib/models/records";
import { hospitalInfo } from "@/constants";
import { StatusBadge } from "@/components/hospital/status-badge";
import { TrendChart } from "@/components/hospital/trend-chart";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function PatientMedicalRecordsPage() {
  const { user } = useAuth();
  const [category, setCategory] = useState("All");
  const [selectedRecord, setSelectedRecord] = useState(null);
  const [showTrends, setShowTrends] = useState(true);

  const records = listRecords({
    patientId: user?.id || "patient-001",
    category,
  });

  const vitalTrends = listVitalTrends({ patientId: user?.id || "patient-001" });

  const handlePrint = (rec) => {
    setSelectedRecord(rec);
    setTimeout(() => {
      window.print();
    }, 200);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <span className="badge badge-accent mb-1">Diagnostic History</span>
        <h1 className="text-2xl sm:text-3xl font-bold text-fg">
          Medical Records & Diagnostic Reports
        </h1>
        <p className="text-xs sm:text-sm text-mute">
          Access verified laboratory panels, echocardiograms, MRI scans, and pathology
          reports from Providence General.
        </p>
      </div>

      {/* Longitudinal Vitals & Lab Trend Timeline */}
      <Card className="p-6">
        <div className="flex items-center justify-between">
          <div>
            <span className="badge badge-info mb-1">
              Longitudinal Monitoring
            </span>
            <h2 className="text-lg font-bold text-fg">
              Vitals & Lab Trend Timeline
            </h2>
            <p className="text-xs text-mute mt-0.5">
              Six-month trend of key biomarkers with documented reference ranges.
            </p>
          </div>
          <button
            type="button"
            onClick={() => setShowTrends((v) => !v)}
            className="text-xs font-semibold text-accent hover:underline"
          >
            {showTrends ? "Hide Trends" : "Show Trends"}
          </button>
        </div>

        {showTrends && (
          <div className="mt-6 grid gap-4 md:grid-cols-2">
            {vitalTrends.map((trend) => (
              <div
                key={trend.id}
                className="rounded-lg border border-line bg-bg p-4"
              >
                <div className="mb-3 flex items-start justify-between gap-2">
                  <div>
                    <div className="text-sm font-bold text-fg">
                      {trend.metric}
                      <span className="ml-1.5 text-xs font-semibold text-mute">
                        ({trend.unit})
                      </span>
                    </div>
                    <div className="text-xs text-mute">
                      Target range: {trend.goal}
                    </div>
                  </div>
                  <span className="badge badge-accent text-xs">
                    {trend.points.at(-1).value} {trend.unit}
                  </span>
                </div>

                <TrendChart
                  data={trend.points}
                  unit={trend.unit}
                  refMin={trend.refMin}
                  refMax={trend.refMax}
                  color={trend.color}
                />

                <p className="mt-3 border-t border-line pt-2 text-[11px] leading-relaxed text-mute">
                  {trend.notes}
                </p>
              </div>
            ))}
          </div>
        )}
      </Card>

      {/* Filter Tabs */}
      <div className="flex gap-2 border-b border-line pb-3">
        {["All", "Lab Results", "Imaging Report"].map((cat) => (
          <button
            key={cat}
            type="button"
            onClick={() => setCategory(cat)}
            className={`rounded-md px-3.5 py-1.5 text-xs font-semibold transition-colors ${
              category === cat
                ? "bg-accent text-accent-fg"
                : "bg-surface text-mute hover:text-fg border border-line"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Records List */}
      <div className="space-y-4">
        {records.map((rec) => (
          <Card key={rec.id} className="p-6 transition-shadow hover:shadow-sm">
            <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-start">
              <div className="space-y-2 max-w-2xl">
                <div className="flex items-center gap-2">
                  <StatusBadge status={rec.status} />
                  <span className="badge badge-info text-xs">{rec.category}</span>
                  <span className="text-xs font-mono text-mute">{rec.id}</span>
                </div>

                <h3 className="text-lg font-bold text-fg">{rec.title}</h3>

                <div className="text-xs text-mute">
                  Ordered by:{" "}
                  <span className="font-semibold text-fg">{rec.doctorName}</span> &bull;{" "}
                  <span>{rec.department}</span> &bull; Date:{" "}
                  <strong className="text-fg">{rec.date}</strong>
                </div>

                <p className="text-xs leading-relaxed text-mute rounded bg-bg p-3">
                  <span className="font-semibold text-fg block mb-0.5">
                    Clinical Finding Summary:
                  </span>
                  {rec.summary}
                </p>
              </div>

              <div className="flex sm:flex-col gap-2 shrink-0">
                <Button
                  size="sm"
                  variant="secondary"
                  onClick={() => setSelectedRecord(rec)}
                >
                  View Details
                </Button>
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => handlePrint(rec)}
                  className="text-xs"
                >
                  Print Report
                </Button>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Detailed Report Modal & Print Layout */}
      {selectedRecord && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4 backdrop-blur-sm print:relative print:p-0 print:bg-white print:backdrop-none">
          <div className="w-full max-w-lg rounded-xl border border-line bg-surface p-6 sm:p-8 shadow-lg print:border-none print:shadow-none print:max-w-full">
            {/* Official Hospital Letterhead for Print */}
            <div className="mb-4 border-b border-line pb-4 flex items-center justify-between">
              <div>
                <div className="text-xs font-bold uppercase tracking-wider text-accent">
                  {hospitalInfo.name} &bull; Clinical Pathology & Diagnostics
                </div>
                <h3 className="text-lg font-bold text-fg mt-1">
                  Official Diagnostic Examination Report
                </h3>
              </div>
              <button
                onClick={() => setSelectedRecord(null)}
                className="text-mute hover:text-fg text-lg font-bold print:hidden"
              >
                &times;
              </button>
            </div>

            <div className="space-y-3 text-xs mb-6">
              <div className="flex justify-between border-b border-line pb-1.5">
                <span className="text-mute">Patient Name & MRN:</span>
                <span className="font-semibold text-fg">
                  {user?.name || "Ada Quinn"} &bull; ({user?.mrn || "MRN-48920-A"})
                </span>
              </div>
              <div className="flex justify-between border-b border-line pb-1.5">
                <span className="text-mute">Examination Title:</span>
                <span className="font-semibold text-fg">{selectedRecord.title}</span>
              </div>
              <div className="flex justify-between border-b border-line pb-1.5">
                <span className="text-mute">Ordering Specialist:</span>
                <span className="font-semibold text-accent">
                  {selectedRecord.doctorName} ({selectedRecord.department})
                </span>
              </div>
              <div className="flex justify-between border-b border-line pb-1.5">
                <span className="text-mute">Date Administered:</span>
                <span className="font-semibold text-fg">{selectedRecord.date}</span>
              </div>
              <div className="flex justify-between border-b border-line pb-1.5">
                <span className="text-mute">Clinical Status:</span>
                <StatusBadge status={selectedRecord.status} />
              </div>

              <div className="pt-2">
                <span className="font-semibold text-fg block mb-1">
                  Physician Interpretation & Clinical Impression:
                </span>
                <div className="rounded bg-bg p-3.5 text-fg leading-relaxed border border-line">
                  {selectedRecord.summary}
                </div>
              </div>

              <div className="pt-3 border-t border-line text-[11px] text-mute flex justify-between">
                <span>Electronic Signature: Verified by Dr. {selectedRecord.doctorName.split(" ")[1]}</span>
                <span>Hospital ID: #NY-MED-8942</span>
              </div>
            </div>

            <div className="flex justify-end gap-2 border-t border-line pt-4 print:hidden">
              <Button
                variant="secondary"
                size="sm"
                onClick={() => setSelectedRecord(null)}
              >
                Close
              </Button>
              <Button
                size="sm"
                onClick={() => window.print()}
              >
                Print / Export PDF
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
