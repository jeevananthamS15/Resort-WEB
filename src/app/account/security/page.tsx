"use client";

import { useState } from "react";
import { Lock, ShieldAlert, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";

export default function SecurityPage() {
  const [pending, setPending] = useState(false);

  function handleSave(e: React.FormEvent) {
    e.preventDefault();
    setPending(true);
    setTimeout(() => {
      setPending(false);
      toast.success("Security settings updated successfully");
    }, 800);
  }

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="font-heading text-2xl font-bold text-foreground">Security & Password</h1>
        <p className="text-sm text-muted-foreground mt-1">Manage your account password and authentication settings.</p>
      </div>

      <form onSubmit={handleSave} className="rounded-3xl border border-border/60 bg-card p-6 sm:p-8 shadow-sm flex flex-col gap-4 max-w-md">
        <div className="flex flex-col gap-1.5">
          <Label htmlFor="cur-pass">Current Password</Label>
          <Input id="cur-pass" type="password" required className="rounded-xl" />
        </div>
        <div className="flex flex-col gap-1.5">
          <Label htmlFor="new-pass">New Password</Label>
          <Input id="new-pass" type="password" required className="rounded-xl" />
        </div>
        <div className="flex flex-col gap-1.5">
          <Label htmlFor="cnf-pass">Confirm New Password</Label>
          <Input id="cnf-pass" type="password" required className="rounded-xl" />
        </div>

        <Button type="submit" disabled={pending} className="rounded-full w-full sm:w-fit mt-2">
          {pending ? "Updating..." : "Update Password"}
        </Button>
      </form>
    </div>
  );
}
