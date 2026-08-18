"use client";

import { useState } from "react";

import { useAttendModal } from "@/components/attend/attend-context";
import { Scene } from "@/components/layout/scene";
import { wedding } from "@/content/wedding";

export function Attend() {
  const { openModal } = useAttendModal();
  const [declined, setDeclined] = useState(false);

  return (
    <Scene id="attend">
      <div className="mx-auto max-w-2xl px-6 text-center">
        <p className="kicker">{wedding.attend.title}</p>
        <h2 className="display title mt-6">{wedding.attend.subtitle}</h2>

        <div className="mt-14 flex flex-col items-center gap-8">
          <button type="button" onClick={openModal} className="cta">
            {wedding.attend.acceptLabel}
          </button>
          <button
            type="button"
            className="cta cta-ghost"
            onClick={() => setDeclined(true)}
          >
            {wedding.attend.declineLabel}
          </button>
          {declined ? (
            <p className="prose-soft">We&apos;ll keep you close in thought.</p>
          ) : null}
        </div>
      </div>
    </Scene>
  );
}
