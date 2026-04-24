"use client";

import { motion } from "framer-motion";
import { useLanguage } from "@/context/LanguageContext";
import { translations } from "@/lib/translations";

function Waveform() {
  return (
    <div className="flex h-10 items-end justify-center gap-[3px]">
      {[40, 70, 55, 90, 65, 80, 45, 75, 60, 85, 50, 70].map((h, i) => (
        <span
          key={i}
          className="wave-bar w-[3px] rounded-full bg-gradient-to-t from-coral to-gold-light"
          style={{
            height: `${h}%`,
            animationDelay: `${i * 0.1}s`,
          }}
        />
      ))}
    </div>
  );
}

export default function MusicSection() {
  const { lang } = useLanguage();
  const t = translations[lang].music;

  return (
    <section
      id="music"
      className="relative overflow-hidden bg-night px-6 py-28 md:py-40"
    >
      <div className="noise-overlay pointer-events-none absolute inset-0" />

      {/* Ambient glow */}
      <div className="pointer-events-none absolute top-0 left-1/2 h-96 w-[600px] -translate-x-1/2 rounded-full bg-coral/20 blur-3xl" />
      <div className="pointer-events-none absolute bottom-0 right-0 h-64 w-96 rounded-full bg-lavender/20 blur-3xl" />

      <div className="relative z-10 mx-auto max-w-5xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.8 }}
          className="text-center"
        >
          <p className="eyebrow text-gold-light">{t.eyebrow}</p>
        </motion.div>

        {/* Tagline */}
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 1, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          className="mx-auto mt-6 max-w-3xl text-center font-heading text-2xl leading-tight font-light text-white md:text-4xl lg:text-5xl"
        >
          {t.title}
        </motion.h2>

        {/* Waveform visual */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.6 }}
          className="mt-14"
        >
          <Waveform />
        </motion.div>

        {/* Genre cards */}
        <div className="mt-16 grid gap-6 md:mt-20 md:grid-cols-3 md:gap-6">
          {t.genres.map((g, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{
                duration: 0.8,
                delay: 0.2 + i * 0.15,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="moment-card group relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] p-8 backdrop-blur-sm"
            >
              {/* Gradient border on hover */}
              <div className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                style={{
                  background: "linear-gradient(135deg, rgba(226,194,119,0.12), rgba(226,132,92,0.12), transparent)",
                }}
              />

              {/* Number */}
              <div className="font-heading text-6xl font-light text-white/10">
                0{i + 1}
              </div>

              <h3 className="mt-2 font-heading text-2xl font-light text-white md:text-3xl">
                {g.name}
              </h3>

              <div className="my-4 h-px w-12 bg-gold-light/60" />

              <p className="text-sm leading-relaxed text-white/60 md:text-base">
                {g.note}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
