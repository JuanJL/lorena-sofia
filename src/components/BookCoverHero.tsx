"use client";

import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { useLanguage } from "@/context/LanguageContext";
import { translations } from "@/lib/translations";

export default function BookCoverHero() {
  const { lang, toggleLanguage } = useLanguage();
  const ref = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const posterScale = useTransform(scrollYProgress, [0, 1], [1, 1.1]);
  const posterY = useTransform(scrollYProgress, [0, 1], [0, -80]);
  const overlayOpacity = useTransform(scrollYProgress, [0, 0.8], [0, 0.85]);
  const textOpacity = useTransform(scrollYProgress, [0, 0.4], [1, 0]);
  const hintOpacity = useTransform(scrollYProgress, [0, 0.15], [1, 0]);

  const copy = lang === "es" ? "Abre el cuento" : "Open the tale";

  return (
    <section
      ref={ref}
      className="relative h-screen w-full overflow-hidden bg-ink"
    >
      {/* Poster with subtle parallax */}
      <motion.div
        style={{ scale: posterScale, y: posterY }}
        className="absolute inset-0 h-full w-full"
      >
        <Image
          src="/poster.jpg"
          alt="Lorena Sof\u00EDa - Save the Date"
          fill
          priority
          sizes="100vw"
          className="object-cover animate-breathe"
        />
      </motion.div>

      {/* Cream overlay that builds on scroll for transition into next chapter */}
      <motion.div
        style={{ opacity: overlayOpacity }}
        className="pointer-events-none absolute inset-0 bg-cream z-10"
      />

      {/* Vignette */}
      <div className="pointer-events-none absolute inset-0 z-[11] bg-[radial-gradient(ellipse_at_center,_transparent_40%,_rgba(42,31,28,0.35)_100%)]" />

      {/* Language Switcher */}
      <motion.button
        style={{ opacity: textOpacity }}
        onClick={toggleLanguage}
        className="absolute top-6 right-6 z-30 rounded-full border border-white/50 bg-white/15 px-4 py-1.5 text-xs font-semibold tracking-widest text-white uppercase backdrop-blur-md transition-all hover:bg-white/25 hover:scale-105"
      >
        {translations[lang].langSwitch}
      </motion.button>

      {/* "Open the tale" hint at the bottom */}
      <motion.div
        style={{ opacity: hintOpacity }}
        className="absolute bottom-10 left-1/2 z-30 -translate-x-1/2 text-center"
      >
        <div className="animate-bounce-gentle flex flex-col items-center gap-2">
          <p
            className="font-hand text-lg text-white md:text-xl"
            style={{ textShadow: "0 1px 8px rgba(0,0,0,0.4)" }}
          >
            {copy}
          </p>
          <svg
            width="20"
            height="14"
            viewBox="0 0 20 14"
            className="text-white/80"
          >
            <path
              d="M1,1 L10,12 L19,1"
              stroke="currentColor"
              strokeWidth="1.5"
              fill="none"
              strokeLinecap="round"
            />
          </svg>
        </div>
      </motion.div>
    </section>
  );
}
