"use client";

import { motion } from "framer-motion";
import { useLanguage } from "@/context/LanguageContext";
import ChapterHeader from "./ChapterHeader";
import Countdown from "./Countdown";

export default function Chapter1SaveTheDate() {
  const { lang } = useLanguage();
  const copy =
    lang === "es"
      ? {
          number: "Cap\u00EDtulo I",
          title: "Hab\u00EDa una vez\u2026",
          subtitle: "una fecha que lo cambi\u00F3 todo",
          date: "Save the Date",
          until:
            "\u2014 Y el cuento comienza en\u2026 \u2014",
        }
      : {
          number: "Chapter I",
          title: "Once upon a time\u2026",
          subtitle: "a date that changed everything",
          date: "Save the Date",
          until: "\u2014 And the tale begins in\u2026 \u2014",
        };

  const dateChars = "27 \u00B7 06 \u00B7 26".split("");

  return (
    <section
      id="chapter-1"
      className="paper-texture relative overflow-hidden px-6 py-32 md:py-40"
    >
      {/* Torn paper top */}
      <div className="absolute top-0 left-0 right-0 h-10 bg-cream torn-edge-top" />

      {/* Corner washi tape */}
      <div
        className="washi-tape"
        style={{ top: 24, left: 36, transform: "rotate(-8deg)" }}
      />
      <div
        className="washi-tape washi-tape-gold"
        style={{ top: 28, right: 40, transform: "rotate(12deg)" }}
      />

      <div className="relative z-10 mx-auto max-w-4xl">
        <ChapterHeader
          number={copy.number}
          title={copy.title}
          subtitle={copy.subtitle}
        />

        {/* Date reveal */}
        <div className="mt-20 text-center">
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mb-6 text-sm font-semibold tracking-[0.5em] text-gold uppercase md:text-base"
          >
            {copy.date}
          </motion.p>

          <div className="flex items-center justify-center font-heading text-6xl font-light tracking-wider text-warm-dark md:text-8xl lg:text-9xl">
            {dateChars.map((ch, i) => (
              <motion.span
                key={i}
                initial={{ opacity: 0, y: 40, rotateZ: -20 }}
                whileInView={{ opacity: 1, y: 0, rotateZ: 0 }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.6,
                  delay: 0.6 + i * 0.12,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="inline-block"
                style={{ whiteSpace: "pre" }}
              >
                {ch}
              </motion.span>
            ))}
          </div>

          {/* Gold divider */}
          <motion.div
            initial={{ opacity: 0, scaleX: 0 }}
            whileInView={{ opacity: 1, scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 2 }}
            className="mx-auto mt-8 flex items-center justify-center gap-4"
          >
            <div className="h-px w-20 bg-gradient-to-r from-transparent to-gold md:w-32" />
            <svg width="18" height="18" viewBox="0 0 20 20" className="text-gold">
              <path
                d="M10,1 L11.5,8.5 L19,10 L11.5,11.5 L10,19 L8.5,11.5 L1,10 L8.5,8.5 Z"
                fill="currentColor"
              />
            </svg>
            <div className="h-px w-20 bg-gradient-to-l from-transparent to-gold md:w-32" />
          </motion.div>

          {/* Name */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 2.2 }}
            className="mt-8 font-heading text-4xl font-normal tracking-[0.05em] text-warm-dark sm:text-5xl md:text-7xl md:tracking-[0.08em] lg:text-8xl"
          >
            {["LORENA", "SOF\u00CDA"].map((word, wi) => (
              <span
                key={wi}
                className="inline-block whitespace-nowrap"
                style={{ marginRight: wi === 0 ? "0.35em" : 0 }}
              >
                {word.split("").map((ch, i) => (
                  <span
                    key={i}
                    className="sway-letter"
                    style={{
                      animationDelay: `${(wi * 6 + i) * 0.2}s`,
                    }}
                  >
                    {ch}
                  </span>
                ))}
              </span>
            ))}
          </motion.h1>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 3 }}
            className="mt-4 text-shimmer text-sm font-semibold tracking-[0.3em] uppercase md:text-base"
          >
            Comienza una nueva era
          </motion.div>

          {/* 40 badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0, rotate: -180 }}
            whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 3.2, type: "spring" }}
            className="mt-10 inline-block"
          >
            <div className="relative">
              <div className="absolute inset-0 animate-ping rounded-full bg-gold/20" />
              <div className="relative inline-flex h-20 w-20 items-center justify-center rounded-full border-2 border-gold/60 bg-white/60 shadow-lg backdrop-blur-sm">
                <span className="font-heading text-3xl text-gold-deep">40</span>
              </div>
            </div>
          </motion.div>

          {/* Countdown */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 3.6 }}
            className="mt-16"
          >
            <p className="mb-5 font-hand text-xl text-rose-deep italic md:text-2xl">
              {copy.until}
            </p>
            <Countdown />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
