/**
 * Storage layer for guest sign-ups.
 *
 * Two independent lists are kept:
 *   - the main birthday RSVP   (`lorenasofia:rsvps`     / data/rsvps.json)
 *   - the afterparty sign-up   (`lorenasofia:afterparty`/ data/afterparty.json)
 *
 * On Vercel (or any host that exposes KV_REST_API_URL / KV_REST_API_TOKEN
 * env vars from the Vercel KV / Upstash integration) each list is a Redis
 * list. Locally, when those env vars are missing, each list falls back to a
 * JSON file under `<repo>/data/` so dev keeps working without any cloud setup.
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

/** A sign-up for the Colombia vs Portugal afterparty at Napols. */
export interface AfterpartyEntry {
  id: string;
  name: string;
  message?: string;
  timestamp: string;
}

const RSVP_KV_KEY = "lorenasofia:rsvps";
const AFTERPARTY_KV_KEY = "lorenasofia:afterparty";

function dataFile(name: string): string {
  return join(process.cwd(), "data", `${name}.json`);
}

function hasKv(): boolean {
  return Boolean(
    process.env.KV_REST_API_URL && process.env.KV_REST_API_TOKEN,
  );
}

// ---------- File-backed (development) ----------

function fileGetAll<T>(file: string): T[] {
  try {
    if (!existsSync(file)) return [];
    return JSON.parse(readFileSync(file, "utf-8")) as T[];
  } catch {
    return [];
  }
}

function fileAdd<T>(file: string, entry: T): void {
  const all = fileGetAll<T>(file);
  all.push(entry);
  mkdirSync(dirname(file), { recursive: true });
  writeFileSync(file, JSON.stringify(all, null, 2));
}

// ---------- Vercel KV (production) ----------

async function kvGetAll<T>(key: string): Promise<T[]> {
  // Stored as a Redis list — newest at index 0 because we use lpush.
  // Reverse so callers always get chronological order.
  const raw = (await kv.lrange(key, 0, -1)) ?? [];
  // Vercel KV auto-deserialises JSON when the value was stored as JSON;
  // be defensive against either form.
  const items = raw
    .map((entry: unknown): T | null => {
      if (typeof entry === "string") {
        try {
          return JSON.parse(entry) as T;
        } catch {
          return null;
        }
      }
      if (entry && typeof entry === "object") return entry as T;
      return null;
    })
    .filter((item: T | null): item is T => item !== null);
  return items.reverse();
}

async function kvAdd<T>(key: string, entry: T): Promise<void> {
  await kv.lpush(key, JSON.stringify(entry));
}

// ---------- Generic dispatch ----------

async function getEntries<T>(kvKey: string, fileName: string): Promise<T[]> {
  return hasKv() ? kvGetAll<T>(kvKey) : fileGetAll<T>(dataFile(fileName));
}

async function addEntry<T>(
  kvKey: string,
  fileName: string,
  entry: T,
): Promise<void> {
  if (hasKv()) {
    await kvAdd<T>(kvKey, entry);
  } else {
    fileAdd<T>(dataFile(fileName), entry);
  }
}

// ---------- Public API: main RSVP ----------

export async function getAllRSVPs(): Promise<RSVP[]> {
  return getEntries<RSVP>(RSVP_KV_KEY, "rsvps");
}

export async function addRSVP(rsvp: RSVP): Promise<void> {
  return addEntry<RSVP>(RSVP_KV_KEY, "rsvps", rsvp);
}

// ---------- Public API: afterparty ----------

export async function getAllAfterparty(): Promise<AfterpartyEntry[]> {
  return getEntries<AfterpartyEntry>(AFTERPARTY_KV_KEY, "afterparty");
}

export async function addAfterparty(entry: AfterpartyEntry): Promise<void> {
  return addEntry<AfterpartyEntry>(AFTERPARTY_KV_KEY, "afterparty", entry);
}

/** Exposed so routes can tell which backend is active in logs. */
export function activeBackend(): "kv" | "file" {
  return hasKv() ? "kv" : "file";
}
