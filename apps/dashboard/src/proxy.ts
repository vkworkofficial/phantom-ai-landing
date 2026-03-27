import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

/**
 * Next.js 16 Proxy — lightweight request interception layer.
 * Heavy auth logic lives in the NextAuth route handler and server components.
 * This proxy handles subdomain routing and basic session cookie checks only.
 */
export function proxy(req: NextRequest) {
  const url = req.nextUrl;
  const hostname = req.headers.get("host");

  // Subdomain routing: Rewrite app.tryphantom.dev/ to /dashboard/
  const isAppSubdomain = hostname?.startsWith("app.");

  if (isAppSubdomain && url.pathname === "/") {
    return NextResponse.rewrite(new URL("/dashboard", req.url));
  }

  // Lightweight auth gate: check for session cookie on dashboard routes
  const isProtectedRoute = url.pathname.startsWith("/dashboard");
  const hasSessionCookie =
    req.cookies.has("next-auth.session-token") ||
    req.cookies.has("__Secure-next-auth.session-token");

  if (isProtectedRoute && !hasSessionCookie) {
    const loginUrl = new URL("/login", req.url);
    loginUrl.searchParams.set("callbackUrl", url.pathname);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/dashboard/:path*",
    "/((?!api|_next/static|_next/image|favicon.ico|robots.txt|sitemap.xml|manifest.webmanifest).*)",
  ],
};
