import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// Types for better type safety
interface JWTPayload {
  bootstrap?: boolean;
  org_id?: string;
  exp?: number;
  [key: string]: unknown;
}

// Constants
const PATHS = {
  AUTH: "/auth",
  CREATE_ORG: "/auth/create-organization",
  DASHBOARD: "/dashboard",
  PLAYGROUND: "/playground",
  SOURCES: "/sources",
} as const;

const COOKIES = {
  ACCESS_TOKEN: "access_token",
} as const;

// Protected route prefixes
const PROTECTED_ROUTES = [
  PATHS.DASHBOARD,
  PATHS.PLAYGROUND,
  PATHS.SOURCES,
] as const;

/**
 * Middleware to protect authenticated routes
 */
export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Check if the current path is a protected route
  const isProtectedRoute = PROTECTED_ROUTES.some((route) =>
    pathname.startsWith(route),
  );

  // Early return for non-protected routes
  if (!isProtectedRoute) {
    return NextResponse.next();
  }

  const accessToken = request.cookies.get(COOKIES.ACCESS_TOKEN)?.value;

  // 1. No token → redirect to auth
  if (!accessToken) {
    console.log("Access Token not found");
    return redirectToAuth(request);
  }

  // 2. Validate and decode JWT
  const payload = decodeJWT(accessToken);
  if (!payload) {
    console.log("Payload not found");
    return redirectToAuth(request);
  }

  // 3. Check if token is expired
  if (isTokenExpired(payload)) {
    return redirectToAuth(request);
  }

  // 4. Bootstrap token → must finish onboarding
  if (payload.bootstrap) {
    // Prevent redirect loop if already on create-organization page
    if (pathname !== PATHS.CREATE_ORG) {
      return redirectToCreateOrg(request);
    }
    return NextResponse.next();
  }

  // 5. No tenant context → block access
  if (!payload.org_id) {
    return redirectToAuth(request);
  }

  // 6. Valid tenant token → allow access
  return NextResponse.next();
}

/* ---------------- Helper Functions ---------------- */

/**
 * Safely decode JWT payload
 */
function decodeJWT(token: string): JWTPayload | null {
  try {
    const parts = token.split(".");
    if (parts.length !== 3) {
      return null;
    }

    const payload = JSON.parse(
      Buffer.from(parts[1], "base64").toString("utf-8"),
    );
    return payload;
  } catch (error) {
    console.error("Failed to decode JWT:", error);
    return null;
  }
}

/**
 * Check if token is expired
 */
function isTokenExpired(payload: JWTPayload): boolean {
  if (!payload.exp) {
    return false; // No expiration claim
  }

  const currentTime = Math.floor(Date.now() / 1000);
  return payload.exp < currentTime;
}

/**
 * Redirect to auth page with next parameter
 */
function redirectToAuth(request: NextRequest): NextResponse {
  const url = request.nextUrl.clone();
  url.pathname = PATHS.AUTH;
  url.searchParams.set("next", request.nextUrl.pathname);

  return NextResponse.redirect(url);
}

/**
 * Redirect to organization creation page
 */
function redirectToCreateOrg(request: NextRequest): NextResponse {
  const url = request.nextUrl.clone();
  url.pathname = PATHS.CREATE_ORG;
  return NextResponse.redirect(url);
}

/* ---------------- Middleware Configuration ---------------- */

export const config = {
  matcher: [
    /*
     * Match all protected routes:
     * - /dashboard and all sub-routes
     * - /playground and all sub-routes
     * - /sources and all sub-routes
     *
     * Excludes:
     * - API routes (_next/)
     * - Static files (favicon.ico, etc.)
     */
    "/dashboard/:path*",
    "/playground/:path*",
    "/sources/:path*",
  ],
};
