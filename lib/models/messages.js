// Data-access layer for patient-doctor clinical messaging.

export const demoConversations = [
  {
    id: "conv-001",
    patientId: "patient-001",
    doctorName: "Dr. Sarah Jenkins",
    doctorRole: "Chief of Cardiovascular Medicine",
    department: "Cardiology",
    avatar: "SJ",
    unreadCount: 0,
    lastUpdated: "2026-08-28T14:32:00Z",
    messages: [
      {
        id: "msg-101",
        sender: "Dr. Sarah Jenkins",
        senderType: "doctor",
        time: "Aug 27, 2026 &bull; 02:15 PM",
        content:
          "Hello Ada, your fasting lipid panel results look steady. The LDL cholesterol dropped from 142 to 118 mg/dL. Are you experiencing any dizziness with the new morning Lisinopril dosage?",
      },
      {
        id: "msg-102",
        sender: "Ada Quinn",
        senderType: "patient",
        time: "Aug 27, 2026 &bull; 04:30 PM",
        content:
          "Thank you Dr. Jenkins. No dizziness so far. My average home blood pressure this week has been around 124/82 mmHg.",
      },
      {
        id: "msg-103",
        sender: "Dr. Sarah Jenkins",
        senderType: "doctor",
        time: "Aug 28, 2026 &bull; 10:32 AM",
        content:
          "Excellent progress. Continue the current regimen. We will do a routine metabolic check in 3 months.",
      },
    ],
  },
  {
    id: "conv-002",
    patientId: "patient-001",
    doctorName: "Lisa Wong, RN",
    doctorRole: "Nurse Care Coordinator",
    department: "Patient Navigation Desk",
    avatar: "LW",
    unreadCount: 1,
    lastUpdated: "2026-08-30T09:15:00Z",
    messages: [
      {
        id: "msg-201",
        sender: "Lisa Wong, RN",
        senderType: "staff",
        time: "Aug 30, 2026 &bull; 09:15 AM",
        content:
          "Good morning Ada, this is a reminder regarding your pre-procedure fasting requirements if you schedule diagnostic cardiac imaging next month. Let us know if you need paperwork submitted to BlueCross.",
      },
    ],
  },
];

let conversationsStore = [...demoConversations];

export function listConversations(patientId = "patient-001") {
  return conversationsStore.filter((c) => c.patientId === patientId);
}

export function getConversationById(id) {
  return conversationsStore.find((c) => c.id === id) || null;
}

export function sendMessage(conversationId, { sender, senderType, content }) {
  const conv = conversationsStore.find((c) => c.id === conversationId);
  if (!conv) return null;

  const newMsg = {
    id: `msg-${Date.now()}`,
    sender: sender || "Ada Quinn",
    senderType: senderType || "patient",
    time: "Just now",
    content,
  };

  conv.messages.push(newMsg);
  conv.lastUpdated = new Date().toISOString();
  return newMsg;
}
