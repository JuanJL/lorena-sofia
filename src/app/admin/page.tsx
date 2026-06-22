"use client";

import { useState } from "react";

interface RSVP {
  id: string;
  name: string;
  email?: string;
  guests: number;
  attendance: "yes" | "no" | "maybe";
  message?: string;
  timestamp: string;
}

interface Stats {
  total: number;
  attending: number;
  notAttending: number;
  maybe: number;
  totalGuests: number;
}

interface AfterpartyEntry {
  id: string;
  name: string;
  message?: string;
  timestamp: string;
}

export default function AdminPage() {
  const [password, setPassword] = useState("");
  const [authenticated, setAuthenticated] = useState(false);
  const [rsvps, setRsvps] = useState<RSVP[]>([]);
  const [stats, setStats] = useState<Stats | null>(null);
  const [afterparty, setAfterparty] = useState<AfterpartyEntry[]>([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const fetchData = async (pw: string) => {
    setLoading(true);
    setError("");
    try {
      const [rsvpRes, afterRes] = await Promise.all([
        fetch(`/api/rsvp?password=${encodeURIComponent(pw)}`),
        fetch(`/api/afterparty?password=${encodeURIComponent(pw)}`),
      ]);
      if (!rsvpRes.ok) {
        setError("Incorrect password");
        setLoading(false);
        return;
      }
      const rsvpData = await rsvpRes.json();
      setRsvps(rsvpData.rsvps);
      setStats(rsvpData.stats);
      if (afterRes.ok) {
        const afterData = await afterRes.json();
        setAfterparty(afterData.entries ?? []);
      }
      setAuthenticated(true);
    } catch {
      setError("Error loading data");
    }
    setLoading(false);
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    fetchData(password);
  };

  const attendanceBadge = (att: string) => {
    const styles = {
      yes: "bg-green-100 text-green-800",
      no: "bg-red-100 text-red-800",
      maybe: "bg-amber-100 text-amber-800",
    };
    const labels = { yes: "Coming", no: "Not coming", maybe: "Maybe" };
    return (
      <span
        className={`inline-block rounded-full px-3 py-1 text-xs font-medium ${
          styles[att as keyof typeof styles] || ""
        }`}
      >
        {labels[att as keyof typeof labels] || att}
      </span>
    );
  };

  if (!authenticated) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-cream px-6">
        <form
          onSubmit={handleLogin}
          className="w-full max-w-sm rounded-2xl border border-gold-lighter bg-white/80 p-8 shadow-lg backdrop-blur-sm"
        >
          <h1 className="mb-6 text-center font-heading text-2xl text-warm-dark">
            Admin Access
          </h1>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            aria-label="Admin password"
            autoComplete="current-password"
            className="mb-4 w-full rounded-xl border border-gold-lighter bg-white px-4 py-3 text-warm-dark"
          />
          {error && (
            <p className="mb-4 text-center text-sm text-red-500">{error}</p>
          )}
          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-xl bg-gradient-to-r from-gold to-gold-light px-6 py-3 font-medium text-white transition-all hover:shadow-lg disabled:opacity-60"
          >
            {loading ? "Loading..." : "View RSVPs"}
          </button>
        </form>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-cream px-6 py-12">
      <div className="mx-auto max-w-6xl">
        <h1 className="mb-2 font-heading text-3xl text-warm-dark">
          RSVP Dashboard
        </h1>
        <p className="mb-8 text-warm-gray">Lorena Sofía &middot; 27.06.26</p>

        {/* ===== Main party ===== */}
        <h2 className="mb-4 font-heading text-2xl text-warm-dark">
          Main Party &middot; Maska Gastropub
        </h2>

        {/* Stats */}
        {stats && (
          <div className="mb-6 grid grid-cols-2 gap-4 md:grid-cols-4">
            <div className="rounded-xl border border-gold-lighter bg-white/80 p-4 text-center">
              <p className="text-3xl font-bold text-warm-dark">{stats.total}</p>
              <p className="text-sm text-warm-gray">Total RSVPs</p>
            </div>
            <div className="rounded-xl border border-green-200 bg-green-50/80 p-4 text-center">
              <p className="text-3xl font-bold text-green-700">
                {stats.attending}
              </p>
              <p className="text-sm text-green-600">Guests Attending</p>
            </div>
            <div className="rounded-xl border border-amber-200 bg-amber-50/80 p-4 text-center">
              <p className="text-3xl font-bold text-amber-700">{stats.maybe}</p>
              <p className="text-sm text-amber-600">Maybe</p>
            </div>
            <div className="rounded-xl border border-red-200 bg-red-50/80 p-4 text-center">
              <p className="text-3xl font-bold text-red-700">
                {stats.notAttending}
              </p>
              <p className="text-sm text-red-600">Not Coming</p>
            </div>
          </div>
        )}

        {/* Main RSVP table */}
        {rsvps.length === 0 ? (
          <div className="rounded-2xl border border-gold-lighter bg-white/80 p-12 text-center">
            <p className="text-warm-gray">No RSVPs yet</p>
          </div>
        ) : (
          <div className="overflow-hidden rounded-2xl border border-gold-lighter bg-white/80">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead>
                  <tr className="border-b border-gold-lighter bg-cream-dark/30">
                    <th className="px-4 py-3 font-medium text-warm-gray">Name</th>
                    <th className="px-4 py-3 font-medium text-warm-gray">Email</th>
                    <th className="px-4 py-3 font-medium text-warm-gray">Guests</th>
                    <th className="px-4 py-3 font-medium text-warm-gray">Status</th>
                    <th className="px-4 py-3 font-medium text-warm-gray">Message</th>
                    <th className="px-4 py-3 font-medium text-warm-gray">Date</th>
                  </tr>
                </thead>
                <tbody>
                  {rsvps.map((rsvp) => (
                    <tr
                      key={rsvp.id}
                      className="border-b border-gold-lighter/50 transition-colors hover:bg-cream-dark/20"
                    >
                      <td className="px-4 py-3 align-top font-medium text-warm-dark">
                        {rsvp.name}
                      </td>
                      <td className="px-4 py-3 align-top text-warm-gray">
                        {rsvp.email || "—"}
                      </td>
                      <td className="px-4 py-3 align-top text-warm-dark">
                        {rsvp.guests}
                      </td>
                      <td className="px-4 py-3 align-top">
                        {attendanceBadge(rsvp.attendance)}
                      </td>
                      <td className="min-w-[220px] max-w-[460px] px-4 py-3 align-top text-warm-gray whitespace-pre-wrap break-words">
                        {rsvp.message || "—"}
                      </td>
                      <td className="px-4 py-3 align-top whitespace-nowrap text-warm-gray">
                        {new Date(rsvp.timestamp).toLocaleDateString()}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* ===== Afterparty ===== */}
        <h2 className="mt-12 mb-1 font-heading text-2xl text-warm-dark">
          Afterparty &middot; Colombia vs Portugal @ Napols
        </h2>
        <p className="mb-4 text-sm text-warm-gray">
          Separate sign-up. Match these names manually against the main list.
        </p>

        <div className="mb-6 grid grid-cols-2 gap-4 md:grid-cols-4">
          <div className="rounded-xl border border-lavender/40 bg-lavender-lighter/40 p-4 text-center">
            <p className="text-3xl font-bold text-mauve">{afterparty.length}</p>
            <p className="text-sm text-warm-gray">Going to afterparty</p>
          </div>
        </div>

        {afterparty.length === 0 ? (
          <div className="rounded-2xl border border-gold-lighter bg-white/80 p-12 text-center">
            <p className="text-warm-gray">No afterparty sign-ups yet</p>
          </div>
        ) : (
          <div className="overflow-hidden rounded-2xl border border-gold-lighter bg-white/80">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead>
                  <tr className="border-b border-gold-lighter bg-cream-dark/30">
                    <th className="px-4 py-3 font-medium text-warm-gray">Name</th>
                    <th className="px-4 py-3 font-medium text-warm-gray">Note</th>
                    <th className="px-4 py-3 font-medium text-warm-gray">Date</th>
                  </tr>
                </thead>
                <tbody>
                  {afterparty.map((entry) => (
                    <tr
                      key={entry.id}
                      className="border-b border-gold-lighter/50 transition-colors hover:bg-cream-dark/20"
                    >
                      <td className="px-4 py-3 align-top font-medium text-warm-dark">
                        {entry.name}
                      </td>
                      <td className="min-w-[260px] max-w-[520px] px-4 py-3 align-top text-warm-gray whitespace-pre-wrap break-words">
                        {entry.message || "—"}
                      </td>
                      <td className="px-4 py-3 align-top whitespace-nowrap text-warm-gray">
                        {new Date(entry.timestamp).toLocaleDateString()}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Refresh */}
        <div className="mt-8 text-center">
          <button
            onClick={() => fetchData(password)}
            className="rounded-lg border border-gold-lighter px-4 py-2 text-sm text-warm-gray transition-colors hover:bg-white/60"
          >
            Refresh Data
          </button>
        </div>
      </div>
    </div>
  );
}
