"use client";

import { useState } from "react";
import { useAuth } from "@/contexts/auth-context";
import {
  listConversations,
  sendMessage,
} from "@/lib/models/messages";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from "next/link";

export default function PatientMessagesPage() {
  const { user } = useAuth();
  const [conversations, setConversations] = useState(() =>
    listConversations(user?.id || "patient-001")
  );
  const [activeConvId, setActiveConvId] = useState(conversations[0]?.id || "conv-001");
  const [replyText, setReplyText] = useState("");
  const [toast, setToast] = useState("");

  const activeConv = conversations.find((c) => c.id === activeConvId);

  const handleSend = (e) => {
    e.preventDefault();
    if (!replyText.trim() || !activeConvId) return;

    sendMessage(activeConvId, {
      sender: user?.name || "Ada Quinn",
      senderType: "patient",
      content: replyText,
    });

    setConversations(listConversations(user?.id || "patient-001"));
    setReplyText("");
    setToast("Clinical message transmitted to your care team.");
    setTimeout(() => setToast(""), 4000);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <span className="badge badge-accent mb-1">Confidential Care Communications</span>
        <h1 className="text-2xl sm:text-3xl font-bold text-fg">
          Clinical Messaging Inbox
        </h1>
        <p className="text-xs sm:text-sm text-mute">
          Direct, encrypted communication with your physicians and nurse coordinators at
          Providence General.
        </p>
      </div>

      {/* Emergency Notice Alert */}
      <div className="rounded-lg border border-emergency-light bg-emergency-light/50 p-4 text-xs text-emergency">
        <strong>Important Emergency Disclaimer:</strong> This portal is for non-urgent
        clinical questions only. In the event of chest pain, shortness of breath, or a
        medical emergency, please call <strong>911</strong> or proceed to the Providence
        Emergency Department.
      </div>

      {toast && (
        <div className="rounded-md border border-success bg-success-light p-3 text-xs font-semibold text-success">
          {toast}
        </div>
      )}

      {/* Inbox Grid */}
      <div className="grid gap-6 lg:grid-cols-[1fr_2fr]">
        {/* Conversations List */}
        <div className="space-y-3">
          <h2 className="text-sm font-bold text-fg">Care Team Conversations</h2>
          {conversations.map((c) => (
            <Card
              key={c.id}
              onClick={() => setActiveConvId(c.id)}
              className={`p-4 cursor-pointer transition-all ${
                activeConvId === c.id
                  ? "border-accent bg-accent-light/40 shadow-xs"
                  : "hover:bg-bg"
              }`}
            >
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-accent text-accent-fg font-bold text-xs shrink-0">
                  {c.avatar}
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-fg truncate">
                      {c.doctorName}
                    </span>
                    {c.unreadCount > 0 && (
                      <span className="badge badge-accent text-[10px] px-1.5 py-0.5">
                        New
                      </span>
                    )}
                  </div>
                  <div className="text-[11px] text-mute truncate">{c.doctorRole}</div>
                  <div className="text-[11px] text-mute truncate mt-1">
                    {c.messages[c.messages.length - 1]?.content}
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* Message Thread View */}
        {activeConv ? (
          <Card className="flex flex-col justify-between p-6 h-[560px]">
            {/* Thread Header */}
            <div className="border-b border-line pb-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-accent text-accent-fg font-bold text-xs">
                  {activeConv.avatar}
                </div>
                <div>
                  <h3 className="text-sm font-bold text-fg">{activeConv.doctorName}</h3>
                  <div className="text-xs text-mute">
                    {activeConv.doctorRole} &bull; {activeConv.department}
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-1.5 text-xs text-success font-medium">
                <span className="h-2 w-2 rounded-full bg-success" />
                <span>Encrypted HIPAA Session</span>
              </div>
            </div>

            {/* Messages Scroll Area */}
            <div className="space-y-4 overflow-y-auto py-4 pr-2 flex-1">
              {activeConv.messages.map((m) => {
                const isPatient = m.senderType === "patient";

                return (
                  <div
                    key={m.id}
                    className={`flex flex-col ${
                      isPatient ? "items-end" : "items-start"
                    }`}
                  >
                    <div className="text-[11px] text-mute mb-1">
                      <strong className="text-fg">{m.sender}</strong> &bull;{" "}
                      <span dangerouslySetInnerHTML={{ __html: m.time }} />
                    </div>
                    <div
                      className={`max-w-md rounded-xl p-3.5 text-xs leading-relaxed ${
                        isPatient
                          ? "bg-accent text-accent-fg rounded-br-none"
                          : "bg-bg text-fg border border-line rounded-bl-none"
                      }`}
                    >
                      {m.content}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Message Reply Form */}
            <form onSubmit={handleSend} className="border-t border-line pt-4 space-y-3">
              <div className="flex gap-2">
                <Input
                  value={replyText}
                  onChange={(e) => setReplyText(e.target.value)}
                  placeholder="Type a clinical message to your care team..."
                  className="text-xs"
                />
                <Button size="sm" type="submit">
                  Send Message
                </Button>
              </div>
              <div className="flex items-center justify-between text-[11px] text-mute">
                <span>Avg response time: within 4 hours on business days</span>
                <button
                  type="button"
                  onClick={() => alert("File attachment simulation: diagnostic PDF or image attached.")}
                  className="text-accent hover:underline font-medium"
                >
                  📎 Attach File / Lab PDF
                </button>
              </div>
            </form>
          </Card>
        ) : (
          <Card className="p-12 text-center text-xs text-mute">
            Select a care team thread to view messages.
          </Card>
        )}
      </div>
    </div>
  );
}
