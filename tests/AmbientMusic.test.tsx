import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect, beforeEach, vi } from "vitest";
import AmbientMusic from "@/components/AmbientMusic";
import { LanguageProvider } from "@/context/LanguageContext";

function renderWithProviders(ui: React.ReactElement) {
  return render(<LanguageProvider>{ui}</LanguageProvider>);
}

beforeEach(() => {
  // jsdom doesn't implement HTMLMediaElement.play/pause meaningfully; stub them.
  Object.defineProperty(window.HTMLMediaElement.prototype, "play", {
    configurable: true,
    value: vi.fn().mockResolvedValue(undefined),
  });
  Object.defineProperty(window.HTMLMediaElement.prototype, "pause", {
    configurable: true,
    value: vi.fn(),
  });
});

describe("AmbientMusic", () => {
  it("renders an open-player toggle button", () => {
    renderWithProviders(<AmbientMusic />);
    const toggle = screen.getByRole("button", {
      name: /open player|abrir reproductor/i,
    });
    expect(toggle).toBeInTheDocument();
  });

  it("renders an HTML5 audio element pointing at the local MP3", () => {
    const { container } = renderWithProviders(<AmbientMusic />);
    const audio = container.querySelector("audio");
    expect(audio).not.toBeNull();
    expect(audio?.getAttribute("src")).toBe("/audio/algo-tu.mp3");
  });

  it("does NOT embed a Spotify or YouTube iframe", () => {
    renderWithProviders(<AmbientMusic />);
    expect(screen.queryByTitle(/spotify/i)).not.toBeInTheDocument();
    expect(screen.queryByTitle(/youtube/i)).not.toBeInTheDocument();
  });

  it("hides the mini player by default", () => {
    renderWithProviders(<AmbientMusic />);
    expect(
      screen.queryByRole("region", { name: /music player/i }),
    ).not.toBeInTheDocument();
  });

  it("opens the mini player when the toggle is clicked", async () => {
    const user = userEvent.setup();
    renderWithProviders(<AmbientMusic />);
    await user.click(
      screen.getByRole("button", { name: /open player|abrir reproductor/i }),
    );
    expect(
      screen.getByRole("region", { name: /music player/i }),
    ).toBeInTheDocument();
  });

  it("shows the track title and artist in the mini player", async () => {
    const user = userEvent.setup();
    renderWithProviders(<AmbientMusic />);
    await user.click(
      screen.getByRole("button", { name: /open player|abrir reproductor/i }),
    );
    expect(screen.getByText(/ALGO T\u00DA/)).toBeInTheDocument();
    expect(screen.getByText(/Shakira.*Be\u00E9le/i)).toBeInTheDocument();
  });

  it("includes a play button inside the mini player", async () => {
    const user = userEvent.setup();
    renderWithProviders(<AmbientMusic />);
    await user.click(
      screen.getByRole("button", { name: /open player|abrir reproductor/i }),
    );
    const playBtn = screen.getByRole("button", {
      name: /play|reproducir/i,
    });
    expect(playBtn).toBeInTheDocument();
  });

  it("calls audio.play when the play button is clicked", async () => {
    const user = userEvent.setup();
    const playSpy = vi.fn().mockResolvedValue(undefined);
    Object.defineProperty(window.HTMLMediaElement.prototype, "play", {
      configurable: true,
      value: playSpy,
    });
    renderWithProviders(<AmbientMusic />);
    await user.click(
      screen.getByRole("button", { name: /open player|abrir reproductor/i }),
    );
    // play might already be called once on open, then again on the play button
    const playBtn = screen.getByRole("button", { name: /play|reproducir/i });
    await user.click(playBtn);
    expect(playSpy).toHaveBeenCalled();
  });

  it("seeks the playhead to 2:26 once the duration is known", async () => {
    const { container } = renderWithProviders(<AmbientMusic />);
    const audio = container.querySelector("audio") as HTMLAudioElement & {
      _ct?: number;
    };
    // Fake a real song duration the same way the browser would once
    // metadata loads: it's a getter, so override the prototype.
    Object.defineProperty(audio, "duration", {
      configurable: true,
      get: () => 226.59,
    });
    let stored = 0;
    Object.defineProperty(audio, "currentTime", {
      configurable: true,
      get: () => stored,
      set: (v: number) => {
        stored = v;
      },
    });
    audio.dispatchEvent(new Event("loadedmetadata"));
    expect(stored).toBe(2 * 60 + 26);
  });
});
