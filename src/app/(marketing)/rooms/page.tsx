import { publicFetch } from "@/lib/backend";
import { RoomCard } from "@/components/rooms/RoomCard";
import { AvailabilitySearchBar } from "@/components/marketing/AvailabilitySearchBar";
import type { PublicRoom } from "@/types/backend";

export default async function RoomsPage({
  searchParams,
}: {
  searchParams: Promise<{ checkInDate?: string; checkOutDate?: string; guestCount?: string }>;
}) {
  const { checkInDate, checkOutDate, guestCount } = await searchParams;
  const searching = Boolean(checkInDate && checkOutDate);

  const path = searching
    ? `/public/rooms/availability?checkInDate=${checkInDate}&checkOutDate=${checkOutDate}&guestCount=${guestCount ?? 1}`
    : "/public/rooms";

  const result = await publicFetch<{ rooms: PublicRoom[] } | { enabled: false }>(path);
  const rooms = "rooms" in result ? result.rooms : [];
  const enabled = "rooms" in result;

  return (
    <div className="mx-auto max-w-6xl px-4 sm:px-6 py-8 sm:py-12">
      <div className="mb-6 sm:mb-8">
        <h1 className="font-heading text-2xl sm:text-3xl text-foreground">Our rooms</h1>
        <p className="mt-1 text-sm sm:text-base text-muted-foreground">
          {searching
            ? `Available ${checkInDate} → ${checkOutDate} for ${guestCount ?? 1} guest(s).`
            : "Browse everything we have to offer."}
        </p>
      </div>

      <div className="mb-8 sm:mb-10 max-w-3xl">
        <AvailabilitySearchBar />
      </div>

      {!enabled ? (
        <p className="text-muted-foreground text-sm sm:text-base">
          Online booking isn&apos;t available for this resort right now.
        </p>
      ) : rooms.length === 0 ? (
        <p className="text-muted-foreground text-sm sm:text-base">
          {searching
            ? "No rooms are available for these dates — try a different range."
            : "No rooms are listed yet."}
        </p>
      ) : (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {rooms.map((room) => (
            <RoomCard key={room.id} room={room} />
          ))}
        </div>
      )}
    </div>
  );
}
