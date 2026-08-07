export default function PolicyPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 sm:px-6 py-12">
      <h1 className="font-heading text-3xl font-bold text-foreground mb-6">Terms, Privacy & Cancellation Policies</h1>
      
      <div className="prose prose-stone dark:prose-invert space-y-6 text-sm text-muted-foreground leading-relaxed">
        <section>
          <h2 className="text-xl font-bold text-foreground mb-2">1. Direct Booking Guarantee</h2>
          <p>Reservations booked directly through this website guarantee the best public rate without added third-party platform fees. All reservations are secured immediately upon confirmation.</p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-foreground mb-2">2. Cancellation & Refunds</h2>
          <p>Free cancellation applies up to 48 hours before scheduled check-in time. Refunds for eligible cancellations are processed back to the original payment method within 5–7 business days.</p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-foreground mb-2">3. Guest Privacy Data</h2>
          <p>We collect essential guest identity details solely for reservation management, check-in registration, and official billing compliance. Your personal information is never sold to third parties.</p>
        </section>
      </div>
    </div>
  );
}
