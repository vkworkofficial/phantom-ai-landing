import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

/**
 * High-Integrity Forensic Middleware (v4.3-hardened)
 * Unifies Subdomain Proxying, Auth Gating, and Security Header Injection.
 */
export function middleware(req: NextRequest) {
  const url = req.nextUrl;
  const hostname = req.headers.get("host") || "";
  const response = NextResponse.next();

  // 1. Forensic Header Injection (SOC 2 Aligned)
  const traceId = crypto.randomUUID();
  response.headers.set("X-Phantom-Trace-Id", traceId);
  response.headers.set("X-Phantom-Substrate", "v4.3-hardened");

  // 2. Block Legacy Browsers (Enterprise Resilience)
  const ua = req.headers.get("user-agent") || "";
  if (ua.includes("MSIE") || ua.includes("Trident")) {
    return new NextResponse(
      JSON.stringify({ error: "Incompatible client substrate. Please use an evergreen browser." }),
      { status: 403, headers: { "content-type": "application/json" } }
    );
  }

  // 3. Subdomain Routing Logic
  // Rewrite app.tryphantom.dev/ to /dashboard/ internally
  const isAppSubdomain = hostname.startsWith("app.");
  if (isAppSubdomain && url.pathname === "/") {
    return NextResponse.rewrite(new URL("/dashboard", req.url));
  }

  // 4. Lightweight Auth Gate (Compliance Substrate)
  const isProtectedRoute = url.pathname.startsWith("/dashboard");
  const hasSessionCookie =
    req.cookies.has("next-auth.session-token") ||
    req.cookies.has("__Secure-next-auth.session-token");

  if (isProtectedRoute && !hasSessionCookie) {
    const loginUrl = new URL("/login", req.url);
    loginUrl.searchParams.set("callbackUrl", url.pathname);
    return NextResponse.redirect(loginUrl);
  }

  return response;
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - robots.txt, sitemap.xml, manifest.webmanifest
     */
    "/((?!api|_next/static|_next/image|favicon.ico|robots.txt|sitemap.xml|manifest.webmanifest).*)",
  ],
};
