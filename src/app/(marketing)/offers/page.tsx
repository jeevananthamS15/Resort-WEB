import { Tag, Sparkles, Calendar, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const PACKAGES = [
  {
    code: "LUX-WELLNESS",
    title: "The Ultimate Wellness Getaway",
    discount: "25% OFF Stays of 3+ Nights",
    inclusions: [
      "Daily gourmet organic breakfast buffet",
      "90-Minute Signature Aromatherapy massage for two",
      "Private sunset cocktail hour at Aura Lounge",
      "Complimentary late check-out till 3:00 PM",
    ],
  },
  {
    code: "LUX-HONEYMOON",
    title: "Romantic Horizon Escape",
    discount: "Complimentary Suite Upgrade",
    inclusions: [
      "Romantic candlelit pavilion dinner with wine pairings",
      "Floral bathtub ritual & chilled champagne upon arrival",
      "Private guided sunrise terrace breakfast",
      "Round-trip luxury airport/station transfer",
    ],
  },
];

export default function OffersPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center max-w-2xl mx-auto mb-14">
        <span className="text-xs uppercase tracking-widest font-semibold text-primary">Exclusive Privileges</span>
        <h1 className="font-heading text-4xl sm:text-5xl font-bold text-foreground mt-1">Offers & Packages</h1>
        <p className="mt-3 text-muted-foreground font-light">Elevate your stay with handpicked luxury inclusions and seasonal savings.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {PACKAGES.map((pkg) => (
          <div key={pkg.code} className="rounded-3xl border border-primary/20 bg-gradient-to-b from-card to-primary/5 p-8 shadow-sm flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="inline-block rounded-full bg-primary/10 px-3 py-1 text-xs font-bold text-primary uppercase tracking-wider">
                  {pkg.code}
                </span>
                <span className="text-xs font-semibold text-amber-600 bg-amber-100 dark:bg-amber-950/40 px-3 py-1 rounded-full">
                  {pkg.discount}
                </span>
              </div>
              <h2 className="font-heading text-2xl font-bold text-foreground mb-4">{pkg.title}</h2>
              <ul className="space-y-2.5 text-sm text-muted-foreground mb-6">
                {pkg.inclusions.map((inc, i) => (
                  <li key={i} className="flex items-center gap-2">
                    <Sparkles className="size-4 text-primary shrink-0" />
                    <span>{inc}</span>
                  </li>
                ))}
              </ul>
            </div>
            <Button size="lg" className="w-full rounded-full shadow-sm" render={<Link href="/rooms" />}>
              Book Package Now <ArrowRight className="size-4" />
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
}
