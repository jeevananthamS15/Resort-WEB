"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { createAndPayAction } from "@/actions/booking.actions";
import { openRazorpayCheckout } from "@/lib/razorpay";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import type { CustomerPaymentMethod } from "@/types/backend";

const METHODS: { value: CustomerPaymentMethod; label: string }[] = [
  { value: "CREDIT_CARD", label: "Credit card" },
  { value: "DEBIT_CARD", label: "Debit card" },
  { value: "NET_BANKING", label: "Net banking" },
];

export function CheckoutForm({
  roomId,
  checkInDate,
  checkOutDate,
  guestCount,
  total,
  resortName,
}: {
  roomId: string;
  checkInDate: string;
  checkOutDate: string;
  guestCount: number;
  total: number;
  resortName: string;
}) {
  const router = useRouter();
  const [method, setMethod] = useState<CustomerPaymentMethod>("CREDIT_CARD");
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  function confirm() {
    setError(null);
    startTransition(async () => {
      const result = await createAndPayAction({
        roomId,
        checkInDate,
        checkOutDate,
        guestCount,
        paymentMethod: method,
      });
      if (result.error) {
        setError(result.error);
        if (result.success) {
          // Booking exists even though payment failed — send them to it.
          setTimeout(() => router.push(`/account/bookings/${result.success!.bookingId}`), 1500);
        }
        return;
      }

      const bookingId = result.success!.bookingId;

      if (result.success!.checkout) {
        const outcome = await openRazorpayCheckout(result.success!.checkout, { resortName });
        if (outcome === "dismissed") {
          toast.error("Payment was not completed — you can retry from your booking.");
          router.push(`/account/bookings/${bookingId}`);
          return;
        }
        // Razorpay's own handler fired, but the booking's payment status
        // only flips once the webhook lands server-side — hence "submitted"
        // rather than "confirmed" here.
        toast.success("Payment submitted — confirming your booking…");
        router.push(`/checkout/success?bookingId=${bookingId}`);
        return;
      }

      toast.success("Booking confirmed!");
      router.push(`/checkout/success?bookingId=${bookingId}`);
    });
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-1.5">
        <Label>Payment method</Label>
        <Select value={method} onValueChange={(v) => v && setMethod(v as CustomerPaymentMethod)}>
          <SelectTrigger className="w-full">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {METHODS.map((m) => (
              <SelectItem key={m.value} value={m.value}>
                {m.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {error && (
        <p className="text-sm text-destructive" role="alert">
          {error}
        </p>
      )}

      <Button size="lg" onClick={confirm} disabled={isPending}>
        {isPending ? "Processing…" : `Pay ₹${total.toFixed(2)} & confirm booking`}
      </Button>
      <p className="text-center text-xs text-muted-foreground">
        Full payment is required to confirm your reservation.
      </p>
    </div>
  );
}
