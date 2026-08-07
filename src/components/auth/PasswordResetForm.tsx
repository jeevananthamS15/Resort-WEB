"use client";

import { useEffect, useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { sendOtpAction, resetPasswordAction } from "@/actions/auth.actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const RESEND_COOLDOWN_SECONDS = 60;

export function PasswordResetForm() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [sent, setSent] = useState(false);
  const [cooldown, setCooldown] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    if (cooldown <= 0) return;
    const timer = setInterval(() => setCooldown((c) => Math.max(0, c - 1)), 1000);
    return () => clearInterval(timer);
  }, [cooldown]);

  function handleSend() {
    setError(null);
    if (!email.includes("@")) {
      setError("Enter a valid email address");
      return;
    }
    startTransition(async () => {
      const result = await sendOtpAction("otp_email", email);
      if (result.error) {
        setError(result.error);
      } else {
        setSent(true);
        setCooldown(RESEND_COOLDOWN_SECONDS);
        toast.success("Code sent to your email");
      }
    });
  }

  function handleReset() {
    setError(null);
    if (code.length !== 6) {
      setError("Enter the 6-digit code");
      return;
    }
    if (newPassword.length < 8) {
      setError("New password must be at least 8 characters");
      return;
    }
    startTransition(async () => {
      const result = await resetPasswordAction({ email, code, newPassword });
      if (result.error) {
        setError(result.error);
      } else {
        toast.success("Password changed — sign in with your new password.");
        router.push("/login");
      }
    });
  }

  return (
    <div className="flex flex-col gap-5">
      <div className="flex flex-col gap-1.5">
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          type="email"
          value={email}
          disabled={sent}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>

      {sent && (
        <>
          <div className="flex flex-col gap-1.5">
            <Label htmlFor="code">6-digit code</Label>
            <Input
              id="code"
              value={code}
              onChange={(e) => setCode(e.target.value.replace(/\D/g, "").slice(0, 6))}
              maxLength={6}
              inputMode="numeric"
              autoFocus
            />
          </div>
          <div className="flex flex-col gap-1.5">
            <Label htmlFor="newPassword">New password</Label>
            <Input
              id="newPassword"
              type="password"
              minLength={8}
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />
          </div>
        </>
      )}

      {error && (
        <p className="text-sm text-destructive" role="alert">
          {error}
        </p>
      )}

      {!sent ? (
        <Button onClick={handleSend} disabled={isPending} size="lg">
          {isPending ? "Sending…" : "Send reset code"}
        </Button>
      ) : (
        <div className="flex flex-col gap-2">
          <Button onClick={handleReset} disabled={isPending} size="lg">
            {isPending ? "Resetting…" : "Reset password"}
          </Button>
          <Button
            variant="ghost"
            size="sm"
            disabled={cooldown > 0 || isPending}
            onClick={handleSend}
          >
            {cooldown > 0 ? `Resend in ${cooldown}s` : "Resend code"}
          </Button>
        </div>
      )}
    </div>
  );
}
