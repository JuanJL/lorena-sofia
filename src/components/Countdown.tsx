"use client";

import { useEffect, useState } from "react";
import { useLanguage } from "@/context/LanguageContext";

const TARGET = new Date("2026-06-27T20:00:00+02:00").getTime();

function calc() {
  const diff = Math.max(0, TARGET - Date.now());
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((diff / (1000 * 60)) % 60);
  const seconds = Math.floor((diff / 1000) % 60);
  return { days, hours, minutes, seconds };
}

export default function Countdown() {
  const [t, setT] = useState(calc());
  const { lang } = useLanguage();

  useEffect(() => {
    const id = setInterval(() => setT(calc()), 1000);
    return () => clearInterval(id);
  }, []);

  const labels = {
    es: { d: "días", h: "horas", m: "min", s: "seg" },
    en: { d: "days", h: "hours", m: "min", s: "sec" },
  }[lang];

  const pad = (n: number) => String(n).padStart(2, "0");

  return (
    <div className="flex items-center justify-center gap-2 md:gap-4">
      {[
        { value: t.days, label: labels.d, big: true },
        { value: t.hours, label: labels.h },
        { value: t.minutes, label: labels.m },
        { value: t.seconds, label: labels.s },
      ].map((item, i) => (
        <div key={i} className="flex items-center">
          <div className="flex flex-col items-center">
            <div
              className={`paper-texture polaroid-shadow rounded-lg border border-gold/40 px-3 py-2 md:px-5 md:py-3 ${
                item.big ? "min-w-[70px] md:min-w-[100px]" : "min-w-[54px] md:min-w-[70px]"
              }`}
            >
              <div
                className={`font-heading font-light text-warm-dark tabular-nums ${
                  item.big
                    ? "text-3xl md:text-5xl"
                    : "text-2xl md:text-3xl"
                }`}
              >
                {item.big ? item.value : pad(item.value)}
              </div>
            </div>
            <div className="mt-2 text-[10px] font-medium tracking-[0.2em] text-gold uppercase md:text-xs">
              {item.label}
            </div>
          </div>
          {i < 3 && (
            <span className="mx-1 -mt-4 text-xl text-gold/50 md:mx-2 md:text-2xl">
              :
            </span>
          )}
        </div>
      ))}
    </div>
  );
}
