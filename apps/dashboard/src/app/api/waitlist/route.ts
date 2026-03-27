import { neon } from "@neondatabase/serverless";
import { NextRequest, NextResponse } from "next/server";

/* ─── Rate Limiting (in-memory, per-instance) ─── */
const rateLimitMap = new Map<string, { count: number; resetAt: number }>();
const RATE_LIMIT = 5;
const RATE_WINDOW_MS = 60_000;

// Cleanup expired rate limit entries every 60s to prevent memory leaks
if (typeof globalThis !== "undefined") {
  setInterval(() => {
    const now = Date.now();
    for (const [key, entry] of rateLimitMap.entries()) {
      if (now > entry.resetAt) rateLimitMap.delete(key);
    }
  }, RATE_WINDOW_MS);
}

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

/* ─── Allowed Origins (Hardened for Production) ─── */
const ALLOWED_ORIGIN_PATTERNS = [
  /^https?:\/\/localhost(:\d+)?$/,
  /^https:\/\/tryphantom\.dev$/,
  /^https:\/\/.*\.tryphantom\.dev$/,
  /^https:\/\/.*\.vercel\.app$/, // Allow Vercel preview URLs
  /^https:\/\/phantom-ai-landing\.vercel\.app$/
];

function isOriginAllowed(origin: string | null): boolean {
  if (!origin) return true; // Allow direct server-to-server or curl
  return ALLOWED_ORIGIN_PATTERNS.some(pattern => pattern.test(origin));
}

/* ─── Security Headers ─── */
const SECURE_HEADERS = {
  "X-Content-Type-Options": "nosniff",
  "X-Frame-Options": "DENY",
  "Referrer-Policy": "strict-origin-when-cross-origin",
  "Content-Security-Policy": "default-src 'self'; img-src 'self'; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline';",
};

/* ─── Global State Substrate ─── */
let tableChecked = false;

/* ─── POST handler ─── */
export async function POST(request: NextRequest) {
  try {
    // 1. Origin Validation
    const origin = request.headers.get("origin");
    if (!isOriginAllowed(origin)) {
      console.warn(`[waitlist] 403: Forbidden origin: ${origin}`);
      return NextResponse.json({ error: "Forbidden" }, { status: 403, headers: SECURE_HEADERS });
    }

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
    
    // Honeypot logic
    if (body?.website || body?.company_url) {
      console.warn(`[waitlist] Bot detected from IP: ${ip}`);
      return NextResponse.json({ success: true, message: "You're on the list." }, { status: 200, headers: SECURE_HEADERS });
    }

    const email = sanitizeEmail(body?.email);
    if (!email) {
      return NextResponse.json(
        { error: "Please enter a valid, corporate or personal email address." },
        { status: 400, headers: SECURE_HEADERS }
      );
    }

    const dbUrl = process.env.DATABASE_URL;
    if (!dbUrl) {
      console.warn("[waitlist] DATABASE_URL missing — accepting email without persistence");
      return NextResponse.json({ success: true, message: "You're on the list." }, { status: 200, headers: SECURE_HEADERS });
    }

    const sql = neon(dbUrl);

    // Optimized table initialization
    if (!tableChecked) {
      try {
        await sql`
          CREATE TABLE IF NOT EXISTS waitlist (
            id SERIAL PRIMARY KEY,
            email VARCHAR(254) UNIQUE NOT NULL,
            created_at TIMESTAMPTZ DEFAULT NOW()
          )
        `;
        tableChecked = true;
      } catch (e) {
        console.error("[waitlist] Table initialization error:", e);
        // Continue anyway; the table might already exist
      }
    }

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
