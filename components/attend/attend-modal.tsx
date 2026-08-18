"use client";

import { useState } from "react";
import { wedding } from "@/content/wedding";

interface AttendModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function AttendModal({ isOpen, onClose }: AttendModalProps) {
  const [attendance, setAttendance] = useState<"attending" | "declined">("attending");
  const [name, setName] = useState("");
  const [pax, setPax] = useState("1 Guest");
  const [dietary, setDietary] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    setStatus("loading");

    const webhookUrl = (wedding.attend as any)?.googleSheetWebhook;
    const payload = {
      project: `${wedding.groom} & ${wedding.bride}`,
      name: name.trim(),
      attendance: attendance === "attending" ? "Attending" : "Declined",
      pax: attendance === "attending" ? pax : "0",
      dietary: dietary.trim() || "None",
      message: message.trim() || "None",
    };

    try {
      if (webhookUrl && webhookUrl.startsWith("http")) {
        await fetch(webhookUrl, {
          method: "POST",
          mode: "no-cors",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
      }
      setStatus("success");
    } catch {
      setStatus("error");
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-[#0c0405]/85 backdrop-blur-md">
      <div className="relative w-full max-w-lg rounded-sm bg-[#150608] border border-[#c4a8aa]/20 p-8 sm:p-10 shadow-2xl">
        <button
          type="button"
          onClick={onClose}
          className="absolute top-5 right-5 text-xs tracking-widest text-[#c4b3a8]/60 hover:text-[#f2ebe1] uppercase transition-colors"
        >
          Close [✕]
        </button>

        {status === "success" ? (
          <div className="py-10 text-center space-y-4">
            <p className="kicker tracking-[0.35em] text-[10px] uppercase text-[#c4a8aa]">
              Received
            </p>
            <h3 className="font-serif text-3xl text-[#f2ebe1] font-light">
              Thank you, {name}.
            </h3>
            <p className="text-xs text-[#c4b3a8]/70 tracking-wider">
              Your response has been recorded.
            </p>
            <button
              type="button"
              onClick={onClose}
              className="mt-6 px-8 py-2.5 border border-[#c4a8aa]/30 text-[11px] uppercase tracking-[0.25em] text-[#f2ebe1] hover:bg-[#c4a8aa]/10 transition-colors"
            >
              Done
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="text-center space-y-2">
              <p className="kicker tracking-[0.35em] text-[10px] uppercase text-[#c4a8aa]">
                RSVP
              </p>
              <h3 className="font-serif text-2xl sm:text-3xl text-[#f2ebe1] font-light">
                {(wedding.attend as any)?.modalTitle || "Join the Celebration"}
              </h3>
            </div>

            {/* 出席状态切换 */}
            <div className="grid grid-cols-2 gap-3 pt-2">
              <button
                type="button"
                onClick={() => setAttendance("attending")}
                className={`py-2.5 text-xs uppercase tracking-[0.2em] border transition-all ${
                  attendance === "attending"
                    ? "border-[#c4a8aa] bg-[#c4a8aa]/15 text-[#f2ebe1]"
                    : "border-[#c4a8aa]/20 text-[#c4b3a8]/50 hover:border-[#c4a8aa]/40"
                }`}
              >
                Accepts
              </button>
              <button
                type="button"
                onClick={() => setAttendance("declined")}
                className={`py-2.5 text-xs uppercase tracking-[0.2em] border transition-all ${
                  attendance === "declined"
                    ? "border-[#c4a8aa] bg-[#c4a8aa]/15 text-[#f2ebe1]"
                    : "border-[#c4a8aa]/20 text-[#c4b3a8]/50 hover:border-[#c4a8aa]/40"
                }`}
              >
                Declines
              </button>
            </div>

            {/* 姓名输入 */}
            <div>
              <label className="block text-[10px] uppercase tracking-[0.25em] text-[#c4b3a8]/70 mb-2">
                Your Full Name *
              </label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. Marcus & Sarah"
                className="w-full bg-[#0c0405]/60 border border-[#c4a8aa]/20 px-4 py-2.5 text-sm text-[#f2ebe1] placeholder-[#c4b3a8]/30 focus:outline-none focus:border-[#c4a8aa]/60"
              />
            </div>

            {attendance === "attending" && (
              <>
                {/* 人数选择 */}
                <div>
                  <label className="block text-[10px] uppercase tracking-[0.25em] text-[#c4b3a8]/70 mb-2">
                    Number of Guests
                  </label>
                  <select
                    value={pax}
                    onChange={(e) => setPax(e.target.value)}
                    className="w-full bg-[#0c0405]/60 border border-[#c4a8aa]/20 px-4 py-2.5 text-sm text-[#f2ebe1] focus:outline-none focus:border-[#c4a8aa]/60"
                  >
                    {((wedding.attend as any)?.guestOptions || ["1 Guest", "2 Guests", "3 Guests", "4 Guests"]).map((opt: string) => (
                      <option key={opt} value={opt} className="bg-[#150608] text-[#f2ebe1]">
                        {opt}
                      </option>
                    ))}
                  </select>
                </div>

                {/* 饮食要求 */}
                <div>
                  <label className="block text-[10px] uppercase tracking-[0.25em] text-[#c4b3a8]/70 mb-2">
                    Dietary Requirements (Optional)
                  </label>
                  <input
                    type="text"
                    value={dietary}
                    onChange={(e) => setDietary(e.target.value)}
                    placeholder="Vegetarian, Halal, Allergies, etc."
                    className="w-full bg-[#0c0405]/60 border border-[#c4a8aa]/20 px-4 py-2.5 text-sm text-[#f2ebe1] placeholder-[#c4b3a8]/30 focus:outline-none focus:border-[#c4a8aa]/60"
                  />
                </div>
              </>
            )}

            {/* 寄语留言 */}
            <div>
              <label className="block text-[10px] uppercase tracking-[0.25em] text-[#c4b3a8]/70 mb-2">
                Warm Wishes / Notes (Optional)
              </label>
              <textarea
                rows={2}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Leave a message for the couple..."
                className="w-full bg-[#0c0405]/60 border border-[#c4a8aa]/20 px-4 py-2.5 text-sm text-[#f2ebe1] placeholder-[#c4b3a8]/30 focus:outline-none focus:border-[#c4a8aa]/60 resize-none"
              />
            </div>

            {/* 提交按钮 */}
            <button
              type="submit"
              disabled={status === "loading"}
              className="w-full py-3 bg-[#c4a8aa] hover:bg-[#d4b8ba] text-[#0c0405] text-xs uppercase tracking-[0.25em] font-medium transition-colors disabled:opacity-50"
            >
              {status === "loading" ? "Submitting..." : "Send RSVP"}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}

export default AttendModal;