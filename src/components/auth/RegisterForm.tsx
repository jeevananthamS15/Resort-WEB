"use client";

import { useActionState } from "react";
import { registerAction, type RegisterState } from "@/actions/auth.actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export function RegisterForm() {
  const [state, formAction, pending] = useActionState<RegisterState, FormData>(
    registerAction,
    {},
  );

  return (
    <form action={formAction} className="flex flex-col gap-5">
      <div className="flex flex-col gap-1.5">
        <Label htmlFor="name">Full name</Label>
        <Input id="name" name="name" autoComplete="name" required />
      </div>
      <div className="flex flex-col gap-1.5">
        <Label htmlFor="email">Email</Label>
        <Input id="email" name="email" type="email" autoComplete="email" required />
      </div>
      <div className="flex flex-col gap-1.5">
        <Label htmlFor="password">Password</Label>
        <Input
          id="password"
          name="password"
          type="password"
          autoComplete="new-password"
          minLength={8}
          required
        />
      </div>

      {state.error && (
        <p className="text-sm text-destructive" role="alert">
          {state.error}
        </p>
      )}

      <Button type="submit" disabled={pending} className="w-full" size="lg">
        {pending ? "Creating account…" : "Create account"}
      </Button>
    </form>
  );
}
