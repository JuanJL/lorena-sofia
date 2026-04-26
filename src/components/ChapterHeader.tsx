"use client";

import { motion } from "framer-motion";

interface Props {
  number: string;
  title: string;
  subtitle?: string;
}

export default function ChapterHeader({ number, title, subtitle }: Props) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.4 }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      className="text-center"
    >
      <p className="mb-3 font-hand text-lg text-gold md:text-xl">
        — {number} —
      </p>
      <h2 className="font-heading text-4xl font-light tracking-wide text-warm-dark md:text-5xl lg:text-6xl">
        {title}
      </h2>
      {subtitle && (
        <p className="mt-4 font-hand text-xl text-rose-deep italic md:text-2xl">
          {subtitle}
        </p>
      )}
      <div className="mx-auto mt-6 flex items-center justify-center gap-3">
        <div className="h-px w-16 bg-gradient-to-r from-transparent to-gold/50" />
        <span className="text-gold text-sm">✦</span>
        <div className="h-px w-16 bg-gradient-to-l from-transparent to-gold/50" />
      </div>
    </motion.div>
  );
}
