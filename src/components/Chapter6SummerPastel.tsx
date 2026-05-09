"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { useState } from "react";
import { useLanguage } from "@/context/LanguageContext";
import ChapterHeader from "./ChapterHeader";

const SWATCHES = [
  { color: "#F2D1D5", label: "rose" },
  { color: "#F0C8B0", label: "peach" },
  { color: "#F0DBA5", label: "gold" },
  { color: "#E0D0EC", label: "lavender" },
  { color: "#FFF8F0", label: "cream" },
  { color: "#E89D7A", label: "sunset" },
];

// Six photo slots — drop files at these paths and they appear automatically.
// Until then, each card shows a friendly placeholder.
const LOOKS = [
  "/dress-code/look-1.jpg",
  "/dress-code/look-2.jpg",
  "/dress-code/look-3.jpg",
  "/dress-code/look-4.jpg",
  "/dress-code/look-5.jpg",
  "/dress-code/look-6.jpg",
];

interface LookCardProps {
  src: string;
  index: number;
}

function LookCard({ src, index }: LookCardProps) {
  const [errored, setErrored] = useState(false);
  const tapeColors = ["washi-tape", "washi-tape washi-tape-gold"];
  const tapeIdx = index % tapeColors.length;
  const tapeRot = ((index * 41) % 14) - 7;
  const cardRot = (((index * 53) % 60) - 30) / 10; // -3 to +3 deg

  return (
    <motion.div
      initial={{ opacity: 0, y: 30, rotate: cardRot + 6 }}
      whileInView={{ opacity: 1, y: 0, rotate: cardRot }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{
        duration: 0.7,
        delay: (index % 6) * 0.08,
        ease: [0.22, 1, 0.36, 1],
      }}
      whileHover={{ y: -4, rotate: 0, transition: { duration: 0.3 } }}
      className="polaroid-shadow relative rounded-sm bg-white p-3 pb-7"
    >
      {/* Washi tape */}
      <div
        className={`${tapeColors[tapeIdx]} pointer-events-none absolute -top-3 left-1/2`}
        style={{
          transform: `translateX(-50%) rotate(${tapeRot}deg)`,
          width: 64,
          height: 18,
        }}
      />

      <div className="relative aspect-[3/4] w-full overflow-hidden rounded-sm bg-gradient-to-br from-cream-dark via-paper to-rose-lighter">
        {errored ? (
          <div className="flex h-full w-full flex-col items-center justify-center px-4 text-center">
            <svg
              width="32"
              height="32"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.4"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="text-gold-deep/60"
            >
              <rect x="3" y="5" width="18" height="14" rx="2" />
              <circle cx="9" cy="11" r="2" />
              <path d="M3 17 L8 12 L13 17 L17 13 L21 17" />
            </svg>
            <p className="mt-3 font-hand text-base text-rose-deep">
              Pr&oacute;ximamente
            </p>
            <p className="mt-1 text-[10px] tracking-[0.25em] text-warm-gray uppercase">
              Look {index + 1}
            </p>
          </div>
        ) : (
          <Image
            src={src}
            alt={`Look ${index + 1}`}
            fill
            sizes="(max-width: 768px) 50vw, 320px"
            className="glossary-photo object-cover"
            // Hide the Pinterest watermark in the top-left of the inspiration
            // images by biasing the crop towards the bottom-right.
            style={{ objectPosition: "center 35%" }}
            onError={() => setErrored(true)}
          />
        )}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-paper/35 mix-blend-multiply" />
      </div>
    </motion.div>
  );
}

