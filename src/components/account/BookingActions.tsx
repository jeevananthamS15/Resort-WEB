"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import {
  cancelMyBookingAction,
  getMyInvoiceAction,
  payForBookingAction,
} from "@/actions/booking.actions";
import { openRazorpayCheckout } from "@/lib/razorpay";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import type { Booking, CustomerPaymentMethod } from "@/types/backend";

const METHODS: { value: CustomerPaymentMethod; label: string }[] = [
  { value: "CREDIT_CARD", label: "Credit card" },
  { value: "DEBIT_CARD", label: "Debit card" },
  { value: "NET_BANKING", label: "Net banking" },
];

export function BookingActions({
  booking,
  resortName,
}: {
  booking: Booking;
  resortName: string;
}) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [confirmCancel, setConfirmCancel] = useState(false);
  const [method, setMethod] = useState<CustomerPaymentMethod>("CREDIT_CARD");

  const canCancel = booking.status === "RESERVED" || booking.status === "CHECKED_IN";
  const canPay = booking.status === "RESERVED" && booking.paymentStatus === "PENDING";
  const canInvoice = booking.status === "CHECKED_OUT";

  function handleCancel() {
    startTransition(async () => {
      const result = await cancelMyBookingAction(booking.id);
      if (result.error) {
        toast.error(result.error);
      } else {
        toast.success("Booking cancelled");
        router.refresh();
      }
      setConfirmCancel(false);
    });
  }

  function handlePay() {
    startTransition(async () => {
      const result = await payForBookingAction(booking.id, method, booking.totalAmount);
      if (result.error) {
        toast.error(result.error);
        return;
      }

      if (result.checkout) {
        const outcome = await openRazorpayCheckout(result.checkout, { resortName });
        if (outcome === "dismissed") {
          toast.error("Payment was not completed.");
          return;
        }
        toast.success("Payment submitted — confirming your booking…");
        router.refresh();
        return;
      }

      toast.success("Payment submitted");
      router.refresh();
    });
  }

  function handleInvoice() {
    startTransition(async () => {
      const result = await getMyInvoiceAction(booking.id);
      if (result.error) {
        toast.error(result.error);
      } else if (result.downloadUrl) {
        window.open(result.downloadUrl, "_blank", "noopener,noreferrer");
      }
    });
  }

  return (
    <div className="flex flex-col gap-3">
      {canPay && (
        <div className="flex flex-col sm:flex-row sm:items-end gap-2">
          <Select value={method} onValueChange={(v) => v && setMethod(v as CustomerPaymentMethod)}>
            <SelectTrigger className="w-full sm:w-40">
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
          <Button disabled={isPending} onClick={handlePay} className="w-full sm:w-auto">
            Pay ₹{booking.totalAmount}
          </Button>
        </div>
      )}

      {canInvoice && (
        <Button variant="outline" disabled={isPending} onClick={handleInvoice} className="w-full sm:w-fit">
          View invoice
        </Button>
      )}

      {canCancel && (
        <Button
          variant="destructive"
          disabled={isPending}
          onClick={() => setConfirmCancel(true)}
          className="w-full sm:w-fit"
        >
          Cancel booking
        </Button>
      )}

      <AlertDialog open={confirmCancel} onOpenChange={setConfirmCancel}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Cancel this booking?</AlertDialogTitle>
            <AlertDialogDescription>
              This can&apos;t be undone. Check the cancellation policy before confirming.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={isPending}>Keep booking</AlertDialogCancel>
            <AlertDialogAction onClick={handleCancel} disabled={isPending}>
              {isPending ? "Cancelling…" : "Cancel booking"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
