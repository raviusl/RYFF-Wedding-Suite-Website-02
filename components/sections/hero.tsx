import { Countdown } from "@/components/ui/countdown";
import { wedding } from "@/content/wedding";

export function Hero() {
  return (
    <section
      id="home"
      className="relative flex min-h-[94vh] w-full flex-col items-center justify-between overflow-visible px-4 pt-36 pb-16 text-center sm:min-h-[96vh] sm:px-12 sm:pt-48"
    >
      <div className="w-full">
        <p className="font-sans text-[9px] font-light tracking-[0.45em] text-[#c4a8aa]/80 uppercase select-none sm:text-[11px]">
          The Wedding Celebration of
        </p>
      </div>

      <div className="mx-auto my-auto flex w-full max-w-5xl flex-col items-center overflow-visible py-6 sm:py-14">
        <h1
          className="px-4 text-5xl leading-[1.2] font-normal tracking-normal text-[#f2ebe1] drop-shadow-md select-none sm:px-10 sm:text-7xl md:text-8xl lg:text-[8rem]"
          style={{ fontFamily: "var(--font-script), cursive" }}
        >
          <span className="inline-block">{wedding.groom}</span>
          <span className="mx-3 inline-block align-middle font-serif text-2xl italic text-[#c4a8aa]/70 sm:mx-6 sm:text-4xl md:text-5xl">
            &
          </span>
          <span className="inline-block pr-3">{wedding.bride}</span>
        </h1>

        <div className="mx-auto my-6 h-px w-12 bg-gradient-to-r from-transparent via-[#c4a8aa]/35 to-transparent sm:my-10 sm:w-16" />

        <div className="space-y-2.5 font-light">
          <p className="font-sans text-[11px] tracking-[0.35em] text-[#c4b3a8]/90 uppercase sm:text-sm">
            {wedding.weddingDate} · {wedding.dinnerTime}
          </p>
          <p className="pt-0.5 font-serif text-xl tracking-wide text-[#f2ebe1]/95 italic sm:text-3xl">
            {wedding.venue}
          </p>
          <p className="font-sans text-[9px] tracking-[0.35em] text-[#c4b3a8]/50 uppercase sm:text-[11px]">
            {wedding.city}
          </p>
        </div>
      </div>

      <div className="relative z-10 flex w-full justify-center pt-2 opacity-90 transition-opacity hover:opacity-100">
        <Countdown />
      </div>
    </section>
  );
}

export default Hero;
