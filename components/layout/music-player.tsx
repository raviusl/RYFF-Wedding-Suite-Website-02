"use client";

import { useEffect, useRef, useState, type MouseEvent } from "react";

import { wedding } from "@/content/wedding";

export function MusicPlayer() {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.volume = 0.6;

    const triggerPlay = () => {
      if (audioRef.current && audioRef.current.paused) {
        audioRef.current
          .play()
          .then(() => {
            setIsPlaying(true);
            remove();
          })
          .catch(() => {});
      }
    };

    const remove = () => {
      window.removeEventListener("click", triggerPlay);
      window.removeEventListener("touchstart", triggerPlay);
      window.removeEventListener("scroll", triggerPlay);
      window.removeEventListener("keydown", triggerPlay);
    };

    audio
      .play()
      .then(() => setIsPlaying(true))
      .catch(() => {
        window.addEventListener("click", triggerPlay, { once: true });
        window.addEventListener("touchstart", triggerPlay, { once: true });
        window.addEventListener("scroll", triggerPlay, { once: true });
        window.addEventListener("keydown", triggerPlay, { once: true });
      });

    return () => remove();
  }, []);

  const toggle = (event: MouseEvent) => {
    event.stopPropagation();
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current
        .play()
        .then(() => setIsPlaying(true))
        .catch(() => {});
    }
  };

  const audioSrc =
    wedding.music?.src || wedding.audio?.src || "/audio/wedding.mp3";

  return (
    <>
      <audio ref={audioRef} src={audioSrc} preload="auto" loop playsInline />
      <button
        type="button"
        onClick={toggle}
        aria-label={isPlaying ? "Pause music" : "Play music"}
        className="pointer-events-auto group fixed right-6 bottom-6 z-50 flex cursor-pointer items-center gap-2.5 rounded-full border border-[#c4a8aa]/30 bg-[#120507]/90 px-4 py-2.5 shadow-2xl backdrop-blur-md transition-all duration-300 hover:bg-[#20090d]"
      >
        <div className="flex h-3.5 w-3.5 items-end gap-[3px]">
          <span
            className={`w-[2px] rounded-full bg-[#c4a8aa] transition-all duration-300 ${isPlaying ? "h-3.5 animate-pulse" : "h-1 opacity-40"}`}
          />
          <span
            className={`w-[2px] rounded-full bg-[#c4a8aa] transition-all duration-500 ${isPlaying ? "h-2.5 animate-bounce" : "h-1 opacity-40"}`}
          />
          <span
            className={`w-[2px] rounded-full bg-[#c4a8aa] transition-all duration-300 ${isPlaying ? "h-3.5 animate-pulse" : "h-1 opacity-40"}`}
          />
        </div>
        <span className="text-[10px] font-light uppercase tracking-[0.25em] text-[#f2ebe1]/85 group-hover:text-[#f2ebe1]">
          {isPlaying ? "Music On" : "Play Music"}
        </span>
      </button>
    </>
  );
}

export default MusicPlayer;
