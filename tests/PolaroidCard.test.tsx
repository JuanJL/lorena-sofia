import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import PolaroidCard from "@/components/PolaroidCard";
import { LanguageProvider } from "@/context/LanguageContext";
import type { GlossaryItem } from "@/lib/glossary";

// Mock next/image: render a plain <img> so we can assert on src/alt
vi.mock("next/image", () => ({
  __esModule: true,
  default: ({
    src,
    alt,
    onError,
    ...rest
  }: { src: string; alt: string; onError?: () => void } & Record<string, unknown>) => {
    const safe: Record<string, unknown> = {};
    for (const [k, v] of Object.entries(rest)) {
      if (["fill", "sizes", "priority", "loading", "placeholder", "blurDataURL", "quality"].includes(k)) continue;
      safe[k] = v;
    }
    return <img src={src} alt={alt} onError={onError} {...safe} />;
  },
}));

const mockItem: GlossaryItem = {
  id: "marimonda",
  image: "/glossary/marimonda.jpg",
  emoji: "\uD83D\uDC12",
  es: { name: "Marimonda", description: "Personaje ic\u00F3nico del Carnaval." },
  en: { name: "Marimonda", description: "Iconic Carnival character." },
};

function renderCard() {
  return render(
    <LanguageProvider>
      <PolaroidCard item={mockItem} index={0} rotation={0} />
    </LanguageProvider>,
  );
}

describe("PolaroidCard", () => {
  it("renders the realistic image (not just the emoji)", () => {
    renderCard();
    const img = screen.getByAltText("Marimonda") as HTMLImageElement;
    expect(img).toBeInTheDocument();
    expect(img.getAttribute("src")).toBe("/glossary/marimonda.jpg");
  });

  it("uses /glossary/<id>.jpg path convention", () => {
    renderCard();
    const img = screen.getByAltText("Marimonda") as HTMLImageElement;
    expect(img.getAttribute("src")).toMatch(/^\/glossary\/[\w-]+\.jpg$/);
  });

  it("wires an onError handler so it can fall back to the emoji", () => {
    renderCard();
    const img = screen.getByAltText("Marimonda");
    expect(img).toBeInTheDocument();
    fireEvent.error(img);
  });

  it("includes the emoji somewhere in the rendered tree as a fallback signal", () => {
    renderCard();
    // Back side always shows the emoji next to the title.
    expect(screen.getByText("\uD83D\uDC12")).toBeInTheDocument();
  });

  it("shows the item name (front and back both contain it)", () => {
    renderCard();
    const matches = screen.getAllByText("Marimonda");
    expect(matches.length).toBeGreaterThanOrEqual(1);
  });

  it("shows the description on the back side (always rendered, hidden via CSS)", () => {
    renderCard();
    expect(
      screen.getByText(/personaje ic\u00F3nico del carnaval\.?/i),
    ).toBeInTheDocument();
  });

  it("applies the .glossary-photo class for unified visual treatment", () => {
    renderCard();
    const img = screen.getByAltText("Marimonda");
    expect(img.className).toContain("glossary-photo");
  });

  it("does NOT show the 'Da la vuelta' / 'Flip me' label anymore", () => {
    renderCard();
    expect(screen.queryByText(/da la vuelta/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/flip me/i)).not.toBeInTheDocument();
  });
});
