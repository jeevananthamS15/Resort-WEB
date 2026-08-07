import Image from "next/image";
import { Heart, Calendar, Users, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function EventsPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center max-w-2xl mx-auto mb-14">
        <span className="text-xs uppercase tracking-widest font-semibold text-primary">Celebrations & Gatherings</span>
        <h1 className="font-heading text-4xl sm:text-5xl font-bold text-foreground mt-1">Weddings & Private Events</h1>
        <p className="mt-3 text-muted-foreground font-light">Host dream destination weddings, executive retreats, and milestone celebrations surrounded by mountain serenity.</p>
      </div>

      <div className="relative rounded-3xl overflow-hidden aspect-21/9 min-h-[320px] shadow-lg mb-12">
        <Image
          src="https://images.unsplash.com/photo-1519741497674-611481863552?fm=jpg&q=80&w=1600&auto=format&fit=crop"
          alt="Resort Wedding Lawns"
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex flex-col justify-end p-8 sm:p-12 text-white">
          <h2 className="font-heading text-3xl font-bold">Destination Wedding Lawns & Ballrooms</h2>
          <p className="max-w-md text-white/80 text-sm mt-2 font-light">Accommodating up to 500 guests with bespoke floral staging, banquets, and luxury villa block bookings.</p>
        </div>
      </div>

      <div className="rounded-3xl border border-border/60 bg-card p-8 sm:p-12 text-center max-w-3xl mx-auto">
        <h3 className="font-heading text-2xl font-bold text-foreground mb-3">Plan Your Bespoke Event</h3>
        <p className="text-muted-foreground text-sm font-light leading-relaxed mb-6">Our dedicated event planners ensure seamless execution from custom tasting menus to audiovisual arrangements.</p>
        <Button size="lg" className="rounded-full px-8 shadow-md" render={<Link href="/contact" />}>
          Contact Event Specialist
        </Button>
      </div>
    </div>
  );
}
