"use client";

import { motion } from "framer-motion";
import { useLanguage } from "@/context/LanguageContext";
import { translations } from "@/lib/translations";

export default function TeaserFooter() {
  const { lang } = useLanguage();
  const t = translations[lang].teaser;

  return (
    <footer className="relative overflow-hidden bg-ink px-6 py-24 md:py-32">
      <div className="noise-overlay pointer-events-none absolute inset-0" />

      {/* Ambient glow */}
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-gold/8 blur-3xl" />

      <div className="relative z-10 mx-auto max-w-2xl text-center">
        {/* Ornament */}
        <motion.div
          initial={{ opacity: 0, scale: 0 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="mb-10 flex items-center justify-center gap-3"
        >
          <div className="h-px w-16 bg-gradient-to-r from-transparent to-gold/60" />
          <svg width="14" height="14" viewBox="0 0 20 20" className="text-gold-light">
            <path
              d="M10,1 L11.5,8.5 L19,10 L11.5,11.5 L10,19 L8.5,11.5 L1,10 L8.5,8.5 Z"
              fill="currentColor"
            />
          </svg>
          <div className="h-px w-16 bg-gradient-to-l from-transparent to-gold/60" />
        </motion.div>

        {/* Teaser lines */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="font-heading text-xl leading-relaxed text-white/70 italic md:text-2xl"
        >
          {t.line1}
        </motion.p>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="mt-4 font-heading text-2xl leading-relaxed font-light italic md:text-4xl"
        >
          <span className="text-shimmer-gold">{t.line2}</span>
        </motion.p>

        {/* Signature */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 1 }}
          className="mt-16"
        >
          <div className="mx-auto mb-5 h-px w-24 bg-gradient-to-r from-transparent via-gold/50 to-transparent" />
          <p className="font-heading text-3xl leading-tight font-light tracking-wide text-white md:text-4xl">
            LORENA SOF&Iacute;A
          </p>
          <p className="mt-3 text-[10px] font-medium tracking-[0.4em] text-gold-light uppercase md:text-xs">
            {t.date}
          </p>
          <p className="mt-2 text-[10px] font-medium tracking-[0.4em] text-white/30 uppercase md:text-xs">
            {lang === "en" ? "Barcelona" : "Barcelona"}
          </p>
        </motion.div>

        {/* Tiny footer */}
        <p className="mt-16 text-[10px] tracking-[0.2em] text-white/20 uppercase">
          A new era · Comienza una nueva era
        </p>
      </div>
    </footer>
  );
}
