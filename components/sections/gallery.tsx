import Image from "next/image";
import { wedding } from "@/content/wedding";

export function Gallery() {
  const items = wedding.gallery || [];

  return (
    <section id="memories" className="relative py-28 sm:py-36 w-full">
      <div className="max-w-6xl mx-auto px-6 sm:px-10">
        {/* 居中标题 */}
        <div className="text-center max-w-xl mx-auto mb-16 sm:mb-20">
          <p className="kicker tracking-[0.35em] text-[11px] uppercase text-[#c4a8aa] mb-4">
            The Memories
          </p>
          <h2 className="font-serif text-3xl sm:text-5xl text-[#f2ebe1] font-normal tracking-wide">
            A day worth keeping.
          </h2>
          <div className="w-10 h-px bg-[#c4a8aa]/30 mx-auto mt-6" />
        </div>

        {/* 动态栅格：自动适配 1~3 张或更多照片 */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 sm:gap-10">
          {items.map((item, index) => (
            <div
              key={index}
              className="group relative aspect-[3/4] w-full rounded-sm overflow-hidden shadow-2xl bg-[#150608]/80 border border-[#c4a8aa]/15 transition-transform duration-500 hover:-translate-y-1"
            >
              <Image
                src={item.src}
                alt={item.label || `Gallery portrait ${index + 1}`}
                fill
                className="object-cover object-center transition-transform duration-700 group-hover:scale-105"
                sizes="(max-width: 768px) 100vw, 33vw"
              />

              {/* 丝绒渐变暗角 */}
              <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-[#0c0405]/80 via-transparent to-transparent opacity-80 group-hover:opacity-60 transition-opacity" />

              {/* 底部小标 */}
              <div className="absolute bottom-4 left-0 right-0 text-center pointer-events-none">
                <span className="text-[10px] uppercase tracking-[0.3em] text-[#f2ebe1]/70 font-light">
                  {item.label}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Gallery;