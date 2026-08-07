import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Calendar, Compass, Star, Utensils, Flower2, ShieldCheck, MapPin, Sparkles, Award, Wifi, Coffee, HeartHandshake } from "lucide-react";
import { publicFetch } from "@/lib/backend";
import { Button } from "@/components/ui/button";
import { RoomCard } from "@/components/rooms/RoomCard";
import { AvailabilitySearchBar } from "@/components/marketing/AvailabilitySearchBar";
import type { PublicRoom, TenantInfo } from "@/types/backend";

const HERO_IMAGES = [
  "https://images.unsplash.com/photo-1540541338287-41700207dee6?fm=jpg&q=80&w=2000&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1571896349842-33c89424de2d?fm=jpg&q=80&w=2000&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1582719508461-905c673771fd?fm=jpg&q=80&w=2000&auto=format&fit=crop"
];

export default async function HomePage() {
  const [{ rooms }, info] = await Promise.all([
    publicFetch<{ rooms: PublicRoom[] } | { enabled: false }>("/public/rooms").then(
      (r) => ("rooms" in r ? r : { rooms: [] as PublicRoom[] }),
    ),
    publicFetch<TenantInfo>("/public/tenant-info"),
  ]);

  const featured = rooms.slice(0, 3);

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative flex min-h-[90vh] items-end justify-center overflow-hidden">
        <Image
          src={HERO_IMAGES[0]}
          alt={info.tenant.name}
          fill
          priority
          className="object-cover brightness-90 transition-all duration-700 hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/30 to-black/40" />

        <div className="relative z-10 mx-auto flex w-full max-w-7xl flex-col items-center gap-8 px-4 sm:px-6 lg:px-8 pb-16 pt-24 text-center">
          <div className="max-w-3xl flex flex-col items-center">
            <span className="inline-flex items-center gap-2 rounded-full bg-white/20 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-white backdrop-blur-md mb-4 border border-white/30">
              <Sparkles className="size-3.5 text-amber-300" />
              Welcome to Sanctuaries of Luxury
            </span>
            <h1 className="font-heading text-4xl font-bold tracking-tight text-white sm:text-6xl lg:text-7xl leading-[1.1] drop-shadow-md">
              Where Every Stay Feels Like Pure Serenity.
            </h1>
            <p className="mt-6 text-lg sm:text-xl text-white/90 max-w-2xl font-light leading-relaxed drop-shadow">
              Book directly at {info.tenant.name} — lowest direct rates, complimentary breakfast, and personalized concierge care.
            </p>
          </div>

          <div className="w-full max-w-4xl mt-4">
            <AvailabilitySearchBar />
          </div>
        </div>
      </section>

      {/* Trust & Accolades Strip */}
      <section className="border-y border-border/50 bg-card py-10">
        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-8 px-6 sm:grid-cols-2 lg:grid-cols-4">
          <TrustBadge
            icon={ShieldCheck}
            title="Best Rate Guarantee"
            description="Book direct with zero hidden fees & instant confirmation."
          />
          <TrustBadge
            icon={Award}
            title="Award-Winning Resort"
            description="Voted top luxury stay for tranquility & hospitality."
          />
          <TrustBadge
            icon={Coffee}
            title="Complimentary Breakfast"
            description="Handcrafted chef specials served daily at our pavilion."
          />
          <TrustBadge
            icon={HeartHandshake}
            title="24/7 Concierge"
            description="Personalized itinerary planning & private host assistance."
          />
        </div>
      </section>

      {/* Featured Rooms */}
      {featured.length > 0 && (
        <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-20 w-full">
          <div className="mb-12 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div>
              <span className="text-xs uppercase tracking-widest font-semibold text-primary">Luxury Accommodations</span>
              <h2 className="font-heading text-3xl sm:text-4xl text-foreground font-bold mt-1">Featured Suites & Villas</h2>
              <p className="mt-2 text-muted-foreground">Architect-designed sanctuaries crafted for rest, romance, and renewal.</p>
            </div>
            <Button variant="outline" className="rounded-full gap-2 border-primary/30 hover:bg-primary/5" render={<Link href="/rooms" />}>
              Explore All Rooms
              <ArrowRight className="size-4 text-primary" />
            </Button>
          </div>
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {featured.map((room) => (
              <RoomCard key={room.id} room={room} />
            ))}
          </div>
        </section>
      )}

      {/* Resort Experiences Showcase */}
      <section className="bg-secondary/30 py-20 border-y border-border/40">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <span className="text-xs uppercase tracking-widest font-semibold text-primary">Curated Living</span>
            <h2 className="font-heading text-3xl sm:text-4xl text-foreground font-bold mt-1">Unforgettable Resort Experiences</h2>
            <p className="mt-3 text-muted-foreground">Immerse yourself in world-class culinary dining, rejuvenating spa therapies, and private mountain excursions.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <ExperienceCard
              title="Culinary Excellence"
              category="Fine Dining"
              image="https://images.unsplash.com/photo-1544025162-d76694265947?fm=jpg&q=80&w=1200&auto=format&fit=crop"
              link="/dining"
              icon={Utensils}
            />
            <ExperienceCard
              title="Holistic Wellness & Spa"
              category="Rejuvenation"
              image="https://images.unsplash.com/photo-1540555700478-4be289fbecef?fm=jpg&q=80&w=1200&auto=format&fit=crop"
              link="/spa"
              icon={Flower2}
            />
            <ExperienceCard
              title="Guided Adventures"
              category="Exploration"
              image="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?fm=jpg&q=80&w=1200&auto=format&fit=crop"
              link="/experiences"
              icon={Compass}
            />
          </div>
        </div>
      </section>

      {/* Special Offers Banner */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-20 w-full">
        <div className="relative rounded-3xl overflow-hidden bg-primary text-primary-foreground p-8 sm:p-14 shadow-2xl flex flex-col md:flex-row items-center justify-between gap-8">
          <Image
            src="https://images.unsplash.com/photo-1571896349842-33c89424de2d?fm=jpg&q=80&w=1600&auto=format&fit=crop"
            alt="Resort Package Offer"
            fill
            className="object-cover opacity-20"
          />
          <div className="relative z-10 max-w-xl text-center md:text-left">
            <span className="inline-block rounded-full bg-accent/20 px-3.5 py-1 text-xs font-semibold text-amber-300 uppercase tracking-widest mb-3 border border-amber-300/30">
              Limited Season Offer
            </span>
            <h2 className="font-heading text-3xl sm:text-4xl font-bold">The Ultimate Wellness Getaway</h2>
            <p className="mt-3 text-primary-foreground/85 text-base sm:text-lg">
              Enjoy 25% off 3-night stays including complimentary aromatherapy massages and private dining vouchers.
            </p>
          </div>
          <div className="relative z-10 shrink-0">
            <Button size="lg" variant="secondary" className="rounded-full shadow-lg text-base px-8 py-6 font-semibold" render={<Link href="/offers" />}>
              Claim Offer
            </Button>
          </div>
        </div>
      </section>

      {/* Guest Testimonials */}
      <section className="bg-card py-20 border-t border-border/50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-xl mx-auto mb-12">
            <span className="text-xs uppercase tracking-widest font-semibold text-primary">Guest Reflections</span>
            <h2 className="font-heading text-3xl font-bold text-foreground mt-1">Stories From Our Visitors</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <ReviewCard
              author="Victoria & David L."
              stay="Honeymoon Suite"
              comment="An ethereal retreat. From the private plunge pool to the exceptional tasting menu, every detail surpassed our expectations."
              rating={5}
            />
            <ReviewCard
              author="Marcus Sterling"
              stay="Presidential Villa"
              comment="The level of quiet luxury and hospitality here is unmatched. The staff anticipated our every need seamlessly."
              rating={5}
            />
            <ReviewCard
              author="Elena Rostova"
              stay="Grand Deluxe Suite"
              comment="Pure serenity nestled in nature. The spa therapies were transformative and the sunrise views are breathtaking."
              rating={5}
            />
          </div>
        </div>
      </section>

    </div>
  );
}

