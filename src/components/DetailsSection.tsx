"use client";

import { motion } from "framer-motion";
import { useLanguage } from "@/context/LanguageContext";
import { translations } from "@/lib/translations";
import Countdown from "./Countdown";

export default function DetailsSection() {
  const { lang } = useLanguage();
  const t = translations[lang].details;

  const items = [
    {
      label: t.day,
      value: "27",
      note: t.date.split(",")[0].replace(/27|27 de /, ""),
      big: true,
    },
    {
      label: t.timeLabel,
      value: t.time,
    },
    {
      label: t.locationLabel,
      value: t.location,
      note: t.locationNote,
    },
  ];

  return (
    <section
      id="details"
      className="relative overflow-hidden bg-sunset-soft px-6 py-28 md:py-40"
    >
      <div className="noise-overlay pointer-events-none absolute inset-0" />

      <div className="relative z-10 mx-auto max-w-5xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.8 }}
          className="text-center"
        >
          <p className="eyebrow text-gold-deep">{t.eyebrow}</p>
          <h2 className="mt-4 font-heading text-4xl font-light text-warm-dark md:text-6xl">
            {t.title}
          </h2>
        </motion.div>

        {/* Details grid */}
        <div className="mt-16 grid gap-8 md:mt-24 md:grid-cols-3 md:gap-12">
          {/* Date */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="text-center"
          >
            <div className="mb-3 text-[10px] font-medium tracking-[0.4em] text-gold-deep uppercase">
              {t.day}
            </div>
            <div className="font-heading text-7xl leading-none font-light text-warm-dark md:text-8xl">
              27
            </div>
            <div className="mt-4 text-sm tracking-[0.3em] text-warm-dark/70 uppercase md:text-base">
              {lang === "en" ? "June 2026" : "Junio 2026"}
            </div>
          </motion.div>

          {/* Divider */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.3 }}
            className="flex flex-col items-center gap-4 md:border-x md:border-gold/30 md:py-4"
          >
            <div className="mb-1 text-[10px] font-medium tracking-[0.4em] text-gold-deep uppercase">
              {t.timeLabel}
            </div>
            <svg width="36" height="36" viewBox="0 0 36 36" className="text-coral animate-float-slow" fill="none">
              <circle cx="18" cy="18" r="8" stroke="currentColor" strokeWidth="1.5" />
              <path
                d="M18 2 L18 6 M18 30 L18 34 M34 18 L30 18 M6 18 L2 18"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
              <path
                d="M18 8 L18 18 L24 18"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
            </svg>
            <div className="font-heading text-2xl font-light text-warm-dark md:text-3xl">
              {t.time}
            </div>
          </motion.div>

          {/* Location */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="text-center"
          >
            <div className="mb-3 text-[10px] font-medium tracking-[0.4em] text-gold-deep uppercase">
              {t.locationLabel}
            </div>
            <div className="font-heading text-3xl font-light text-warm-dark italic md:text-4xl">
              {t.location}
            </div>
            <div className="mt-4 inline-flex items-center gap-2 rounded-full border border-gold/40 bg-white/40 px-4 py-1.5 text-[10px] font-medium tracking-[0.25em] text-gold-deep uppercase backdrop-blur-sm">
              <span className="block h-1.5 w-1.5 animate-pulse rounded-full bg-coral" />
              {t.locationNote}
            </div>
          </motion.div>
        </div>

        {/* Countdown */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="mt-20 text-center md:mt-28"
        >
          <p className="mb-6 text-[10px] font-medium tracking-[0.4em] text-gold-deep uppercase">
            {t.until}
          </p>
          <Countdown />
        </motion.div>
      </div>
    </section>
  );
}
