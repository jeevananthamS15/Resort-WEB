"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { estimateTotal } from "@/lib/pricing";
import type { PublicRoomDetail } from "@/types/backend";

function todayPlus(days: number): string {
  const d = new Date();
  d.setDate(d.getDate() + days);
  return d.toISOString().slice(0, 10);
}

export function BookingWidget({ room }: { room: PublicRoomDetail }) {
  const router = useRouter();
  const [checkIn, setCheckIn] = useState(todayPlus(1));
  const [checkOut, setCheckOut] = useState(todayPlus(3));
  const [guests, setGuests] = useState(Math.min(2, room.capacityAdults + room.capacityChildren));

  const { nights, perNight, total } = estimateTotal(
    room.basePrice,
    room.pricingRules,
    checkIn,
    checkOut,
  );
  const capacity = room.capacityAdults + room.capacityChildren;
  const validRange = nights > 0;
  const validGuests = guests >= 1 && guests <= capacity;

  function continueToBook() {
    const params = new URLSearchParams({
      roomId: room.id,
      checkInDate: checkIn,
      checkOutDate: checkOut,
      guestCount: String(guests),
    });
    router.push(`/checkout?${params.toString()}`);
  }

  return (
    <Card className="sticky top-24 border-border/60 shadow-md">
      <CardContent className="flex flex-col gap-4 p-6">
        <div className="flex items-baseline gap-1">
          <span className="font-heading text-2xl text-foreground">₹{perNight}</span>
          <span className="text-sm text-muted-foreground">/ night</span>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div className="flex flex-col gap-1.5">
            <Label className="text-xs text-muted-foreground">Check-in</Label>
            <Input type="date" value={checkIn} onChange={(e) => setCheckIn(e.target.value)} />
          </div>
          <div className="flex flex-col gap-1.5">
            <Label className="text-xs text-muted-foreground">Check-out</Label>
            <Input type="date" value={checkOut} onChange={(e) => setCheckOut(e.target.value)} />
          </div>
        </div>

        <div className="flex flex-col gap-1.5">
          <Label className="text-xs text-muted-foreground">
            Guests <span className="text-muted-foreground/70">(max {capacity})</span>
          </Label>
          <Input
            type="number"
            min={1}
            max={capacity}
            value={guests}
            onChange={(e) => setGuests(Number(e.target.value))}
          />
        </div>

        {!validRange && (
          <p className="text-sm text-destructive">Check-out must be after check-in.</p>
        )}
        {!validGuests && (
          <p className="text-sm text-destructive">This room fits up to {capacity} guests.</p>
        )}

        {validRange && (
          <div className="flex flex-col gap-1 border-t border-border pt-3 text-sm">
            <div className="flex justify-between text-muted-foreground">
              <span>
                ₹{perNight} × {nights} night{nights === 1 ? "" : "s"}
              </span>
              <span>₹{total.toFixed(2)}</span>
            </div>
            <div className="flex justify-between font-medium text-foreground">
              <span>Total</span>
              <span>₹{total.toFixed(2)}</span>
            </div>
          </div>
        )}

        <Button
          size="lg"
          disabled={!validRange || !validGuests || room.status !== "AVAILABLE"}
          onClick={continueToBook}
        >
          Reserve now
        </Button>
        <p className="text-center text-xs text-muted-foreground">
          Full payment is collected online to confirm your booking.
        </p>
      </CardContent>
    </Card>
  );
}
