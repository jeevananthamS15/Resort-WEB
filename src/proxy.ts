import { NextRequest, NextResponse } from "next/server";
import { decodeJwt } from "jose";

const ACCESS_COOKIE_NAME = process.env.ACCESS_COOKIE_NAME ?? "rms_customer_access";
const REFRESH_COOKIE_NAME = process.env.REFRESH_COOKIE_NAME ?? "rms_customer_refresh";
const BASE_URL = process.env.BACKEND_API_URL ?? "http://localhost:3000/api/v1";
const TENANT_DOMAIN = process.env.TENANT_DOMAIN ?? "localhost";

/** Next.js only allows writing cookies from Middleware, Server Actions, or
 * Route Handlers — never from a Server Component render. Refresh-token
 * rotation has to happen here, before any protected page renders — this
 * is the architecture resort-admin-web arrived at after its first version
 * (self-refresh inside the Server-Component-called fetch helper) crashed
 * with "Cookies can only be modified in a Server Action or Route
 * Handler." Applied correctly from the start here. */
export async function proxy(req: NextRequest) {
  const access = req.cookies.get(ACCESS_COOKIE_NAME)?.value;
  const refresh = req.cookies.get(REFRESH_COOKIE_NAME)?.value;

  if (!refresh) {
    return redirectToLogin(req);
  }

  if (access && !isExpired(access)) {
    return NextResponse.next();
  }

  const rotated = await tryRefresh(refresh);
  if (!rotated) {
    return redirectToLogin(req);
  }

  const res = NextResponse.next();
  const shared = {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax" as const,
    path: "/",
  };
  res.cookies.set(ACCESS_COOKIE_NAME, rotated.accessToken, { ...shared, maxAge: 15 * 60 });
  res.cookies.set(REFRESH_COOKIE_NAME, rotated.refreshToken, {
    ...shared,
    maxAge: 30 * 24 * 60 * 60,
  });
  return res;
}

function isExpired(token: string): boolean {
  try {
    const payload = decodeJwt(token);
    if (!payload.exp) return true;
    return Date.now() >= payload.exp * 1000 - 5000;
  } catch {
    return true;
  }
}

async function tryRefresh(
  refreshToken: string,
): Promise<{ accessToken: string; refreshToken: string } | null> {
  try {
    const res = await fetch(`${BASE_URL}/auth/customer/refresh`, {
      method: "POST",
      headers: { "Content-Type": "application/json", "x-forwarded-host": TENANT_DOMAIN },
      body: JSON.stringify({ refreshToken }),
      cache: "no-store",
    });
    if (!res.ok) return null;
    const body = await res.json();
    if (body.status !== "success") return null;
    return { accessToken: body.result.accessToken, refreshToken: body.result.refreshToken };
  } catch {
    return null;
  }
}

function redirectToLogin(req: NextRequest) {
  const url = new URL("/login", req.url);
  url.searchParams.set("reason", "expired");
  const res = NextResponse.redirect(url);
  res.cookies.delete(ACCESS_COOKIE_NAME);
  res.cookies.delete(REFRESH_COOKIE_NAME);
  return res;
}

// Browsing (/, /rooms, /rooms/[id]) is public — no login required to look
// around. Only the account area and the actual booking/payment flow need
// a session.
export const config = {
  matcher: ["/account/:path*", "/checkout/:path*"],
};
