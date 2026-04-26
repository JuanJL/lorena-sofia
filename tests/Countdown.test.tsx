import { render, screen } from "@testing-library/react";
import { describe, it, expect, beforeEach, afterEach, vi } from "vitest";
import Countdown from "@/components/Countdown";
import { LanguageProvider } from "@/context/LanguageContext";

function renderWithProviders(ui: React.ReactElement) {
  return render(<LanguageProvider>{ui}</LanguageProvider>);
}

describe("Countdown", () => {
  beforeEach(() => {
    // Freeze time exactly 100 days before the party so we get a deterministic countdown
    // Target: 2026-06-27T20:00:00+02:00
    vi.useFakeTimers();
    vi.setSystemTime(new Date("2026-03-19T20:00:00+02:00"));
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it("shows the days, hours, minutes, seconds segments", () => {
    renderWithProviders(<Countdown />);
    // Default language is Spanish in this app
    expect(screen.getByText(/d[ií]as/i)).toBeInTheDocument();
    expect(screen.getByText(/horas/i)).toBeInTheDocument();
    expect(screen.getByText(/min/i)).toBeInTheDocument();
    expect(screen.getByText(/seg/i)).toBeInTheDocument();
  });

  it("shows 100 days when 100 days remain", () => {
    renderWithProviders(<Countdown />);
    expect(screen.getByText("100")).toBeInTheDocument();
  });

  it("renders only non-negative values (never goes negative if past)", () => {
    vi.setSystemTime(new Date("2027-01-01T00:00:00+02:00")); // after the party
    renderWithProviders(<Countdown />);
    // All zeros expected
    const zeros = screen.getAllByText(/^0+$/);
    expect(zeros.length).toBeGreaterThanOrEqual(3);
  });
});
