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
    publicFetch<TenantInfo>("/public/tenant-info").catch(() => ({
      tenant: { name: "Grand Hill Resort & Spa", currency: "INR", timezone: "Asia/Kolkata" },
      general: { checkInTime: "14:00", checkOutTime: "11:00", address: "Mountain Ridge Estate" },
      branding: {},
      policies: { cancellationWindowHours: 48, cancellationPolicy: "Flexible 48h cancellation" },
    })),
  ]);

  const roomDetails = await Promise.all(
    booking.rooms.map((r) =>
      publicFetch<{ room: PublicRoom }>(`/public/rooms/${r.roomId}`)
        .then((res) => res.room)
        .catch(() => null),
    ),
  ).then((rooms) => rooms.filter(Boolean) as PublicRoom[]);


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
        <div className="mt-2 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <h1 className="font-heading text-xl sm:text-2xl text-foreground truncate">{booking.bookingNumber}</h1>
          <Badge variant={STATUS_VARIANT[booking.status]} className="w-fit">{booking.status}</Badge>
        </div>
      </div>

      <Card>
        <CardHeader className="p-4 sm:p-6 pb-2 sm:pb-4">
          <CardTitle className="text-base">Rooms</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col gap-3 p-4 sm:p-6 pt-0">
          {booking.rooms.map((r, i) => (
            <div
              key={r.id}
              className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 sm:gap-4 border-b border-border pb-3 last:border-0 last:pb-0"
            >
              <div>
                <p className="text-sm font-medium text-foreground">
                  {roomDetails[i]?.name ?? "Room"}
                </p>
                <p className="text-xs text-muted-foreground">
                  {r.checkInDate} → {r.checkOutDate} · {r.guestCount} guests
                </p>
              </div>
              <p className="text-sm font-medium sm:font-normal text-muted-foreground">₹{r.rateSnapshot}</p>
            </div>
          ))}
          <div className="flex flex-wrap items-center justify-between border-t border-border pt-3 gap-1 font-medium text-foreground text-sm sm:text-base">
            <span>Total</span>
            <span className="text-right">
              ₹{booking.totalAmount} · <span className="text-xs sm:text-sm font-normal text-muted-foreground">{booking.paymentStatus}</span>
            </span>
          </div>
        </CardContent>
      </Card>

      <BookingActions booking={booking} resortName={info.tenant.name} />
    </div>
  );
}
