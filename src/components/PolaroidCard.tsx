"use client";

import { motion, useMotionValue, useSpring, type PanInfo } from "framer-motion";
import { useRef, useState } from "react";
import Image from "next/image";
import { GlossaryItem } from "@/lib/glossary";
import { useLanguage } from "@/context/LanguageContext";

interface Props {
  item: GlossaryItem;
  index: number;
  rotation: number;
}

const DRAG_THRESHOLD_PX = 8;

export default function PolaroidCard({ item, index, rotation }: Props) {
  const { lang } = useLanguage();
  const data = item[lang];
  const [flipped, setFlipped] = useState(false);
  const [imageError, setImageError] = useState(false);

  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotX = useSpring(useMotionValue(0), { stiffness: 200, damping: 20 });
  const rotY = useSpring(useMotionValue(0), { stiffness: 200, damping: 20 });

  // Track whether the most recent pointer interaction was a real drag
  const wasDraggingRef = useRef(false);

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

  const handleDragStart = () => {
    wasDraggingRef.current = false;
  };

  const handleDrag = (_: PointerEvent | MouseEvent | TouchEvent, info: PanInfo) => {
    if (
      Math.abs(info.offset.x) > DRAG_THRESHOLD_PX ||
      Math.abs(info.offset.y) > DRAG_THRESHOLD_PX
    ) {
      wasDraggingRef.current = true;
    }
  };

  const handleClick = () => {
    if (wasDraggingRef.current) {
      // user was dragging — don't flip
      wasDraggingRef.current = false;
      return;
    }
    setFlipped((prev) => !prev);
  };

  const tapeColors = ["washi-tape", "washi-tape washi-tape-gold"];
  const tapeIdx = index % tapeColors.length;
  const tapeRot = ((index * 37) % 18) - 9;

  const flipHint =
    lang === "es" ? "Toca para leer la historia" : "Tap to read the story";

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
      dragSnapToOrigin
      dragTransition={{ bounceStiffness: 280, bounceDamping: 22 }}
      whileDrag={{ scale: 1.05, zIndex: 40, cursor: "grabbing" }}
      whileHover={{ y: -6, zIndex: 30 }}
      onDragStart={handleDragStart}
      onDrag={handleDrag}
      style={{
        x,
        y,
        rotateX: rotX,
        rotateY: rotY,
        transformStyle: "preserve-3d",
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={handleClick}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          setFlipped((prev) => !prev);
        }
      }}
      aria-label={`${data.name} — ${flipHint}`}
      aria-pressed={flipped}
      className="group relative cursor-pointer touch-none select-none active:cursor-grabbing"
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
        className="relative h-[300px] w-[210px] md:h-[340px] md:w-[240px]"
      >
        {/* Front */}
        <div
          className="polaroid-shadow polaroid-face absolute inset-0 rounded-sm bg-white p-3 pb-8"
          style={{ backfaceVisibility: "hidden" }}
        >
          <div className="flex h-full flex-col items-center justify-between overflow-hidden rounded-sm bg-gradient-to-br from-cream-dark via-paper to-rose-lighter">
            <div className="relative flex w-full flex-1 items-center justify-center overflow-hidden">
              {imageError ? (
                <span className="text-7xl drop-shadow-md md:text-8xl">
                  {item.emoji}
                </span>
              ) : (
                <Image
                  src={item.image}
                  alt={data.name}
                  fill
                  sizes="(max-width: 768px) 210px, 240px"
                  className="glossary-photo object-cover"
                  onError={() => setImageError(true)}
                />
              )}
              {/* Soft warm overlay to unify the photos */}
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-paper/40 mix-blend-multiply" />
            </div>
            <div className="z-10 mt-2 mb-4 w-full bg-white/90 px-2 pt-2 text-center backdrop-blur-sm">
              <p className="font-hand text-lg leading-tight text-warm-dark md:text-xl">
                {data.name}
              </p>
            </div>

            {/* Click affordance — top-right corner */}
            <div
              className="pointer-events-none absolute top-2 right-2 z-20 flex h-7 w-7 items-center justify-center rounded-full bg-white/90 text-gold-deep shadow-sm ring-1 ring-gold/40 backdrop-blur-sm transition-opacity duration-300 group-hover:opacity-0"
              aria-hidden="true"
            >
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.7"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M9 11.5 L9 4 a1.5 1.5 0 0 1 3 0 L12 12 L13 9 a1.5 1.5 0 0 1 3 0 L16 13 L17 11 a1.5 1.5 0 0 1 3 0 L20 14 a6 6 0 0 1 -10 4 L7 14 a1.5 1.5 0 0 1 2 -2 z" />
              </svg>
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
            <div className="mb-3 flex items-center gap-2">
              <span className="text-2xl">{item.emoji}</span>
              <p className="font-heading text-base leading-tight text-warm-dark md:text-lg">
                {data.name}
              </p>
            </div>
            <div className="h-px w-full bg-gold/40" />
            <p className="mt-3 overflow-y-auto text-sm leading-relaxed text-warm-dark/85 md:text-[15px]">
              {data.description}
            </p>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
