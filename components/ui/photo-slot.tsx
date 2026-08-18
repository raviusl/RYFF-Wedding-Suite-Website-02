"use client";

import Image from "next/image";
import { useState } from "react";

import { cn } from "@/lib/cn";

type PhotoSlotProps = {
  src: string;
  alt?: string;
  className?: string;
  aspect?: string;
  veil?: boolean;
  label?: string;
};

export function PhotoSlot({
  src,
  alt = "",
  className,
  aspect = "aspect-portrait",
  veil = false,
  label = "Reserved",
}: PhotoSlotProps) {
  const [loaded, setLoaded] = useState(false);
  const [failed, setFailed] = useState(false);
  const showFrame = !loaded || failed;

  return (
    <div className={cn("photo-slot", aspect, className)}>
      {!failed ? (
        <Image
          src={src}
          alt={alt || label}
          fill
          unoptimized
          sizes="(max-width: 768px) 92vw, 42vw"
          className={cn("object-cover transition-opacity duration-700", loaded ? "opacity-100" : "opacity-0")}
          onLoad={() => setLoaded(true)}
          onError={() => setFailed(true)}
        />
      ) : null}
      {veil && loaded ? <div className="photo-slot__veil" /> : null}
      {showFrame ? (
        <div className="photo-slot__wait" aria-hidden={failed ? undefined : true}>
          <div className="absolute inset-6 border border-rose/15" />
          <span className="kicker absolute bottom-8 left-0 right-0 text-center text-rose/45">
            {label}
          </span>
        </div>
      ) : null}
    </div>
  );
}
