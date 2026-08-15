"use client";

import { useEffect, useRef, useState } from "react";

export default function MusicPlayer() {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const canPlayRef = useRef(true);
  const [isPlaying, setIsPlaying] = useState(false);

  const startMusic = async () => {
    const audio = audioRef.current;

    if (!audio || !canPlayRef.current) return;

    try {
      await audio.play();

      if (!canPlayRef.current) {
        audio.pause();
        audio.currentTime = 0;
        return;
      }

      setIsPlaying(true);
    } catch {
      setIsPlaying(false);
    }
  };

  useEffect(() => {
    const audio = audioRef.current;

    if (!audio) return;

    let cancelled = false;
    canPlayRef.current = true;

    audio.loop = true;
    audio.volume = 0.42;

    const stopAudio = () => {
      cancelled = true;
      canPlayRef.current = false;
      audio.pause();
      audio.currentTime = 0;
    };

    const tryAutoplay = async () => {
      if (cancelled) return;

      try {
        await audio.play();

        if (cancelled) {
          audio.pause();
          audio.currentTime = 0;
          return;
        }

        setIsPlaying(true);
      } catch {
        if (!cancelled) setIsPlaying(false);
      }
    };

    tryAutoplay();

    const handleInteraction = () => {
      if (cancelled) return;

      startMusic();

      window.removeEventListener("click", handleInteraction);
      window.removeEventListener("touchstart", handleInteraction);
      window.removeEventListener("pointerdown", handleInteraction);
      window.removeEventListener("keydown", handleInteraction);
    };

    window.addEventListener("click", handleInteraction);
    window.addEventListener("touchstart", handleInteraction);
    window.addEventListener("pointerdown", handleInteraction);
    window.addEventListener("keydown", handleInteraction);
    window.addEventListener("pagehide", stopAudio);
    window.addEventListener("beforeunload", stopAudio);

    return () => {
      window.removeEventListener("click", handleInteraction);
      window.removeEventListener("touchstart", handleInteraction);
      window.removeEventListener("pointerdown", handleInteraction);
      window.removeEventListener("keydown", handleInteraction);
      window.removeEventListener("pagehide", stopAudio);
      window.removeEventListener("beforeunload", stopAudio);
      stopAudio();
    };
  }, []);

  const toggleMusic = async () => {
    const audio = audioRef.current;

    if (!audio) return;

    try {
      if (audio.paused) {
        await audio.play();
        setIsPlaying(true);
      } else {
        audio.pause();
        setIsPlaying(false);
      }
    } catch {
      setIsPlaying(false);
    }
  };

  return (
    <>
      <audio
        ref={audioRef}
        src="/assets/audio/wedding.mp3"
        preload="auto"
        loop
      />

      <button
        onClick={toggleMusic}
        aria-label={isPlaying ? "Pause music" : "Play music"}
        className="wedding-music-btn"
        style={{
          position: "fixed",
          left: "28px",
          bottom: "28px",
          zIndex: 9999,

          width: "54px",
          height: "54px",

          borderRadius: "50%",
          border: "1px solid rgba(255,255,255,0.38)",

          background: "rgba(20,20,20,0.22)",
          backdropFilter: "blur(18px)",
          WebkitBackdropFilter: "blur(18px)",

          color: "#fff",
          cursor: "pointer",

          display: "flex",
          alignItems: "center",
          justifyContent: "center",

          fontFamily: "var(--font-body)",
          fontSize: "20px",
          fontWeight: 400,

          boxShadow: "0 8px 30px rgba(0,0,0,0.16)",

          transition: "all 0.3s ease",
        }}
      >
        {isPlaying ? "Ⅱ" : "♪"}
      </button>
    </>
  );
}