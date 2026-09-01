// Data-access layer for hospital billing, procedure pricing, and patient statements.

export const procedureEstimates = [
  {
    id: "proc-001",
    name: "Complete Echocardiogram (2D & Doppler)",
    department: "Cardiology",
    cptCode: "CPT-93306",
    basePrice: 1250,
    insuranceRates: {
      "BlueCross BlueShield": { covered: 1050, patientCoPay: 200 },
      Aetna: { covered: 1000, patientCoPay: 250 },
      Cigna: { covered: 1025, patientCoPay: 225 },
      UnitedHealthcare: { covered: 975, patientCoPay: 275 },
      "Medicare Part B": { covered: 1062.5, patientCoPay: 187.5 },
      "Self-Pay (Uninsured Discount)": { covered: 500, patientCoPay: 750 },
    },
  },
  {
    id: "proc-002",
    name: "Diagnostic Brain MRI (3.0 Tesla without Contrast)",
    department: "Neurology / Radiology",
    cptCode: "CPT-70551",
    basePrice: 1850,
    insuranceRates: {
      "BlueCross BlueShield": { covered: 1550, patientCoPay: 300 },
      Aetna: { covered: 1475, patientCoPay: 375 },
      Cigna: { covered: 1500, patientCoPay: 350 },
      UnitedHealthcare: { covered: 1450, patientCoPay: 400 },
      "Medicare Part B": { covered: 1572.5, patientCoPay: 277.5 },
      "Self-Pay (Uninsured Discount)": { covered: 750, patientCoPay: 1100 },
    },
  },
  {
    id: "proc-003",
    name: "Comprehensive Metabolic & Lipid Panel",
    department: "Clinical Pathology",
    cptCode: "CPT-80053",
    basePrice: 320,
    insuranceRates: {
      "BlueCross BlueShield": { covered: 295, patientCoPay: 25 },
      Aetna: { covered: 280, patientCoPay: 40 },
      Cigna: { covered: 290, patientCoPay: 30 },
      UnitedHealthcare: { covered: 270, patientCoPay: 50 },
      "Medicare Part B": { covered: 304, patientCoPay: 16 },
      "Self-Pay (Uninsured Discount)": { covered: 170, patientCoPay: 150 },
    },
  },
  {
    id: "proc-004",
    name: "Outpatient Knee Arthroscopy & Meniscal Repair",
    department: "Orthopedics & Sports Medicine",
    cptCode: "CPT-29881",
    basePrice: 4200,
    insuranceRates: {
      "BlueCross BlueShield": { covered: 3550, patientCoPay: 650 },
      Aetna: { covered: 3400, patientCoPay: 800 },
      Cigna: { covered: 3450, patientCoPay: 750 },
      UnitedHealthcare: { covered: 3300, patientCoPay: 900 },
      "Medicare Part B": { covered: 3570, patientCoPay: 630 },
      "Self-Pay (Uninsured Discount)": { covered: 1700, patientCoPay: 2500 },
    },
  },
];

export const demoStatements = [
  {
    id: "INV-2026-8941",
    date: "2026-08-15",
    dueDate: "2026-09-15",
    serviceDescription: "Cardiology Consultation & Diagnostic Resting ECG",
    department: "Cardiology & Vascular Medicine",
    physician: "Dr. Sarah Jenkins",
    totalBilled: 450,
    insurancePaid: 360,
    patientBalance: 90,
    status: "Unpaid", // Unpaid | Paid
  },
  {
    id: "INV-2026-7812",
    date: "2026-07-10",
    dueDate: "2026-08-10",
    serviceDescription: "Comprehensive Blood Chemistry Panel & Lipid Profile",
    department: "Clinical Pathology",
    physician: "Dr. Michael Thorne",
    totalBilled: 320,
    insurancePaid: 295,
    patientBalance: 0,
    status: "Paid",
    paidDate: "2026-07-22",
  },
];

let statementsStore = [...demoStatements];

export function listPatientStatements(patientId = "patient-001") {
  return [...statementsStore];
}

export function payStatement(id, amount) {
  const stmt = statementsStore.find((s) => s.id === id);
  if (!stmt) return null;
  stmt.status = "Paid";
  stmt.patientBalance = 0;
  stmt.paidDate = new Date().toISOString().split("T")[0];
  stmt.paymentReference = `TXN-PROV-${Date.now()}`;
  return stmt;
}
