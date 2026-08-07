import Link from "next/link";
import { Mail, Phone, MapPin, Clock, ArrowRight } from "lucide-react";
import type { TenantInfo } from "@/types/backend";

export function SiteFooter({ info }: { info: TenantInfo }) {
  return (
    <footer className="border-t border-border/60 bg-gradient-to-b from-card to-secondary/30 text-foreground">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          
          {/* Brand Column */}
          <div className="lg:col-span-2 flex flex-col gap-4">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary font-heading text-lg font-bold text-primary-foreground">
                {info.tenant.name.charAt(0)}
              </div>
              <div>
                <p className="font-heading text-xl font-semibold text-foreground">{info.tenant.name}</p>
                <p className="text-xs uppercase tracking-widest text-muted-foreground">Luxury Resort & Spa</p>
              </div>
            </div>
            <p className="text-sm text-muted-foreground max-w-sm leading-relaxed mt-1">
              Experience serene luxury, exquisite dining, and world-class hospitality nestled in nature's finest destination.
            </p>
            <div className="flex flex-col gap-2 text-xs text-muted-foreground mt-2">
              <span className="flex items-center gap-2">
                <Clock className="size-4 text-primary shrink-0" />
                Check-in: {info.general.checkInTime} · Check-out: {info.general.checkOutTime}
              </span>
              {info.general.address && (
                <span className="flex items-center gap-2">
                  <MapPin className="size-4 text-primary shrink-0" />
                  {info.general.address}
                </span>
              )}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <p className="font-heading text-base font-semibold text-foreground mb-4">Explore</p>
            <ul className="flex flex-col gap-2.5 text-sm text-muted-foreground">
              <li><Link href="/rooms" className="hover:text-primary transition-colors">Suites & Villas</Link></li>
              <li><Link href="/dining" className="hover:text-primary transition-colors">Culinary Experiences</Link></li>
              <li><Link href="/spa" className="hover:text-primary transition-colors">Spa & Wellness</Link></li>
              <li><Link href="/experiences" className="hover:text-primary transition-colors">Resort Activities</Link></li>
              <li><Link href="/gallery" className="hover:text-primary transition-colors">Photo Gallery</Link></li>
              <li><Link href="/offers" className="hover:text-primary transition-colors">Exclusive Packages</Link></li>
            </ul>
          </div>

          {/* Guest Information */}
          <div>
            <p className="font-heading text-base font-semibold text-foreground mb-4">Guest Care</p>
            <ul className="flex flex-col gap-2.5 text-sm text-muted-foreground">
              <li><Link href="/about" className="hover:text-primary transition-colors">About Our Resort</Link></li>
              <li><Link href="/contact" className="hover:text-primary transition-colors">Contact Us</Link></li>
              <li><Link href="/faq" className="hover:text-primary transition-colors">Frequently Asked Questions</Link></li>
              <li><Link href="/cancellation" className="hover:text-primary transition-colors">Cancellation Policy</Link></li>
              <li><Link href="/privacy" className="hover:text-primary transition-colors">Privacy Policy</Link></li>
              <li><Link href="/terms" className="hover:text-primary transition-colors">Terms of Service</Link></li>
            </ul>
          </div>

          {/* Direct Contact & Newsletter */}
          <div>
            <p className="font-heading text-base font-semibold text-foreground mb-4">Newsletter</p>
            <p className="text-xs text-muted-foreground mb-3 leading-relaxed">
              Subscribe to receive exclusive offers and seasonal stories.
            </p>
            <form onSubmit={(e) => e.preventDefault()} className="flex flex-col gap-2">
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full rounded-lg border border-border bg-background px-3 py-2 text-xs text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary"
              />
              <button
                type="submit"
                className="flex items-center justify-center gap-1 rounded-lg bg-primary py-2 px-3 text-xs font-medium text-primary-foreground hover:bg-primary/90 transition-colors"
              >
                Subscribe <ArrowRight className="size-3" />
              </button>
            </form>
          </div>

        </div>

        <div className="mt-12 pt-6 border-t border-border/60 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-muted-foreground">
          <p>© {new Date().getFullYear()} {info.tenant.name}. All rights reserved.</p>
          <div className="flex gap-4">
            <Link href="/privacy" className="hover:underline">Privacy</Link>
            <Link href="/terms" className="hover:underline">Terms</Link>
            <Link href="/cancellation" className="hover:underline">Cancellation</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
