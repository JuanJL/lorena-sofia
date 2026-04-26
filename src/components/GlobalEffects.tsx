"use client";

import { useEffect, useState } from "react";
import confetti from "canvas-confetti";

const PETAL_GLYPHS = ["\u2740", "\u273F", "\u2736", "\u2740", "\u2737"];
const PETAL_COLORS = [
  "#E8B4B8",
  "#C8A8D8",
  "#F0C8B0",
  "#E89D7A",
  "#D4BC7C",
];

interface Petal {
  id: number;
  left: number;
  size: number;
  duration: number;
  delay: number;
  driftX: number;
  rot: number;
  glyph: string;
  color: string;
}

function BougainvilleaPetals() {
  const [petals, setPetals] = useState<Petal[]>([]);

  useEffect(() => {
    const count = 14;
    const arr: Petal[] = Array.from({ length: count }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      size: 12 + Math.random() * 18,
      duration: 12 + Math.random() * 18,
      delay: Math.random() * -20,
      driftX: (Math.random() - 0.5) * 300,
      rot: (Math.random() - 0.5) * 720,
      glyph: PETAL_GLYPHS[Math.floor(Math.random() * PETAL_GLYPHS.length)],
      color: PETAL_COLORS[Math.floor(Math.random() * PETAL_COLORS.length)],
    }));
    setPetals(arr);
  }, []);

  return (
    <div className="pointer-events-none fixed inset-0 z-[5] overflow-hidden">
      {petals.map((p) => (
        <span
          key={p.id}
          className="petal"
          style={
            {
              left: `${p.left}%`,
              top: "-5%",
              "--petal-size": `${p.size}px`,
              "--drift-duration": `${p.duration}s`,
              "--drift-delay": `${p.delay}s`,
              "--drift-x": `${p.driftX}px`,
              "--drift-rot": `${p.rot}deg`,
              color: p.color,
            } as React.CSSProperties
          }
        >
          {p.glyph}
        </span>
      ))}
    </div>
  );
}

function CursorTrail() {
  useEffect(() => {
    if (window.matchMedia("(pointer: coarse)").matches) return;

    const trail: HTMLSpanElement[] = [];
    const maxTrail = 8;

    const handleMove = (e: MouseEvent) => {
      const el = document.createElement("span");
      el.className = "petal-cursor";
      el.style.left = `${e.clientX - 6}px`;
      el.style.top = `${e.clientY - 6}px`;
      el.style.transform = `scale(${0.5 + Math.random() * 0.5})`;
      document.body.appendChild(el);
      trail.push(el);

      setTimeout(() => {
        el.style.opacity = "0";
        el.style.transform = "scale(0)";
      }, 100);
      setTimeout(() => el.remove(), 600);

      if (trail.length > maxTrail) {
        const old = trail.shift();
        old?.remove();
      }
    };

    window.addEventListener("mousemove", handleMove);
    return () => {
      window.removeEventListener("mousemove", handleMove);
      trail.forEach((t) => t.remove());
    };
  }, []);

  return null;
}

function KonamiCode() {
  useEffect(() => {
    const sequence = [
      "ArrowUp", "ArrowUp",
      "ArrowDown", "ArrowDown",
      "ArrowLeft", "ArrowRight",
      "ArrowLeft", "ArrowRight",
      "b", "a",
    ];
    let pos = 0;

    const handleKey = (e: KeyboardEvent) => {
      const key = e.key;
      if (key === sequence[pos]) {
        pos++;
        if (pos === sequence.length) {
          triggerCarnival();
          pos = 0;
        }
      } else {
        pos = 0;
      }
    };

    const triggerCarnival = () => {
      document.body.classList.add("carnival-mode");
      setTimeout(() => document.body.classList.remove("carnival-mode"), 5000);

      const colors = ["#FFCD00", "#003087", "#CE1126", "#E8B4B8", "#C8A8D8"];
      const duration = 4000;
      const end = Date.now() + duration;

      (function frame() {
        confetti({
          particleCount: 6,
          angle: 60,
          spread: 55,
          origin: { x: 0, y: 0.8 },
          colors,
        });
        confetti({
          particleCount: 6,
          angle: 120,
          spread: 55,
          origin: { x: 1, y: 0.8 },
          colors,
        });
        if (Date.now() < end) requestAnimationFrame(frame);
      })();
    };

    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, []);

  return null;
}

function ScrollProgress() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const handle = () => {
      const scrollTop = window.scrollY;
      const docHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      setProgress(docHeight > 0 ? (scrollTop / docHeight) * 100 : 0);
    };
    window.addEventListener("scroll", handle, { passive: true });
    handle();
    return () => window.removeEventListener("scroll", handle);
  }, []);

  return (
    <div className="pointer-events-none fixed top-0 left-0 z-[60] h-[3px] w-full bg-transparent">
      <div
        className="h-full bg-gradient-to-r from-rose-deep via-gold to-lavender transition-[width] duration-100"
        style={{ width: `${progress}%` }}
      />
    </div>
  );
}

export default function GlobalEffects() {
  return (
    <>
      <BougainvilleaPetals />
      <CursorTrail />
      <KonamiCode />
      <ScrollProgress />
    </>
  );
}
