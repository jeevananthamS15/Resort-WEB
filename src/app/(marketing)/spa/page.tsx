import Image from "next/image";
import { Flower2, Sparkles, Heart, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const TREATMENTS = [
  {
    title: "Signature Aromatherapy Massage",
    duration: "90 Minutes",
    description: "Deep tissue relaxation utilizing custom-blended essential oils and hot herbal compresses.",
    price: "₹4,500",
  },
  {
    title: "Himalayan Salt Radiance Facial",
    duration: "60 Minutes",
    description: "Exfoliating mineral glow treatment combined with deep hydration serums and jade roller lymphatic drainage.",
    price: "₹3,800",
  },
  {
    title: "Couples Sunset Hydrotherapy Ritual",
    duration: "120 Minutes",
    description: "Private Jacuzzi soak infused with floral botanicals followed by side-by-side full body body massages.",
    price: "₹8,000",
  },
];

export default function SpaPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center max-w-2xl mx-auto mb-14">
        <span className="text-xs uppercase tracking-widest font-semibold text-primary">Sanctuary of Healing</span>
        <h1 className="font-heading text-4xl sm:text-5xl font-bold text-foreground mt-1">Spa & Wellness</h1>
        <p className="mt-3 text-muted-foreground font-light">Restore harmony to body, mind, and spirit with holistic Ayurvedic therapies and modern hydrotherapy rituals.</p>
      </div>

      <div className="relative rounded-3xl overflow-hidden mb-16 aspect-21/9 min-h-[300px] shadow-lg">
        <Image
          src="https://images.unsplash.com/photo-1540555700478-4be289fbecef?fm=jpg&q=80&w=1600&auto=format&fit=crop"
          alt="Spa Wellness Pavilion"
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent flex flex-col justify-end p-8 sm:p-12 text-white">
          <h2 className="font-heading text-3xl font-bold">Ayurvedic & Modern Therapies</h2>
          <p className="max-w-lg text-white/80 text-sm mt-2 font-light">Private treatment suites featuring natural timber, waterfall showers, and tranquil garden views.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {TREATMENTS.map((t) => (
          <div key={t.title} className="rounded-2xl border border-border/60 bg-card p-6 shadow-sm flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between text-xs font-semibold text-primary mb-3">
                <span className="flex items-center gap-1.5"><Flower2 className="size-4" /> {t.duration}</span>
                <span className="font-heading text-base font-bold text-foreground">{t.price}</span>
              </div>
              <h3 className="font-heading text-xl font-bold text-foreground mb-2">{t.title}</h3>
              <p className="text-muted-foreground text-sm font-light leading-relaxed">{t.description}</p>
            </div>
            <Button variant="outline" className="mt-6 w-full rounded-full border-primary/30" render={<Link href="/contact" />}>
              Inquire Treatment
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
}
