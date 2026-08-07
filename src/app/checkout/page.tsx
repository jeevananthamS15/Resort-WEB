import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { publicFetch } from "@/lib/backend";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckoutForm } from "@/components/checkout/CheckoutForm";
import { estimateTotal } from "@/lib/pricing";
import type { PublicRoomDetail, TenantInfo } from "@/types/backend";

export default async function CheckoutPage({
  searchParams,
}: {
  searchParams: Promise<{
    roomId?: string;
    checkInDate?: string;
    checkOutDate?: string;
    guestCount?: string;
  }>;
}) {
  const { roomId, checkInDate, checkOutDate, guestCount } = await searchParams;

  if (!roomId || !checkInDate || !checkOutDate) {
    return (
      <div className="mx-auto max-w-lg px-6 py-16 text-center">
        <p className="text-muted-foreground">Missing booking details.</p>
        <Link href="/rooms" className="text-primary hover:underline">
          Browse rooms
        </Link>
      </div>
    );
  }

  const [{ room }, info] = await Promise.all([
    publicFetch<{ room: PublicRoomDetail }>(`/public/rooms/${roomId}`),
    publicFetch<TenantInfo>("/public/tenant-info"),
  ]);
  const guests = Number(guestCount ?? 1);
  const { nights, perNight, total } = estimateTotal(
    room.basePrice,
    room.pricingRules,
    checkInDate,
    checkOutDate,
  );

  return (
    <div className="mx-auto max-w-2xl px-4 sm:px-6 py-8 sm:py-12">
      <Link
        href={`/rooms/${roomId}`}
        className="mb-6 inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground"
      >
        <ArrowLeft className="size-4" />
        Back to room
      </Link>

      <h1 className="mb-6 font-heading text-2xl sm:text-3xl text-foreground">Confirm your booking</h1>

      <Card className="mb-6">
        <CardHeader className="p-4 sm:p-6 pb-2 sm:pb-4">
          <CardTitle className="text-base">{room.name}</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col gap-2 p-4 sm:p-6 pt-0 text-sm">
          <Row label="Check-in" value={checkInDate} />
          <Row label="Check-out" value={checkOutDate} />
          <Row label="Guests" value={String(guests)} />
          <div className="mt-2 border-t border-border pt-2">
            <Row label={`₹${perNight} × ${nights} night${nights === 1 ? "" : "s"}`} value={`₹${total.toFixed(2)}`} />
            <Row label="Total" value={`₹${total.toFixed(2)}`} bold />
          </div>
        </CardContent>
      </Card>

      <CheckoutForm
        roomId={roomId}
        checkInDate={checkInDate}
        checkOutDate={checkOutDate}
        guestCount={guests}
        total={total}
        resortName={info.tenant.name}
      />
    </div>
  );
}

function Row({ label, value, bold }: { label: string; value: string; bold?: boolean }) {
  return (
    <div className={`flex justify-between ${bold ? "font-semibold text-foreground" : "text-muted-foreground"}`}>
      <span>{label}</span>
      <span>{value}</span>
    </div>
  );
}
