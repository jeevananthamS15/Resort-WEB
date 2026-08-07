"use client";

import { useState } from "react";
import { Mail, Phone, MapPin, Send, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitted(true);
  }

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center max-w-2xl mx-auto mb-14">
        <span className="text-xs uppercase tracking-widest font-semibold text-primary">Concierge & Inquiries</span>
        <h1 className="font-heading text-4xl sm:text-5xl font-bold text-foreground mt-1">Contact Us</h1>
        <p className="mt-3 text-muted-foreground font-light">We are at your service. Reach out for reservations, private transfers, or special requests.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        <div className="rounded-3xl border border-border/60 bg-card p-8 sm:p-10 shadow-sm">
          <h2 className="font-heading text-2xl font-bold text-foreground mb-6">Send an Inquiry</h2>
          
          {submitted ? (
            <div className="flex flex-col items-center justify-center text-center py-10 gap-3">
              <CheckCircle2 className="size-12 text-primary" />
              <h3 className="font-heading text-xl font-bold text-foreground">Message Received</h3>
              <p className="text-sm text-muted-foreground max-w-sm">Our guest relations host will review your request and contact you within 4 hours.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <div className="flex flex-col gap-1.5">
                <Label htmlFor="c-name">Full Name</Label>
                <Input id="c-name" placeholder="John Doe" required className="rounded-xl" />
              </div>
              <div className="flex flex-col gap-1.5">
                <Label htmlFor="c-email">Email Address</Label>
                <Input id="c-email" type="email" placeholder="john@example.com" required className="rounded-xl" />
              </div>
              <div className="flex flex-col gap-1.5">
                <Label htmlFor="c-msg">Message or Request</Label>
                <textarea
                  id="c-msg"
                  rows={4}
                  placeholder="Tell us about your upcoming stay or special arrangements..."
                  required
                  className="w-full rounded-xl border border-border bg-background p-3 text-sm focus:outline-none focus:ring-1 focus:ring-primary"
                />
              </div>
              <Button type="submit" size="lg" className="rounded-full mt-2 gap-2 shadow-sm">
                <Send className="size-4" /> Send Message
              </Button>
            </form>
          )}
        </div>

        <div className="flex flex-col gap-6 justify-center">
          <div className="rounded-2xl border border-border/60 bg-card p-6 shadow-sm flex items-start gap-4">
            <div className="flex size-10 items-center justify-center rounded-xl bg-primary/10 text-primary shrink-0">
              <MapPin className="size-5" />
            </div>
            <div>
              <h3 className="font-heading text-base font-bold text-foreground">Resort Location</h3>
              <p className="text-sm text-muted-foreground mt-1">Valley View Ridge Road, Sanctuary Estate, Hill Station</p>
            </div>
          </div>

          <div className="rounded-2xl border border-border/60 bg-card p-6 shadow-sm flex items-start gap-4">
            <div className="flex size-10 items-center justify-center rounded-xl bg-primary/10 text-primary shrink-0">
              <Phone className="size-5" />
            </div>
            <div>
              <h3 className="font-heading text-base font-bold text-foreground">Direct Concierge</h3>
              <p className="text-sm text-muted-foreground mt-1">+91 (0) 800-RESORT-LUX / +91 (0) 800-737-678</p>
            </div>
          </div>

          <div className="rounded-2xl border border-border/60 bg-card p-6 shadow-sm flex items-start gap-4">
            <div className="flex size-10 items-center justify-center rounded-xl bg-primary/10 text-primary shrink-0">
              <Mail className="size-5" />
            </div>
            <div>
              <h3 className="font-heading text-base font-bold text-foreground">Email Support</h3>
              <p className="text-sm text-muted-foreground mt-1">concierge@resortlux.com / reservations@resortlux.com</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
