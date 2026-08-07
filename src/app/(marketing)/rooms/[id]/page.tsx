import { Users, BedDouble, Sparkles } from "lucide-react";
import { publicFetch } from "@/lib/backend";
import { Badge } from "@/components/ui/badge";
import { RoomGallery } from "@/components/rooms/RoomGallery";
import { BookingWidget } from "@/components/rooms/BookingWidget";
import type { PublicRoomDetail } from "@/types/backend";

export default async function RoomDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const { room } = await publicFetch<{ room: PublicRoomDetail }>(`/public/rooms/${id}`);

  return (
    <div className="mx-auto max-w-6xl px-6 py-10">
      <div className="mb-6">
        <Badge variant="secondary" className="mb-2">
          {room.type}
        </Badge>
        <h1 className="font-heading text-3xl text-foreground sm:text-4xl">{room.name}</h1>
        <div className="mt-2 flex items-center gap-4 text-sm text-muted-foreground">
          <span className="flex items-center gap-1.5">
            <Users className="size-4" />
            {room.capacityAdults} adults, {room.capacityChildren} children
          </span>
          <span className="flex items-center gap-1.5">
            <BedDouble className="size-4" />
            Room {room.roomNumber}
          </span>
        </div>
      </div>

      <div className="grid gap-10 lg:grid-cols-3">
        <div className="flex flex-col gap-8 lg:col-span-2">
          <RoomGallery images={room.images} alt={room.name} />

          {room.description && (
            <div>
              <h2 className="mb-2 font-heading text-xl text-foreground">About this room</h2>
              <p className="leading-relaxed text-muted-foreground">{room.description}</p>
            </div>
          )}

          {room.amenities.length > 0 && (
            <div>
              <h2 className="mb-3 font-heading text-xl text-foreground">Amenities</h2>
              <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
                {room.amenities.map((a) => (
                  <div key={a.id} className="flex items-center gap-2 text-sm text-foreground">
                    <Sparkles className="size-4 text-accent-foreground" />
                    {a.name}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        <div>
          <BookingWidget room={room} />
        </div>
      </div>
    </div>
  );
}
