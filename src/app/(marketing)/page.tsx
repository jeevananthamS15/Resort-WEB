import Image from "next/image";
import Link from "next/link";
import { ArrowRight, MapPin, ShieldCheck, Sparkles } from "lucide-react";
import { publicFetch } from "@/lib/backend";
import { Button } from "@/components/ui/button";
import { RoomCard } from "@/components/rooms/RoomCard";
import { AvailabilitySearchBar } from "@/components/marketing/AvailabilitySearchBar";
import type { PublicRoom, TenantInfo } from "@/types/backend";

const HERO_IMAGE =
  "https://images.unsplash.com/photo-1781511816247-006884d259e1?fm=jpg&q=80&w=2000&auto=format&fit=crop";

export default async function HomePage() {
  const [{ rooms }, info] = await Promise.all([
    publicFetch<{ rooms: PublicRoom[] } | { enabled: false }>("/public/rooms").then(
      (r) => ("rooms" in r ? r : { rooms: [] as PublicRoom[] }),
    ),
    publicFetch<TenantInfo>("/public/tenant-info"),
  ]);

  const featured = rooms.slice(0, 3);

  return (
    <div>
      {/* Hero */}
      <section className="relative flex min-h-[85vh] items-end overflow-hidden">
        <Image
          src={HERO_IMAGE}
          alt={info.tenant.name}
          fill
          priority
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-black/10" />

        <div className="relative z-10 mx-auto flex w-full max-w-6xl flex-col gap-8 px-6 pb-16">
          <div className="max-w-2xl text-white">
            <p className="mb-3 flex items-center gap-1.5 text-sm font-medium tracking-wide text-white/80">
              <MapPin className="size-4" />
              {info.general.address ?? "A place worth the journey"}
            </p>
            <h1 className="font-heading text-4xl leading-tight sm:text-5xl lg:text-6xl">
              Where every stay feels like coming home to the hills.
            </h1>
            <p className="mt-4 text-lg text-white/85">
              Book your room at {info.tenant.name} directly — best rates, no
              middleman.
            </p>
          </div>

          <AvailabilitySearchBar />
        </div>
      </section>

      {/* Trust strip */}
      <section className="border-b border-border/60 bg-card">
        <div className="mx-auto grid max-w-6xl grid-cols-1 gap-6 px-6 py-8 sm:grid-cols-3">
          <Feature
            icon={ShieldCheck}
            title="Book directly, pay securely"
            body="No booking fees, no hidden charges — reserve straight with the resort."
          />
          <Feature
            icon={Sparkles}
            title="Curated rooms & stays"
            body="Every room is verified by our team before it ever appears here."
          />
          <Feature
            icon={MapPin}
            title={info.tenant.name}
            body={info.general.address ?? "A destination worth the detour."}
          />
        </div>
      </section>

      {/* Featured rooms */}
      {featured.length > 0 && (
        <section className="mx-auto max-w-6xl px-6 py-16">
          <div className="mb-8 flex items-end justify-between">
            <div>
              <h2 className="font-heading text-3xl text-foreground">Featured rooms</h2>
              <p className="mt-1 text-muted-foreground">
                A few of our guests&apos; favourites.
              </p>
            </div>
            <Button variant="ghost" render={<Link href="/rooms" />}>
              View all rooms
              <ArrowRight className="size-4" />
            </Button>
          </div>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {featured.map((room) => (
              <RoomCard key={room.id} room={room} />
            ))}
          </div>
        </section>
      )}

      {/* CTA */}
      <section className="bg-primary py-16 text-primary-foreground">
        <div className="mx-auto flex max-w-6xl flex-col items-center gap-4 px-6 text-center">
          <h2 className="font-heading text-3xl">Ready for a getaway?</h2>
          <p className="max-w-xl text-primary-foreground/85">
            Check availability for your dates and secure your room in minutes.
          </p>
          <Button
            size="lg"
            variant="secondary"
            className="mt-2"
            render={<Link href="/rooms" />}
          >
            Browse rooms
          </Button>
        </div>
      </section>
    </div>
  );
}

function Feature({
  icon: Icon,
  title,
  body,
}: {
  icon: React.ElementType;
  title: string;
  body: string;
}) {
  return (
    <div className="flex items-start gap-3">
      <div className="flex size-9 shrink-0 items-center justify-center rounded-full bg-accent text-accent-foreground">
        <Icon className="size-4" />
      </div>
      <div>
        <p className="font-medium text-foreground">{title}</p>
        <p className="text-sm text-muted-foreground">{body}</p>
      </div>
    </div>
  );
}
