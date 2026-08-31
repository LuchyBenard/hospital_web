"use client";

import { useState } from "react";
import { doctors, hospitalInfo } from "@/constants";
import {
  listAppointments,
  updateAppointmentStatus,
} from "@/lib/models/appointments";
import {
  listPrescriptions,
  approveRefill,
  advanceRefillStage,
} from "@/lib/models/prescriptions";
import { StatusBadge } from "@/components/hospital/status-badge";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function StaffPortalPage() {
  const [selectedDocId, setSelectedDocId] = useState("doc-sarah-jenkins");
  const [appointments, setAppointments] = useState(() => listAppointments());
  const [prescriptions, setPrescriptions] = useState(() => listPrescriptions());
  const [encounterNote, setEncounterNote] = useState("");
  const [activeAptId, setActiveAptId] = useState(null);
  const [message, setMessage] = useState("");

  const selectedDoctor = doctors.find((d) => d.id === selectedDocId);

  const refresh = () => {
    setAppointments(listAppointments());
    setPrescriptions(listPrescriptions());
  };

  const handleCompleteEncounter = (aptId) => {
    updateAppointmentStatus(aptId, "Completed", encounterNote || "Routine consultation completed. Treatment plan established.");
    refresh();
    setActiveAptId(null);
    setEncounterNote("");
    setMessage("Patient encounter finalized and saved to medical record.");
    setTimeout(() => setMessage(""), 4000);
  };

  const handleApproveRx = (rxId) => {
    approveRefill(rxId);
    refresh();
    setMessage("Prescription refill approved by physician. Sent to pharmacy.");
    setTimeout(() => setMessage(""), 4000);
  };

  const handleFulfillRx = (rxId) => {
    advanceRefillStage(rxId, 4);
    refresh();
    setMessage("Medication marked as ready for patient drive-thru pickup.");
    setTimeout(() => setMessage(""), 4000);
  };

  // Filter appointments for the selected physician
  const doctorAppointments = appointments.filter(
    (a) => a.doctorId === selectedDocId || a.doctorName.includes(selectedDoctor?.name.split(" ")[1] || "")
  );

  const pendingRefills = prescriptions.filter((p) => p.refillRequested);

  return (
    <div className="space-y-8">
      {/* Header & Doctor Switcher */}
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <span className="badge badge-accent mb-1">Clinical Staff Workstation</span>
          <h1 className="text-2xl sm:text-3xl font-bold text-fg">
            Physician Encounter & Roster Desk
          </h1>
          <p className="text-xs sm:text-sm text-mute">
            Review daily outpatient clinic queues, record encounter notes, and authorize
            medication refills.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <label className="text-xs font-semibold text-mute">Logged in as:</label>
          <select
            className="input-clinical h-9 text-xs font-semibold"
            value={selectedDocId}
            onChange={(e) => setSelectedDocId(e.target.value)}
          >
            {doctors.map((d) => (
              <option key={d.id} value={d.id}>
                {d.name} ({d.specialty})
              </option>
            ))}
          </select>
        </div>
      </div>

      {message && (
        <div className="rounded-md border border-success bg-success-light p-3 text-xs font-semibold text-success">
          {message}
        </div>
      )}

      {/* Doctor Summary Stat Cards */}
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
        <Card className="p-4">
          <span className="text-xs text-mute block mb-1">Scheduled Patients</span>
          <span className="text-xl font-bold text-fg">{doctorAppointments.length}</span>
          <span className="text-xs text-mute block mt-1">Today&apos;s clinic queue</span>
        </Card>

        <Card className="p-4">
          <span className="text-xs text-mute block mb-1">Pending Refills</span>
          <span className="text-xl font-bold text-accent">{pendingRefills.length}</span>
          <span className="text-xs text-mute block mt-1">Pharmacy requests</span>
        </Card>

        <Card className="p-4">
          <span className="text-xs text-mute block mb-1">Department</span>
          <span className="text-sm font-bold text-fg block truncate">
            {selectedDoctor?.specialty}
          </span>
          <span className="text-xs text-mute block mt-1">Pavilion Clinic</span>
        </Card>

        <Card className="p-4">
          <span className="text-xs text-mute block mb-1">Consultation Fee</span>
          <span className="text-lg font-bold text-accent">
            {selectedDoctor?.consultationFee}
          </span>
          <span className="text-xs text-success block mt-1">Standard rate</span>
        </Card>
      </div>

      {/* Patient Queue & Encounter Notes */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-bold text-fg">
              Patient Queue & Appointments for {selectedDoctor?.name}
            </h2>
            <p className="text-xs text-mute">
              Click &quot;Open Encounter&quot; to chart visit notes and update status.
            </p>
          </div>
        </div>

        {doctorAppointments.length > 0 ? (
          <div className="space-y-4">
            {doctorAppointments.map((apt) => (
              <Card key={apt.id} className="p-6 transition-shadow hover:shadow-sm">
                <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-start">
                  <div className="space-y-2 max-w-xl">
                    <div className="flex items-center gap-2">
                      <StatusBadge status={apt.status} />
                      <span className="text-xs font-mono text-mute">{apt.id}</span>
                      <span className="text-xs font-semibold text-accent">
                        {apt.type}
                      </span>
                    </div>

                    <h3 className="text-base font-bold text-fg">
                      Patient: {apt.patientName} &bull; Time: {apt.time}
                    </h3>
                    <div className="text-xs text-mute">
                      Location: <span className="text-fg">{apt.location}</span> &bull;
                      Date: <strong>{apt.date}</strong>
                    </div>

                    {apt.notes && (
                      <p className="text-xs text-mute rounded bg-bg p-2.5">
                        <span className="font-semibold text-fg">Chief Complaint:</span>{" "}
                        {apt.notes}
                      </p>
                    )}

                    {apt.encounterNotes && (
                      <p className="text-xs text-accent rounded bg-accent-light p-2.5">
                        <span className="font-semibold block mb-0.5">
                          Documented Encounter Notes:
                        </span>
                        {apt.encounterNotes}
                      </p>
                    )}
                  </div>

                  <div className="flex sm:flex-col gap-2 shrink-0">
                    {apt.status === "Upcoming" && (
                      <Button
                        size="sm"
                        onClick={() => {
                          setActiveAptId(apt.id);
                          setEncounterNote(apt.encounterNotes || "");
                        }}
                      >
                        Chart Encounter Notes
                      </Button>
                    )}
                  </div>
                </div>

                {/* Inline Encounter Charting Drawer */}
                {activeAptId === apt.id && (
                  <div className="mt-4 border-t border-line pt-4 space-y-3">
                    <h4 className="text-xs font-bold text-fg uppercase tracking-wider">
                      Document Clinical Encounter & Treatment Plan
                    </h4>
                    <textarea
                      className="input-clinical text-xs"
                      rows={3}
                      value={encounterNote}
                      onChange={(e) => setEncounterNote(e.target.value)}
                      placeholder="Enter clinical findings, diagnosis, vitals, and medication plan..."
                    />
                    <div className="flex justify-end gap-2">
                      <Button
                        variant="secondary"
                        size="sm"
                        onClick={() => setActiveAptId(null)}
                      >
                        Cancel
                      </Button>
                      <Button
                        size="sm"
                        onClick={() => handleCompleteEncounter(apt.id)}
                      >
                        Finalize & Mark Visit Completed
                      </Button>
                    </div>
                  </div>
                )}
              </Card>
            ))}
          </div>
        ) : (
          <Card className="p-8 text-center text-xs text-mute">
            No scheduled patients in the queue for {selectedDoctor?.name}.
          </Card>
        )}
      </div>

      {/* Pending Refill Approvals */}
      <div className="space-y-4">
        <div>
          <h2 className="text-lg font-bold text-fg">
            Pending Medication Refill Approvals
          </h2>
          <p className="text-xs text-mute">
            Physician review queue for Providence Pharmacy refill requests.
          </p>
        </div>

        {pendingRefills.length > 0 ? (
          <div className="space-y-3">
            {pendingRefills.map((rx) => (
              <Card key={rx.id} className="p-4 flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
                <div className="space-y-1 text-xs">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-fg text-sm">{rx.medication}</span>
                    <span className="badge badge-accent text-xs">{rx.dosage}</span>
                    <span className="badge badge-warning text-xs">
                      Stage {rx.refillStage || 1}/4
                    </span>
                  </div>
                  <div className="text-mute">
                    Schedule: <strong className="text-fg">{rx.frequency}</strong> &bull;
                    Prescribed by: {rx.prescribingDoctor}
                  </div>
                  <div className="text-mute">
                    Instructions: {rx.instructions}
                  </div>
                </div>

                <div className="flex gap-2">
                  <Button
                    size="sm"
                    variant="secondary"
                    onClick={() => handleApproveRx(rx.id)}
                  >
                    Approve Rx
                  </Button>
                  <Button
                    size="sm"
                    onClick={() => handleFulfillRx(rx.id)}
                  >
                    Ready for Pickup
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        ) : (
          <Card className="p-6 text-center text-xs text-mute">
            All medication refill requests have been reviewed and approved.
          </Card>
        )}
      </div>
    </div>
  );
}
