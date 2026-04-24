"use client";

import { motion } from "framer-motion";
import { useLanguage } from "@/context/LanguageContext";
import { translations } from "@/lib/translations";

const ICONS = [
  // Sunset ritual
  (
    <svg key="sun" viewBox="0 0 48 48" fill="none" className="h-10 w-10 md:h-12 md:w-12">
      <circle cx="24" cy="28" r="10" stroke="currentColor" strokeWidth="1.2" fill="rgba(226,194,119,0.1)" />
      <path d="M24 4 L24 14 M44 24 L34 24 M14 24 L4 24 M38 10 L32 16 M10 10 L16 16"
        stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
      <path d="M8 38 L40 38 M12 44 L36 44" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
    </svg>
  ),
  // Dance / flame
  (
    <svg key="dance" viewBox="0 0 48 48" fill="none" className="h-10 w-10 md:h-12 md:w-12">
      <path
        d="M24 4 C26 12 34 14 32 24 C30 32 18 32 16 24 C14 16 22 14 24 4 Z"
        stroke="currentColor"
        strokeWidth="1.2"
        fill="rgba(226,132,92,0.15)"
      />
      <path
        d="M24 18 C25 22 28 24 26 28 C24 32 22 30 22 26 C22 22 23 20 24 18 Z"
        fill="currentColor"
        opacity="0.4"
      />
      <path d="M12 40 L36 40 M14 44 L34 44" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
    </svg>
  ),
  // Midnight / moon + stars
  (
    <svg key="moon" viewBox="0 0 48 48" fill="none" className="h-10 w-10 md:h-12 md:w-12">
      <path
        d="M30 10 A14 14 0 1 0 38 30 A12 12 0 0 1 30 10 Z"
        stroke="currentColor"
        strokeWidth="1.2"
        fill="rgba(226,194,119,0.15)"
      />
      <circle cx="12" cy="14" r="1.5" fill="currentColor" />
      <circle cx="8" cy="26" r="1" fill="currentColor" />
      <circle cx="42" cy="36" r="1" fill="currentColor" />
      <circle cx="14" cy="36" r="1.5" fill="currentColor" />
    </svg>
  ),
];

export default function MomentsSection() {
  const { lang } = useLanguage();
  const t = translations[lang].moments;

  return (
    <section
      id="moments"
      className="relative overflow-hidden bg-gradient-to-b from-midnight via-aubergine to-plum px-6 py-28 md:py-40"
    >
      <div className="noise-overlay pointer-events-none absolute inset-0" />

      {/* Glow */}
      <div className="pointer-events-none absolute left-1/2 top-0 h-[500px] w-[700px] -translate-x-1/2 rounded-full bg-gold/10 blur-3xl" />

      <div className="relative z-10 mx-auto max-w-6xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.8 }}
          className="text-center"
        >
          <p className="eyebrow text-gold-light">{t.eyebrow}</p>
          <div className="mx-auto mt-6 h-px w-16 bg-gradient-to-r from-transparent via-gold-light to-transparent" />
        </motion.div>

        {/* Moment cards — staggered layout */}
        <div className="mt-20 grid gap-10 md:mt-28 md:grid-cols-3 md:gap-8">
          {t.items.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{
                duration: 1,
                delay: i * 0.2,
                ease: [0.22, 1, 0.36, 1],
              }}
              className={`relative text-center ${
                i === 1 ? "md:mt-16" : i === 2 ? "md:mt-32" : ""
              }`}
            >
              {/* Large chapter number */}
              <div className="font-heading text-[10rem] leading-none font-light text-white/[0.04]">
                {i + 1}
              </div>

              {/* Icon */}
              <div className="absolute inset-x-0 top-8 flex justify-center text-gold-light md:top-12">
                {ICONS[i]}
              </div>

              <div className="relative -mt-16 md:-mt-20">
                <h3 className="font-heading text-3xl font-light text-white italic md:text-4xl">
                  {item.title}
                </h3>

                <div className="mx-auto my-5 flex items-center justify-center gap-2">
                  <div className="h-px w-8 bg-gold-light/40" />
                  <span className="text-xs text-gold-light">✦</span>
                  <div className="h-px w-8 bg-gold-light/40" />
                </div>

                <p className="mx-auto max-w-xs text-sm leading-relaxed text-white/60 md:text-base">
                  {item.note}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
