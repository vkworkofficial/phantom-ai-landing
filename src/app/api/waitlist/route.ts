import { neon } from "@neondatabase/serverless";
import { NextRequest, NextResponse } from "next/server";

/* ─── Rate Limiting (in-memory, per-instance) ─── */
const rateLimitMap = new Map<string, { count: number; resetAt: number }>();
const RATE_LIMIT = 5;
const RATE_WINDOW_MS = 60_000;

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const entry = rateLimitMap.get(ip);
  if (!entry || now > entry.resetAt) {
    rateLimitMap.set(ip, { count: 1, resetAt: now + RATE_WINDOW_MS });
    return false;
  }
  entry.count++;
  return entry.count > RATE_LIMIT;
}

/* ─── Email Validation ─── */
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

function sanitizeEmail(raw: unknown): string | null {
  if (typeof raw !== "string") return null;
  const trimmed = raw.trim().toLowerCase();
  if (trimmed.length > 254) return null;
  if (!EMAIL_RE.test(trimmed)) return null;
  return trimmed;
}

/* ─── Security Headers ─── */
const SECURE_HEADERS = {
  "X-Content-Type-Options": "nosniff",
  "X-Frame-Options": "DENY",
  "Referrer-Policy": "strict-origin-when-cross-origin",
};

/* ─── POST handler ─── */
export async function POST(request: NextRequest) {
  try {
    const ip =
      request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ??
      request.headers.get("x-real-ip") ??
      "unknown";

    if (isRateLimited(ip)) {
      return NextResponse.json(
        { error: "Too many requests. Please try again later." },
        { status: 429, headers: SECURE_HEADERS }
      );
    }

    const body = await request.json().catch(() => null);
    const email = sanitizeEmail(body?.email);

    if (!email) {
      return NextResponse.json(
        { error: "Please enter a valid email address." },
        { status: 400, headers: SECURE_HEADERS }
      );
    }

    const dbUrl = process.env.DATABASE_URL;
    if (!dbUrl) {
      // Graceful fallback when DB is not configured yet
      console.warn("[waitlist] DATABASE_URL not set — accepting email silently");
      return NextResponse.json(
        { success: true, message: "You're on the list." },
        { status: 200, headers: SECURE_HEADERS }
      );
    }

    const sql = neon(dbUrl);

    // Auto-create table + insert in sequence
    await sql`
      CREATE TABLE IF NOT EXISTS waitlist (
        id SERIAL PRIMARY KEY,
        email VARCHAR(254) UNIQUE NOT NULL,
        created_at TIMESTAMPTZ DEFAULT NOW()
      )
    `;

    await sql`
      INSERT INTO waitlist (email) VALUES (${email})
      ON CONFLICT (email) DO NOTHING
    `;

    return NextResponse.json(
      { success: true, message: "You're on the list." },
      { status: 200, headers: SECURE_HEADERS }
    );
  } catch (err) {
    console.error("[waitlist] Unexpected error:", err);
    return NextResponse.json(
      { error: "Something went wrong. Please try again." },
      { status: 500, headers: SECURE_HEADERS }
    );
  }
}
