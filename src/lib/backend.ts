import "server-only";
import { redirect } from "next/navigation";
import { getAccessToken, getRefreshToken } from "./session";

const BASE_URL = process.env.BACKEND_API_URL ?? "http://localhost:3000/api/v1";
const TENANT_DOMAIN = process.env.TENANT_DOMAIN ?? "localhost";

export class BackendError extends Error {
  constructor(
    message: string,
    public readonly code: string | undefined,
    public readonly statusCode: number,
  ) {
    super(message);
    this.name = "BackendError";
  }
}

type Envelope<T> =
  | { status: "success"; statusCode: number; result: T }
  | { status: "failure"; statusCode: number; result: { error: string; code?: string } };

async function parseEnvelope<T>(res: Response): Promise<T> {
  const body = (await res.json()) as Envelope<T>;
  if (body.status === "failure") {
    throw new BackendError(body.result.error, body.result.code, body.statusCode);
  }
  return body.result;
}

function tenantHeaders(extra: Record<string, string> = {}): Record<string, string> {
  return { "x-forwarded-host": TENANT_DOMAIN, ...extra };
}

/** Public, unauthenticated calls — browsing, tenant info, register/login. */
export async function publicFetch<T>(
  path: string,
  options: { method?: string; body?: unknown; timeoutMs?: number } = {},
): Promise<T> {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), options.timeoutMs ?? 8000);

  try {
    const res = await fetch(`${BASE_URL}${path}`, {
      method: options.method ?? "GET",
      headers: tenantHeaders(options.body ? { "Content-Type": "application/json" } : {}),
      body: options.body ? JSON.stringify(options.body) : undefined,
      cache: "no-store",
      signal: controller.signal,
    });
    return await parseEnvelope<T>(res);
  } finally {
    clearTimeout(timeoutId);
  }
}

/** Authenticated calls. Refresh-token rotation happens in middleware.ts on
 * every /account and /checkout request before this ever runs — see its
 * docstring for why that's the only place allowed to write cookies. If the
 * backend still says 401 anyway, redirect to login; there's no
 * cookie-write recovery available from inside a Server Component. */
export async function backendFetch<T>(
  path: string,
  options: { method?: string; body?: unknown; timeoutMs?: number } = {},
): Promise<T> {
  const accessToken = await getAccessToken();
  if (!accessToken) {
    redirect("/login?reason=expired");
  }

  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), options.timeoutMs ?? 8000);

  try {
    const res = await fetch(`${BASE_URL}${path}`, {
      method: options.method ?? "GET",
      headers: tenantHeaders({
        Authorization: `Bearer ${accessToken}`,
        ...(options.body ? { "Content-Type": "application/json" } : {}),
      }),
      body: options.body ? JSON.stringify(options.body) : undefined,
      cache: "no-store",
      signal: controller.signal,
    });

    if (res.status === 401) {
      redirect("/login?reason=expired");
    }

    return await parseEnvelope<T>(res);
  } finally {
    clearTimeout(timeoutId);
  }
}

export async function logoutFromBackend(): Promise<void> {
  const refreshToken = await getRefreshToken();
  if (refreshToken) {
    try {
      await fetch(`${BASE_URL}/auth/customer/logout`, {
        method: "POST",
        headers: tenantHeaders({ "Content-Type": "application/json" }),
        body: JSON.stringify({ refreshToken }),
        cache: "no-store",
      });
    } catch {
      // Best-effort server-side revocation — clearing local cookies is
      // what actually ends the session from this app's side either way.
    }
  }
}
