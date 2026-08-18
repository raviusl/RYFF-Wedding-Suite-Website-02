import Image from "next/image";
import { wedding } from "@/content/wedding";

export function Story() {
  const storyImage =
    wedding.story?.photo ||
    wedding.portraits?.story ||
    "/images/story/story-1.jpeg";

  return (
    <section id="story" className="relative py-28 sm:py-36 w-full">
      <div className="max-w-5xl mx-auto px-6 sm:px-10">
        {/* 居中标题与大片留白 */}
        <div className="text-center max-w-xl mx-auto mb-16 sm:mb-20">
          <p className="kicker tracking-[0.35em] text-[11px] uppercase text-[#c4a8aa] mb-4">
            {wedding.story?.chapter || "Chapter One"}
          </p>
          <h2 className="font-serif text-3xl sm:text-5xl text-[#f2ebe1] font-normal tracking-wide">
            {wedding.story?.title || "Our Story"}
          </h2>
          <div className="w-10 h-px bg-[#c4a8aa]/30 mx-auto mt-6" />
        </div>

        {/* 杂志级优雅图文 */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* 左侧照片框 */}
          <div className="lg:col-span-6 relative aspect-[3/4] w-full rounded-sm overflow-hidden shadow-2xl bg-[#150608]/80 border border-[#c4a8aa]/15">
            <Image
              src={storyImage}
              alt="Story Portrait"
              fill
              className="object-cover object-center transition-transform duration-700 hover:scale-105"
              sizes="(max-width: 1024px) 100vw, 50vw"
              priority
            />
            <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-[#0c0405]/60 via-transparent to-transparent" />
          </div>

          {/* 右侧文学段落 */}
          <div className="lg:col-span-6 space-y-6 font-light text-[#f2ebe1]/85 leading-relaxed text-sm sm:text-base tracking-wide">
            {wedding.story?.paragraphs?.map((paragraph, index) => (
              <p
                key={index}
                className="first-letter:text-3xl first-letter:font-serif first-letter:text-[#c4a8aa] first-letter:mr-1.5"
              >
                {paragraph}
              </p>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default Story;