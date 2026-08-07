import Link from "next/link";
import { CheckCircle2, ArrowRight, Download, Calendar, ShieldCheck, Sparkles, Building2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export default async function BookingSuccessPage({
  searchParams,
}: {
  searchParams: Promise<{ bookingId?: string; reference?: string }>;
}) {
  const { bookingId, reference } = await searchParams;

  return (
    <div className="mx-auto max-w-3xl px-4 sm:px-6 py-16 flex flex-col items-center text-center">
      {/* Success Badge */}
      <div className="flex size-20 items-center justify-center rounded-full bg-emerald-500/10 text-emerald-600 mb-6 shadow-inner animate-in zoom-in-75 duration-300">
        <CheckCircle2 className="size-12" />
      </div>

      <span className="text-xs uppercase tracking-widest font-semibold text-emerald-600 mb-1">Reservation Confirmed</span>
      <h1 className="font-heading text-3xl sm:text-5xl font-bold text-foreground">Your Luxury Stay is Secured!</h1>
      <p className="mt-3 text-muted-foreground max-w-md font-light text-base">
        Thank you for booking directly with us. A confirmation email with stay details and concierge instructions has been dispatched.
      </p>

      {/* Confirmation Box */}
      <Card className="w-full mt-8 border-emerald-500/30 bg-gradient-to-b from-card to-emerald-500/5 shadow-md">
        <CardContent className="p-6 flex flex-col gap-4 text-left">
          <div className="flex items-center justify-between border-b border-border/60 pb-3">
            <div>
              <p className="text-xs text-muted-foreground uppercase tracking-wider font-semibold">Booking Reference</p>
              <p className="font-heading text-2xl font-bold text-foreground tracking-wide mt-0.5">
                {reference ?? bookingId ?? "RES-CONFIRMED"}
              </p>
            </div>
            <span className="inline-flex items-center gap-1 text-xs font-semibold text-emerald-700 bg-emerald-100 dark:bg-emerald-950 px-3 py-1 rounded-full">
              <ShieldCheck className="size-3.5" /> Instant Guaranteed
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm text-muted-foreground py-2">
            <div className="flex items-center gap-2.5">
              <Calendar className="size-4 text-primary shrink-0" />
              <span>Check-in: 2:00 PM onwards</span>
            </div>
            <div className="flex items-center gap-2.5">
              <Building2 className="size-4 text-primary shrink-0" />
              <span>Valet & Concierge Included</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row items-center gap-4 mt-8 w-full sm:w-auto">
        <Button size="lg" className="w-full sm:w-auto rounded-full shadow-md gap-2 px-8" render={<Link href={`/account/bookings/${bookingId ?? ""}`} />}>
          View Booking Details <ArrowRight className="size-4" />
        </Button>
        <Button variant="outline" size="lg" className="w-full sm:w-auto rounded-full border-primary/30" render={<Link href="/rooms" />}>
          Explore More Rooms
        </Button>
      </div>
    </div>
  );
}
