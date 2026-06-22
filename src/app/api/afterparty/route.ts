import { NextResponse } from "next/server";
import {
  addAfterparty,
  getAllAfterparty,
  type AfterpartyEntry,
} from "@/lib/rsvp-store";

const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || "lorena2026";

// Force the Node.js runtime so @vercel/kv works on Vercel.
export const runtime = "nodejs";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    if (!body.name || !String(body.name).trim()) {
      return NextResponse.json(
        { error: "Name is required" },
        { status: 400 },
      );
    }

    const entry: AfterpartyEntry = {
      id: crypto.randomUUID(),
      name: String(body.name).trim().slice(0, 100),
      message: body.message
        ? String(body.message).trim().slice(0, 500)
        : undefined,
      timestamp: new Date().toISOString(),
    };

    await addAfterparty(entry);

    return NextResponse.json({ success: true, id: entry.id });
  } catch (err) {
    console.error("Afterparty POST failed", err);
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

  const entries = await getAllAfterparty();
  const stats = { total: entries.length };

  return NextResponse.json({ entries, stats });
}
