import { wedding } from "@/content/wedding";

export function SiteFooter() {
  return (
    <footer className="relative py-32 sm:py-44 px-6 text-center border-t border-[#c4a8aa]/10 bg-gradient-to-b from-transparent to-[#0c0405]">
      <div className="max-w-2xl mx-auto space-y-6">
        <p className="kicker tracking-[0.4em] text-[10px] uppercase text-[#c4a8aa]/75">
          Thank You
        </p>

        <h3 className="font-serif italic text-3xl sm:text-4xl text-[#f2ebe1]/90 font-light tracking-wide">
          For being part of our story.
        </h3>

        <div className="w-8 h-px bg-[#c4a8aa]/30 mx-auto !my-8" />

        <p className="text-[11px] uppercase tracking-[0.35em] text-[#c4b3a8]/50">
          {wedding.weddingDate}
        </p>
      </div>
    </footer>
  );
}

export default SiteFooter;