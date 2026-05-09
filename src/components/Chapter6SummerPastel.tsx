"use client";

import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { useCallback, useEffect, useState } from "react";
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
  onOpen: (index: number) => void;
}

function LookCard({ src, index, onOpen }: LookCardProps) {
  const [errored, setErrored] = useState(false);
  const tapeColors = ["washi-tape", "washi-tape washi-tape-gold"];
  const tapeIdx = index % tapeColors.length;
  const tapeRot = ((index * 41) % 14) - 7;
  const cardRot = (((index * 53) % 60) - 30) / 10; // -3 to +3 deg

  return (
    <motion.button
      type="button"
      onClick={() => onOpen(index)}
      initial={{ opacity: 0, y: 30, rotate: cardRot + 6 }}
      whileInView={{ opacity: 1, y: 0, rotate: cardRot }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{
        duration: 0.7,
        delay: (index % 6) * 0.08,
        ease: [0.22, 1, 0.36, 1],
      }}
      whileHover={{ y: -4, rotate: 0, transition: { duration: 0.3 } }}
      aria-label={`Open look ${index + 1} in full size`}
      className="polaroid-shadow group relative cursor-pointer rounded-sm bg-white p-3 pb-7"
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
            className="glossary-photo object-cover transition-transform duration-500 group-hover:scale-105"
            style={{ objectPosition: "center 35%" }}
            onError={() => setErrored(true)}
          />
        )}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-paper/35 mix-blend-multiply" />

        {/* Subtle expand affordance — top-right, fades on hover */}
        {!errored && (
          <div
            className="pointer-events-none absolute top-2 right-2 z-10 flex h-7 w-7 items-center justify-center rounded-full bg-white/90 text-gold-deep shadow-sm ring-1 ring-gold/40 backdrop-blur-sm transition-opacity duration-300 group-hover:opacity-0"
            aria-hidden="true"
          >
            <svg
              width="13"
              height="13"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.7"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M15 3 L21 3 L21 9 M21 3 L13 11 M9 21 L3 21 L3 15 M3 21 L11 13" />
            </svg>
          </div>
        )}
      </div>
    </motion.button>
  );
}

interface LightboxProps {
  open: boolean;
  index: number;
  total: number;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
  src: string;
}

function Lightbox({
  open,
  index,
  total,
  onClose,
  onPrev,
  onNext,
  src,
}: LightboxProps) {
  // Lock body scroll while open
  useEffect(() => {
    if (!open) return;
    const original = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = original;
    };
  }, [open]);

  // Esc to close, arrows to navigate
  useEffect(() => {
    if (!open) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      else if (e.key === "ArrowLeft") onPrev();
      else if (e.key === "ArrowRight") onNext();
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [open, onClose, onPrev, onNext]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          role="dialog"
          aria-modal="true"
          aria-label="Outfit look fullscreen"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          onClick={onClose}
          className="fixed inset-0 z-[80] flex items-center justify-center bg-ink/85 backdrop-blur-sm"
        >
          {/* Close button */}
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onClose();
            }}
            aria-label="Close"
            className="absolute top-5 right-5 z-10 flex h-11 w-11 items-center justify-center rounded-full border border-white/30 bg-white/10 text-white backdrop-blur-md transition-all hover:scale-105 hover:bg-white/20"
          >
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.7"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M6 6 L18 18 M6 18 L18 6" />
            </svg>
          </button>

          {/* Counter */}
          <div className="absolute top-7 left-1/2 z-10 -translate-x-1/2 text-[11px] font-medium tracking-[0.4em] text-white/80 uppercase tabular-nums">
            {index + 1} / {total}
          </div>

          {/* Prev */}
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onPrev();
            }}
            aria-label="Previous look"
            className="absolute top-1/2 left-3 z-10 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full border border-white/30 bg-white/10 text-white backdrop-blur-md transition-all hover:scale-105 hover:bg-white/20 md:left-6 md:h-14 md:w-14"
          >
            <svg
              width="22"
              height="22"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.6"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M15 6 L9 12 L15 18" />
            </svg>
          </button>

          {/* Next */}
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onNext();
            }}
            aria-label="Next look"
            className="absolute top-1/2 right-3 z-10 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full border border-white/30 bg-white/10 text-white backdrop-blur-md transition-all hover:scale-105 hover:bg-white/20 md:right-6 md:h-14 md:w-14"
          >
            <svg
              width="22"
              height="22"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.6"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M9 6 L15 12 L9 18" />
            </svg>
          </button>

          {/* The image */}
          <motion.div
            key={src}
            initial={{ opacity: 0, scale: 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            onClick={(e) => e.stopPropagation()}
            className="relative max-h-[88vh] w-auto px-12 md:px-20"
          >
            <Image
              src={src}
              alt={`Look ${index + 1} fullscreen`}
              width={900}
              height={1500}
              priority
              className="h-auto max-h-[88vh] w-auto rounded-md object-contain shadow-2xl"
              sizes="(max-width: 768px) 90vw, 70vw"
            />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default function Chapter6SummerPastel() {
  const { lang } = useLanguage();
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const open = openIndex !== null;
  const handleOpen = useCallback((i: number) => setOpenIndex(i), []);
  const handleClose = useCallback(() => setOpenIndex(null), []);
  const handlePrev = useCallback(
    () =>
      setOpenIndex((cur) =>
        cur === null ? cur : (cur - 1 + LOOKS.length) % LOOKS.length,
      ),
    [],
  );
  const handleNext = useCallback(
    () =>
      setOpenIndex((cur) => (cur === null ? cur : (cur + 1) % LOOKS.length)),
    [],
  );

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
          tapToOpen: "Haz clic para ampliar",
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
          tapToOpen: "Click to enlarge",
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
          <div className="mb-3 flex items-center justify-center gap-3">
            <div className="h-px w-12 bg-gradient-to-r from-transparent to-gold/40" />
            <p className="text-[10px] font-medium tracking-[0.4em] text-gold-deep uppercase">
              {copy.looksIntro}
            </p>
            <div className="h-px w-12 bg-gradient-to-l from-transparent to-gold/40" />
          </div>
          <p className="mb-8 text-center font-hand text-sm text-rose-deep md:text-base">
            {copy.tapToOpen}
          </p>

          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:gap-6 lg:gap-8">
            {LOOKS.map((src, i) => (
              <LookCard key={src} src={src} index={i} onOpen={handleOpen} />
            ))}
          </div>
        </motion.div>
      </div>

      <Lightbox
        open={open}
        index={openIndex ?? 0}
        total={LOOKS.length}
        onClose={handleClose}
        onPrev={handlePrev}
        onNext={handleNext}
        src={openIndex !== null ? LOOKS[openIndex] : LOOKS[0]}
      />
    </section>
  );
}
