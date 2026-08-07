import Image from "next/image";
import { Utensils, Clock, Sparkles, Star, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const VENUES = [
  {
    name: "The Horizon Pavilion",
    cuisine: "Modern Fine Dining & Tasting Menus",
    description: "Pan-Asian and Mediterranean fusion crafted with farm-to-table organic ingredients and panoramic mountain views.",
    image: "https://images.unsplash.com/photo-1544025162-d76694265947?fm=jpg&q=80&w=1200&auto=format&fit=crop",
    hours: "7:00 AM – 11:00 PM",
  },
  {
    name: "Aura Sunset Lounge",
    cuisine: "Artisanal Cocktails & Tapas",
    description: "Curated wines, craft mixology, and delicate tapas served on open-air firepit terraces as the sun sets.",
    image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?fm=jpg&q=80&w=1200&auto=format&fit=crop",
    hours: "4:00 PM – 1:00 AM",
  },
];

export default function DiningPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center max-w-2xl mx-auto mb-14">
        <span className="text-xs uppercase tracking-widest font-semibold text-primary">Gastronomic Artistry</span>
        <h1 className="font-heading text-4xl sm:text-5xl font-bold text-foreground mt-1">Dining & Culinary</h1>
        <p className="mt-3 text-muted-foreground font-light">Indulge in Michelin-inspired dining, private chef tables, and sunset lounge mixology.</p>
      </div>

      <div className="grid gap-12">
        {VENUES.map((v, i) => (
          <div
            key={v.name}
            className={`flex flex-col lg:flex-row items-center gap-8 lg:gap-12 rounded-3xl border border-border/60 bg-card p-6 sm:p-10 shadow-sm ${
              i % 2 === 1 ? "lg:flex-row-reverse" : ""
            }`}
          >
            <div className="relative aspect-16/10 w-full lg:w-1/2 overflow-hidden rounded-2xl shadow-md shrink-0">
              <Image src={v.image} alt={v.name} fill className="object-cover" />
            </div>
            <div className="flex flex-col gap-4 flex-1">
              <span className="text-xs uppercase tracking-widest font-semibold text-amber-500">{v.cuisine}</span>
              <h2 className="font-heading text-3xl font-bold text-foreground">{v.name}</h2>
              <p className="text-muted-foreground text-base leading-relaxed font-light">{v.description}</p>
              <div className="flex items-center gap-2 text-xs font-medium text-muted-foreground mt-2">
                <Clock className="size-4 text-primary" />
                Hours: {v.hours}
              </div>
              <div className="mt-4 flex gap-4">
                <Button className="rounded-full shadow-sm" render={<Link href="/contact" />}>
                  Reserve Table
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
