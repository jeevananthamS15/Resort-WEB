import Image from "next/image";
import { Compass, MapPin, Sun, Mountain, Trees } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const ACTIVITIES = [
  {
    title: "Guided Sunrise Trekking & Meditation",
    category: "Outdoor Adventure",
    image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?fm=jpg&q=80&w=1200&auto=format&fit=crop",
    description: "Conquer scenic ridge trails led by expert local naturalists, concluding with a guided mindfulness session at sunrise peak.",
  },
  {
    title: "Organic Farm & Tea Estate Tour",
    category: "Culture & Heritage",
    image: "https://images.unsplash.com/photo-1540541338287-41700207dee6?fm=jpg&q=80&w=1200&auto=format&fit=crop",
    description: "Stroll through private tea gardens, harvest organic produce, and enjoy an interactive chef culinary workshop.",
  },
];

export default function ExperiencesPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center max-w-2xl mx-auto mb-14">
        <span className="text-xs uppercase tracking-widest font-semibold text-primary">Unforgettable Moments</span>
        <h1 className="font-heading text-4xl sm:text-5xl font-bold text-foreground mt-1">Resort Experiences</h1>
        <p className="mt-3 text-muted-foreground font-light">From guided ridge treks to private starlight dining, create lifelong memories in nature.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {ACTIVITIES.map((act) => (
          <div key={act.title} className="rounded-3xl border border-border/60 bg-card overflow-hidden shadow-sm flex flex-col">
            <div className="relative aspect-16/10 w-full">
              <Image src={act.image} alt={act.title} fill className="object-cover" />
            </div>
            <div className="p-8 flex flex-col justify-between flex-1">
              <div>
                <span className="text-xs uppercase tracking-widest font-semibold text-primary mb-2 block">{act.category}</span>
                <h2 className="font-heading text-2xl font-bold text-foreground mb-3">{act.title}</h2>
                <p className="text-muted-foreground text-sm font-light leading-relaxed">{act.description}</p>
              </div>
              <Button className="mt-6 rounded-full w-fit" render={<Link href="/contact" />}>
                Book Activity
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
