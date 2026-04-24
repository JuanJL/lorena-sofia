import { readFileSync, writeFileSync, existsSync } from "fs";
import { join } from "path";
import { NextResponse } from "next/server";

const DATA_FILE = join(process.cwd(), "data", "rsvps.json");
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || "lorena2026";

interface RSVP {
  id: string;
  name: string;
  email?: string;
  guests: number;
  attendance: "yes" | "no" | "maybe";
  message?: string;
  timestamp: string;
}

function getRSVPs(): RSVP[] {
  try {
    if (!existsSync(DATA_FILE)) return [];
    return JSON.parse(readFileSync(DATA_FILE, "utf-8"));
  } catch {
    return [];
  }
}

function saveRSVPs(rsvps: RSVP[]) {
  writeFileSync(DATA_FILE, JSON.stringify(rsvps, null, 2));
}

export async function POST(request: Request) {
  try {
    const body = await request.json();

    if (!body.name || !body.attendance) {
      return NextResponse.json(
        { error: "Name and attendance are required" },
        { status: 400 }
      );
    }

    const rsvps = getRSVPs();
    const newRSVP: RSVP = {
      id: crypto.randomUUID(),
      name: body.name.trim(),
      email: body.email?.trim() || undefined,
      guests: Math.min(Math.max(Number(body.guests) || 1, 1), 5),
      attendance: body.attendance,
      message: body.message?.trim() || undefined,
      timestamp: new Date().toISOString(),
    };

    rsvps.push(newRSVP);
    saveRSVPs(rsvps);

    return NextResponse.json({ success: true, id: newRSVP.id });
  } catch {
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const password = searchParams.get("password");

  if (password !== ADMIN_PASSWORD) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const rsvps = getRSVPs();

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
