"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import confetti from "canvas-confetti";
import { useLanguage } from "@/context/LanguageContext";
import ChapterHeader from "./ChapterHeader";

export default function AfterpartySection() {
  const { lang } = useLanguage();

  const copy =
    lang === "es"
      ? {
          number: "Tiempo Extra",
          title: "El Afterparty",
          subtitle: "para l@s fanátic@s del fútbol",
          intro:
            "Cuando la fiesta baje el ritmo, la noche apenas empieza. Nos vamos a ver el partido juntos.",
          matchLabel: "El partido",
          team1: "Colombia",
          team2: "Portugal",
          timeLabel: "Hora",
          time: "~ 2:00 AM",
          placeLabel: "Dónde",
          place: "Napols",
          why: "Apúntate aquí abajo para que sepamos cuántos somos y cuánto comprar para brindar. 🍻",
          nameLabel: "Tu nombre",
          notePlaceholder: "¿Algo que quieras decir? (opcional)",
          noteLabel: "Nota (opcional)",
          submit: "¡Sí, ahí estaré!",
          submitting: "Apuntándote…",
          successTitle: "¡Nos vemos en el afterparty!",
          successMsg:
            "Estás en la lista para ver Colombia vs Portugal. ¡Vamos esa tricolor! 🇨🇴",
          error: "Hubo un error. Por favor intenta de nuevo.",
        }
      : {
          number: "Extra Time",
          title: "The Afterparty",
          subtitle: "for the football fans",
          intro:
            "When the party winds down, the night is just getting started. We're heading out to watch the match together.",
          matchLabel: "The match",
          team1: "Colombia",
          team2: "Portugal",
          timeLabel: "Time",
          time: "~ 2:00 AM",
          placeLabel: "Where",
          place: "Napols",
          why: "Sign up below so we know how many we are and how much to buy for the toast. 🍻",
          nameLabel: "Your name",
          notePlaceholder: "Anything you'd like to say? (optional)",
          noteLabel: "Note (optional)",
          submit: "Yes, I'll be there!",
          submitting: "Signing up…",
          successTitle: "See you at the afterparty!",
          successMsg:
            "You're on the list to watch Colombia vs Portugal. ¡Vamos esa tricolor! 🇨🇴",
          error: "Something went wrong. Please try again.",
        };

  const [name, setName] = useState("");
  const [note, setNote] = useState("");
  const [status, setStatus] = useState<
    "idle" | "submitting" | "success" | "error"
  >("idle");

  const fireGoalConfetti = () => {
    // Colombian flag colors
    const colors = ["#FFCD00", "#003087", "#CE1126"];
    confetti({
      particleCount: 100,
      spread: 80,
      origin: { x: 0.5, y: 0.6 },
      colors,
      scalar: 1.05,
    });
    setTimeout(() => {
      confetti({
        particleCount: 50,
        angle: 60,
        spread: 55,
        origin: { x: 0, y: 0.7 },
        colors,
      });
      confetti({
        particleCount: 50,
        angle: 120,
        spread: 55,
        origin: { x: 1, y: 0.7 },
        colors,
      });
    }, 200);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const trimmedName = name.trim();
    if (!trimmedName) {
      // Surface native validation feedback instead of failing silently.
      (e.currentTarget as HTMLFormElement)
        .querySelector<HTMLInputElement>("input[required]")
        ?.focus();
      return;
    }
    setStatus("submitting");
    try {
      const res = await fetch("/api/afterparty", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: trimmedName, message: note.trim() }),
      });
      if (res.ok) {
        setStatus("success");
        fireGoalConfetti();
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };

  return (
    <section
      id="afterparty"
      className="relative overflow-hidden bg-gradient-to-b from-lavender-lighter/30 via-rose-lighter/20 to-cream px-6 py-32 md:py-40"
    >
      {/* Decorative blobs */}
      <div className="pointer-events-none absolute -top-24 right-0 h-72 w-72 rounded-full bg-lavender/20 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-24 -left-16 h-80 w-80 rounded-full bg-rose/15 blur-3xl" />

      <div className="relative z-10 mx-auto max-w-3xl">
        <ChapterHeader
          number={copy.number}
          title={copy.title}
          subtitle={copy.subtitle}
        />

        {/* Intro */}
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="mx-auto mt-12 max-w-xl text-center font-heading text-xl leading-relaxed text-warm-dark/85 italic md:text-2xl"
        >
          {copy.intro}
        </motion.p>

        {/* Match card */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="paper-texture polaroid-shadow relative mt-12 rounded-md border border-gold/30 p-8 md:p-10"
        >
          <div
            className="washi-tape washi-tape-gold absolute"
            style={{
              top: -10,
              left: "50%",
              transform: "translateX(-50%) rotate(-3deg)",
            }}
          />

          <div className="mb-6 flex items-center justify-center gap-3 text-xs font-semibold tracking-[0.3em] text-gold uppercase">
            <div className="h-px flex-1 bg-gold/30" />
            {copy.matchLabel}
            <div className="h-px flex-1 bg-gold/30" />
          </div>

          {/* Teams */}
          <div className="flex items-center justify-center gap-4 md:gap-8">
            <div className="flex flex-col items-center">
              <span className="text-4xl md:text-5xl">🇨🇴</span>
              <span className="mt-2 font-heading text-xl text-warm-dark md:text-2xl">
                {copy.team1}
              </span>
            </div>
            <span className="font-hand text-2xl text-rose-deep md:text-3xl">
              vs
            </span>
            <div className="flex flex-col items-center">
              <span className="text-4xl md:text-5xl">🇵🇹</span>
              <span className="mt-2 font-heading text-xl text-warm-dark md:text-2xl">
                {copy.team2}
              </span>
            </div>
          </div>

          {/* Time + place */}
          <div className="mt-8 grid grid-cols-2 gap-4 border-t border-gold/20 pt-6">
            <div className="text-center">
              <p className="text-[10px] font-medium tracking-[0.3em] text-gold uppercase">
                {copy.timeLabel}
              </p>
              <p className="mt-1 font-heading text-2xl text-warm-dark md:text-3xl">
                {copy.time}
              </p>
            </div>
            <div className="text-center">
              <p className="text-[10px] font-medium tracking-[0.3em] text-gold uppercase">
                {copy.placeLabel}
              </p>
              <p className="mt-1 font-heading text-2xl text-warm-dark md:text-3xl">
                {copy.place}
              </p>
            </div>
          </div>
        </motion.div>

        {/* Sign-up */}
        {status === "success" ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="polaroid-shadow mt-10 rounded-md border border-gold/30 bg-white/80 p-8 text-center md:p-10"
          >
            <div className="text-5xl">⚽</div>
            <h3 className="mt-3 font-heading text-2xl text-warm-dark md:text-3xl">
              {copy.successTitle}
            </h3>
            <p className="mt-3 font-hand text-xl text-rose-deep md:text-2xl">
              {copy.successMsg}
            </p>
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="mt-10"
          >
            <p className="mb-6 text-center font-hand text-lg text-warm-dark/80 md:text-xl">
              {copy.why}
            </p>

            <form
              onSubmit={handleSubmit}
              className="polaroid-shadow rounded-md border border-gold/20 bg-white/70 p-6 backdrop-blur-sm md:p-8"
            >
              <div className="grid gap-5 md:grid-cols-[1fr_1fr]">
                <div>
                  <label className="mb-1 block font-hand text-base text-rose-deep">
                    {copy.nameLabel} *
                  </label>
                  <input
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full border-b-2 border-warm-dark/30 bg-transparent px-1 py-2 font-hand text-xl text-ink focus:border-gold focus:outline-none md:text-2xl"
                    placeholder="________________"
                    aria-label={copy.nameLabel}
                  />
                </div>
                <div>
                  <label className="mb-1 block font-hand text-base text-rose-deep">
                    {copy.noteLabel}
                  </label>
                  <input
                    value={note}
                    onChange={(e) => setNote(e.target.value)}
                    className="w-full border-b border-warm-dark/30 bg-transparent px-1 py-2 text-warm-dark placeholder:text-warm-gray/40 focus:border-gold focus:outline-none"
                    placeholder={copy.notePlaceholder}
                    aria-label={copy.noteLabel}
                  />
                </div>
              </div>

              <div className="mt-6 flex items-center justify-center">
                <button
                  type="submit"
                  disabled={status === "submitting"}
                  className="group relative overflow-hidden rounded-full bg-gradient-to-r from-rose-deep to-gold px-8 py-3.5 font-heading text-sm font-semibold tracking-widest text-white uppercase shadow-lg transition-all hover:-translate-y-0.5 hover:shadow-xl disabled:opacity-60 md:px-10 md:py-4 md:text-base"
                >
                  <span className="relative z-10 flex items-center gap-2">
                    {status === "submitting" ? copy.submitting : copy.submit}
                    {status !== "submitting" && <span>⚽</span>}
                  </span>
                  <span className="absolute inset-0 bg-gradient-to-r from-gold to-rose-deep opacity-0 transition-opacity group-hover:opacity-100" />
                </button>
              </div>

              {status === "error" && (
                <p className="mt-4 text-center font-hand text-lg text-red-500">
                  {copy.error}
                </p>
              )}
            </form>
          </motion.div>
        )}
      </div>
    </section>
  );
}
