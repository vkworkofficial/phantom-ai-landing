import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { withAuth } from "next-auth/middleware";

export default withAuth(
  function middleware(req: NextRequest) {
    const url = req.nextUrl;
    const hostname = req.headers.get("host");

    // Subdomain routing: Rewrite app.tryphantom.dev/ to /dashboard/
    // Handle both production and local development if hostname contains 'app.'
    const isAppSubdomain = hostname?.startsWith("app.");

    if (isAppSubdomain && url.pathname === "/") {
      return NextResponse.rewrite(new URL("/dashboard", req.url));
    }
    
    // Continue for other paths
    return NextResponse.next();
  },
  {
    callbacks: {
      authorized: ({ token }) => !!token,
    },
    pages: {
      signIn: "/auth/signin", // Ensure we have a sign-in redirect
    }
  }
);

export const config = {
  matcher: [
    "/dashboard/:path*", 
    "/((?!api|_next/static|_next/image|favicon.ico).*)" // Match all except static assets for subdomain check
  ],
};
