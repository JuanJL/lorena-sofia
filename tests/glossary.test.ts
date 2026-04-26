import { describe, it, expect } from "vitest";
import { glossaryItems } from "@/lib/glossary";

describe("glossaryItems data", () => {
  it("contains the full Colombian culture set (22 entries)", () => {
    expect(glossaryItems).toHaveLength(22);
  });

  it("includes Marimonda (replaced Monocuco)", () => {
    const ids = glossaryItems.map((i) => i.id);
    expect(ids).toContain("marimonda");
    expect(ids).not.toContain("monocuco");
  });

  it("includes the new Selecci\u00F3n Colombia card", () => {
    const ids = glossaryItems.map((i) => i.id);
    expect(ids).toContain("seleccion-colombia");
  });

  it("every item has a unique id", () => {
    const ids = glossaryItems.map((i) => i.id);
    expect(new Set(ids).size).toBe(ids.length);
  });

  it("every item has an image path matching /glossary/<id>.jpg", () => {
    for (const item of glossaryItems) {
      expect(item.image).toBe(`/glossary/${item.id}.jpg`);
    }
  });

  it("every item has both Spanish and English translations", () => {
    for (const item of glossaryItems) {
      expect(item.es.name).toBeTruthy();
      expect(item.es.description).toBeTruthy();
      expect(item.en.name).toBeTruthy();
      expect(item.en.description).toBeTruthy();
    }
  });

  it("every item has an emoji fallback", () => {
    for (const item of glossaryItems) {
      expect(item.emoji).toBeTruthy();
      expect(item.emoji.length).toBeGreaterThan(0);
    }
  });

  it("does not contain any reference to the number 40 (privacy)", () => {
    const blob = JSON.stringify(glossaryItems);
    expect(blob).not.toMatch(/\b40\b/);
  });
});
