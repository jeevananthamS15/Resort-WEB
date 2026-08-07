import "server-only";
import { cookies } from "next/headers";

const ACCESS_COOKIE_NAME = process.env.ACCESS_COOKIE_NAME ?? "rms_customer_access";
const REFRESH_COOKIE_NAME = process.env.REFRESH_COOKIE_NAME ?? "rms_customer_refresh";

const ACCESS_MAX_AGE_SECONDS = 15 * 60;
const REFRESH_MAX_AGE_SECONDS = 30 * 24 * 60 * 60;

export async function setSessionCookies(
  accessToken: string,
  refreshToken: string,
): Promise<void> {
  const store = await cookies();
  const shared = {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax" as const,
    path: "/",
  };
  store.set(ACCESS_COOKIE_NAME, accessToken, { ...shared, maxAge: ACCESS_MAX_AGE_SECONDS });
  store.set(REFRESH_COOKIE_NAME, refreshToken, { ...shared, maxAge: REFRESH_MAX_AGE_SECONDS });
}

export async function clearSessionCookies(): Promise<void> {
  const store = await cookies();
  store.delete(ACCESS_COOKIE_NAME);
  store.delete(REFRESH_COOKIE_NAME);
}

export async function getAccessToken(): Promise<string | undefined> {
  const store = await cookies();
  return store.get(ACCESS_COOKIE_NAME)?.value;
}

export async function getRefreshToken(): Promise<string | undefined> {
  const store = await cookies();
  return store.get(REFRESH_COOKIE_NAME)?.value;
}

export async function isLoggedIn(): Promise<boolean> {
  return Boolean(await getRefreshToken());
}
