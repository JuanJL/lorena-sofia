"use client";

import { motion } from "framer-motion";
import { useLanguage } from "@/context/LanguageContext";
import ChapterHeader from "./ChapterHeader";

export default function Chapter3Details() {
  const { lang } = useLanguage();
  const copy =
    lang === "es"
      ? {
          number: "Cap\u00EDtulo III",
          title: "El Lugar y la Hora",
          subtitle: "el escenario del cuento",
          when: "Cu\u00E1ndo",
          whenDate: "27 de Junio, 2026",
          whenDay: "S\u00E1bado",
          where: "D\u00F3nde",
          whereCity: "Barcelona",
          whereCountry: "Espa\u00F1a",
          secretNote:
            "El lugar exacto, el c\u00F3digo de vestimenta y los detalles m\u00E1gicos\u2026 llegan pronto.",
          stamp: "Pr\u00F3ximamente",
        }
      : {
          number: "Chapter III",
          title: "The Place and the Hour",
          subtitle: "the stage of the tale",
          when: "When",
          whenDate: "June 27, 2026",
          whenDay: "Saturday",
          where: "Where",
          whereCity: "Barcelona",
          whereCountry: "Spain",
          secretNote:
            "The exact venue, dress code, and magical details\u2026 coming soon.",
          stamp: "Coming Soon",
        };

  return (
    <section
      id="chapter-3"
      className="relative overflow-hidden bg-gradient-to-b from-rose-lighter/30 via-peach-light/20 to-lavender-lighter/20 px-6 py-32 md:py-40"
    >
      <div className="mx-auto max-w-5xl">
        <ChapterHeader
          number={copy.number}
          title={copy.title}
          subtitle={copy.subtitle}
        />

        {/* Postcard-style cards */}
        <div className="mt-20 grid gap-8 md:grid-cols-2 md:gap-12">
          {/* When card — vintage ticket */}
          <motion.div
            initial={{ opacity: 0, y: 60, rotate: -3 }}
            whileInView={{ opacity: 1, y: 0, rotate: -2 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            whileHover={{ rotate: 0, y: -8, transition: { duration: 0.3 } }}
            className="paper-texture polaroid-shadow relative rounded-md border border-gold/30 p-8 md:p-10"
          >
            <div
              className="washi-tape"
              style={{
                top: -10,
                left: "50%",
                transform: "translateX(-50%) rotate(-3deg)",
              }}
            />

            <div className="flex items-center gap-3 text-xs font-semibold tracking-[0.3em] text-gold uppercase">
              <div className="h-px flex-1 bg-gold/30" />
              {copy.when}
              <div className="h-px flex-1 bg-gold/30" />
            </div>

            <div className="mt-6 text-center">
              <div className="font-heading text-4xl text-warm-dark md:text-5xl">
                27
              </div>
              <div className="mt-1 font-heading text-lg tracking-[0.3em] text-gold-deep uppercase">
                Junio
              </div>
              <div className="mt-1 text-sm text-warm-gray">2026</div>
              <div className="mt-4 font-hand text-2xl text-rose-deep">
                {copy.whenDay}
              </div>
            </div>

            {/* Ticket perforations */}
            <div className="absolute top-1/2 -left-2 h-4 w-4 -translate-y-1/2 rounded-full bg-cream shadow-inner" />
            <div className="absolute top-1/2 -right-2 h-4 w-4 -translate-y-1/2 rounded-full bg-cream shadow-inner" />
          </motion.div>

          {/* Where card — postcard */}
          <motion.div
            initial={{ opacity: 0, y: 60, rotate: 3 }}
            whileInView={{ opacity: 1, y: 0, rotate: 2 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{
              duration: 0.8,
              delay: 0.15,
              ease: [0.22, 1, 0.36, 1],
            }}
            whileHover={{ rotate: 0, y: -8, transition: { duration: 0.3 } }}
            className="paper-texture polaroid-shadow relative rounded-md border border-gold/30 p-8 md:p-10"
          >
            <div
              className="washi-tape washi-tape-gold"
              style={{
                top: -10,
                left: "50%",
                transform: "translateX(-50%) rotate(4deg)",
              }}
            />

            <div className="flex items-center gap-3 text-xs font-semibold tracking-[0.3em] text-gold uppercase">
              <div className="h-px flex-1 bg-gold/30" />
              {copy.where}
              <div className="h-px flex-1 bg-gold/30" />
            </div>

            <div className="mt-6 text-center">
              <div className="mb-3 flex items-center justify-center">
                <svg
                  width="36"
                  height="36"
                  viewBox="0 0 24 24"
                  fill="none"
                  className="text-rose-deep animate-bounce-gentle"
                >
                  <path
                    d="M12 21C12 21 5 14.5 5 10C5 6.13 8.13 3 12 3C15.87 3 19 6.13 19 10C19 14.5 12 21 12 21Z"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    fill="rgba(201, 123, 138, 0.15)"
                  />
                  <circle cx="12" cy="10" r="3" fill="currentColor" />
                </svg>
              </div>
              <div className="font-heading text-4xl text-warm-dark md:text-5xl">
                {copy.whereCity}
              </div>
              <div className="mt-2 text-sm tracking-[0.2em] text-warm-gray uppercase">
                {copy.whereCountry}
              </div>

              {/* Decorative stamp */}
              <div className="mt-6 inline-block rotate-[-8deg] rounded border-2 border-dashed border-rose-deep/60 px-4 py-1 font-hand text-sm tracking-widest text-rose-deep/80 uppercase">
                {copy.stamp}
              </div>
            </div>
          </motion.div>
        </div>

        {/* Secret note */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mx-auto mt-14 max-w-xl text-center"
        >
          <p className="font-hand text-xl text-warm-dark/80 italic md:text-2xl">
            “{copy.secretNote}”
          </p>
        </motion.div>
      </div>
    </section>
  );
}
