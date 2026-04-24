"use client";

import { motion } from "framer-motion";
import { useLanguage } from "@/context/LanguageContext";
import { translations } from "@/lib/translations";

export default function ExperienceSection() {
  const { lang } = useLanguage();
  const t = translations[lang].experience;

  return (
    <section
      id="experience"
      className="noise-overlay relative overflow-hidden bg-cream px-6 py-28 md:py-40"
    >
      {/* Decorative gradient blurs */}
      <div className="pointer-events-none absolute -top-40 left-1/2 h-96 w-96 -translate-x-1/2 rounded-full bg-rose/20 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-20 right-0 h-80 w-80 rounded-full bg-peach/30 blur-3xl" />

      <div className="relative z-10 mx-auto max-w-3xl text-center">
        {/* Eyebrow */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ duration: 0.8 }}
          className="eyebrow text-gold"
        >
          {t.eyebrow}
        </motion.p>

        {/* Ornament */}
        <motion.div
          initial={{ opacity: 0, scale: 0 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="my-6 flex items-center justify-center gap-3"
        >
          <div className="h-px w-16 bg-gradient-to-r from-transparent to-gold/40" />
          <svg width="10" height="10" viewBox="0 0 20 20" className="text-gold">
            <path
              d="M10,1 L11.5,8.5 L19,10 L11.5,11.5 L10,19 L8.5,11.5 L1,10 L8.5,8.5 Z"
              fill="currentColor"
            />
          </svg>
          <div className="h-px w-16 bg-gradient-to-l from-transparent to-gold/40" />
        </motion.div>

        {/* Poetic lines */}
        <div className="space-y-6 md:space-y-8">
          {[t.line1, t.line2, t.line3].map((line, i) => (
            <motion.p
              key={i}
              initial={{ opacity: 0, y: 20, filter: "blur(4px)" }}
              whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{
                duration: 1.2,
                delay: 0.2 + i * 0.4,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="font-heading text-xl leading-relaxed font-light text-warm-dark md:text-3xl lg:text-[2rem] lg:leading-[1.4]"
            >
              {line}
            </motion.p>
          ))}
        </div>

        {/* Bottom ornament */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 1.8 }}
          className="mx-auto mt-16 h-16 w-px bg-gradient-to-b from-gold/50 to-transparent"
        />
      </div>
    </section>
  );
}
