import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import Chapter6SummerPastel from "@/components/Chapter6SummerPastel";
import { LanguageProvider } from "@/context/LanguageContext";

vi.mock("next/image", () => ({
  __esModule: true,
  default: ({
    src,
    alt,
    onError,
    ...rest
  }: {
    src: string;
    alt: string;
    onError?: () => void;
  } & Record<string, unknown>) => {
    const safe: Record<string, unknown> = {};
    for (const [k, v] of Object.entries(rest)) {
      if (
        ["fill", "sizes", "priority", "loading", "placeholder", "blurDataURL", "quality"].includes(k)
      )
        continue;
      safe[k] = v;
    }
    return <img src={src} alt={alt} onError={onError} {...safe} />;
  },
}));

function renderChapter() {
  return render(
    <LanguageProvider>
      <Chapter6SummerPastel />
    </LanguageProvider>,
  );
}

describe("Chapter6SummerPastel", () => {
  it("renders the chapter title 'Summer Pastel'", () => {
    renderChapter();
    expect(screen.getByText("Summer Pastel")).toBeInTheDocument();
  });

  it("renders the dress code body copy", () => {
    renderChapter();
    expect(
      screen.getByText(/fluye entre lo salvaje y lo elegante/i),
    ).toBeInTheDocument();
    expect(
      screen.getByText(/seda, brillo, piel, movimiento/i),
    ).toBeInTheDocument();
    expect(
      screen.getByText(/pasteles, oro y energ/i),
    ).toBeInTheDocument();
  });

  it("renders 6 image slots pointing at /dress-code/look-N.jpg", () => {
    renderChapter();
    for (let i = 1; i <= 6; i++) {
      const img = screen.getByAltText(`Look ${i}`) as HTMLImageElement;
      expect(img).toBeInTheDocument();
      expect(img.getAttribute("src")).toBe(`/dress-code/look-${i}.jpg`);
    }
  });

  it("renders the tag pills", () => {
    renderChapter();
    ["Seda", "Brillo", "Pastel", "Oro", "Tropical"].forEach((tag) => {
      expect(screen.getByText(tag)).toBeInTheDocument();
    });
  });

  it("has anchor id chapter-6 so the RSVP CTA can scroll to it", () => {
    const { container } = renderChapter();
    expect(container.querySelector("#chapter-6")).not.toBeNull();
  });
});
