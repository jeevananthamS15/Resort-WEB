"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

function todayPlus(days: number): string {
  const d = new Date();
  d.setDate(d.getDate() + days);
  return d.toISOString().slice(0, 10);
}

export function AvailabilitySearchBar() {
  const router = useRouter();
  const [checkIn, setCheckIn] = useState(todayPlus(1));
  const [checkOut, setCheckOut] = useState(todayPlus(3));
  const [guests, setGuests] = useState(2);

  function search() {
    const params = new URLSearchParams({
      checkInDate: checkIn,
      checkOutDate: checkOut,
      guestCount: String(guests),
    });
    router.push(`/rooms?${params.toString()}`);
  }

  return (
    <div className="flex flex-col gap-3 rounded-xl border border-border/60 bg-card/95 p-4 shadow-lg backdrop-blur md:flex-row md:items-end md:gap-4 sm:p-5 w-full">
      <div className="flex flex-1 flex-col gap-1.5 min-w-0">
        <Label className="text-xs text-muted-foreground">Check-in</Label>
        <Input type="date" value={checkIn} onChange={(e) => setCheckIn(e.target.value)} className="w-full text-sm" />
      </div>
      <div className="flex flex-1 flex-col gap-1.5 min-w-0">
        <Label className="text-xs text-muted-foreground">Check-out</Label>
        <Input type="date" value={checkOut} onChange={(e) => setCheckOut(e.target.value)} className="w-full text-sm" />
      </div>
      <div className="flex flex-col gap-1.5 md:w-28 min-w-0">
        <Label className="text-xs text-muted-foreground">Guests</Label>
        <Input
          type="number"
          min={1}
          value={guests}
          onChange={(e) => setGuests(Number(e.target.value))}
          className="w-full text-sm"
        />
      </div>
      <Button size="lg" className="w-full md:w-auto shrink-0 mt-1 md:mt-0" onClick={search}>
        <Search className="size-4" />
        Search
      </Button>
    </div>
  );
}
