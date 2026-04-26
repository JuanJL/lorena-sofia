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
          hint: "Toca para voltear \u00B7 Arrastra para mover",
        }
      : {
          number: "Chapter IV",
          title: "Lorena's World",
          subtitle: "a magical board of Colombian roots",
          hint: "Tap to flip \u00B7 Drag to move",
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

        <p className="mt-6 text-center font-hand text-lg text-rose-deep md:text-xl">
          {copy.hint}
        </p>

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
