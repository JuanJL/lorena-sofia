import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect, beforeEach, vi } from "vitest";
import AfterpartySection from "@/components/AfterpartySection";
import { LanguageProvider } from "@/context/LanguageContext";

function renderSection() {
  return render(
    <LanguageProvider>
      <AfterpartySection />
    </LanguageProvider>,
  );
}

beforeEach(() => {
  vi.restoreAllMocks();
});

describe("AfterpartySection", () => {
  it("shows the match: Colombia, Portugal, the time and Napols", () => {
    renderSection();
    expect(screen.getByText("Colombia")).toBeInTheDocument();
    expect(screen.getByText("Portugal")).toBeInTheDocument();
    expect(screen.getByText("Napols")).toBeInTheDocument();
    expect(screen.getByText(/2:00 AM/)).toBeInTheDocument();
  });

  it("has an anchor id 'afterparty' so other sections can link to it", () => {
    const { container } = renderSection();
    expect(container.querySelector("#afterparty")).not.toBeNull();
  });

  it("renders a name field and a sign-up button", () => {
    renderSection();
    expect(
      screen.getByRole("button", { name: /there|estaré/i }),
    ).toBeInTheDocument();
    // At least one text input (the name field)
    expect(
      document.querySelector('input[required]'),
    ).not.toBeNull();
  });

  it("posts the sign-up to /api/afterparty and shows a confirmation", async () => {
    const fetchMock = vi
      .spyOn(global, "fetch")
      .mockResolvedValue(
        new Response(JSON.stringify({ success: true, id: "x" }), {
          status: 200,
          headers: { "Content-Type": "application/json" },
        }),
      );

    const user = userEvent.setup();
    renderSection();

    const nameInput = document.querySelector(
      "input[required]",
    ) as HTMLInputElement;
    await user.type(nameInput, "Carlos");
    await user.click(
      screen.getByRole("button", { name: /there|estaré/i }),
    );

    await waitFor(() => {
      expect(fetchMock).toHaveBeenCalledWith(
        "/api/afterparty",
        expect.objectContaining({ method: "POST" }),
      );
    });

    // The body carries the typed name
    const body = JSON.parse(
      (fetchMock.mock.calls[0][1] as RequestInit).body as string,
    );
    expect(body.name).toBe("Carlos");

    // Confirmation appears
    await waitFor(() => {
      expect(
        screen.getByText(/see you at the afterparty|nos vemos en el afterparty/i),
      ).toBeInTheDocument();
    });
  });
});
