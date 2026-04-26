"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import confetti from "canvas-confetti";
import { useLanguage } from "@/context/LanguageContext";
import ChapterHeader from "./ChapterHeader";

export default function Chapter5RSVP() {
  const { lang } = useLanguage();

  const copy =
    lang === "es"
      ? {
          number: "Cap\u00EDtulo V",
          title: "\u00BFVienes?",
          subtitle: "el cuento te necesita",
          salutation: "Querida amistad,",
          letter:
            "Si este cuento te ha encontrado es porque est\u00E1s destinad@ a ser parte de \u00E9l. Firma abajo y h\u00E1zmelo saber\u2026",
          yours: "Con cari\u00F1o,",
          signedBy: "Lorena Sof\u00EDa",
          nameLabel: "Tu nombre",
          emailLabel: "Tu email (opcional)",
          guestsLabel: "Invitados",
          attendanceLabel: "\u00BFNos acompa\u00F1as?",
          yes: "\u00A1S\u00ED, all\u00ED estar\u00E9!",
          maybe: "Tal vez",
          no: "No podr\u00E9",
          messageLabel: "Una nota para el cuento (opcional)",
          messagePlaceholder: "Un deseo, un recuerdo, un abrazo\u2026",
          submit: "Firmar y enviar",
          submitting: "Enviando\u2026",
          successTitle: "\u00A1NOS VEMOS EN BARCELONA!",
          successMsg:
            "Tu firma ha entrado al cuento. Guarda el 27.06.26 y prep\u00E1rate para bailar.",
          guestUnit: (n: number) =>
            n === 1 ? "1 persona" : `${n} personas`,
        }
      : {
          number: "Chapter V",
          title: "Will you come?",
          subtitle: "the tale needs you",
          salutation: "Dear friend,",
          letter:
            "If this tale has found you, it\u2019s because you\u2019re meant to be part of it. Sign below and let me know\u2026",
          yours: "With love,",
          signedBy: "Lorena Sof\u00EDa",
          nameLabel: "Your name",
          emailLabel: "Your email (optional)",
          guestsLabel: "Guests",
          attendanceLabel: "Joining us?",
          yes: "Yes, I\u2019ll be there!",
          maybe: "Maybe",
          no: "Can\u2019t make it",
          messageLabel: "A note for the tale (optional)",
          messagePlaceholder: "A wish, a memory, a hug\u2026",
          submit: "Sign and send",
          submitting: "Sending\u2026",
          successTitle: "SEE YOU IN BARCELONA!",
          successMsg:
            "Your signature is in the tale. Mark 27.06.26 and get ready to dance.",
          guestUnit: (n: number) =>
            n === 1 ? "1 person" : `${n} people`,
        };

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    attendance: "",
    message: "",
  });
  const [status, setStatus] = useState<
    "idle" | "submitting" | "success" | "error"
  >("idle");

  const fireCarnivalConfetti = () => {
    // Colombian flag colors + pastel carnival
    const colors = [
      "#FFCD00",
      "#003087",
      "#CE1126",
      "#E8B4B8",
      "#C8A8D8",
      "#F0C8B0",
      "#C5A55A",
    ];

    // Burst from center
    confetti({
      particleCount: 120,
      spread: 90,
      origin: { x: 0.5, y: 0.55 },
      colors,
      scalar: 1.1,
    });

    // Sides
    setTimeout(() => {
      confetti({
        particleCount: 60,
        angle: 60,
        spread: 55,
        origin: { x: 0, y: 0.6 },
        colors,
      });
      confetti({
        particleCount: 60,
        angle: 120,
        spread: 55,
        origin: { x: 1, y: 0.6 },
        colors,
      });
    }, 200);

    // Emoji cannon — monocuco / carnival
    const emojis = ["\uD83C\uDF89", "\u2740", "\u2728", "\uD83C\uDF38"];
    setTimeout(() => {
      emojis.forEach((_, i) => {
        setTimeout(() => {
          confetti({
            particleCount: 30,
            spread: 100,
            origin: { x: 0.5, y: 0.5 },
            colors,
            startVelocity: 35,
            gravity: 0.8,
            scalar: 0.9,
          });
        }, i * 150);
      });
    }, 400);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("submitting");
    try {
      const res = await fetch("/api/rsvp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          guests: 1,
          attendance: formData.attendance,
          message: formData.message,
        }),
      });
      if (res.ok) {
        setStatus("success");
        if (formData.attendance === "yes") {
          fireCarnivalConfetti();
        }
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };

  if (status === "success") {
    return (
      <section
        id="chapter-5"
        className="paper-texture relative overflow-hidden px-6 py-32 md:py-40"
      >
        <div className="mx-auto max-w-2xl">
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="polaroid-shadow relative rounded-md border border-gold/30 bg-white/80 p-10 text-center md:p-14"
          >
            <div
              className="washi-tape washi-tape-gold absolute"
              style={{
                top: -10,
                left: "50%",
                transform: "translateX(-50%) rotate(-4deg)",
              }}
            />
            <div className="text-6xl">✨</div>
            <h3 className="mt-4 font-heading text-3xl leading-tight text-warm-dark md:text-5xl">
              {copy.successTitle}
            </h3>
            <div className="my-6 flex items-center justify-center gap-3">
              <div className="h-px w-12 bg-gold/40" />
              <span className="text-gold">✦</span>
              <div className="h-px w-12 bg-gold/40" />
            </div>
            <p className="font-hand text-xl text-rose-deep md:text-2xl">
              {copy.successMsg}
            </p>
            <div className="mt-8 text-5xl">🎉</div>
          </motion.div>
        </div>
      </section>
    );
  }

  const attendanceOptions = [
    {
      value: "yes",
      label: copy.yes,
      ring: "ring-green-500/40 bg-green-50 text-green-700 border-green-200",
    },
    {
      value: "maybe",
      label: copy.maybe,
      ring: "ring-amber-500/40 bg-amber-50 text-amber-700 border-amber-200",
    },
    {
      value: "no",
      label: copy.no,
      ring: "ring-rose-500/40 bg-rose-50 text-rose-700 border-rose-200",
    },
  ];

  return (
    <section
      id="chapter-5"
      className="paper-texture relative overflow-hidden px-6 py-32 md:py-40"
    >
      {/* Corner flourish */}
      <svg
        className="absolute top-8 right-8 h-20 w-20 text-rose/40 md:h-28 md:w-28"
        viewBox="0 0 100 100"
        fill="none"
      >
        <path
          d="M50,90 Q30,70 50,50 Q70,30 50,10 Q30,30 50,50 Q70,70 50,90"
          stroke="currentColor"
          strokeWidth="1"
        />
      </svg>

      <div className="relative mx-auto max-w-2xl">
        <ChapterHeader
          number={copy.number}
          title={copy.title}
          subtitle={copy.subtitle}
        />

        {/* Handwritten letter */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mt-16"
        >
          <div className="polaroid-shadow relative rounded-md border border-gold/20 bg-white/80 p-8 backdrop-blur-sm md:p-12">
            <div
              className="washi-tape absolute"
              style={{
                top: -10,
                left: "15%",
                transform: "rotate(-8deg)",
              }}
            />
            <div
              className="washi-tape washi-tape-gold absolute"
              style={{
                top: -10,
                right: "15%",
                transform: "rotate(6deg)",
              }}
            />

            {/* Letter text */}
            <p className="mb-3 font-hand text-2xl text-rose-deep md:text-3xl">
              {copy.salutation}
            </p>
            <p className="mb-10 font-hand text-xl leading-relaxed text-warm-dark/90 md:text-2xl">
              {copy.letter}
            </p>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Name - signature style */}
              <div>
                <label className="mb-1 block font-hand text-lg text-rose-deep">
                  {copy.nameLabel} *
                </label>
                <input
                  required
                  value={formData.name}
                  onChange={(e) =>
                    setFormData((p) => ({ ...p, name: e.target.value }))
                  }
                  className="w-full border-b-2 border-warm-dark/30 bg-transparent px-1 py-2 font-hand text-2xl text-ink focus:border-gold focus:outline-none md:text-3xl"
                  placeholder="________________"
                />
              </div>

              <div>
                <label className="mb-1 block font-hand text-lg text-rose-deep">
                  {copy.emailLabel}
                </label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData((p) => ({ ...p, email: e.target.value }))
                  }
                  className="w-full border-b border-warm-dark/30 bg-transparent px-1 py-2 text-warm-dark focus:border-gold focus:outline-none"
                />
              </div>

              {/* Attendance */}
              <div>
                <label className="mb-3 block font-hand text-lg text-rose-deep">
                  {copy.attendanceLabel} *
                </label>
                <div className="grid gap-3 sm:grid-cols-3">
                  {attendanceOptions.map((opt) => (
                    <label
                      key={opt.value}
                      className={`flex cursor-pointer items-center justify-center rounded-md border-2 px-3 py-3 text-center font-hand text-lg transition-all ${
                        formData.attendance === opt.value
                          ? `${opt.ring} ring-2 ring-offset-2`
                          : "border-warm-dark/20 bg-white/60 text-warm-dark hover:border-gold/60"
                      }`}
                    >
                      <input
                        type="radio"
                        name="attendance"
                        required
                        value={opt.value}
                        checked={formData.attendance === opt.value}
                        onChange={(e) =>
                          setFormData((p) => ({
                            ...p,
                            attendance: e.target.value,
                          }))
                        }
                        className="sr-only"
                      />
                      {opt.label}
                    </label>
                  ))}
                </div>
              </div>

              {/* Message */}
              <div>
                <label className="mb-1 block font-hand text-lg text-rose-deep">
                  {copy.messageLabel}
                </label>
                <textarea
                  value={formData.message}
                  onChange={(e) =>
                    setFormData((p) => ({ ...p, message: e.target.value }))
                  }
                  rows={3}
                  placeholder={copy.messagePlaceholder}
                  className="w-full resize-none border-b border-warm-dark/30 bg-transparent px-1 py-2 font-hand text-lg text-ink placeholder:text-warm-gray/40 focus:border-gold focus:outline-none"
                />
              </div>

              {/* Yours truly */}
              <div className="flex items-end justify-between pt-4">
                <div>
                  <p className="font-hand text-lg text-rose-deep">
                    {copy.yours}
                  </p>
                  <p className="mt-1 font-hand text-2xl text-warm-dark">
                    {copy.signedBy}
                  </p>
                </div>
                <button
                  type="submit"
                  disabled={status === "submitting"}
                  className="group relative overflow-hidden rounded-md bg-gradient-to-br from-rose-deep to-gold px-6 py-3 font-heading text-sm font-semibold tracking-widest text-white uppercase shadow-lg transition-all hover:shadow-xl hover:-translate-y-0.5 disabled:opacity-60 md:px-8 md:py-4 md:text-base"
                >
                  <span className="relative z-10">
                    {status === "submitting" ? copy.submitting : copy.submit}
                  </span>
                  <span className="absolute inset-0 bg-gradient-to-br from-gold to-rose-deep opacity-0 transition-opacity group-hover:opacity-100" />
                </button>
              </div>

              {status === "error" && (
                <p className="text-center font-hand text-lg text-red-500">
                  Hubo un error. Por favor intenta de nuevo.
                </p>
              )}
            </form>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
