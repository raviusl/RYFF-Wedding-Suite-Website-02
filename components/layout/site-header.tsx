"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { navigation } from "@/content/site";
import { wedding } from "@/content/wedding";

export function SiteHeader() {
  const [imgError, setImgError] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-8 sm:px-14 lg:px-20 py-6 pointer-events-auto bg-gradient-to-b from-[#0c0405]/85 via-[#0c0405]/40 to-transparent backdrop-blur-[2px]">
      {/* 放大左上角专属 Logo：大尺寸、显眼且不遮挡 */}
      <Link
        href="#home"
        className="relative group block w-32 h-20 sm:w-44 sm:h-28 transition-all duration-300 hover:opacity-90"
      >
        {!imgError ? (
          <Image
            src={wedding.logoImage || "/images/logo.png"}
            alt={`${wedding.groom} & ${wedding.bride} Monogram`}
            fill
            className="object-contain object-left filter brightness-125 drop-shadow-sm"
            onError={() => setImgError(true)}
            priority
          />
        ) : (
          <div className="w-full h-full flex items-center font-serif text-2xl tracking-widest text-[#f2ebe1]/90">
            {wedding.monogram || "R & M"}
          </div>
        )}
      </Link>

      {/* 极简右侧导航 */}
      <nav className="hidden md:flex items-center gap-8 lg:gap-10" aria-label="Primary">
        {navigation.map((item) => (
          <a
            key={item.href}
            href={item.href}
            className="text-[11px] uppercase tracking-[0.28em] text-[#c4b3a8]/70 hover:text-[#f2ebe1] transition-colors duration-300 font-light"
          >
            {item.label}
          </a>
        ))}
      </nav>
    </header>
  );
}

export default SiteHeader;