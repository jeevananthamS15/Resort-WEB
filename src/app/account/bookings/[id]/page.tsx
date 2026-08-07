import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { publicFetch } from "@/lib/backend";
import { getMyBookingAction } from "@/actions/booking.actions";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BookingActions } from "@/components/account/BookingActions";
import type { BookingStatus, PublicRoom, TenantInfo } from "@/types/backend";

const STATUS_VARIANT: Record<BookingStatus, "default" | "secondary" | "destructive"> = {
  RESERVED: "secondary",
  CHECKED_IN: "default",
  CHECKED_OUT: "secondary",
  CANCELLED: "destructive",
  NO_SHOW: "destructive",
};

export default async function BookingDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const [booking, info] = await Promise.all([
    getMyBookingAction(id),
    publicFetch<TenantInfo>("/public/tenant-info"),
  ]);

  const roomDetails = await Promise.all(
    booking.rooms.map((r) =>
      publicFetch<{ room: PublicRoom }>(`/public/rooms/${r.roomId}`).then((res) => res.room),
    ),
  );

  return (
    <div className="flex flex-col gap-6">
      <div>
        <Link
          href="/account/bookings"
          className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground"
        >
          <ArrowLeft className="size-4" />
          My bookings
        </Link>
        <div className="mt-2 flex items-center justify-between">
          <h1 className="font-heading text-2xl text-foreground">{booking.bookingNumber}</h1>
          <Badge variant={STATUS_VARIANT[booking.status]}>{booking.status}</Badge>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">Rooms</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col gap-3">
          {booking.rooms.map((r, i) => (
            <div
              key={r.id}
              className="flex items-center justify-between border-b border-border pb-3 last:border-0 last:pb-0"
            >
              <div>
                <p className="text-sm font-medium text-foreground">
                  {roomDetails[i]?.name ?? "Room"}
                </p>
                <p className="text-xs text-muted-foreground">
                  {r.checkInDate} → {r.checkOutDate} · {r.guestCount} guests
                </p>
              </div>
              <p className="text-sm text-muted-foreground">₹{r.rateSnapshot}</p>
            </div>
          ))}
          <div className="flex justify-between border-t border-border pt-3 font-medium text-foreground">
            <span>Total</span>
            <span>
              ₹{booking.totalAmount} · {booking.paymentStatus}
            </span>
          </div>
        </CardContent>
      </Card>

      <BookingActions booking={booking} resortName={info.tenant.name} />
    </div>
  );
}
