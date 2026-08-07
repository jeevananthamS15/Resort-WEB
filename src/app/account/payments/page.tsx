import Link from "next/link";
import { CreditCard, ShieldCheck } from "lucide-react";

export default function PaymentsPage() {
  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="font-heading text-2xl font-bold text-foreground">Payment History & Invoices</h1>
        <p className="text-sm text-muted-foreground mt-1">Review past transactions and download official billing tax invoices.</p>
      </div>

      <div className="rounded-3xl border border-border/60 bg-card p-8 shadow-sm flex flex-col gap-4">
        <div className="flex items-center gap-3 text-sm text-muted-foreground pb-4 border-b border-border/60">
          <ShieldCheck className="size-5 text-emerald-600 shrink-0" />
          <span>All transactions processed via 256-bit encrypted Razorpay payment gateways.</span>
        </div>
        <p className="text-sm text-muted-foreground">Select any completed booking from your <Link href="/account/bookings" className="text-primary underline">My Bookings</Link> section to download its invoice.</p>
      </div>
    </div>
  );
}
