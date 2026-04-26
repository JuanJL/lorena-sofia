"use client";

import { useState } from "react";
import { useLanguage } from "@/context/LanguageContext";

const SPOTIFY_TRACK_ID = "1dHbcmMm9bov1q4lG7Q4nQ";

export default function AmbientMusic() {
  const [open, setOpen] = useState(false);
  const { lang } = useLanguage();

  const label =
    lang === "es"
      ? open
        ? "Cerrar m\u00FAsica"
        : "Reproducir m\u00FAsica"
      : open
      ? "Close music"
      : "Play music";

  const hint =
    lang === "es" ? "M\u00FAsica del cuento" : "Soundtrack of the tale";

  return (
    <div className="fixed bottom-5 right-5 z-50 flex flex-col items-end gap-2">
      {open && (
        <div
          className="overflow-hidden rounded-xl border border-gold/40 bg-cream shadow-2xl"
          style={{ width: 320 }}
        >
          <iframe
            title={`Spotify: ${hint}`}
            src={`https://open.spotify.com/embed/track/${SPOTIFY_TRACK_ID}?utm_source=generator&theme=0`}
            width="320"
            height="152"
            frameBorder={0}
            allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
            loading="lazy"
          />
        </div>
      )}

      <button
        type="button"
        aria-label={label}
        aria-expanded={open}
        onClick={() => setOpen((prev) => !prev)}
        className="group relative flex h-14 w-14 items-center justify-center rounded-full border border-gold/50 bg-paper/90 text-gold-deep shadow-lg backdrop-blur-md transition-all hover:scale-110 hover:bg-cream hover:shadow-xl"
      >
        {/* Hint text on hover */}
        <span className="pointer-events-none absolute right-full mr-3 origin-right scale-0 rounded-full border border-gold/30 bg-paper/95 px-3 py-1 font-hand text-sm whitespace-nowrap text-gold-deep shadow-md transition-transform group-hover:scale-100">
          {hint}
        </span>

        {open ? (
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.7"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M6 6 L18 18 M6 18 L18 6" />
          </svg>
        ) : (
          <svg
            width="22"
            height="22"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M9 18 V5 L21 3 V16" />
            <circle cx="6" cy="18" r="3" fill="currentColor" />
            <circle cx="18" cy="16" r="3" fill="currentColor" />
          </svg>
        )}

        {/* Pulse ring when closed (idle invitation) */}
        {!open && (
          <span className="pointer-events-none absolute inset-0 animate-ping rounded-full border border-gold/40 opacity-30" />
        )}
      </button>
    </div>
  );
}
