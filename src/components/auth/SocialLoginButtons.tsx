"use client";

import { toast } from "sonner";
import { Button } from "@/components/ui/button";

// The backend's Google/Apple Sign-In endpoints are real and correctly
// wired (POST /auth/customer/google /apple, verified server-side against
// GOOGLE_CLIENT_ID/APPLE_CLIENT_ID) but genuinely unverifiable end-to-end
// right now — no real provider credentials exist in this environment
// (same documented state as the backend's own CLAUDE.md). Rather than
// wire a real OAuth SDK that would just fail against a fake client ID, or
// silently hide the option, these buttons say plainly what's true.
export function SocialLoginButtons() {
  function notConfigured(provider: string) {
    toast.info(`${provider} Sign-In isn't configured in this environment yet.`);
  }

  return (
    <div className="flex flex-col gap-2">
      <Button variant="outline" size="lg" onClick={() => notConfigured("Google")}>
        Continue with Google
      </Button>
      <Button variant="outline" size="lg" onClick={() => notConfigured("Apple")}>
        Continue with Apple
      </Button>
    </div>
  );
}
