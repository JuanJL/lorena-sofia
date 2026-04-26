import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect } from "vitest";
import AmbientMusic from "@/components/AmbientMusic";
import { LanguageProvider } from "@/context/LanguageContext";

const SPOTIFY_TRACK_ID = "1dHbcmMm9bov1q4lG7Q4nQ";

function renderWithProviders(ui: React.ReactElement) {
  return render(<LanguageProvider>{ui}</LanguageProvider>);
}

describe("AmbientMusic", () => {
  it("renders a music toggle button", () => {
    renderWithProviders(<AmbientMusic />);
    const toggle = screen.getByRole("button", { name: /music|m\u00FAsica/i });
    expect(toggle).toBeInTheDocument();
  });

  it("hides the Spotify embed by default", () => {
    renderWithProviders(<AmbientMusic />);
    expect(screen.queryByTitle(/spotify/i)).not.toBeInTheDocument();
  });

  it("reveals the Spotify embed when the toggle is clicked", async () => {
    const user = userEvent.setup();
    renderWithProviders(<AmbientMusic />);
    await user.click(screen.getByRole("button", { name: /music|m\u00FAsica/i }));
    const iframe = screen.getByTitle(/spotify/i) as HTMLIFrameElement;
    expect(iframe).toBeInTheDocument();
    expect(iframe.src).toContain(`embed/track/${SPOTIFY_TRACK_ID}`);
  });

  it("hides the embed again when toggled twice", async () => {
    const user = userEvent.setup();
    renderWithProviders(<AmbientMusic />);
    const toggle = screen.getByRole("button", { name: /music|m\u00FAsica/i });
    await user.click(toggle);
    await user.click(toggle);
    expect(screen.queryByTitle(/spotify/i)).not.toBeInTheDocument();
  });

  it("uses an accessible aria-label that mentions the soundtrack", () => {
    renderWithProviders(<AmbientMusic />);
    const toggle = screen.getByRole("button");
    expect(toggle).toHaveAttribute("aria-label");
    expect(toggle.getAttribute("aria-label")?.toLowerCase()).toMatch(
      /music|m\u00FAsica|soundtrack|banda/i,
    );
  });

  it("decorates the toggle with a music icon (svg or text)", () => {
    renderWithProviders(<AmbientMusic />);
    const toggle = screen.getByRole("button");
    // Either has an svg child or visible text
    const hasSvg = within(toggle).queryAllByRole("img", { hidden: true }).length > 0
      || toggle.querySelector("svg") !== null;
    expect(hasSvg).toBe(true);
  });
});
