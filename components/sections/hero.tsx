import { wedding } from "@/content/wedding";
import { Countdown } from "@/components/ui/countdown";

export function Hero() {
  return (
    <section
      id="home"
      className="relative min-h-[96vh] w-full flex flex-col justify-between items-center px-6 sm:px-12 pt-48 pb-20 text-center overflow-visible"
    >
      {/* 顶部高定极小副标 */}
      <div className="w-full">
        <p className="font-sans text-[10px] sm:text-[11px] uppercase tracking-[0.45em] text-[#c4a8aa]/80 font-light select-none">
          The Wedding Celebration of
        </p>
      </div>

      {/* 核心新人名：加入 px-8 缓冲与 overflow-visible，保证 J 的延伸笔触完整呈现不被裁切 */}
      <div className="my-auto py-10 sm:py-14 w-full max-w-5xl mx-auto flex flex-col items-center overflow-visible">
        <h1
          className="text-7xl sm:text-8xl md:text-9xl lg:text-[8.5rem] text-[#f2ebe1] font-normal leading-[1.25] tracking-normal select-none drop-shadow-md px-8 sm:px-14 overflow-visible inline-block"
          style={{ fontFamily: "var(--font-script), cursive" }}
        >
          <span className="inline-block">{wedding.groom}</span>
          <span className="text-4xl sm:text-5xl md:text-6xl text-[#c4a8aa]/70 mx-4 sm:mx-8 font-serif italic align-middle inline-block">
            &
          </span>
          <span className="inline-block pr-6">{wedding.bride}</span>
        </h1>

        {/* 极细渐变微雕线 */}
        <div className="w-16 h-px bg-gradient-to-r from-transparent via-[#c4a8aa]/35 to-transparent mx-auto my-10" />

        {/* 婚礼事实信息 */}
        <div className="space-y-3 font-light">
          <p className="text-xs sm:text-sm uppercase tracking-[0.35em] text-[#c4b3a8]/90 font-sans">
            {wedding.weddingDate} · {wedding.dinnerTime}
          </p>
          <p className="font-serif italic text-2xl sm:text-3xl text-[#f2ebe1]/95 tracking-wide pt-1">
            {wedding.venue}
          </p>
          <p className="text-[10px] sm:text-[11px] uppercase tracking-[0.35em] text-[#c4b3a8]/50 font-sans">
            {wedding.city}
          </p>
        </div>
      </div>

      {/* 倒计时 */}
      <div className="relative z-10 w-full pt-4 flex justify-center opacity-90 hover:opacity-100 transition-opacity">
        <Countdown />
      </div>
    </section>
  );
}

export default Hero;