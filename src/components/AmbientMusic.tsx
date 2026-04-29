"use client";

import { useEffect, useRef, useState } from "react";
import { useLanguage } from "@/context/LanguageContext";

const AUDIO_SRC = "/audio/algo-tu.mp3";
const TRACK_TITLE = "ALGO T\u00DA";
const TRACK_ARTIST = "Shakira \u00D7 Be\u00E9le";

function formatTime(s: number): string {
  if (!isFinite(s) || s < 0) return "0:00";
  const m = Math.floor(s / 60);
  const sec = Math.floor(s % 60);
  return `${m}:${String(sec).padStart(2, "0")}`;
}

export default function AmbientMusic() {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [open, setOpen] = useState(false);
  const [playing, setPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const { lang } = useLanguage();

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const onTime = () => setCurrentTime(audio.currentTime);
    const onDuration = () => {
      if (isFinite(audio.duration) && audio.duration > 0) {
        setDuration(audio.duration);
      }
    };
    const onEnded = () => {
      setPlaying(false);
      setCurrentTime(0);
    };
    const onPlay = () => setPlaying(true);
    const onPause = () => setPlaying(false);

    audio.addEventListener("timeupdate", onTime);
    audio.addEventListener("loadedmetadata", onDuration);
    audio.addEventListener("durationchange", onDuration);
    audio.addEventListener("canplay", onDuration);
    audio.addEventListener("ended", onEnded);
    audio.addEventListener("play", onPlay);
    audio.addEventListener("pause", onPause);

    // If metadata is already loaded by the time we attach listeners, sync now
    if (audio.readyState >= 1) onDuration();

    return () => {
      audio.removeEventListener("timeupdate", onTime);
      audio.removeEventListener("loadedmetadata", onDuration);
      audio.removeEventListener("durationchange", onDuration);
      audio.removeEventListener("canplay", onDuration);
      audio.removeEventListener("ended", onEnded);
      audio.removeEventListener("play", onPlay);
      audio.removeEventListener("pause", onPause);
    };
  }, []);

  const togglePlay = async () => {
    const audio = audioRef.current;
    if (!audio) return;
    if (audio.paused) {
      try {
        await audio.play();
      } catch {
        // ignore — likely autoplay block; the play event listener stays in sync
      }
    } else {
      audio.pause();
    }
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const audio = audioRef.current;
    if (!audio || !duration) return;
    const time = (Number(e.target.value) / 100) * duration;
    audio.currentTime = time;
    setCurrentTime(time);
  };

  const handleToggleOpen = async () => {
    const willOpen = !open;
    setOpen(willOpen);
    // Convenience: opening the player for the first time also starts playback
    if (willOpen && audioRef.current?.paused && currentTime === 0) {
      try {
        await audioRef.current.play();
      } catch {
        // user can still hit the play button manually if autoplay is blocked
      }
    }
  };

  const progressPct = duration ? (currentTime / duration) * 100 : 0;

  const labels =
    lang === "es"
      ? {
          buttonOpen: "Abrir reproductor",
          buttonClose: "Cerrar reproductor",
          play: "Reproducir",
          pause: "Pausar",
          seek: "Avanzar la canci\u00F3n",
          hint: "M\u00FAsica del cuento",
        }
      : {
          buttonOpen: "Open player",
          buttonClose: "Close player",
          play: "Play",
          pause: "Pause",
          seek: "Seek song",
          hint: "Soundtrack of the tale",
        };

  return (
    <div className="fixed right-5 bottom-5 z-50 flex flex-col items-end gap-2">
      {/* Hidden audio element — the actual source of truth */}
      <audio ref={audioRef} src={AUDIO_SRC} preload="metadata" />

      {/* Mini player card */}
      {open && (
        <div
          className="paper-texture polaroid-shadow w-72 overflow-hidden rounded-xl border border-gold/40 backdrop-blur-md"
          role="region"
          aria-label="Music player"
        >
          {/* Track info */}
          <div className="flex items-center gap-3 px-4 pt-4 pb-3">
            {/* Animated equalizer when playing, else a music note */}
            <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-rose to-gold-light text-white shadow-md">
              {playing ? (
                <div className="flex h-4 items-end gap-[2px]">
                  <span className="wave-bar w-[2px] rounded-full bg-white" style={{ height: "60%", animationDelay: "0s" }} />
                  <span className="wave-bar w-[2px] rounded-full bg-white" style={{ height: "100%", animationDelay: "0.15s" }} />
                  <span className="wave-bar w-[2px] rounded-full bg-white" style={{ height: "70%", animationDelay: "0.3s" }} />
                  <span className="wave-bar w-[2px] rounded-full bg-white" style={{ height: "90%", animationDelay: "0.45s" }} />
                </div>
              ) : (
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M9 18 V5 L21 3 V16" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" fill="none" />
                  <circle cx="6" cy="18" r="3" />
                  <circle cx="18" cy="16" r="3" />
                </svg>
              )}
            </div>
            <div className="min-w-0 flex-1">
              <p className="truncate font-heading text-sm font-medium text-warm-dark md:text-base">
                {TRACK_TITLE}
              </p>
              <p className="truncate text-xs text-warm-gray">{TRACK_ARTIST}</p>
            </div>
          </div>

          {/* Progress bar */}
          <div className="px-4">
            <div className="relative h-1 w-full overflow-hidden rounded-full bg-warm-dark/10">
              <div
                className="absolute inset-y-0 left-0 rounded-full bg-gradient-to-r from-rose-deep via-gold to-lavender"
                style={{ width: `${progressPct}%` }}
              />
              <input
                type="range"
                min={0}
                max={100}
                step={0.1}
                value={progressPct}
                onChange={handleSeek}
                aria-label={labels.seek}
                className="absolute inset-0 h-full w-full cursor-pointer appearance-none bg-transparent opacity-0"
              />
            </div>
            <div className="mt-1 flex justify-between text-[10px] tabular-nums text-warm-gray">
              <span>{formatTime(currentTime)}</span>
              <span>{formatTime(duration)}</span>
            </div>
          </div>

          {/* Controls */}
          <div className="flex items-center justify-center gap-2 px-4 pt-2 pb-4">
            <button
              type="button"
              onClick={togglePlay}
              aria-label={playing ? labels.pause : labels.play}
              className="flex h-10 w-10 items-center justify-center rounded-full bg-warm-dark text-cream shadow-md transition-all hover:scale-105 hover:bg-warm-dark/90"
            >
              {playing ? (
                <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                  <rect x="6" y="5" width="4" height="14" rx="1" />
                  <rect x="14" y="5" width="4" height="14" rx="1" />
                </svg>
              ) : (
                <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M7 5 L7 19 L19 12 Z" />
                </svg>
              )}
            </button>
          </div>
        </div>
      )}

      {/* Floating toggle (always visible) */}
      <button
        type="button"
        aria-label={open ? labels.buttonClose : labels.buttonOpen}
        aria-expanded={open}
        onClick={handleToggleOpen}
        className="group relative flex h-14 w-14 items-center justify-center rounded-full border border-gold/50 bg-paper/90 text-gold-deep shadow-lg backdrop-blur-md transition-all hover:scale-110 hover:bg-cream hover:shadow-xl"
      >
        {/* Hover hint label */}
        <span className="pointer-events-none absolute right-full mr-3 origin-right scale-0 rounded-full border border-gold/30 bg-paper/95 px-3 py-1 font-hand text-sm whitespace-nowrap text-gold-deep shadow-md transition-transform group-hover:scale-100">
          {labels.hint}
        </span>

        {open ? (
          // X close
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
            <path d="M6 6 L18 18 M6 18 L18 6" />
          </svg>
        ) : playing ? (
          // Animated equalizer when audio is playing in the background
          <div className="flex h-5 items-end gap-[3px]">
            <span className="wave-bar w-[3px] rounded-full bg-gold-deep" style={{ height: "60%", animationDelay: "0s" }} />
            <span className="wave-bar w-[3px] rounded-full bg-gold-deep" style={{ height: "100%", animationDelay: "0.15s" }} />
            <span className="wave-bar w-[3px] rounded-full bg-gold-deep" style={{ height: "70%", animationDelay: "0.3s" }} />
            <span className="wave-bar w-[3px] rounded-full bg-gold-deep" style={{ height: "90%", animationDelay: "0.45s" }} />
          </div>
        ) : (
          // Default music note
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
            <path d="M9 18 V5 L21 3 V16" />
            <circle cx="6" cy="18" r="3" fill="currentColor" />
            <circle cx="18" cy="16" r="3" fill="currentColor" />
          </svg>
        )}

        {/* Idle pulse ring (only when neither open nor playing) */}
        {!open && !playing && (
          <span className="pointer-events-none absolute inset-0 animate-ping rounded-full border border-gold/40 opacity-30" />
        )}
      </button>
    </div>
  );
}
