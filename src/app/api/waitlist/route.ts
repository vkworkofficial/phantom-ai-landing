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

/* ─── Email Validation & Spam Prevention ─── */
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

// Top disposable email domains
const DISPOSABLE_DOMAINS = new Set([
  "mailinator.com", "yopmail.com", "10minutemail.com", "temp-mail.org",
  "guerrillamail.com", "sharklasers.com", "throwawaymail.com", "maildrop.cc",
  "dispostable.com", "fakeinbox.com", "nada.ltd", "getnada.com"
]);

// Detects gibberish like dgjssdigjsg.com (6+ consecutive consonants)
const GIBBERISH_DOMAIN_RE = /[bcdfghjklmnpqrstvwxz]{6,}/i;

function sanitizeEmail(raw: unknown): string | null {
  if (typeof raw !== "string") return null;
  const trimmed = raw.trim().toLowerCase();
  if (trimmed.length > 254) return null;
  if (!EMAIL_RE.test(trimmed)) return null;

  const domain = trimmed.split('@')[1];
  
  // 1. Block disposable domains
  if (DISPOSABLE_DOMAINS.has(domain)) return null;
  
  // 2. Block gibberish domains (e.g. dgjssdigjsg.com)
  if (GIBBERISH_DOMAIN_RE.test(domain)) return null;

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
    
    // FAANG Bot Prevention: Invisible Honeypot Check
    // If the hidden 'website' or 'company_url' field is filled, it's a bot.
    if (body?.website || body?.company_url) {
      console.warn(`[waitlist] Bot detected via honeypot from IP: ${ip}`);
      // Return 200 to trick the bot into thinking it succeeded
      return NextResponse.json(
        { success: true, message: "You're on the list." },
        { status: 200, headers: SECURE_HEADERS }
      );
    }

    const email = sanitizeEmail(body?.email);

    if (!email) {
      return NextResponse.json(
        { error: "Please enter a valid, corporate or personal email address. Disposable or invalid domains are not permitted." },
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
