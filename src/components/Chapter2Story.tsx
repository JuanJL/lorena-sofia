"use client";

import { motion } from "framer-motion";
import { useLanguage } from "@/context/LanguageContext";
import ChapterHeader from "./ChapterHeader";

export default function Chapter2Story() {
  const { lang } = useLanguage();
  const copy =
    lang === "es"
      ? {
          number: "Cap\u00EDtulo II",
          title: "La Historia",
          subtitle: "lo que el coraz\u00F3n quiere decir",
          lines: [
            "Un d\u00EDa para celebrar",
            "todo lo vivido,",
            "todo lo que somos",
            "y todo lo que est\u00E1 por venir.",
            "",
            "Ritmo, ra\u00EDces y alegr\u00EDa",
            "se encuentran para dar inicio",
            "a lo extraordinario.",
          ],
          signature: "\u2014 Lorena Sof\u00EDa",
        }
      : {
          number: "Chapter II",
          title: "The Tale",
          subtitle: "what the heart wants to say",
          lines: [
            "A day to celebrate",
            "everything we\u2019ve lived,",
            "everything we are",
            "and everything that\u2019s yet to come.",
            "",
            "Rhythm, roots, and joy",
            "come together to mark the beginning",
            "of something extraordinary.",
          ],
          signature: "\u2014 Lorena Sof\u00EDa",
        };

  return (
    <section
      id="chapter-2"
      className="relative overflow-hidden bg-gradient-to-b from-paper via-cream to-rose-lighter/30 px-6 py-32 md:py-40"
    >
      {/* Decorative corner flourish */}
      <svg
        className="absolute top-10 left-10 h-16 w-16 text-gold/40 md:h-24 md:w-24"
        viewBox="0 0 100 100"
        fill="none"
      >
        <path
          d="M10,50 Q10,10 50,10 M20,50 Q20,20 50,20"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
        <circle cx="12" cy="12" r="3" fill="currentColor" />
      </svg>
      <svg
        className="absolute right-10 bottom-10 h-16 w-16 rotate-180 text-gold/40 md:h-24 md:w-24"
        viewBox="0 0 100 100"
        fill="none"
      >
        <path
          d="M10,50 Q10,10 50,10 M20,50 Q20,20 50,20"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
        <circle cx="12" cy="12" r="3" fill="currentColor" />
      </svg>

      <div className="mx-auto max-w-2xl">
        <ChapterHeader
          number={copy.number}
          title={copy.title}
          subtitle={copy.subtitle}
        />

        {/* Paper scroll with lines revealing one by one */}
        <div className="relative mt-16">
          <div className="paper-texture polaroid-shadow mx-auto rounded-sm border border-gold/20 p-8 md:p-14">
            {/* Ornament */}
            <div className="mb-8 flex items-center justify-center gap-3">
              <div className="h-px w-12 bg-gold/30" />
              <svg width="14" height="14" viewBox="0 0 20 20" className="text-gold">
                <path
                  d="M10,1 L11.5,8.5 L19,10 L11.5,11.5 L10,19 L8.5,11.5 L1,10 L8.5,8.5 Z"
                  fill="currentColor"
                />
              </svg>
              <div className="h-px w-12 bg-gold/30" />
            </div>

            <div className="space-y-3">
              {copy.lines.map((line, i) => (
                <motion.p
                  key={i}
                  initial={{ opacity: 0, y: 12, filter: "blur(4px)" }}
                  whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{
                    duration: 0.8,
                    delay: 0.2 + i * 0.35,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  className={`text-center font-heading leading-relaxed italic ${
                    line === ""
                      ? "h-4"
                      : "text-xl text-ink md:text-2xl"
                  }`}
                >
                  {line || "\u00A0"}
                </motion.p>
              ))}
            </div>

            {/* Signature */}
            <motion.p
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: 3.5 }}
              className="mt-10 text-right font-hand text-2xl text-rose-deep md:text-3xl"
            >
              {copy.signature}
            </motion.p>

            {/* Bottom ornament */}
            <div className="mt-6 flex items-center justify-center gap-3">
              <div className="h-px w-12 bg-gold/30" />
              <svg width="10" height="10" viewBox="0 0 20 20" className="text-gold">
                <path
                  d="M10,1 L11.5,8.5 L19,10 L11.5,11.5 L10,19 L8.5,11.5 L1,10 L8.5,8.5 Z"
                  fill="currentColor"
                />
              </svg>
              <div className="h-px w-12 bg-gold/30" />
            </div>
          </div>

          {/* Washi tape corners */}
          <div
            className="washi-tape absolute"
            style={{ top: -12, left: "20%", transform: "rotate(-12deg)" }}
          />
          <div
            className="washi-tape washi-tape-gold absolute"
            style={{ top: -12, right: "20%", transform: "rotate(10deg)" }}
          />
        </div>
      </div>
    </section>
  );
}
