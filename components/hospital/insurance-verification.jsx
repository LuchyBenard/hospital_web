"use client";

import { useState } from "react";
import { procedureEstimates, verifyCoverage } from "@/lib/models/billing";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const insuranceOptions = [
  "BlueCross BlueShield",
  "Aetna",
  "Cigna",
  "UnitedHealthcare",
  "Medicare Part B",
  "Self-Pay (Uninsured Discount)",
];

export function InsuranceVerificationWidget() {
  const [selectedProcId, setSelectedProcId] = useState("proc-001");
  const [insurance, setInsurance] = useState("BlueCross BlueShield");
  const [result, setResult] = useState(() =>
    verifyCoverage({
      procedureId: "proc-001",
      insuranceProvider: "BlueCross BlueShield",
    })
  );

  const handleCheck = () => {
    setResult(
      verifyCoverage({ procedureId: selectedProcId, insuranceProvider: insurance })
    );
  };

  return (
    <Card className="p-6 sm:p-8 border-accent-light bg-accent-light/20">
      <div className="mb-5 border-b border-line pb-4">
        <span className="badge badge-accent mb-1">Coverage Verification</span>
        <h2 className="text-lg font-bold text-fg">Verify Coverage Before You Book</h2>
        <p className="text-xs text-mute">
          Check whether a procedure is in-network, requires prior authorization, and
          what your out-of-pocket responsibility may be.
        </p>
      </div>

      <div className="space-y-4">
        <div>
          <label className="text-xs font-semibold uppercase tracking-wider text-mute mb-1.5 block">
            Select Procedure
          </label>
          <select
            className="input-clinical h-11 text-sm"
            value={selectedProcId}
            onChange={(e) => setSelectedProcId(e.target.value)}
          >
            {procedureEstimates.map((p) => (
              <option key={p.id} value={p.id}>
                {p.name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="text-xs font-semibold uppercase tracking-wider text-mute mb-1.5 block">
            Insurance or Self-Pay
          </label>
          <select
            className="input-clinical h-11 text-sm"
            value={insurance}
            onChange={(e) => setInsurance(e.target.value)}
          >
            {insuranceOptions.map((ins) => (
              <option key={ins} value={ins}>
                {ins}
              </option>
            ))}
          </select>
        </div>

        <Button className="w-full" onClick={handleCheck}>
          Verify Coverage
        </Button>
      </div>

      {result && (
        <div className="mt-6 space-y-3 rounded-lg border border-line bg-surface p-4 text-xs">
          <div className="flex items-start justify-between gap-2">
            <span className="text-mute">Network Status:</span>
            <span
              className={cn(
                "badge",
                result.inNetwork ? "badge-success" : "badge-emergency"
              )}
            >
              {result.inNetwork ? "In-Network" : "Out-of-Network"}
            </span>
          </div>
          <div className="flex items-start justify-between gap-2">
            <span className="text-mute">Prior Authorization:</span>
            <span
              className={cn(
                "badge",
                result.preAuthRequired ? "badge-warning" : "badge-success"
              )}
            >
              {result.preAuthRequired ? "Required" : "Not Required"}
            </span>
          </div>
          <div className="flex justify-between border-t border-line pt-2">
            <span className="text-mute">Est. Deductible:</span>
            <span className="font-semibold text-fg">
              ${result.deductible.toLocaleString()}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-mute">Est. Coinsurance:</span>
            <span className="font-semibold text-fg">{result.coinsuranceRate}</span>
          </div>
          <p className="rounded-md bg-bg p-3 leading-relaxed text-mute border border-line">
            {result.coverageNote}
          </p>
        </div>
      )}
    </Card>
  );
}