/**
 * RSVP storage layer.
 *
 * On Vercel (or any host that exposes KV_REST_API_URL / KV_REST_API_TOKEN
 * env vars from the Vercel KV / Upstash integration) this writes RSVPs
 * into a Redis list. Locally, when those env vars are missing, it falls
 * back to a JSON file at `<repo>/data/rsvps.json` so dev keeps working
 * without any cloud setup.
 */
import { readFileSync, writeFileSync, existsSync, mkdirSync } from "fs";
import { dirname, join } from "path";
import { kv } from "@vercel/kv";

export interface RSVP {
  id: string;
  name: string;
  email?: string;
  guests: number;
  attendance: "yes" | "no" | "maybe";
  message?: string;
  timestamp: string;
}

const KV_KEY = "lorenasofia:rsvps";
const DATA_FILE = join(process.cwd(), "data", "rsvps.json");

function hasKv(): boolean {
  return Boolean(
    process.env.KV_REST_API_URL && process.env.KV_REST_API_TOKEN,
  );
}

// ---------- File-backed (development) ----------

function fileGetAll(): RSVP[] {
  try {
    if (!existsSync(DATA_FILE)) return [];
    return JSON.parse(readFileSync(DATA_FILE, "utf-8"));
  } catch {
    return [];
  }
}

function fileAdd(rsvp: RSVP) {
  const all = fileGetAll();
  all.push(rsvp);
  mkdirSync(dirname(DATA_FILE), { recursive: true });
  writeFileSync(DATA_FILE, JSON.stringify(all, null, 2));
}

// ---------- Vercel KV (production) ----------

async function kvGetAll(): Promise<RSVP[]> {
  // Stored as a Redis list — newest at index 0 because we use lpush.
  // Reverse so callers always get chronological order.
  const raw = (await kv.lrange(KV_KEY, 0, -1)) ?? [];
  // Vercel KV auto-deserialises JSON when the value was stored as JSON;
  // be defensive against either form.
  const items = raw
    .map((entry: unknown): RSVP | null => {
      if (typeof entry === "string") {
        try {
          return JSON.parse(entry) as RSVP;
        } catch {
          return null;
        }
      }
      if (entry && typeof entry === "object") return entry as RSVP;
      return null;
    })
    .filter((item: RSVP | null): item is RSVP => item !== null);
  return items.reverse();
}

async function kvAdd(rsvp: RSVP) {
  await kv.lpush(KV_KEY, JSON.stringify(rsvp));
}

// ---------- Public API ----------

export async function getAllRSVPs(): Promise<RSVP[]> {
  return hasKv() ? kvGetAll() : fileGetAll();
}

export async function addRSVP(rsvp: RSVP): Promise<void> {
  if (hasKv()) {
    await kvAdd(rsvp);
  } else {
    fileAdd(rsvp);
  }
}

/** Exposed so the route can tell which backend is active in logs. */
export function activeBackend(): "kv" | "file" {
  return hasKv() ? "kv" : "file";
}
