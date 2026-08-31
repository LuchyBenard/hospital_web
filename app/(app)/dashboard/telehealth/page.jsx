"use client";

import { useState, useEffect } from "react";
import { useAuth } from "@/contexts/auth-context";
import { hospitalInfo } from "@/constants";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from "next/link";

export default function TelehealthRoomPage() {
  const { user } = useAuth();
  const [micOn, setMicOn] = useState(true);
  const [camOn, setCamOn] = useState(true);
  const [seconds, setSeconds] = useState(145); // Active call duration
  const [messages, setMessages] = useState([
    {
      sender: "Dr. Sarah Jenkins",
      time: "10:32 AM",
      text: "Good morning Ada, I have reviewed your resting echocardiogram. How have you been feeling since starting the Lisinopril?",
    },
  ]);
  const [inputMsg, setInputMsg] = useState("");

  useEffect(() => {
    const timer = setInterval(() => setSeconds((s) => s + 1), 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (sec) => {
    const mins = Math.floor(sec / 60);
    const remaining = sec % 60;
    return `${mins.toString().padStart(2, "0")}:${remaining
      .toString()
      .padStart(2, "0")}`;
  };

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!inputMsg.trim()) return;
    const newMsg = {
      sender: user?.name || "Ada Quinn",
      time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      text: inputMsg,
    };
    setMessages((prev) => [...prev, newMsg]);
    setInputMsg("");

    // Simulate doctor reply
    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          sender: "Dr. Sarah Jenkins",
          time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
          text: "Understood. Let us keep monitoring your morning blood pressure readings on the portal.",
        },
      ]);
    }, 1500);
  };

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="h-2.5 w-2.5 rounded-full bg-success animate-pulse" />
            <span className="badge badge-success text-xs">Live Encrypted Telehealth Session</span>
          </div>
          <h1 className="text-xl sm:text-2xl font-bold text-fg">
            Cardiology Follow-Up Consultation
          </h1>
          <p className="text-xs text-mute">
            Doctor: <strong className="text-fg">Dr. Sarah Jenkins, MD, FACC</strong> &bull;
            Duration: <span className="font-mono font-bold text-accent">{formatTime(seconds)}</span>
          </p>
        </div>

        <Link href="/dashboard/appointments">
          <Button variant="secondary" size="sm" className="text-danger border-line">
            Leave Session
          </Button>
        </Link>
      </div>

      {/* Main Video & Chat Grid */}
      <div className="grid gap-6 lg:grid-cols-[1.6fr_1fr]">
        {/* Video Feeds Area */}
        <div className="space-y-4">
          <div className="relative aspect-video w-full rounded-xl border border-line bg-slate-900 overflow-hidden shadow-md flex items-center justify-center">
            {/* Physician Video Mock */}
            <div className="text-center p-6 text-white space-y-2">
              <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-accent text-accent-fg font-bold text-2xl border-2 border-white/20">
                SJ
              </div>
              <div className="font-bold text-lg">Dr. Sarah Jenkins</div>
              <div className="text-xs text-slate-300">
                Chief of Cardiovascular Medicine &bull; Pavilion A
              </div>
              <div className="inline-flex items-center gap-1.5 rounded-full bg-black/40 px-3 py-1 text-xs text-success">
                <span className="h-2 w-2 rounded-full bg-success" />
                HD Audio & Video Connected
              </div>
            </div>

            {/* Self Video PIP (Picture in Picture) */}
            <div className="absolute bottom-4 right-4 h-28 w-40 sm:h-32 sm:w-48 rounded-lg border-2 border-white/30 bg-slate-800 p-2 shadow-lg overflow-hidden flex flex-col justify-between">
              <div className="text-[10px] font-bold text-white bg-black/50 px-1.5 py-0.5 rounded w-fit">
                You ({user?.name || "Ada Quinn"})
              </div>
              <div className="text-center text-white text-xs">
                {camOn ? (
                  <span className="text-slate-300 font-medium">Camera Active</span>
                ) : (
                  <span className="text-emergency font-medium">Camera Muted</span>
                )}
              </div>
              <div className="flex justify-end gap-1 text-[10px] text-white">
                <span>{micOn ? "🎙️" : "🔇"}</span>
              </div>
            </div>
          </div>

          {/* Call Controls Bar */}
          <div className="flex items-center justify-center gap-4 rounded-xl border border-line bg-surface p-4 shadow-sm">
            <button
              type="button"
              onClick={() => setMicOn((v) => !v)}
              className={`flex h-11 w-11 items-center justify-center rounded-full border text-sm font-semibold transition-colors ${
                micOn
                  ? "bg-bg border-line text-fg hover:bg-slate-100"
                  : "bg-emergency text-white border-emergency"
              }`}
              title={micOn ? "Mute Microphone" : "Unmute Microphone"}
            >
              {micOn ? "🎙️" : "🔇"}
            </button>

            <button
              type="button"
              onClick={() => setCamOn((v) => !v)}
              className={`flex h-11 w-11 items-center justify-center rounded-full border text-sm font-semibold transition-colors ${
                camOn
                  ? "bg-bg border-line text-fg hover:bg-slate-100"
                  : "bg-emergency text-white border-emergency"
              }`}
              title={camOn ? "Turn Camera Off" : "Turn Camera On"}
            >
              {camOn ? "📹" : "🚫"}
            </button>

            <Link href="/dashboard/appointments">
              <button
                type="button"
                className="flex items-center gap-2 rounded-full bg-emergency px-5 py-2.5 text-xs font-bold text-white shadow-sm hover:opacity-90"
              >
                End Call
              </button>
            </Link>
          </div>
        </div>

        {/* In-Call Consultation Chat & Notes */}
        <Card className="flex flex-col justify-between p-4 h-[440px] sm:h-[480px]">
          <div>
            <div className="border-b border-line pb-3 mb-3">
              <h3 className="text-sm font-bold text-fg">Consultation Room Chat</h3>
              <p className="text-xs text-mute">
                Real-time messages are saved to your clinical encounter file.
              </p>
            </div>

            <div className="space-y-3 overflow-y-auto max-h-[300px] pr-1">
              {messages.map((m, idx) => (
                <div key={idx} className="space-y-0.5 text-xs">
                  <div className="flex justify-between text-[11px] text-mute">
                    <span className="font-semibold text-fg">{m.sender}</span>
                    <span>{m.time}</span>
                  </div>
                  <div className="rounded-lg bg-bg p-2.5 text-fg leading-relaxed">
                    {m.text}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <form onSubmit={handleSendMessage} className="flex gap-2 border-t border-line pt-3">
            <Input
              value={inputMsg}
              onChange={(e) => setInputMsg(e.target.value)}
              placeholder="Type message to doctor..."
              className="text-xs"
            />
            <Button size="sm" type="submit">
              Send
            </Button>
          </form>
        </Card>
      </div>
    </div>
  );
}
