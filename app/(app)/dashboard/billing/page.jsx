"use client";

import { useState } from "react";
import { useAuth } from "@/contexts/auth-context";
import {
  listPatientStatements,
  payStatement,
} from "@/lib/models/billing";
import { StatusBadge } from "@/components/hospital/status-badge";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input, Field } from "@/components/ui/input";
import Link from "next/link";

export default function PatientBillingPage() {
  const { user } = useAuth();
  const [statements, setStatements] = useState(() =>
    listPatientStatements(user?.id || "patient-001")
  );
  const [payingStatement, setPayingStatement] = useState(null);
  const [cardNumber, setCardNumber] = useState("4532 •••• •••• 8842");
  const [cardExp, setCardExp] = useState("08/29");
  const [cardCvc, setCardCvc] = useState("321");
  const [isProcessing, setIsProcessing] = useState(false);
  const [toastMessage, setToastMessage] = useState("");

  const refresh = () => {
    setStatements(listPatientStatements(user?.id || "patient-001"));
  };

  const totalOutstanding = statements
    .filter((s) => s.status === "Unpaid")
    .reduce((acc, s) => acc + s.patientBalance, 0);

  const handlePaySubmit = (e) => {
    e.preventDefault();
    if (!payingStatement) return;

    setIsProcessing(true);
    setTimeout(() => {
      payStatement(payingStatement.id, payingStatement.patientBalance);
      refresh();
      setIsProcessing(false);
      setToastMessage(`Payment of $${payingStatement.patientBalance} processed successfully. Reference: TXN-PROV-8942`);
      setPayingStatement(null);
      setTimeout(() => setToastMessage(""), 5000);
    }, 600);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <span className="badge badge-accent mb-1">Financial Account</span>
          <h1 className="text-2xl sm:text-3xl font-bold text-fg">
            Patient Statements & Online Payments
          </h1>
          <p className="text-xs sm:text-sm text-mute">
            Review hospital invoices, insurance adjustments, and pay your patient balance
            securely online.
          </p>
        </div>

        <Link href="/pricing/estimator">
          <Button variant="secondary" size="sm">
            Procedure Cost Estimator
          </Button>
        </Link>
      </div>

      {toastMessage && (
        <div className="rounded-md border border-success bg-success-light p-3 text-xs font-semibold text-success">
          {toastMessage}
        </div>
      )}

      {/* Account Balance Summary Cards */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <Card className="p-5 border-accent bg-accent-light/30">
          <span className="text-xs text-mute block mb-1">Current Balance Due</span>
          <span className="text-2xl sm:text-3xl font-bold text-accent">
            ${totalOutstanding.toFixed(2)}
          </span>
          <span className="text-xs text-mute block mt-1">Due within 30 days of statement</span>
        </Card>

        <Card className="p-5">
          <span className="text-xs text-mute block mb-1">Primary Insurance Policy</span>
          <span className="text-base font-bold text-fg block truncate">
            {user?.insurance || "BlueCross Premera Gold (POL-8849-NY)"}
          </span>
          <span className="text-xs text-success font-semibold block mt-1">
            ✓ Claims Verified Active
          </span>
        </Card>

        <Card className="p-5">
          <span className="text-xs text-mute block mb-1">Financial Assistance Desk</span>
          <span className="text-sm font-bold text-fg block">
            Flexible 0% APR Payment Plans
          </span>
          <span className="text-xs text-mute block mt-1">Call Ext. 4410 for assistance</span>
        </Card>
      </div>

      {/* Statements Table / List */}
      <div className="space-y-4">
        <h2 className="text-lg font-bold text-fg">Billing Statements & Invoices</h2>

        <div className="space-y-4">
          {statements.map((stmt) => (
            <Card key={stmt.id} className="p-6 transition-shadow hover:shadow-sm">
              <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-start">
                <div className="space-y-2 max-w-xl">
                  <div className="flex items-center gap-2">
                    <StatusBadge status={stmt.status === "Paid" ? "Completed" : "Pending"} />
                    <span className="text-xs font-mono font-bold text-fg">{stmt.id}</span>
                    <span className="text-xs text-mute">&bull;</span>
                    <span className="text-xs text-mute">Date: {stmt.date}</span>
                  </div>

                  <h3 className="text-base font-bold text-fg">
                    {stmt.serviceDescription}
                  </h3>
                  <div className="text-xs text-mute">
                    Attending: <span className="font-medium text-fg">{stmt.physician}</span> &bull;{" "}
                    <span>{stmt.department}</span>
                  </div>

                  <div className="grid grid-cols-3 gap-2 rounded bg-bg p-3 text-xs mt-2">
                    <div>
                      <span className="text-mute block">Total Billed:</span>
                      <strong className="text-fg">${stmt.totalBilled}</strong>
                    </div>
                    <div>
                      <span className="text-mute block">Insurance Paid:</span>
                      <span className="text-success font-semibold">-${stmt.insurancePaid}</span>
                    </div>
                    <div>
                      <span className="text-mute block">Patient Co-Pay:</span>
                      <strong className={stmt.patientBalance > 0 ? "text-accent" : "text-fg"}>
                        ${stmt.patientBalance}
                      </strong>
                    </div>
                  </div>
                </div>

                <div className="flex sm:flex-col gap-2 shrink-0">
                  {stmt.status === "Unpaid" ? (
                    <Button size="sm" onClick={() => setPayingStatement(stmt)}>
                      Pay Balance (${stmt.patientBalance})
                    </Button>
                  ) : (
                    <Button
                      size="sm"
                      variant="secondary"
                      onClick={() => alert(`Receipt downloaded for ${stmt.id} ($${stmt.totalBilled}).`)}
                    >
                      Download Receipt
                    </Button>
                  )}
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>

      {/* Secure Payment Modal */}
      {payingStatement && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4 backdrop-blur-sm">
          <div className="w-full max-w-md rounded-xl border border-line bg-surface p-6 shadow-lg">
            <div className="mb-4 flex items-center justify-between border-b border-line pb-3">
              <div>
                <span className="badge badge-accent mb-1">Encrypted Payment Gateway</span>
                <h3 className="text-base font-bold text-fg">Pay Medical Statement</h3>
              </div>
              <button
                onClick={() => setPayingStatement(null)}
                className="text-mute hover:text-fg font-bold"
              >
                &times;
              </button>
            </div>

            <form onSubmit={handlePaySubmit} className="space-y-4">
              <div className="rounded bg-bg p-3 text-xs space-y-1">
                <div className="flex justify-between">
                  <span className="text-mute">Statement ID:</span>
                  <span className="font-mono font-bold text-fg">{payingStatement.id}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-mute">Total Balance Due:</span>
                  <span className="font-bold text-accent text-sm">
                    ${payingStatement.patientBalance.toFixed(2)}
                  </span>
                </div>
              </div>

              <Field label="Card Number (Credit, Debit, or HSA/FSA)" htmlFor="payCardNum">
                <Input
                  id="payCardNum"
                  value={cardNumber}
                  onChange={(e) => setCardNumber(e.target.value)}
                  required
                />
              </Field>

              <div className="grid grid-cols-2 gap-3">
                <Field label="Expiration" htmlFor="payExp">
                  <Input
                    id="payExp"
                    value={cardExp}
                    onChange={(e) => setCardExp(e.target.value)}
                    required
                  />
                </Field>
                <Field label="Security Code (CVC)" htmlFor="payCvc">
                  <Input
                    id="payCvc"
                    value={cardCvc}
                    onChange={(e) => setCardCvc(e.target.value)}
                    required
                  />
                </Field>
              </div>

              <div className="flex justify-end gap-2 pt-3 border-t border-line">
                <Button
                  type="button"
                  variant="secondary"
                  size="sm"
                  onClick={() => setPayingStatement(null)}
                >
                  Cancel
                </Button>
                <Button type="submit" size="sm" disabled={isProcessing}>
                  {isProcessing ? "Processing..." : `Confirm Payment ($${payingStatement.patientBalance})`}
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
