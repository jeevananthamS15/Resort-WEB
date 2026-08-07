import Link from "next/link";
import { backendFetch } from "@/lib/backend";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import type { Booking, BookingStatus } from "@/types/backend";

const STATUS_VARIANT: Record<BookingStatus, "default" | "secondary" | "destructive"> = {
  RESERVED: "secondary",
  CHECKED_IN: "default",
  CHECKED_OUT: "secondary",
  CANCELLED: "destructive",
  NO_SHOW: "destructive",
};

export default async function MyBookingsPage() {
  const result = await backendFetch<{ bookings: Booking[] } | { enabled: false }>(
    "/customer/bookings",
  );
  const bookings = "bookings" in result ? result.bookings : [];
  const sorted = [...bookings].sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
  );

  return (
    <div className="flex flex-col gap-6">
      <h1 className="font-heading text-2xl text-foreground">My bookings</h1>

      {sorted.length === 0 ? (
        <p className="text-muted-foreground">
          You haven&apos;t made any bookings yet.{" "}
          <Link href="/rooms" className="text-primary hover:underline">
            Browse rooms
          </Link>
          .
        </p>
      ) : (
        <div className="flex flex-col gap-3">
          {sorted.map((b) => (
            <Link key={b.id} href={`/account/bookings/${b.id}`}>
              <Card className="transition-shadow hover:shadow-md">
                <CardContent className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-4 sm:p-5">
                  <div className="min-w-0">
                    <p className="font-medium text-foreground truncate">{b.bookingNumber}</p>
                    <p className="text-xs sm:text-sm text-muted-foreground capitalize">
                      {b.source.replace(/_/g, " ")} · ₹{b.totalAmount}
                    </p>
                  </div>
                  <div className="flex flex-wrap items-center gap-2">
                    <Badge variant="outline" className="text-xs">{b.paymentStatus}</Badge>
                    <Badge variant={STATUS_VARIANT[b.status]} className="text-xs">{b.status}</Badge>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
