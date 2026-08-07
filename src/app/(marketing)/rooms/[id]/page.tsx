import { publicFetch } from "@/lib/backend";
import { RoomCard } from "@/components/rooms/RoomCard";
import { RoomGallery } from "@/components/rooms/RoomGallery";
import { BookingWidget } from "@/components/rooms/BookingWidget";
import { Users, BedDouble, ShieldCheck, Sparkles, Check, ArrowLeft, Star, Coffee, Wifi, Tv, Wind } from "lucide-react";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import type { PublicRoom, PublicRoomDetail } from "@/types/backend";

export default async function RoomDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  let room: PublicRoomDetail;
  let similarRooms: PublicRoom[] = [];
  try {
    const [{ room: roomData }, roomsData] = await Promise.all([
      publicFetch<{ room: PublicRoomDetail }>(`/public/rooms/${id}`),
      publicFetch<{ rooms: PublicRoom[] } | { enabled: false }>("/public/rooms").then(
        (r) => ("rooms" in r ? r : { rooms: [] as PublicRoom[] }),
      ).catch(() => ({ rooms: [] as PublicRoom[] })),
    ]);
    room = roomData;
    similarRooms = roomsData.rooms.filter((r) => r.id !== room.id).slice(0, 3);
  } catch {
    return (
      <div className="mx-auto max-w-lg px-6 py-16 text-center">
        <p className="text-muted-foreground mb-4">Unable to load room details. Please try again.</p>
        <Link href="/rooms" className="text-primary hover:underline">
          Back to rooms
        </Link>
      </div>
    );
  }


  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      <div className="mb-6">
        <Link
          href="/rooms"
          className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-medium text-muted-foreground hover:text-primary transition-colors mb-4"
        >
          <ArrowLeft className="size-4" />
          Back to All Rooms & Suites
        </Link>

        <div className="flex flex-wrap items-center gap-3 mb-2">
          <Badge variant="secondary" className="bg-primary/10 text-primary border-primary/20 uppercase tracking-widest text-[10px] font-bold px-3 py-1">
            {room.type}
          </Badge>
          <span className="flex items-center gap-1 text-xs text-amber-500 font-medium">
            <Star className="size-3.5 fill-amber-400" /> 4.98 (Luxury Rated)
          </span>
        </div>

        <h1 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground">{room.name}</h1>
        
        <div className="mt-3 flex flex-wrap items-center gap-4 text-xs sm:text-sm text-muted-foreground">
          <span className="flex items-center gap-1.5 font-medium text-foreground">
            <Users className="size-4 text-primary shrink-0" />
            Up to {room.capacityAdults} adults, {room.capacityChildren} children
          </span>
          <span>•</span>
          <span className="flex items-center gap-1.5 font-medium text-foreground">
            <BedDouble className="size-4 text-primary shrink-0" />
            Suite {room.roomNumber}
          </span>
          <span>•</span>
          <span className="text-emerald-600 font-semibold flex items-center gap-1">
            <ShieldCheck className="size-4" /> Best Rate Guaranteed
          </span>
        </div>
      </div>

      <div className="grid gap-10 lg:grid-cols-3">
        <div className="flex flex-col gap-10 lg:col-span-2">
          <RoomGallery images={room.images} alt={room.name} />

          {room.description && (
            <div className="rounded-2xl border border-border/60 bg-card p-6 sm:p-8 shadow-sm">
              <h2 className="mb-3 font-heading text-2xl font-bold text-foreground">Sanctuary Details</h2>
              <p className="leading-relaxed text-muted-foreground text-base sm:text-lg font-light">{room.description}</p>
            </div>
          )}

          {/* Standard Luxury Inclusions */}
          <div className="rounded-2xl border border-border/60 bg-card p-6 sm:p-8 shadow-sm">
            <h2 className="mb-6 font-heading text-2xl font-bold text-foreground">Key Amenities & Services</h2>
            
            {room.amenities.length > 0 ? (
              <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
                {room.amenities.map((a) => (
                  <div key={a.id} className="flex items-center gap-2.5 text-sm font-medium text-foreground bg-secondary/30 rounded-xl p-3">
                    <Sparkles className="size-4 text-primary shrink-0" />
                    <span className="truncate">{a.name}</span>
                  </div>
                ))}
              </div>
            ) : (
              <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
                <AmenityTag icon={Wifi} title="High-Speed Wi-Fi" />
                <AmenityTag icon={Coffee} title="Espresso Machine" />
                <AmenityTag icon={Wind} title="Climate Control" />
                <AmenityTag icon={Tv} title="Smart OLED TV" />
                <AmenityTag icon={Check} title="Daily Housekeeping" />
                <AmenityTag icon={Check} title="Luxury Bathrobes" />
              </div>
            )}
          </div>

          {/* House Policies Summary */}
          <div className="rounded-2xl border border-border/60 bg-secondary/20 p-6">
            <h3 className="font-heading text-lg font-bold text-foreground mb-2">Stay Rules & Check-in</h3>
            <ul className="text-xs sm:text-sm text-muted-foreground space-y-1.5">
              <li>• Standard Check-in from 2:00 PM, Check-out by 11:00 AM.</li>
              <li>• Complimentary valet parking & luggage assistance included.</li>
              <li>• Flexible cancellation options available based on stay conditions.</li>
            </ul>
          </div>
        </div>

        <div>
          <BookingWidget room={room} />
        </div>
      </div>

      {/* Similar Rooms Section */}
      {similarRooms.length > 0 && (
        <section className="mt-20 pt-12 border-t border-border/60">
          <h2 className="font-heading text-2xl sm:text-3xl font-bold text-foreground mb-6">Explore Other Suites</h2>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {similarRooms.map((r) => (
              <RoomCard key={r.id} room={r} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}

function AmenityTag({ icon: Icon, title }: { icon: React.ElementType; title: string }) {
  return (
    <div className="flex items-center gap-2.5 text-sm font-medium text-foreground bg-secondary/30 rounded-xl p-3">
      <Icon className="size-4 text-primary shrink-0" />
      <span className="truncate">{title}</span>
    </div>
  );
}
