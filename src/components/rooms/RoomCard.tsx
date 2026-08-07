import Image from "next/image";
import Link from "next/link";
import { Users } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import type { PublicRoom } from "@/types/backend";

// Used whenever a room has no uploaded photos yet — a real, verified,
// freely-licensed photo, not a gray placeholder box, so the storefront
// never looks unfinished even before staff upload real room photography.
const FALLBACK_IMAGE =
  "https://images.unsplash.com/photo-1552858725-a19e7fcd3ac4?fm=jpg&q=80&w=1200&auto=format&fit=crop";

function imageUrl(s3Key: string): string {
  return `http://localhost:3000/dev-uploads/${s3Key}`;
}

export function RoomCard({ room }: { room: PublicRoom }) {
  const cover = room.images[0] ? imageUrl(room.images[0].s3Key) : FALLBACK_IMAGE;

  return (
    <Link href={`/rooms/${room.id}`} className="group block">
      <Card className="overflow-hidden border-border/60 py-0 shadow-sm transition-shadow hover:shadow-md">
        <div className="relative aspect-4/3 overflow-hidden">
          <Image
            src={cover}
            alt={room.name}
            fill
            sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
            className="object-cover transition-transform duration-300 group-hover:scale-105"
          />
          <Badge className="absolute left-3 top-3">{room.type}</Badge>
        </div>
        <CardContent className="flex flex-col gap-2 p-5">
          <h3 className="font-heading text-lg text-foreground">{room.name}</h3>
          <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
            <Users className="size-3.5" />
            {room.capacityAdults + room.capacityChildren} guests
          </div>
          <div className="mt-1 flex items-baseline gap-1">
            <span className="font-heading text-xl text-foreground">₹{room.basePrice}</span>
            <span className="text-sm text-muted-foreground">/ night</span>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}

export { FALLBACK_IMAGE, imageUrl };
