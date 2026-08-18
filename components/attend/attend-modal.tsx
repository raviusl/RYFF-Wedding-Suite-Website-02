"use client";

import { useEffect, useId, useRef, useState, type FormEvent } from "react";

import { useAttendModal } from "@/components/attend/attend-context";
import { wedding } from "@/content/wedding";
import { AttendError, submitAttendance } from "@/lib/attend";
import { cn } from "@/lib/cn";

type Status = "idle" | "loading" | "success" | "error";
type Attendance = "attending" | "declined";

const guestOptions =
  wedding.attend.guestOptions ?? ["1 Guest", "2 Guests", "3 Guests", "4 Guests"];

const fieldClass =
  "w-full border border-[#c4a8aa]/20 bg-[#0c0405]/60 px-4 py-2 text-sm text-[#f2ebe1] outline-none transition-colors focus:border-[#c4a8aa]/60";

export function AttendModal() {
  const { open, closeModal } = useAttendModal();
  const titleId = useId();
  const firstFieldRef = useRef<HTMLInputElement>(null);
  const [attendance, setAttendance] = useState<Attendance>("attending");
  const [name, setName] = useState("");
  const [contact, setContact] = useState("");
  const [pax, setPax] = useState(guestOptions[0] ?? "1 Guest");
  const [dietary, setDietary] = useState("");
  const [note, setNote] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [feedback, setFeedback] = useState("");

  useEffect(() => {
    if (!open) return;

    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    firstFieldRef.current?.focus();

    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") closeModal();
    };

    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = previous;
      window.removeEventListener("keydown", onKey);
    };
  }, [open, closeModal]);

  if (!open) return null;

  const isSubmitting = status === "loading";

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (isSubmitting) return;

    if (!name.trim() || !contact.trim()) {
      setStatus("error");
      setFeedback("Please complete every required field.");
      return;
    }

    setStatus("loading");
    setFeedback("");

    const wishes = [dietary.trim(), note.trim()].filter(Boolean).join(" · ");

    try {
      await submitAttendance({
        fullName: name.trim(),
        phoneNumber: contact.trim(),
        guests: attendance === "attending" ? pax : "0",
        timestamp: new Date().toISOString(),
        blessing: wishes,
      });
      setStatus("success");
      setFeedback("");
    } catch (error) {
      setStatus("error");
      setFeedback(
        error instanceof AttendError
          ? error.message
          : "Something went wrong. Please try again.",
      );
    }
  };

  return (
    <div className="fixed inset-0 z-[90] flex items-center justify-center overflow-y-auto bg-[#0c0405]/85 p-4 backdrop-blur-md sm:p-6">
      <button
        type="button"
        className="absolute inset-0"
        aria-label="Close"
        onClick={closeModal}
      />
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        className="relative z-10 my-auto w-full max-w-lg rounded-sm border border-[#c4a8aa]/20 bg-[#150608] p-8 shadow-2xl sm:p-10"
      >
        <button
          type="button"
          onClick={closeModal}
          className="absolute top-5 right-5 cursor-pointer text-xs tracking-widest text-[#c4b3a8]/60 uppercase transition-colors hover:text-[#f2ebe1]"
        >
          Close
        </button>

        {status === "success" ? (
          <div className="space-y-4 py-10 text-center">
            <p className="kicker text-[10px] tracking-[0.35em] text-[#c4a8aa] uppercase">
              Received
            </p>
            <h3 className="font-serif text-3xl font-light text-[#f2ebe1]">
              Thank you, {name}.
            </h3>
            <p className="text-xs tracking-wider text-[#c4b3a8]/70">
              Your response has been recorded.
            </p>
            <button
              type="button"
              onClick={closeModal}
              className="mt-6 cursor-pointer border border-[#c4a8aa]/30 px-8 py-2.5 text-[11px] tracking-[0.25em] text-[#f2ebe1] uppercase transition-colors hover:bg-[#c4a8aa]/10"
            >
              Done
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-1 text-center">
              <p className="kicker text-[10px] tracking-[0.35em] text-[#c4a8aa] uppercase">
                RSVP
              </p>
              <h3
                id={titleId}
                className="font-serif text-3xl font-light text-[#f2ebe1] italic"
              >
                {wedding.attend.modalTitle}
              </h3>
              <p className="pt-1 text-[11px] tracking-[0.25em] text-[#c4b3a8]/60 uppercase">
                {wedding.attend.deadline}
              </p>
            </div>

            <div className="grid grid-cols-2 gap-3 pt-2">
              <button
                type="button"
                onClick={() => setAttendance("attending")}
                className={cn(
                  "cursor-pointer border py-2.5 text-xs tracking-[0.2em] uppercase transition-all",
                  attendance === "attending"
                    ? "border-[#c4a8aa] bg-[#c4a8aa]/15 text-[#f2ebe1]"
                    : "border-[#c4a8aa]/20 text-[#c4b3a8]/50",
                )}
              >
                Accepts
              </button>
              <button
                type="button"
                onClick={() => setAttendance("declined")}
                className={cn(
                  "cursor-pointer border py-2.5 text-xs tracking-[0.2em] uppercase transition-all",
                  attendance === "declined"
                    ? "border-[#c4a8aa] bg-[#c4a8aa]/15 text-[#f2ebe1]"
                    : "border-[#c4a8aa]/20 text-[#c4b3a8]/50",
                )}
              >
                Declines
              </button>
            </div>

            <div>
              <label className="mb-1.5 block text-[10px] tracking-[0.25em] text-[#c4b3a8]/70 uppercase">
                Your Full Name *
              </label>
              <input
                ref={firstFieldRef}
                type="text"
                name="fullName"
                autoComplete="name"
                required
                value={name}
                onChange={(event) => setName(event.target.value)}
                disabled={isSubmitting}
                className={fieldClass}
              />
            </div>

            <div>
              <label className="mb-1.5 block text-[10px] tracking-[0.25em] text-[#c4b3a8]/70 uppercase">
                Contact Number *
              </label>
              <input
                type="tel"
                name="phoneNumber"
                autoComplete="tel"
                required
                value={contact}
                onChange={(event) => setContact(event.target.value)}
                disabled={isSubmitting}
                className={fieldClass}
              />
            </div>

            {attendance === "attending" ? (
              <>
                <div>
                  <label className="mb-1.5 block text-[10px] tracking-[0.25em] text-[#c4b3a8]/70 uppercase">
                    Guest Pax
                  </label>
                  <select
                    name="guests"
                    value={pax}
                    onChange={(event) => setPax(event.target.value)}
                    disabled={isSubmitting}
                    className={cn(fieldClass, "appearance-none")}
                  >
                    {guestOptions.map((option) => (
                      <option key={option} value={option} className="bg-[#150608] text-[#f2ebe1]">
                        {option}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="mb-1.5 block text-[10px] tracking-[0.25em] text-[#c4b3a8]/70 uppercase">
                    Dietary Requirements (Optional)
                  </label>
                  <input
                    type="text"
                    name="dietary"
                    value={dietary}
                    onChange={(event) => setDietary(event.target.value)}
                    disabled={isSubmitting}
                    className={fieldClass}
                  />
                </div>
              </>
            ) : null}

            <div>
              <label className="mb-1.5 block text-[10px] tracking-[0.25em] text-[#c4b3a8]/70 uppercase">
                Warm Wishes / Notes (Optional)
              </label>
              <textarea
                name="message"
                rows={2}
                value={note}
                onChange={(event) => setNote(event.target.value)}
                disabled={isSubmitting}
                className={cn(fieldClass, "resize-none")}
              />
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="mt-2 w-full cursor-pointer bg-[#c4a8aa] py-3 text-xs font-medium tracking-[0.25em] text-[#0c0405] uppercase transition-colors hover:bg-[#d4b8ba] disabled:opacity-50"
            >
              {isSubmitting ? "Submitting..." : "Send RSVP"}
            </button>

            {feedback ? (
              <p role="status" aria-live="polite" className="text-center text-sm text-[#c4a8aa]">
                {feedback}
              </p>
            ) : null}
          </form>
        )}
      </div>
    </div>
  );
}

export default AttendModal;
