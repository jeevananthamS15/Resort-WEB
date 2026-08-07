import Link from "next/link";
import { PasswordResetForm } from "@/components/auth/PasswordResetForm";

export default function PasswordResetPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="w-full max-w-sm">
        <Link href="/" className="mb-8 inline-flex items-center gap-2.5">
          <div className="flex h-9 w-9 items-center justify-center rounded-md bg-primary font-heading text-primary-foreground">
            R
          </div>
          <span className="font-heading text-lg text-foreground">Reset password</span>
        </Link>

        <div className="rounded-lg border border-border bg-card p-6 shadow-sm">
          <PasswordResetForm />
        </div>

        <p className="mt-6 text-center text-sm text-muted-foreground">
          <Link href="/login" className="text-primary hover:underline">
            Back to sign in
          </Link>
        </p>
      </div>
    </div>
  );
}
