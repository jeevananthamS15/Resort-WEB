"use client";

import { useActionState, useEffect } from "react";
import { toast } from "sonner";
import { updateProfileAction, type UpdateProfileState } from "@/actions/auth.actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import type { PublicCustomer } from "@/types/backend";

export function ProfileForm({ customer }: { customer: PublicCustomer }) {
  const [state, formAction, pending] = useActionState<UpdateProfileState, FormData>(
    updateProfileAction,
    {},
  );

  useEffect(() => {
    if (state.success) toast.success("Profile updated");
  }, [state.success]);

  return (
    <form action={formAction} className="flex max-w-md flex-col gap-4">
      <div className="flex flex-col gap-1.5">
        <Label htmlFor="name">Name</Label>
        <Input id="name" name="name" defaultValue={customer.name} />
      </div>
      <div className="flex flex-col gap-1.5">
        <Label htmlFor="email">Email</Label>
        <Input id="email" name="email" type="email" defaultValue={customer.email ?? ""} />
      </div>
      <div className="flex flex-col gap-1.5">
        <Label htmlFor="phone">Phone</Label>
        <Input id="phone" name="phone" defaultValue={customer.phone ?? ""} />
      </div>

      {state.error && (
        <p className="text-sm text-destructive" role="alert">
          {state.error}
        </p>
      )}

      <Button type="submit" disabled={pending} className="w-fit">
        {pending ? "Saving…" : "Save changes"}
      </Button>
    </form>
  );
}
