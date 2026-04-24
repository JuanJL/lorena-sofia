"use client";

import { motion } from "framer-motion";
import { useLanguage } from "@/context/LanguageContext";
import { translations } from "@/lib/translations";

const SWATCHES = [
  { color: "#F5B28F", label: "peach" },
  { color: "#E8B4B8", label: "rose" },
  { color: "#C8A8D8", label: "lavender" },
  { color: "#E2C277", label: "gold" },
  { color: "#FDF6EB", label: "cream" },
  { color: "#C97B8A", label: "sunset" },
];

export default function DressCodeSection() {
  const { lang } = useLanguage();
  const t = translations[lang].dressCode;

  return (
    <section
      id="dress-code"
      className="relative overflow-hidden bg-gradient-to-b from-cream via-sand to-rose-light/30 px-6 py-28 md:py-40"
    >
      <div className="noise-overlay pointer-events-none absolute inset-0" />

      {/* Sacred geometry — slowly rotating ring */}
      <div className="pointer-events-none absolute -right-32 top-1/3 hidden md:block">
        <svg
          width="400"
          height="400"
          viewBox="0 0 400 400"
          className="animate-slow-spin text-gold/20"
        >
          <circle cx="200" cy="200" r="180" fill="none" stroke="currentColor" strokeWidth="0.5" />
          <circle cx="200" cy="200" r="140" fill="none" stroke="currentColor" strokeWidth="0.5" />
          <circle cx="200" cy="200" r="100" fill="none" stroke="currentColor" strokeWidth="0.5" />
          {Array.from({ length: 12 }).map((_, i) => {
            const angle = (i * 30 * Math.PI) / 180;
            const x1 = Number((200 + Math.cos(angle) * 100).toFixed(3));
            const y1 = Number((200 + Math.sin(angle) * 100).toFixed(3));
            const x2 = Number((200 + Math.cos(angle) * 180).toFixed(3));
            const y2 = Number((200 + Math.sin(angle) * 180).toFixed(3));
            return (
              <line
                key={i}
                x1={x1}
                y1={y1}
                x2={x2}
                y2={y2}
                stroke="currentColor"
                strokeWidth="0.5"
              />
            );
          })}
        </svg>
      </div>

      <div className="pointer-events-none absolute -left-32 bottom-1/3 hidden md:block">
        <svg
          width="300"
          height="300"
          viewBox="0 0 300 300"
          className="animate-slow-spin text-rose/20"
          style={{ animationDirection: "reverse" }}
        >
          <circle cx="150" cy="150" r="130" fill="none" stroke="currentColor" strokeWidth="0.5" />
          <circle cx="150" cy="150" r="90" fill="none" stroke="currentColor" strokeWidth="0.5" />
          <circle cx="150" cy="150" r="50" fill="none" stroke="currentColor" strokeWidth="0.5" />
        </svg>
      </div>

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
        </motion.div>

        {/* Giant title */}
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 1, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          className="mt-6 text-center font-heading text-[clamp(3rem,9vw,7rem)] leading-[0.95] font-light tracking-tight text-warm-dark italic"
        >
          Tropical
          <br />
          <span className="text-gold-gradient not-italic">Ritual</span>
          <br />
          Glam
        </motion.h2>

        {/* Intro lines */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mx-auto mt-14 max-w-xl space-y-3 text-center"
        >
          <p className="font-heading text-xl text-warm-dark italic md:text-2xl">
            {t.intro}
          </p>
          <p className="text-lg text-warm-gray md:text-xl">{t.body}</p>
          <p className="text-lg text-warm-gray md:text-xl">{t.body2}</p>
        </motion.div>

        {/* Tags */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="mt-12"
        >
          <p className="mb-5 text-center text-[10px] font-medium tracking-[0.4em] text-gold-deep uppercase">
            {t.tagsIntro}
          </p>
          <div className="flex flex-wrap justify-center gap-2 md:gap-3">
            {t.tags.map((tag, i) => (
              <motion.span
                key={i}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.5,
                  delay: 0.9 + i * 0.05,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="dress-tag cursor-default rounded-full border border-gold/40 bg-white/50 px-5 py-2 text-sm font-medium text-warm-dark backdrop-blur-sm md:text-base"
              >
                {tag}
              </motion.span>
            ))}
          </div>
        </motion.div>

        {/* Color palette */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8, delay: 1 }}
          className="mt-16 flex justify-center gap-2 md:gap-3"
        >
          {SWATCHES.map((s, i) => (
            <motion.div
              key={i}
              whileHover={{ y: -4, scale: 1.1 }}
              transition={{ duration: 0.3 }}
              className="h-12 w-12 rounded-full border border-white/60 shadow-lg ring-1 ring-black/5 md:h-16 md:w-16"
              style={{ backgroundColor: s.color }}
              title={s.label}
            />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
