import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!api|_next/static|_next/image|favicon.ico|fnaf.mp3|images).*)',
  ],
};

export function middleware(req: NextRequest) {
  const url = req.nextUrl;
  
  // Get hostname of request (e.g. app.tryphantom.dev, app.localhost:3000)
  const host = req.headers.get('host') || 'localhost:3000';
  const hostname = host.replace('.localhost:3000', `.${process.env.NEXT_PUBLIC_ROOT_DOMAIN || 'localhost:3000'}`);

  // Determine if it's the app subdomain or if we are accessing dashboard directly
  const isAppSubdomain = 
    hostname.startsWith('app.') || 
    hostname === `app.${process.env.NEXT_PUBLIC_ROOT_DOMAIN}`;

  const isDashboardPath = url.pathname.startsWith('/dashboard');
  const isOnboardingPath = url.pathname.startsWith('/onboarding');

  // NextAuth standard cookie names
  const hasSession = 
    req.cookies.has('next-auth.session-token') || 
    req.cookies.has('__Secure-next-auth.session-token');

  // If it's the app subdomain OR we are on a protected path, enforce session
  if (isAppSubdomain || isDashboardPath || isOnboardingPath) {
    if (!hasSession) {
        // Exclude /login and /waitlist from redirect loops
        if (url.pathname !== '/login' && url.pathname !== '/waitlist') {
            return NextResponse.redirect(new URL('/login', req.url));
        }
    }

    if (isAppSubdomain && url.pathname === '/') {
      return NextResponse.rewrite(new URL('/dashboard', req.url));
    }
  }

  // Otherwise, continue as normal (root website)
  return NextResponse.next();
}
