"use client";

import { motion } from "framer-motion";
import { useLanguage } from "@/context/LanguageContext";
import ChapterHeader from "./ChapterHeader";

const MAPS_URL = "https://share.google/VTONom5YpanGCSma6";

export default function Chapter3Details() {
  const { lang } = useLanguage();
  const copy =
    lang === "es"
      ? {
          number: "Capítulo III",
          title: "El Lugar y la Hora",
          subtitle: "el escenario del cuento",
          when: "Cuándo",
          whenDay: "Sábado",
          timeNote: "Desde las 7:30 PM",
          where: "Dónde",
          venue: "Maska Gastropub",
          addressLine1: "Carrer de Pau Claris, 164",
          addressLine2: "08037 Barcelona",
          mapButton: "Ver en el mapa",
          dressNote:
            "Código de vestimenta: Carnaval en colores pastel.",
          dressCta: "Ver la inspiración",
        }
      : {
          number: "Chapter III",
          title: "The Place and the Hour",
          subtitle: "the stage of the tale",
          when: "When",
          whenDay: "Saturday",
          timeNote: "From 7:30 PM",
          where: "Where",
          venue: "Maska Gastropub",
          addressLine1: "Carrer de Pau Claris, 164",
          addressLine2: "08037 Barcelona",
          mapButton: "View on the map",
          dressNote: "Dress code: Carnival in pastel colors.",
          dressCta: "See the inspiration",
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
              {/* Start time */}
              <div className="mt-5 inline-flex items-center gap-2 rounded-full border border-gold/40 bg-white/50 px-4 py-1.5">
                <svg
                  width="15"
                  height="15"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-gold-deep"
                >
                  <circle cx="12" cy="12" r="9" />
                  <path d="M12 7 V12 L15.5 14" />
                </svg>
                <span className="font-heading text-sm tracking-wide text-warm-dark md:text-base">
                  {copy.timeNote}
                </span>
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
                  width="34"
                  height="34"
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
              <div className="font-heading text-3xl text-warm-dark md:text-4xl">
                {copy.venue}
              </div>
              <div className="mt-3 text-sm leading-relaxed text-warm-gray md:text-base">
                <p>{copy.addressLine1}</p>
                <p>{copy.addressLine2}</p>
              </div>

              {/* Map button */}
              <a
                href={MAPS_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="group mt-6 inline-flex items-center gap-2 rounded-full border border-gold/50 bg-gradient-to-r from-rose-deep to-gold px-6 py-2.5 font-heading text-sm font-semibold tracking-widest text-white uppercase shadow-md transition-all hover:-translate-y-0.5 hover:shadow-lg"
              >
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.7"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M12 21C12 21 5 14.5 5 10C5 6.13 8.13 3 12 3C15.87 3 19 6.13 19 10C19 14.5 12 21 12 21Z" />
                  <circle cx="12" cy="10" r="3" />
                </svg>
                <span>{copy.mapButton}</span>
              </a>
            </div>
          </motion.div>
        </div>

        {/* Dress-code note */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mx-auto mt-14 max-w-xl text-center"
        >
          <p className="font-hand text-xl text-warm-dark/80 italic md:text-2xl">
            {copy.dressNote}
          </p>
          <a
            href="#chapter-6"
            className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium tracking-widest text-gold-deep uppercase transition-colors hover:text-rose-deep"
          >
            {copy.dressCta}
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M5 12 H19 M13 6 L19 12 L13 18" />
            </svg>
          </a>
        </motion.div>
      </div>
    </section>
  );
}