function TrustBadge({
  icon: Icon,
  title,
  description,
}: {
  icon: React.ElementType;
  title: string;
  description: string;
}) {
  return (
    <div className="flex items-start gap-4">
      <div className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
        <Icon className="size-5" />
      </div>
      <div>
        <h4 className="font-heading text-base font-semibold text-foreground">{title}</h4>
        <p className="mt-1 text-xs text-muted-foreground leading-relaxed">{description}</p>
      </div>
    </div>
  );
}

function ExperienceCard({
  title,
  category,
  image,
  link,
  icon: Icon,
}: {
  title: string;
  category: string;
  image: string;
  link: string;
  icon: React.ElementType;
}) {
  return (
    <Link href={link} className="group relative rounded-2xl overflow-hidden aspect-4/5 shadow-md block">
      <Image src={image} alt={title} fill className="object-cover transition-transform duration-500 group-hover:scale-105" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
      <div className="absolute bottom-6 left-6 right-6 text-white">
        <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-amber-300 font-semibold mb-2">
          <Icon className="size-4" />
          {category}
        </div>
        <h3 className="font-heading text-2xl font-bold">{title}</h3>
        <span className="mt-3 inline-flex items-center gap-1 text-xs font-semibold text-white/90 group-hover:text-amber-300 transition-colors">
          Explore Experience <ArrowRight className="size-3" />
        </span>
      </div>
    </Link>
  );
}

function ReviewCard({ author, stay, comment, rating }: { author: string; stay: string; comment: string; rating: number }) {
  return (
    <div className="rounded-2xl border border-border/60 bg-background p-6 shadow-sm flex flex-col justify-between">
      <div>
        <div className="flex gap-1 text-amber-400 mb-3">
          {Array.from({ length: rating }).map((_, i) => (
            <Star key={i} className="size-4 fill-amber-400" />
          ))}
        </div>
        <p className="text-sm text-foreground/90 italic leading-relaxed">&ldquo;{comment}&rdquo;</p>
      </div>
      <div className="mt-6 pt-4 border-t border-border/40">
        <p className="font-heading text-sm font-semibold text-foreground">{author}</p>
        <p className="text-xs text-muted-foreground">{stay}</p>
      </div>
    </div>
  );
}
