"use server";

import { redirect } from "next/navigation";
import { z } from "zod";
import { publicFetch, backendFetch, BackendError, logoutFromBackend } from "@/lib/backend";
import { clearSessionCookies, setSessionCookies } from "@/lib/session";
import type { AuthResult, OtpChannel, PublicCustomer } from "@/types/backend";

const loginSchema = z.object({
  email: z.string().email("Enter a valid email address"),
  password: z.string().min(1, "Password is required"),
});

export type LoginState = { error?: string };

export async function loginAction(
  _prevState: LoginState,
  formData: FormData,
): Promise<LoginState> {
  const parsed = loginSchema.safeParse({
    email: formData.get("email"),
    password: formData.get("password"),
  });
  if (!parsed.success) {
    return { error: parsed.error.issues[0]?.message ?? "Invalid input" };
  }

  try {
    const result = await publicFetch<AuthResult>("/auth/customer/login", {
      method: "POST",
      body: parsed.data,
    });
    await setSessionCookies(result.accessToken, result.refreshToken);
  } catch (err) {
    if (err instanceof BackendError) return { error: err.message };
    if (err instanceof Error && err.name === "AbortError") {
      return { error: "Backend server timed out while waking up. Please try again in a few seconds." };
    }
    if (err instanceof Error && err.message) return { error: err.message };
    return { error: "Something went wrong. Please try again." };
  }

  redirect("/account");
}

const registerSchema = z.object({
  name: z.string().min(1, "Enter your name"),
  email: z.string().email("Enter a valid email address"),
  password: z.string().min(8, "Password must be at least 8 characters"),
});

export type RegisterState = { error?: string };

export async function registerAction(
  _prevState: RegisterState,
  formData: FormData,
): Promise<RegisterState> {
  const parsed = registerSchema.safeParse({
    name: formData.get("name"),
    email: formData.get("email"),
    password: formData.get("password"),
  });
  if (!parsed.success) {
    return { error: parsed.error.issues[0]?.message ?? "Invalid input" };
  }

  try {
    const result = await publicFetch<AuthResult>("/auth/customer/register", {
      method: "POST",
      body: parsed.data,
    });
    await setSessionCookies(result.accessToken, result.refreshToken);
  } catch (err) {
    if (err instanceof BackendError) return { error: err.message };
    if (err instanceof Error && err.name === "AbortError") {
      return { error: "Backend server timed out while waking up. Please try again in a few seconds." };
    }
    if (err instanceof Error && err.message) return { error: err.message };
    return { error: "Something went wrong. Please try again." };
  }

  redirect("/account");
}

export async function sendOtpAction(
  channel: OtpChannel,
  identifier: string,
): Promise<{ error?: string }> {
  try {
    await publicFetch("/auth/customer/otp/send", {
      method: "POST",
      body: { channel, identifier },
    });
  } catch (err) {
    if (err instanceof BackendError) return { error: err.message };
    throw err;
  }
  return {};
}

export async function verifyOtpAction(
  channel: OtpChannel,
  identifier: string,
  code: string,
): Promise<{ error?: string }> {
  try {
    const result = await publicFetch<AuthResult>("/auth/customer/otp/verify", {
      method: "POST",
      body: { channel, identifier, code },
    });
    await setSessionCookies(result.accessToken, result.refreshToken);
  } catch (err) {
    if (err instanceof BackendError) return { error: err.message };
    throw err;
  }
  redirect("/account");
}

const resetPasswordSchema = z.object({
  email: z.string().email(),
  code: z.string().length(6),
  newPassword: z.string().min(8),
});

export async function resetPasswordAction(
  input: z.infer<typeof resetPasswordSchema>,
): Promise<{ error?: string; success?: boolean }> {
  const parsed = resetPasswordSchema.safeParse(input);
  if (!parsed.success) {
    return { error: parsed.error.issues[0]?.message ?? "Invalid input" };
  }
  try {
    await publicFetch("/auth/customer/password/reset", {
      method: "POST",
      body: parsed.data,
    });
  } catch (err) {
    if (err instanceof BackendError) return { error: err.message };
    throw err;
  }
  return { success: true };
}

export async function logoutAction(): Promise<void> {
  await logoutFromBackend();
  await clearSessionCookies();
  redirect("/");
}

const updateProfileSchema = z.object({
  name: z.string().min(1).max(255).optional().or(z.literal("")),
  email: z.string().email().optional().or(z.literal("")),
  phone: z.string().min(3).max(20).optional().or(z.literal("")),
});

export type UpdateProfileState = { error?: string; success?: boolean };

export async function updateProfileAction(
  _prevState: UpdateProfileState,
  formData: FormData,
): Promise<UpdateProfileState> {
  const parsed = updateProfileSchema.safeParse(Object.fromEntries(formData.entries()));
  if (!parsed.success) {
    return { error: parsed.error.issues[0]?.message ?? "Invalid input" };
  }
  const body: Record<string, string> = {};
  for (const [key, value] of Object.entries(parsed.data)) {
    if (value) body[key] = value;
  }
  if (Object.keys(body).length === 0) {
    return { error: "At least one field must be provided" };
  }

  try {
    await backendFetch<{ customer: PublicCustomer }>("/auth/customer/me", {
      method: "PATCH",
      body,
    });
  } catch (err) {
    if (err instanceof BackendError) return { error: err.message };
    throw err;
  }
  return { success: true };
}
