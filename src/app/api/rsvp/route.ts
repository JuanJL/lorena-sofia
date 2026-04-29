import { NextResponse } from "next/server";
import { addRSVP, getAllRSVPs, type RSVP } from "@/lib/rsvp-store";

const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || "lorena2026";

// Force the route onto the Node.js runtime so @vercel/kv works on Vercel
// (the edge runtime doesn't ship the same redis client APIs).
export const runtime = "nodejs";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    if (!body.name || !body.attendance) {
      return NextResponse.json(
        { error: "Name and attendance are required" },
        { status: 400 },
      );
    }

    const newRSVP: RSVP = {
      id: crypto.randomUUID(),
      name: String(body.name).trim(),
      email: body.email ? String(body.email).trim() : undefined,
      guests: Math.min(Math.max(Number(body.guests) || 1, 1), 5),
      attendance: body.attendance,
      message: body.message ? String(body.message).trim() : undefined,
      timestamp: new Date().toISOString(),
    };

    await addRSVP(newRSVP);

    return NextResponse.json({ success: true, id: newRSVP.id });
  } catch (err) {
    console.error("RSVP POST failed", err);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const password = searchParams.get("password");

  if (password !== ADMIN_PASSWORD) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const rsvps = await getAllRSVPs();

  const stats = {
    total: rsvps.length,
    attending: rsvps
      .filter((r) => r.attendance === "yes")
      .reduce((sum, r) => sum + r.guests, 0),
    notAttending: rsvps.filter((r) => r.attendance === "no").length,
    maybe: rsvps.filter((r) => r.attendance === "maybe").length,
    totalGuests: rsvps.reduce((sum, r) => sum + r.guests, 0),
  };

  return NextResponse.json({ rsvps, stats });
}
