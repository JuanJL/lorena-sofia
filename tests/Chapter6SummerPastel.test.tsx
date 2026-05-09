import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
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

  it("opens a fullscreen lightbox when a look polaroid is clicked", async () => {
    const user = userEvent.setup();
    renderChapter();
    // Lightbox is closed initially
    expect(
      screen.queryByRole("dialog", { name: /fullscreen/i }),
    ).not.toBeInTheDocument();

    // Click the first polaroid
    const first = screen.getByRole("button", {
      name: /open look 1 in full size/i,
    });
    await user.click(first);

    expect(
      screen.getByRole("dialog", { name: /fullscreen/i }),
    ).toBeInTheDocument();
    expect(screen.getByAltText(/Look 1 fullscreen/i)).toBeInTheDocument();
  });

  it("closes the lightbox when the close button is clicked", async () => {
    const user = userEvent.setup();
    renderChapter();
    await user.click(
      screen.getByRole("button", { name: /open look 1 in full size/i }),
    );
    await user.click(screen.getByRole("button", { name: /^close$/i }));
    expect(
      screen.queryByRole("dialog", { name: /fullscreen/i }),
    ).not.toBeInTheDocument();
  });

  it("navigates to the next look when the next arrow is clicked", async () => {
    const user = userEvent.setup();
    renderChapter();
    await user.click(
      screen.getByRole("button", { name: /open look 1 in full size/i }),
    );
    expect(screen.getByAltText(/Look 1 fullscreen/i)).toBeInTheDocument();
    await user.click(screen.getByRole("button", { name: /next look/i }));
    expect(screen.getByAltText(/Look 2 fullscreen/i)).toBeInTheDocument();
  });
});
