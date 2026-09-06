"use client";

import { useState } from "react";
import { procedureEstimates } from "@/lib/models/billing";
import { InsuranceVerificationWidget } from "@/components/hospital/insurance-verification";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const insuranceList = [
  "BlueCross BlueShield",
  "Aetna",
  "Cigna",
  "UnitedHealthcare",
  "Medicare Part B",
  "Self-Pay (Uninsured Discount)",
];

export default function CostEstimatorPage() {
  const [selectedProcId, setSelectedProcId] = useState("proc-001");
  const [selectedInsurance, setSelectedInsurance] = useState("BlueCross BlueShield");

  const proc = procedureEstimates.find((p) => p.id === selectedProcId) || procedureEstimates[0];
  const rate = proc.insuranceRates[selectedInsurance] || { covered: 0, patientCoPay: proc.basePrice };

  return (
    <main className="container-content py-12 sm:py-16">
      <div className="mb-10 max-w-2xl">
        <span className="badge badge-accent mb-2">Pricing Transparency</span>
        <h1 className="t-display text-3xl sm:text-4xl text-fg mb-4">
          Outpatient Treatment Cost & Insurance Estimator
        </h1>
        <p className="t-lead text-sm sm:text-base">
          Calculate estimated out-of-pocket expenses and insurance coverage for common diagnostic
          and surgical procedures performed at Providence General.
        </p>
      </div>

      <div className="grid gap-8 lg:grid-cols-2">
        {/* Estimator Controls */}
        <Card className="p-6 sm:p-8 space-y-6">
          <div className="border-b border-line pb-3">
            <h2 className="text-lg font-bold text-fg">Estimate Your Procedure</h2>
            <p className="text-xs text-mute">
              Select your procedure and insurance provider to see your estimated co-pay.
            </p>
          </div>

          <div>
            <label className="text-xs font-semibold uppercase tracking-wider text-mute mb-1.5 block">
              1. Select Clinical Procedure
            </label>
            <select
              className="input-clinical h-11 text-sm"
              value={selectedProcId}
              onChange={(e) => setSelectedProcId(e.target.value)}
            >
              {procedureEstimates.map((p) => (
                <option key={p.id} value={p.id}>
                  {p.name} ({p.department})
                </option>
              ))}
            </select>
            <span className="text-[11px] font-mono text-mute mt-1 block">
              Billing Code: {proc.cptCode}
            </span>
          </div>

          <div>
            <label className="text-xs font-semibold uppercase tracking-wider text-mute mb-1.5 block">
              2. Select Insurance Carrier or Self-Pay
            </label>
            <select
              className="input-clinical h-11 text-sm"
              value={selectedInsurance}
              onChange={(e) => setSelectedInsurance(e.target.value)}
            >
              {insuranceList.map((ins) => (
                <option key={ins} value={ins}>
                  {ins}
                </option>
              ))}
            </select>
          </div>

          <div className="rounded bg-bg p-4 text-xs text-mute leading-relaxed border border-line">
            <strong className="text-fg block mb-1">Good Faith Estimate Guarantee:</strong>
            Under the federal No Surprises Act, uninsured and self-pay individuals are entitled to a
            Good Faith Estimate of total expected charges before scheduled services.
          </div>
        </Card>

        {/* Calculation Summary Card */}
        <Card className="p-6 sm:p-8 flex flex-col justify-between border-accent-light bg-accent-light/20">
          <div>
            <div className="border-b border-line pb-4 mb-4">
              <span className="badge badge-accent mb-1">{proc.department}</span>
              <h3 className="text-xl font-bold text-fg">{proc.name}</h3>
              <span className="text-xs text-mute">Standard Base Facility Charge: ${proc.basePrice.toLocaleString()}</span>
            </div>

            <div className="space-y-3 text-xs mb-6">
              <div className="flex justify-between border-b border-line pb-2">
                <span className="text-mute">Insurance Network:</span>
                <strong className="text-fg">{selectedInsurance}</strong>
              </div>
              <div className="flex justify-between border-b border-line pb-2">
                <span className="text-mute">Estimated Plan Allowance / Coverage:</span>
                <span className="font-semibold text-success">
                  -${rate.covered.toLocaleString()}
                </span>
              </div>
              <div className="flex justify-between items-center pt-2">
                <span className="text-sm font-bold text-fg">
                  Estimated Patient Out-of-Pocket:
                </span>
                <span className="text-2xl font-bold text-accent">
                  ${rate.patientCoPay.toLocaleString()}
                </span>
              </div>
            </div>
          </div>

          <div className="space-y-3 pt-4 border-t border-line">
            <Link href="/appointments">
              <Button className="w-full">Book This Procedure</Button>
            </Link>
            <Link href="/pricing">
              <Button variant="secondary" className="w-full">
                View Full Pricing Schedule
              </Button>
            </Link>
          </div>
        </Card>
      </div>

      {/* Insurance Coverage Verification Widget */}
      <div className="mt-10">
        <InsuranceVerificationWidget />
      </div>
    </main>
  );
}
