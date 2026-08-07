import Image from "next/image";
import { Award, ShieldCheck, Heart, Sparkles } from "lucide-react";

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center max-w-2xl mx-auto mb-14">
        <span className="text-xs uppercase tracking-widest font-semibold text-primary">Heritage & Vision</span>
        <h1 className="font-heading text-4xl sm:text-5xl font-bold text-foreground mt-1">About Our Resort</h1>
        <p className="mt-3 text-muted-foreground font-light">Crafted as a haven for discerning travelers seeking quiet luxury, environmental harmony, and authentic warmth.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
        <div className="relative aspect-4/3 rounded-3xl overflow-hidden shadow-lg">
          <Image
            src="https://images.unsplash.com/photo-1540541338287-41700207dee6?fm=jpg&q=80&w=1200&auto=format&fit=crop"
            alt="Resort Heritage"
            fill
            className="object-cover"
          />
        </div>
        <div className="flex flex-col gap-4">
          <span className="text-xs uppercase tracking-widest font-semibold text-primary">Our Story</span>
          <h2 className="font-heading text-3xl font-bold text-foreground">A Sanctuary Built in Harmony with Nature</h2>
          <p className="text-muted-foreground text-base font-light leading-relaxed">
            Founded with a commitment to preserving the natural beauty of the surrounding hills, our resort blends traditional architectural craftsmanship with modern sustainable luxury.
          </p>
          <p className="text-muted-foreground text-base font-light leading-relaxed">
            Every suite is positioned to capture unhindered mountain panoramas, while our farm-to-table culinary philosophy supports local growers and artisans.
          </p>
        </div>
      </div>
    </div>
  );
}