export default function Chapter6SummerPastel() {
  const { lang } = useLanguage();

  const copy =
    lang === "es"
      ? {
          number: "Capítulo VI",
          title: "Summer Pastel",
          subtitle: "el código de vestimenta",
          line1: "Fluye entre lo salvaje y lo elegante.",
          line2: "Seda, brillo, piel, movimiento.",
          line3: "Pasteles, oro y energía tropical.",
          tagsIntro: "Canaliza",
          tags: [
            "Seda",
            "Brillo",
            "Piel",
            "Movimiento",
            "Pastel",
            "Oro",
            "Tropical",
            "Salvaje",
            "Elegante",
            "Sensual",
            "Mística",
          ],
          paletteIntro: "La paleta",
          looksIntro: "Inspiración",
        }
      : {
          number: "Chapter VI",
          title: "Summer Pastel",
          subtitle: "the dress code",
          line1: "Flow between wild and elegant.",
          line2: "Silk, shine, skin, movement.",
          line3: "Pastels, gold, and tropical energy.",
          tagsIntro: "Channel",
          tags: [
            "Silk",
            "Shine",
            "Skin",
            "Movement",
            "Pastel",
            "Gold",
            "Tropical",
            "Wild",
            "Elegant",
            "Sensual",
            "Mystic",
          ],
          paletteIntro: "The palette",
          looksIntro: "Inspiration",
        };

  return (
    <section
      id="chapter-6"
      className="relative overflow-hidden bg-gradient-to-b from-cream via-rose-lighter/20 to-peach-light/30 px-6 py-32 md:py-40"
    >
      {/* Soft decorative blobs */}
      <div className="pointer-events-none absolute -top-32 -left-32 h-80 w-80 rounded-full bg-rose/20 blur-3xl" />
      <div className="pointer-events-none absolute -right-32 bottom-0 h-96 w-96 rounded-full bg-lavender/20 blur-3xl" />

      <div className="relative z-10 mx-auto max-w-6xl">
        <ChapterHeader
          number={copy.number}
          title={copy.title}
          subtitle={copy.subtitle}
        />

        {/* Body copy */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="mx-auto mt-12 max-w-xl space-y-2 text-center"
        >
          <p className="font-heading text-xl text-warm-dark italic md:text-2xl">
            {copy.line1}
          </p>
          <p className="font-heading text-lg text-warm-dark/80 italic md:text-xl">
            {copy.line2}
          </p>
          <p className="font-heading text-lg text-warm-dark/80 italic md:text-xl">
            {copy.line3}
          </p>
        </motion.div>

        {/* Color palette */}
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mt-12 text-center"
        >
          <p className="mb-4 text-[10px] font-medium tracking-[0.4em] text-gold-deep uppercase">
            {copy.paletteIntro}
          </p>
          <div className="flex flex-wrap justify-center gap-2 md:gap-3">
            {SWATCHES.map((s, i) => (
              <motion.div
                key={i}
                whileHover={{ y: -3, scale: 1.08 }}
                transition={{ duration: 0.3 }}
                className="h-12 w-12 rounded-full border border-white/70 shadow-md ring-1 ring-warm-dark/5 md:h-14 md:w-14"
                style={{ backgroundColor: s.color }}
                title={s.label}
              />
            ))}
          </div>
        </motion.div>

        {/* Tag pills */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="mt-10"
        >
          <p className="mb-4 text-center text-[10px] font-medium tracking-[0.4em] text-gold-deep uppercase">
            {copy.tagsIntro}
          </p>
          <div className="flex flex-wrap justify-center gap-2 md:gap-3">
            {copy.tags.map((tag, i) => (
              <motion.span
                key={i}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.5,
                  delay: 0.4 + i * 0.04,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="cursor-default rounded-full border border-gold/40 bg-white/60 px-4 py-1.5 text-sm font-medium text-warm-dark backdrop-blur-sm transition-all hover:-translate-y-0.5 hover:border-gold hover:bg-white/80 md:text-base"
              >
                {tag}
              </motion.span>
            ))}
          </div>
        </motion.div>

        {/* Inspiration moodboard */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mt-20"
        >
          <div className="mb-8 flex items-center justify-center gap-3">
            <div className="h-px w-12 bg-gradient-to-r from-transparent to-gold/40" />
            <p className="text-[10px] font-medium tracking-[0.4em] text-gold-deep uppercase">
              {copy.looksIntro}
            </p>
            <div className="h-px w-12 bg-gradient-to-l from-transparent to-gold/40" />
          </div>

          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:gap-6 lg:gap-8">
            {LOOKS.map((src, i) => (
              <LookCard key={src} src={src} index={i} />
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
