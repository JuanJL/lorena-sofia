"use client";

import { motion, useMotionValue, useSpring } from "framer-motion";
import { useState } from "react";
import { GlossaryItem } from "@/lib/glossary";
import { useLanguage } from "@/context/LanguageContext";

interface Props {
  item: GlossaryItem;
  index: number;
  rotation: number;
}

export default function PolaroidCard({ item, index, rotation }: Props) {
  const { lang } = useLanguage();
  const data = item[lang];
  const [flipped, setFlipped] = useState(false);

  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotX = useSpring(useMotionValue(0), { stiffness: 200, damping: 20 });
  const rotY = useSpring(useMotionValue(0), { stiffness: 200, damping: 20 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width - 0.5;
    const py = (e.clientY - rect.top) / rect.height - 0.5;
    rotY.set(px * 14);
    rotX.set(-py * 14);
  };

  const handleMouseLeave = () => {
    rotX.set(0);
    rotY.set(0);
  };

  const tapeColors = [
    "washi-tape",
    "washi-tape washi-tape-gold",
  ];
  const tapeIdx = index % tapeColors.length;
  const tapeRot = (index * 37) % 18 - 9;

  return (
    <motion.div
      initial={{ opacity: 0, y: 40, rotate: rotation + 10 }}
      whileInView={{ opacity: 1, y: 0, rotate: rotation }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{
        duration: 0.7,
        delay: (index % 6) * 0.08,
        ease: [0.22, 1, 0.36, 1],
      }}
      drag
      dragElastic={0.15}
      dragTransition={{ bounceStiffness: 300, bounceDamping: 20 }}
      whileDrag={{ scale: 1.05, zIndex: 40, cursor: "grabbing" }}
      whileHover={{ y: -6, zIndex: 30 }}
      style={{
        x,
        y,
        rotateX: rotX,
        rotateY: rotY,
        transformStyle: "preserve-3d",
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={(e) => {
        // avoid flip while dragging
        if (Math.abs(x.get()) < 3 && Math.abs(y.get()) < 3) {
          setFlipped(!flipped);
        }
      }}
      className="group relative cursor-grab active:cursor-grabbing"
    >
      {/* Washi tape */}
      <div
        className={`${tapeColors[tapeIdx]} absolute -top-3 left-1/2 z-10`}
        style={{
          transform: `translateX(-50%) rotate(${tapeRot}deg)`,
          width: 60,
          height: 18,
        }}
      />

      <motion.div
        animate={{ rotateY: flipped ? 180 : 0 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        style={{ transformStyle: "preserve-3d" }}
        className="relative h-[280px] w-[200px] md:h-[320px] md:w-[230px]"
      >
        {/* Front */}
        <div
          className="polaroid-shadow polaroid-face absolute inset-0 rounded-sm bg-white p-3 pb-8"
          style={{ backfaceVisibility: "hidden" }}
        >
          <div className="flex h-full flex-col items-center justify-between overflow-hidden bg-gradient-to-br from-cream-dark via-paper to-rose-lighter rounded-sm">
            <div className="flex flex-1 items-center justify-center pt-6">
              <span className="text-7xl md:text-8xl drop-shadow-md">{item.emoji}</span>
            </div>
            <div className="mb-4 px-2 text-center">
              <p className="font-hand text-lg leading-tight text-warm-dark md:text-xl">
                {data.name}
              </p>
              <p className="mt-1 text-[9px] font-medium tracking-[0.3em] text-gold uppercase">
                {lang === "es" ? "Da la vuelta" : "Flip me"}
              </p>
            </div>
          </div>
        </div>

        {/* Back */}
        <div
          className="polaroid-shadow absolute inset-0 rounded-sm bg-paper p-5 pt-6"
          style={{
            backfaceVisibility: "hidden",
            transform: "rotateY(180deg)",
          }}
        >
          <div className="flex h-full flex-col">
            <div className="mb-2 flex items-center gap-2">
              <span className="text-2xl">{item.emoji}</span>
              <p className="font-heading text-sm text-warm-dark leading-tight">
                {data.name}
              </p>
            </div>
            <div className="h-px w-full bg-gold/40" />
            <p className="mt-3 text-xs leading-relaxed text-warm-gray md:text-[13px]">
              {data.description}
            </p>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
