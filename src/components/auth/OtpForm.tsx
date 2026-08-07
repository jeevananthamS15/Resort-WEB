"use client";

import { useEffect, useState, useTransition } from "react";
import { toast } from "sonner";
import { sendOtpAction, verifyOtpAction } from "@/actions/auth.actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type { OtpChannel } from "@/types/backend";

const CHANNELS: { value: OtpChannel; label: string; placeholder: string }[] = [
  { value: "otp_email", label: "Email", placeholder: "you@example.com" },
  { value: "otp_sms", label: "SMS", placeholder: "+91 98765 43210" },
  { value: "otp_whatsapp", label: "WhatsApp", placeholder: "+91 98765 43210" },
];

const RESEND_COOLDOWN_SECONDS = 60;

export function OtpForm() {
  const [channel, setChannel] = useState<OtpChannel>("otp_email");
  const [identifier, setIdentifier] = useState("");
  const [code, setCode] = useState("");
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
    if (!identifier.trim()) {
      setError("Enter your contact info first");
      return;
    }
    startTransition(async () => {
      const result = await sendOtpAction(channel, identifier);
      if (result.error) {
        setError(result.error);
      } else {
        setSent(true);
        setCooldown(RESEND_COOLDOWN_SECONDS);
        toast.success("Code sent — check your " + CHANNELS.find((c) => c.value === channel)?.label);
      }
    });
  }

  function handleVerify() {
    setError(null);
    if (code.length !== 6) {
      setError("Enter the 6-digit code");
      return;
    }
    startTransition(async () => {
      const result = await verifyOtpAction(channel, identifier, code);
      if (result?.error) setError(result.error);
    });
  }

  return (
    <div className="flex flex-col gap-5">
      <div className="flex flex-col gap-1.5">
        <Label>Send code via</Label>
        <Select
          value={channel}
          onValueChange={(v) => v && setChannel(v as OtpChannel)}
          disabled={sent}
        >
          <SelectTrigger className="w-full">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {CHANNELS.map((c) => (
              <SelectItem key={c.value} value={c.value}>
                {c.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="flex flex-col gap-1.5">
        <Label htmlFor="identifier">
          {CHANNELS.find((c) => c.value === channel)?.label}
        </Label>
        <Input
          id="identifier"
          value={identifier}
          disabled={sent}
          placeholder={CHANNELS.find((c) => c.value === channel)?.placeholder}
          onChange={(e) => setIdentifier(e.target.value)}
        />
      </div>

      {sent && (
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
      )}

      {error && (
        <p className="text-sm text-destructive" role="alert">
          {error}
        </p>
      )}

      {!sent ? (
        <Button onClick={handleSend} disabled={isPending} size="lg">
          {isPending ? "Sending…" : "Send code"}
        </Button>
      ) : (
        <div className="flex flex-col gap-2">
          <Button onClick={handleVerify} disabled={isPending} size="lg">
            {isPending ? "Verifying…" : "Verify & continue"}
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
