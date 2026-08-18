"use client";

import { useSyncExternalStore } from "react";

import { wedding } from "@/content/wedding";
import { cn } from "@/lib/cn";

const targetMs = new Date(wedding.countdownAt).getTime();

function remainingMinutes() {
  return Math.max(0, Math.floor((targetMs - Date.now()) / 60_000));
}

function subscribe(onStoreChange: () => void) {
  const timer = window.setInterval(onStoreChange, 30_000);
  return () => window.clearInterval(timer);
}

function Unit({ value, label }: { value: number; label: string }) {
  return (
    <div className="flex min-w-[3.5rem] flex-col items-center sm:min-w-[4.5rem]">
      <span className="font-serif text-[1.85rem] font-light tabular-nums tracking-wide text-ivory sm:text-[2.15rem]">
        {String(value).padStart(2, "0")}
      </span>
      <span className="kicker mt-2 text-rose/55">{label}</span>
    </div>
  );
}

export function Countdown({ className }: { className?: string }) {
  const minutesRemaining = useSyncExternalStore(
    subscribe,
    remainingMinutes,
    () => 0,
  );

  const days = Math.floor(minutesRemaining / (60 * 24));
  const hours = Math.floor((minutesRemaining % (60 * 24)) / 60);
  const minutes = minutesRemaining % 60;

  return (
    <div
      className={cn("flex items-start justify-center gap-8 sm:gap-12", className)}
      aria-label="Countdown to the wedding dinner"
    >
      <Unit value={days} label="Days" />
      <Unit value={hours} label="Hours" />
      <Unit value={minutes} label="Minutes" />
    </div>
  );
}
