"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import confetti from "canvas-confetti";
import { useLanguage } from "@/context/LanguageContext";

export default function Chapter6Epilogue() {
  const { lang } = useLanguage();
  const [sombreroClicks, setSombreroClicks] = useState(0);
  const [secretUnlocked, setSecretUnlocked] = useState(false);

  const copy =
    lang === "es"
      ? {
          number: "Cap\u00EDtulo VI",
          title: "Hasta pronto",
          line1: "Y as\u00ED termina este cap\u00EDtulo\u2026",
          line2: "pero el cuento",
          line3: "apenas comienza.",
          signature: "Lorena Sof\u00EDa",
          date: "27 \u00B7 06 \u00B7 26",
          madeWith: "Hecho con",
          forThe: "para celebrar el cumplea\u00F1os de",
          hint: "psst\u2026 prueba el c\u00F3digo konami \u2191\u2191\u2193\u2193\u2190\u2192\u2190\u2192 B A",
          secretUnlocked: "\u00A1Has encontrado el secreto del sombrero!",
        }
      : {
          number: "Chapter VI",
          title: "See you soon",
          line1: "And so ends this chapter\u2026",
          line2: "but the tale",
          line3: "is just beginning.",
          signature: "Lorena Sof\u00EDa",
          date: "27 \u00B7 06 \u00B7 26",
          madeWith: "Made with",
          forThe: "to celebrate the birthday of",
          hint: "psst\u2026 try the konami code \u2191\u2191\u2193\u2193\u2190\u2192\u2190\u2192 B A",
          secretUnlocked: "You found the sombrero secret!",
        };

  const handleSombrero = () => {
    const newClicks = sombreroClicks + 1;
    setSombreroClicks(newClicks);
    if (newClicks === 5) {
      setSecretUnlocked(true);
      confetti({
        particleCount: 80,
        spread: 90,
        origin: { x: 0.5, y: 0.7 },
        colors: ["#FFCD00", "#003087", "#CE1126", "#E8B4B8", "#C5A55A"],
      });
    }
  };

  return (
    <footer className="relative overflow-hidden bg-ink px-6 py-24">
      {/* Dark paper texture */}
      <div
        className="pointer-events-none absolute inset-0 opacity-20"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9'/%3E%3C/filter%3E%3Crect width='100' height='100' filter='url(%23n)' opacity='0.4'/%3E%3C/svg%3E")`,
        }}
      />

      <div className="relative z-10 mx-auto max-w-2xl text-center">
        {/* Chapter number */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="font-hand text-lg text-gold md:text-xl"
        >
          — {copy.number} —
        </motion.p>

        {/* Title */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="mt-3 font-heading text-4xl font-light text-cream md:text-5xl"
        >
          {copy.title}
        </motion.h2>

        {/* Gold divider */}
        <div className="mx-auto mt-6 flex items-center justify-center gap-3">
          <div className="h-px w-16 bg-gradient-to-r from-transparent to-gold/60" />
          <span className="text-gold">✦</span>
          <div className="h-px w-16 bg-gradient-to-l from-transparent to-gold/60" />
        </div>

        {/* Poetic closing */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.3 }}
          className="mt-10 space-y-2"
        >
          <p className="font-hand text-xl text-cream/80 italic md:text-2xl">
            {copy.line1}
          </p>
          <p className="font-hand text-xl text-cream/80 italic md:text-2xl">
            {copy.line2}
          </p>
          <p className="font-hand text-2xl text-gold italic md:text-3xl">
            {copy.line3}
          </p>
        </motion.div>

        {/* Interactive Sombrero easter egg */}
        <motion.button
          onClick={handleSombrero}
          whileTap={{ scale: 0.9 }}
          animate={
            secretUnlocked
              ? { rotate: [0, 360, 720], scale: [1, 1.3, 1] }
              : {}
          }
          transition={{ duration: 1 }}
          className="mt-12 text-6xl transition-transform hover:scale-110 cursor-pointer select-none"
          title="🎩"
          aria-label="Sombrero"
        >
          🎩
        </motion.button>

        {secretUnlocked && (
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-3 font-hand text-lg text-gold"
          >
            ✨ {copy.secretUnlocked} ✨
          </motion.p>
        )}

        {/* Signature */}
        <div className="mt-16">
          <div className="mx-auto mb-4 flex items-center justify-center gap-3">
            <div className="h-px w-10 bg-gold/40" />
            <span className="text-gold text-xs">✦</span>
            <div className="h-px w-10 bg-gold/40" />
          </div>
          <p className="font-heading text-2xl text-cream md:text-3xl">
            {copy.signature}
          </p>
          <p className="mt-1 font-hand text-lg text-gold">{copy.date}</p>
        </div>

        {/* Tiny footer text */}
        <p className="mt-12 text-xs text-cream/40">
          {copy.madeWith} ❤️ {copy.forThe}{" "}
          <span className="text-cream/60">Lorena Sofía</span>
        </p>

        <p className="mt-2 text-[10px] text-cream/25 italic">{copy.hint}</p>
      </div>
    </footer>
  );
}
