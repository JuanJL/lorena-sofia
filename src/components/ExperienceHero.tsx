"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import Image from "next/image";
import { useLanguage } from "@/context/LanguageContext";
import { translations } from "@/lib/translations";

export default function ExperienceHero() {
  const { lang, toggleLanguage } = useLanguage();
  const t = translations[lang].hero;
  const ref = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const bgScale = useTransform(scrollYProgress, [0, 1], [1.05, 1.2]);
  const bgY = useTransform(scrollYProgress, [0, 1], [0, 80]);
  const overlayOpacity = useTransform(scrollYProgress, [0, 0.9], [0, 0.8]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const contentY = useTransform(scrollYProgress, [0, 0.5], [0, -40]);

  const scrollToExperience = () => {
    document.getElementById("experience")?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  return (
    <section
      ref={ref}
      className="relative h-screen min-h-[700px] w-full overflow-hidden bg-ink"
    >
      {/* Background — abstract treatment of the poster (blurred & darkened so typography leads) */}
      <motion.div
        style={{ scale: bgScale, y: bgY }}
        className="absolute inset-0 h-full w-full"
      >
        <Image
          src="/poster.jpg"
          alt="Lorena Sofía"
          fill
          priority
          sizes="100vw"
          className="animate-breathe object-cover"
          style={{
            filter: "blur(14px) saturate(1.15) brightness(0.55)",
            transform: "scale(1.1)",
          }}
        />
      </motion.div>

      {/* Dark cinematic overlay + sunset tint */}
      <div className="pointer-events-none absolute inset-0 z-10 bg-gradient-to-b from-ink/70 via-plum/50 to-ink/80" />
      <div className="pointer-events-none absolute inset-0 z-10 bg-[radial-gradient(ellipse_at_center,_transparent_20%,_rgba(14,7,15,0.75)_100%)]" />

      {/* Ambient warm glow from below (sunset hint) */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 z-10 h-1/2 bg-gradient-to-t from-coral/25 via-coral/5 to-transparent" />

      {/* Bottom gradient fade for smooth transition into next section */}
      <motion.div
        style={{ opacity: overlayOpacity }}
        className="pointer-events-none absolute inset-x-0 bottom-0 z-10 h-1/3 bg-gradient-to-b from-transparent to-cream"
      />

      {/* Fixed language switcher */}
      <button
        onClick={toggleLanguage}
        className="absolute top-6 right-6 z-30 rounded-full border border-white/30 bg-white/10 px-4 py-1.5 text-xs font-medium tracking-[0.2em] text-white uppercase backdrop-blur-md transition-all hover:bg-white/20 hover:border-white/50"
      >
        {translations[lang].lang}
      </button>

      {/* Brand mark top left */}
      <div className="absolute top-6 left-6 z-30">
        <p className="font-heading text-sm tracking-[0.3em] text-white/80 uppercase">
          L · S
        </p>
        <p className="mt-1 text-[10px] tracking-[0.3em] text-white/50">
          27 · 06 · 26
        </p>
      </div>

      {/* Hero content */}
      <motion.div
        style={{ opacity: contentOpacity, y: contentY }}
        className="relative z-20 flex h-full flex-col items-center justify-center px-6 text-center"
      >
        {/* Eyebrow tagline */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.3 }}
          className="eyebrow text-shimmer-gold md:text-xs"
        >
          {t.tagline}
        </motion.p>

        {/* Ornament */}
        <motion.div
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="my-5"
        >
          <svg width="18" height="18" viewBox="0 0 20 20" className="text-gold-light">
            <path
              d="M10,1 L11.5,8.5 L19,10 L11.5,11.5 L10,19 L8.5,11.5 L1,10 L8.5,8.5 Z"
              fill="currentColor"
            />
          </svg>
        </motion.div>

        {/* Main title */}
        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="font-heading text-[clamp(2.5rem,10vw,7rem)] leading-[0.95] font-normal tracking-[0.02em] text-white"
          style={{ textShadow: "0 4px 30px rgba(0,0,0,0.4)" }}
        >
          LORENA
          <br />
          SOF&Iacute;A
        </motion.h1>

        {/* Gold divider */}
        <motion.div
          initial={{ opacity: 0, scaleX: 0 }}
          animate={{ opacity: 1, scaleX: 1 }}
          transition={{ duration: 1, delay: 1.1 }}
          className="my-8 flex items-center gap-4"
        >
          <div className="h-px w-16 bg-gradient-to-r from-transparent to-gold-light md:w-24" />
          <span className="text-gold-light">✦</span>
          <div className="h-px w-16 bg-gradient-to-l from-transparent to-gold-light md:w-24" />
        </motion.div>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1.3 }}
          className="max-w-xl text-base leading-relaxed text-white/85 italic md:text-lg"
          style={{ textShadow: "0 2px 12px rgba(0,0,0,0.5)" }}
        >
          {t.subtitle}
        </motion.p>

        {/* CTA Button */}
        <motion.button
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1.6 }}
          onClick={scrollToExperience}
          className="btn-luxe group mt-12 rounded-full px-8 py-4 md:px-10 md:py-5"
        >
          <span className="flex items-center gap-3">
            <span className="text-xs font-semibold tracking-[0.3em] text-white uppercase md:text-sm">
              {t.cta}
            </span>
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              className="text-gold-light transition-transform group-hover:translate-x-1"
            >
              <path
                d="M5 12H19M19 12L12 5M19 12L12 19"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </span>
        </motion.button>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 2 }}
        className="absolute bottom-8 left-1/2 z-20 -translate-x-1/2"
      >
        <div className="animate-bounce-gentle flex flex-col items-center gap-2">
          <p className="text-[10px] font-medium tracking-[0.4em] text-white/60 uppercase">
            {t.scroll}
          </p>
          <div className="h-10 w-[1px] bg-gradient-to-b from-white/60 to-transparent" />
        </div>
      </motion.div>
    </section>
  );
}
