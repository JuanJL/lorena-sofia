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
    en: { d: "Days", h: "Hours", m: "Minutes", s: "Seconds" },
    es: { d: "D\u00EDas", h: "Horas", m: "Minutos", s: "Segundos" },
  }[lang];

  const pad = (n: number) => String(n).padStart(2, "0");

  const items = [
    { value: String(t.days), label: labels.d },
    { value: pad(t.hours), label: labels.h },
    { value: pad(t.minutes), label: labels.m },
    { value: pad(t.seconds), label: labels.s },
  ];

  return (
    <div className="flex items-start justify-center gap-4 md:gap-8">
      {items.map((item, i) => (
        <div key={i} className="flex items-start gap-4 md:gap-8">
          <div className="flex min-w-[60px] flex-col items-center md:min-w-[90px]">
            <div className="font-heading text-4xl leading-none font-light text-warm-dark tabular-nums md:text-6xl">
              {item.value}
            </div>
            <div className="mt-3 text-[9px] font-medium tracking-[0.3em] text-gold-deep uppercase md:text-[10px]">
              {item.label}
            </div>
          </div>
          {i < items.length - 1 && (
            <span className="font-heading text-4xl leading-none font-light text-gold/50 md:text-6xl">
              ·
            </span>
          )}
        </div>
      ))}
    </div>
  );
}
