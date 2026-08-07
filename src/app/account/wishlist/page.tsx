import Link from "next/link";
import { Heart, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function WishlistPage() {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-heading text-2xl font-bold text-foreground">Saved Suites & Wishlist</h1>
          <p className="text-sm text-muted-foreground mt-1">Keep track of your favorite rooms for upcoming mountain getaways.</p>
        </div>
      </div>

      <div className="rounded-3xl border border-border/60 bg-card p-12 text-center flex flex-col items-center justify-center gap-4">
        <div className="flex size-14 items-center justify-center rounded-full bg-primary/10 text-primary">
          <Heart className="size-6" />
        </div>
        <h3 className="font-heading text-xl font-bold text-foreground">No Saved Suites Yet</h3>
        <p className="text-sm text-muted-foreground max-w-sm">Browse our curated suites and click the save icon to build your resort wishlist.</p>
        <Button className="rounded-full mt-2" render={<Link href="/rooms" />}>
          Browse All Rooms
        </Button>
      </div>
    </div>
  );
}
