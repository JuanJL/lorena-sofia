import { describe, it, expect, beforeEach, afterEach, vi } from "vitest";
import { mkdtempSync, rmSync, readFileSync, writeFileSync } from "fs";
import { tmpdir } from "os";
import { join } from "path";

/**
 * The store reads cwd() once, so we point cwd at a fresh temp dir per test.
 * This isolates the JSON-file fallback from the real `data/rsvps.json` and
 * avoids polluting the repo during test runs.
 */

let tempDir: string;
let originalCwd: string;

function makeRSVP(overrides: Partial<{ name: string; attendance: "yes" | "no" | "maybe" }> = {}) {
  return {
    id: crypto.randomUUID(),
    name: overrides.name ?? "Test Guest",
    guests: 1,
    attendance: overrides.attendance ?? "yes",
    timestamp: new Date().toISOString(),
  };
}

beforeEach(() => {
  // Make sure no KV env vars leak into the test
  delete process.env.KV_REST_API_URL;
  delete process.env.KV_REST_API_TOKEN;

  tempDir = mkdtempSync(join(tmpdir(), "rsvp-test-"));
  originalCwd = process.cwd();
  process.chdir(tempDir);
  vi.resetModules();
});

afterEach(() => {
  process.chdir(originalCwd);
  rmSync(tempDir, { recursive: true, force: true });
});

describe("rsvp-store (file fallback)", () => {
  it("reports file backend when KV env vars are absent", async () => {
    const { activeBackend } = await import("@/lib/rsvp-store");
    expect(activeBackend()).toBe("file");
  });

  it("starts empty, then returns added RSVPs in chronological order", async () => {
    const { addRSVP, getAllRSVPs } = await import("@/lib/rsvp-store");
    expect(await getAllRSVPs()).toEqual([]);

    const a = makeRSVP({ name: "Alpha" });
    const b = makeRSVP({ name: "Beta" });
    await addRSVP(a);
    await addRSVP(b);

    const list = await getAllRSVPs();
    expect(list).toHaveLength(2);
    expect(list[0].name).toBe("Alpha");
    expect(list[1].name).toBe("Beta");
  });

  it("creates the data directory if it doesn't exist", async () => {
    const { addRSVP, getAllRSVPs } = await import("@/lib/rsvp-store");
    await addRSVP(makeRSVP({ name: "Solo" }));
    const dataFile = join(tempDir, "data", "rsvps.json");
    const json = JSON.parse(readFileSync(dataFile, "utf-8"));
    expect(json).toHaveLength(1);
    expect((await getAllRSVPs())[0].name).toBe("Solo");
  });

  it("survives malformed JSON without crashing", async () => {
    // Write garbage on disk first, then init the module
    const dir = join(tempDir, "data");
    require("fs").mkdirSync(dir, { recursive: true });
    writeFileSync(join(dir, "rsvps.json"), "not valid json {{{");

    const { getAllRSVPs } = await import("@/lib/rsvp-store");
    expect(await getAllRSVPs()).toEqual([]);
  });
});

describe("rsvp-store (KV detection)", () => {
  it("reports kv backend when KV env vars ARE present", async () => {
    process.env.KV_REST_API_URL = "https://example.upstash.io";
    process.env.KV_REST_API_TOKEN = "fake-token";
    const { activeBackend } = await import("@/lib/rsvp-store");
    expect(activeBackend()).toBe("kv");
  });
});

describe("afterparty-store (file fallback)", () => {
  function makeAfterparty(name: string) {
    return {
      id: crypto.randomUUID(),
      name,
      timestamp: new Date().toISOString(),
    };
  }

  it("keeps the afterparty list separate from the main RSVP list", async () => {
    const { addRSVP, addAfterparty, getAllRSVPs, getAllAfterparty } =
      await import("@/lib/rsvp-store");

    await addRSVP(makeRSVP({ name: "Main Guest" }));
    await addAfterparty(makeAfterparty("Footy Fan"));

    const rsvps = await getAllRSVPs();
    const after = await getAllAfterparty();

    expect(rsvps).toHaveLength(1);
    expect(rsvps[0].name).toBe("Main Guest");
    expect(after).toHaveLength(1);
    expect(after[0].name).toBe("Footy Fan");
  });

  it("writes afterparty entries to data/afterparty.json", async () => {
    const { addAfterparty, getAllAfterparty } = await import(
      "@/lib/rsvp-store"
    );
    await addAfterparty(makeAfterparty("Solo"));
    const file = join(tempDir, "data", "afterparty.json");
    const json = JSON.parse(readFileSync(file, "utf-8"));
    expect(json).toHaveLength(1);
    expect((await getAllAfterparty())[0].name).toBe("Solo");
  });

  it("returns afterparty entries in chronological order", async () => {
    const { addAfterparty, getAllAfterparty } = await import(
      "@/lib/rsvp-store"
    );
    await addAfterparty(makeAfterparty("Uno"));
    await addAfterparty(makeAfterparty("Dos"));
    const list = await getAllAfterparty();
    expect(list.map((e) => e.name)).toEqual(["Uno", "Dos"]);
  });
});
