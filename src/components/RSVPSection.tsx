"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import confetti from "canvas-confetti";
import { useLanguage } from "@/context/LanguageContext";
import { translations } from "@/lib/translations";

export default function RSVPSection() {
  const { lang } = useLanguage();
  const t = translations[lang].rsvp;

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    guests: "1",
    attendance: "",
    message: "",
  });
  const [status, setStatus] = useState<
    "idle" | "submitting" | "success" | "error"
  >("idle");

  const fireConfetti = () => {
    const colors = [
      "#E2C277",
      "#E89D7A",
      "#C97B8A",
      "#C8A8D8",
      "#FDF6EB",
      "#F5B28F",
    ];

    confetti({
      particleCount: 150,
      spread: 100,
      origin: { x: 0.5, y: 0.5 },
      colors,
      scalar: 1.1,
      startVelocity: 40,
    });

    setTimeout(() => {
      confetti({
        particleCount: 50,
        angle: 60,
        spread: 55,
        origin: { x: 0, y: 0.6 },
        colors,
      });
      confetti({
        particleCount: 50,
        angle: 120,
        spread: 55,
        origin: { x: 1, y: 0.6 },
        colors,
      });
    }, 300);
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
          guests: Number(formData.guests),
          attendance: formData.attendance,
          message: formData.message,
        }),
      });
      if (res.ok) {
        setStatus("success");
        if (formData.attendance === "yes") fireConfetti();
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
        id="rsvp"
        className="relative overflow-hidden bg-sunset px-6 py-32 md:py-40"
      >
        <div className="noise-overlay pointer-events-none absolute inset-0" />

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          className="relative z-10 mx-auto max-w-2xl text-center"
        >
          <div className="mx-auto mb-8 flex h-20 w-20 items-center justify-center rounded-full border border-white/30 bg-white/10 backdrop-blur-sm">
            <svg width="32" height="32" viewBox="0 0 32 32" fill="none" className="text-white">
              <path d="M6 16 L13 23 L26 9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>

          <h3 className="font-heading text-4xl font-light leading-tight text-white md:text-6xl">
            {t.successTitle}
          </h3>

          <div className="mx-auto my-8 flex items-center justify-center gap-3">
            <div className="h-px w-16 bg-white/40" />
            <span className="text-white/80">✦</span>
            <div className="h-px w-16 bg-white/40" />
          </div>

          <p className="mx-auto max-w-md font-heading text-lg leading-relaxed text-white/90 italic md:text-xl">
            {t.successMsg}
          </p>
        </motion.div>
      </section>
    );
  }

  const attendanceOptions = [
    { value: "yes", label: t.yes },
    { value: "maybe", label: t.maybe },
    { value: "no", label: t.no },
  ];

  return (
    <section
      id="rsvp"
      className="relative overflow-hidden bg-cream px-6 py-28 md:py-40"
    >
      <div className="noise-overlay pointer-events-none absolute inset-0" />

      {/* Decorative */}
      <div className="pointer-events-none absolute -top-40 left-0 h-80 w-80 rounded-full bg-coral/20 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-40 right-0 h-80 w-80 rounded-full bg-lavender/20 blur-3xl" />

      <div className="relative z-10 mx-auto max-w-xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8 }}
          className="text-center"
        >
          <p className="eyebrow text-gold-deep">{t.eyebrow}</p>
          <h2 className="mt-4 font-heading text-4xl font-light text-warm-dark md:text-6xl">
            {t.title}
          </h2>
          <p className="mx-auto mt-5 max-w-md text-sm text-warm-gray md:text-base">
            {t.subtitle}
          </p>
        </motion.div>

        <motion.form
          onSubmit={handleSubmit}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mt-14 space-y-8"
        >
          {/* Name */}
          <div>
            <label className="mb-2 block text-[10px] font-medium tracking-[0.3em] text-gold-deep uppercase">
              {t.name} *
            </label>
            <input
              required
              value={formData.name}
              onChange={(e) =>
                setFormData((p) => ({ ...p, name: e.target.value }))
              }
              className="w-full border-b border-warm-dark/20 bg-transparent px-0 py-3 font-heading text-xl text-warm-dark transition-colors focus:border-gold md:text-2xl"
            />
          </div>

          <div className="grid gap-8 md:grid-cols-2">
            <div>
              <label className="mb-2 block text-[10px] font-medium tracking-[0.3em] text-gold-deep uppercase">
                {t.email}
              </label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) =>
                  setFormData((p) => ({ ...p, email: e.target.value }))
                }
                className="w-full border-b border-warm-dark/20 bg-transparent px-0 py-3 text-base text-warm-dark transition-colors focus:border-gold"
              />
            </div>

            <div>
              <label className="mb-2 block text-[10px] font-medium tracking-[0.3em] text-gold-deep uppercase">
                {t.guests}
              </label>
              <select
                value={formData.guests}
                onChange={(e) =>
                  setFormData((p) => ({ ...p, guests: e.target.value }))
                }
                className="w-full border-b border-warm-dark/20 bg-transparent px-0 py-3 text-base text-warm-dark transition-colors focus:border-gold"
              >
                {[1, 2, 3, 4, 5].map((n) => (
                  <option key={n} value={n}>
                    {t.guestUnit(n)}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Attendance */}
          <div>
            <label className="mb-3 block text-[10px] font-medium tracking-[0.3em] text-gold-deep uppercase">
              {t.attendance} *
            </label>
            <div className="grid gap-3 sm:grid-cols-3">
              {attendanceOptions.map((opt) => (
                <label
                  key={opt.value}
                  className={`flex cursor-pointer items-center justify-center rounded-full border px-4 py-3 text-center text-sm transition-all ${
                    formData.attendance === opt.value
                      ? "border-gold bg-gold text-white shadow-lg shadow-gold/25"
                      : "border-warm-dark/20 bg-white/50 text-warm-dark hover:border-gold"
                  }`}
                >
                  <input
                    type="radio"
                    name="attendance"
                    required
                    value={opt.value}
                    checked={formData.attendance === opt.value}
                    onChange={(e) =>
                      setFormData((p) => ({ ...p, attendance: e.target.value }))
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
            <label className="mb-2 block text-[10px] font-medium tracking-[0.3em] text-gold-deep uppercase">
              {t.message}
            </label>
            <textarea
              value={formData.message}
              onChange={(e) =>
                setFormData((p) => ({ ...p, message: e.target.value }))
              }
              rows={2}
              placeholder={t.messagePlaceholder}
              className="w-full resize-none border-b border-warm-dark/20 bg-transparent px-0 py-3 text-base text-warm-dark placeholder:text-warm-gray/50 transition-colors focus:border-gold"
            />
          </div>

          {/* Submit */}
          <div className="pt-4">
            <button
              type="submit"
              disabled={status === "submitting"}
              className="group relative w-full overflow-hidden rounded-full bg-warm-dark px-8 py-5 transition-all hover:shadow-2xl hover:shadow-warm-dark/20 disabled:opacity-60"
            >
              <span className="absolute inset-0 bg-gradient-to-r from-coral via-sunset to-gold opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
              <span className="relative flex items-center justify-center gap-3 text-xs font-semibold tracking-[0.3em] text-white uppercase md:text-sm">
                {status === "submitting" ? t.submitting : t.submit}
                {status !== "submitting" && (
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
                    className="transition-transform group-hover:translate-x-1">
                    <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor"
                      strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                )}
              </span>
            </button>

            {status === "error" && (
              <p className="mt-4 text-center text-sm text-red-500">{t.error}</p>
            )}
          </div>
        </motion.form>
      </div>
    </section>
  );
}
