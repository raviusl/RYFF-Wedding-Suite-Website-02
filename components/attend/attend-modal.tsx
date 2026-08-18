"use client";

import { FormEvent, useEffect, useId, useRef, useState } from "react";

import { useAttendModal } from "@/components/attend/attend-context";
import { wedding } from "@/content/wedding";
import { AttendError, submitAttendance } from "@/lib/attend";
import { cn } from "@/lib/cn";

type Status = "idle" | "loading" | "success" | "error";

const fieldClass =
  "mt-2 w-full border-0 border-b border-rose/25 bg-transparent px-0 py-3 font-sans text-base font-light text-ivory outline-none transition-colors focus:border-ivory";

export function AttendModal() {
  const { open, closeModal } = useAttendModal();
  const titleId = useId();
  const firstFieldRef = useRef<HTMLInputElement>(null);
  const [fullName, setFullName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [guests, setGuests] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [message, setMessage] = useState("");

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

    if (!fullName.trim() || !phoneNumber.trim() || !guests) {
      setStatus("error");
      setMessage("Please complete every field.");
      return;
    }

    setStatus("loading");
    setMessage("");

    try {
      await submitAttendance({
        fullName: fullName.trim(),
        phoneNumber: phoneNumber.trim(),
        guests,
        timestamp: new Date().toISOString(),
      });
      setStatus("success");
      setMessage("Thank you. We will keep a place for you.");
      setFullName("");
      setPhoneNumber("");
      setGuests("");
    } catch (error) {
      setStatus("error");
      setMessage(
        error instanceof AttendError
          ? error.message
          : "Something went wrong. Please try again.",
      );
    }
  };

  return (
    <div className="fixed inset-0 z-[90] flex items-center justify-center p-4 sm:p-8">
      <button
        type="button"
        className="modal-scrim absolute inset-0"
        aria-label="Close"
        onClick={closeModal}
      />
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        className="invite-panel relative z-10 w-full max-w-md px-8 py-11 sm:px-12 sm:py-14"
      >
        <p className="kicker text-center">{(wedding as any).attend.modalSubtitle}</p>
        <h2
          id={titleId}
          className="display mx-auto mt-5 text-center text-[2.25rem] sm:text-[2.6rem]"
        >
          {(wedding as any).attend.modalTitle}
        </h2>
        <p className="prose-soft mt-5 text-center">{(wedding as any).attend.deadline}</p>
        <div className="mx-auto mt-7 h-px w-10 bg-rose/35" />

        <form className="mt-10 flex flex-col gap-7" onSubmit={handleSubmit}>
          <label className="block">
            <span className="kicker">Name</span>
            <input
              ref={firstFieldRef}
              name="fullName"
              autoComplete="name"
              value={fullName}
              onChange={(event) => setFullName(event.target.value)}
              disabled={isSubmitting}
              className={fieldClass}
              required
            />
          </label>

          <label className="block">
            <span className="kicker">Contact Number</span>
            <input
              name="phoneNumber"
              type="tel"
              autoComplete="tel"
              value={phoneNumber}
              onChange={(event) => setPhoneNumber(event.target.value)}
              disabled={isSubmitting}
              className={fieldClass}
              required
            />
          </label>

          <label className="block">
            <span className="kicker">Guest Pax</span>
            <select
              name="guests"
              value={guests}
              onChange={(event) => setGuests(event.target.value)}
              disabled={isSubmitting}
              className={cn(fieldClass, "appearance-none", !guests && "text-ivory/35")}
              required
            >
              <option value="">Select</option>
              {(wedding as any).attend.guestOptions.map((option: any) => (
                <option key={option} value={option} className="bg-wine text-ivory">
                  {option}
                </option>
              ))}
            </select>
          </label>

          <button type="submit" disabled={isSubmitting} className="cta mt-3">
            {isSubmitting ? "Sending…" : (wedding as any).attend.submit}
          </button>

          {message ? (
            <p
              role="status"
              aria-live="polite"
              className={cn(
                "text-center text-[1.0625rem] font-light",
                status === "success" ? "text-champagne" : "text-rose",
              )}
            >
              {message}
            </p>
          ) : null}
        </form>
      </div>
    </div>
  );
}
