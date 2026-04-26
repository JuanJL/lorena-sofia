"use client";

import { useLanguage } from "@/context/LanguageContext";
import ChapterHeader from "./ChapterHeader";
import PolaroidCard from "./PolaroidCard";
import { glossaryItems } from "@/lib/glossary";

export default function Chapter4Glossary() {
  const { lang } = useLanguage();
  const copy =
    lang === "es"
      ? {
          number: "Cap\u00EDtulo IV",
          title: "El Mundo de Lorena",
          subtitle:
            "un tablero m\u00E1gico de ra\u00EDces colombianas",
          hint:
            "Haz clic en cualquier foto para descubrir su historia",
          subhint: "Tambi\u00E9n puedes arrastrarlas por el tablero",
        }
      : {
          number: "Chapter IV",
          title: "Lorena's World",
          subtitle: "a magical board of Colombian roots",
          hint: "Click any photo to discover its story",
          subhint: "You can also drag them around the board",
        };

  // Deterministic pseudo-random rotation for each item
  const rotations = glossaryItems.map((_, i) => {
    const seed = (i * 73 + 31) % 100;
    return (seed / 100) * 10 - 5; // -5 to +5 deg
  });

  return (
    <section
      id="chapter-4"
      className="relative overflow-hidden bg-gradient-to-b from-lavender-lighter/20 via-peach-light/20 to-cream px-4 py-32 md:py-40"
    >
      {/* Corkboard-like texture hint */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.07]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9'/%3E%3C/filter%3E%3Crect width='40' height='40' filter='url(%23n)' opacity='0.5'/%3E%3C/svg%3E")`,
        }}
      />

      <div className="relative z-10 mx-auto max-w-7xl">
        <ChapterHeader
          number={copy.number}
          title={copy.title}
          subtitle={copy.subtitle}
        />

        <div className="mt-8 flex flex-col items-center gap-2">
          <div className="inline-flex items-center gap-2 rounded-full border border-gold/40 bg-white/60 px-4 py-2 backdrop-blur-sm">
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.7"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="text-gold-deep"
            >
              <path d="M9 11.5 L9 4 a1.5 1.5 0 0 1 3 0 L12 12 L13 9 a1.5 1.5 0 0 1 3 0 L16 13 L17 11 a1.5 1.5 0 0 1 3 0 L20 14 a6 6 0 0 1 -10 4 L7 14 a1.5 1.5 0 0 1 2 -2 z" />
            </svg>
            <p className="font-hand text-base text-rose-deep md:text-lg">
              {copy.hint}
            </p>
          </div>
          <p className="text-xs tracking-wider text-warm-gray italic md:text-sm">
            {copy.subhint}
          </p>
        </div>

        {/* Polaroid grid */}
        <div className="mt-16 grid grid-cols-2 place-items-center gap-6 sm:grid-cols-3 md:gap-10 lg:grid-cols-4 lg:gap-12 xl:grid-cols-5">
          {glossaryItems.map((item, i) => (
            <PolaroidCard
              key={item.id}
              item={item}
              index={i}
              rotation={rotations[i]}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
