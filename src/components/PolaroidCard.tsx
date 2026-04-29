"use client";

import {
  motion,
  useMotionValue,
  useSpring,
  type PanInfo,
} from "framer-motion";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { GlossaryItem } from "@/lib/glossary";
import { useLanguage } from "@/context/LanguageContext";

interface Props {
  item: GlossaryItem;
  index: number;
  rotation: number;
}

// How far the user must drag before we consider it a real drag (and suppress
// the flip on release). Bigger = more forgiving on touch devices.
const DRAG_THRESHOLD_PX = 14;

export default function PolaroidCard({ item, index, rotation }: Props) {
  const { lang } = useLanguage();
  const data = item[lang];
  const [flipped, setFlipped] = useState(false);
  const [imageError, setImageError] = useState(false);
  const [isTouch, setIsTouch] = useState(false);

  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotX = useSpring(useMotionValue(0), { stiffness: 200, damping: 20 });
  const rotY = useSpring(useMotionValue(0), { stiffness: 200, damping: 20 });

  // Track whether the most recent pointer interaction was a real drag
  const wasDraggingRef = useRef(false);

  useEffect(() => {
    // Detect coarse pointer (touch) once on mount so we can disable the
    // mouse-driven 3D tilt — on touch it produces flicker without benefit.
    if (typeof window !== "undefined" && window.matchMedia) {
      setIsTouch(window.matchMedia("(pointer: coarse)").matches);
    }
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (isTouch) return;
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

  const handleDrag = (
    _: PointerEvent | MouseEvent | TouchEvent,
    info: PanInfo,
  ) => {
    if (
      Math.abs(info.offset.x) > DRAG_THRESHOLD_PX ||
      Math.abs(info.offset.y) > DRAG_THRESHOLD_PX
    ) {
      wasDraggingRef.current = true;
    }
  };

  const toggleFlip = () => setFlipped((prev) => !prev);

  const handleClick = () => {
    if (wasDraggingRef.current) {
      wasDraggingRef.current = false;
      return;
    }
    toggleFlip();
  };

  const tapeColors = ["washi-tape", "washi-tape washi-tape-gold"];
  const tapeIdx = index % tapeColors.length;
  const tapeRot = ((index * 37) % 18) - 9;

  const flipHint =
    lang === "es" ? "Toca para leer la historia" : "Tap to read the story";
  const closeHint = lang === "es" ? "Volver" : "Back";

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
          toggleFlip();
        }
      }}
      aria-label={`${data.name} — ${flipHint}`}
      aria-pressed={flipped}
      className="group relative cursor-pointer touch-none select-none active:cursor-grabbing"
    >
      {/* Washi tape */}
      <div
        className={`${tapeColors[tapeIdx]} pointer-events-none absolute -top-3 left-1/2 z-10`}
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
        className="pointer-events-none relative h-[300px] w-[210px] md:h-[340px] md:w-[240px]"
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

            {/* Click affordance — top-right corner, fades on hover */}
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

        {/* Back — the description card */}
        <div
          className="polaroid-shadow absolute inset-0 flex flex-col rounded-sm bg-paper p-5 pt-5"
          style={{
            backfaceVisibility: "hidden",
            transform: "rotateY(180deg)",
          }}
        >
          {/* Header */}
          <div className="mb-3 flex items-center gap-2">
            <span className="text-2xl">{item.emoji}</span>
            <p className="font-heading text-[17px] leading-tight font-medium text-warm-dark md:text-lg">
              {data.name}
            </p>
          </div>
          <div className="h-px w-full bg-gold/40" />

          {/* Description — bigger, scrollable if very long */}
          <div className="mt-3 flex-1 overflow-y-auto pr-1">
            <p className="text-[14px] leading-[1.55] text-warm-dark/90 md:text-[15px]">
              {data.description}
            </p>
          </div>

          {/* Back hint */}
          <div className="mt-3 flex items-center justify-center gap-1.5 border-t border-gold/20 pt-2">
            <svg
              width="12"
              height="12"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="text-gold-deep"
            >
              <path d="M3 12 L21 12 M9 6 L3 12 L9 18" />
            </svg>
            <p className="text-[10px] font-medium tracking-[0.2em] text-gold-deep uppercase">
              {closeHint}
            </p>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
