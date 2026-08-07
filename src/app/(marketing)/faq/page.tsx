export default function FAQPage() {
  const FAQS = [
    {
      q: "What are the standard check-in and check-out times?",
      a: "Standard check-in begins at 2:00 PM and check-out is by 11:00 AM. Early check-in or late check-out can be requested via our concierge subject to availability.",
    },
    {
      q: "Is airport or railway station transfer provided?",
      a: "Yes, private chauffeured transfers are available upon request during booking or by contacting our concierge team at least 24 hours prior to arrival.",
    },
    {
      q: "What is your cancellation policy for direct bookings?",
      a: "Direct reservations offer free cancellation up to 48 hours prior to check-in. Cancellations made within 48 hours are subject to a one-night room charge.",
    },
    {
      q: "Are pets allowed at the resort?",
      a: "We welcome pets in designated Pet-Friendly Garden Suites with prior notification to ensure proper room amenities are prepared.",
    },
  ];

  return (
    <div className="mx-auto max-w-4xl px-4 sm:px-6 py-12">
      <div className="text-center mb-12">
        <span className="text-xs uppercase tracking-widest font-semibold text-primary">Guest Knowledge Base</span>
        <h1 className="font-heading text-4xl font-bold text-foreground mt-1">Frequently Asked Questions</h1>
      </div>

      <div className="flex flex-col gap-4">
        {FAQS.map((faq, i) => (
          <div key={i} className="rounded-2xl border border-border/60 bg-card p-6 shadow-sm">
            <h3 className="font-heading text-lg font-bold text-foreground mb-2">{faq.q}</h3>
            <p className="text-muted-foreground text-sm font-light leading-relaxed">{faq.a}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
