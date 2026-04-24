"use client";

import { useEffect, useState } from "react";

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
    <div className="pointer-events-none fixed top-0 left-0 z-[60] h-[2px] w-full bg-transparent">
      <div
        className="h-full bg-gradient-to-r from-coral via-gold-light to-lavender transition-[width] duration-150"
        style={{ width: `${progress}%` }}
      />
    </div>
  );
}

export default function GlobalEffects() {
  return (
    <>
      <ScrollProgress />
    </>
  );
}
