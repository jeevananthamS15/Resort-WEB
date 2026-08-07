"use client";

import { useState } from "react";
import Link from "next/link";
import { LogOut, Menu, User, X, Sparkles, Utensils, Flower2, Compass, Image as ImageIcon, Tag, Calendar, Info, PhoneCall } from "lucide-react";
import { logoutAction } from "@/actions/auth.actions";
import { Button } from "@/components/ui/button";

export function SiteHeader({
  tenantName,
  isLoggedIn,
}: {
  tenantName: string;
  isLoggedIn: boolean;
}) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b border-border/50 bg-background/80 backdrop-blur-md transition-all">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-3 group">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-primary to-primary/80 font-heading text-base font-bold text-primary-foreground shadow-md transition-transform group-hover:scale-105">
            {tenantName.charAt(0)}
          </div>
          <div className="flex flex-col">
            <span className="font-heading text-xl font-semibold tracking-tight text-foreground">{tenantName}</span>
            <span className="text-[10px] uppercase tracking-widest text-muted-foreground font-sans">Luxury Resort & Spa</span>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden items-center gap-6 text-sm font-medium text-foreground/90 lg:flex">
          <Link href="/" className="hover:text-primary transition-colors">
            Home
          </Link>
          <Link href="/rooms" className="hover:text-primary transition-colors">
            Suites & Rooms
          </Link>
          <Link href="/dining" className="hover:text-primary transition-colors">
            Dining
          </Link>
          <Link href="/spa" className="hover:text-primary transition-colors">
            Spa & Wellness
          </Link>
          <Link href="/experiences" className="hover:text-primary transition-colors">
            Experiences
          </Link>
          <Link href="/gallery" className="hover:text-primary transition-colors">
            Gallery
          </Link>
          <Link href="/offers" className="hover:text-primary transition-colors">
            Offers
          </Link>
        </nav>

        {/* Desktop Actions */}
        <div className="hidden items-center gap-3 lg:flex">
          {isLoggedIn ? (
            <>
              <Button variant="outline" size="sm" className="rounded-full gap-2 border-primary/20 hover:bg-primary/5" render={<Link href="/account" />}>
                <User className="size-4 text-primary" />
                My Account
              </Button>
              <form action={logoutAction}>
                <Button variant="ghost" size="sm" type="submit" className="rounded-full text-muted-foreground hover:text-destructive">
                  <LogOut className="size-4" />
                </Button>
              </form>
            </>
          ) : (
            <>
              <Button variant="ghost" size="sm" className="rounded-full" render={<Link href="/login" />}>
                Sign In
              </Button>
              <Button size="sm" className="rounded-full shadow-sm px-5" render={<Link href="/register" />}>
                Book Stays
              </Button>
            </>
          )}
        </div>

        {/* Mobile menu trigger */}
        <div className="flex items-center gap-2 lg:hidden">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle navigation menu"
            className="rounded-full"
          >
            {mobileMenuOpen ? <X className="size-6" /> : <Menu className="size-6" />}
          </Button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="border-b border-border/60 bg-background/95 backdrop-blur-xl px-6 py-6 lg:hidden animate-in slide-in-from-top duration-300 max-h-[85vh] overflow-y-auto">
          <nav className="flex flex-col gap-3 text-base font-medium text-foreground">
            <Link
              href="/"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center gap-3 rounded-lg px-3 py-2.5 hover:bg-muted"
            >
              <Sparkles className="size-4 text-primary" />
              Home
            </Link>
            <Link
              href="/rooms"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center gap-3 rounded-lg px-3 py-2.5 hover:bg-muted"
            >
              <Sparkles className="size-4 text-primary" />
              Suites & Rooms
            </Link>
            <Link
              href="/dining"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center gap-3 rounded-lg px-3 py-2.5 hover:bg-muted"
            >
              <Utensils className="size-4 text-primary" />
              Dining & Culinary
            </Link>
            <Link
              href="/spa"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center gap-3 rounded-lg px-3 py-2.5 hover:bg-muted"
            >
              <Flower2 className="size-4 text-primary" />
              Spa & Wellness
            </Link>
            <Link
              href="/experiences"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center gap-3 rounded-lg px-3 py-2.5 hover:bg-muted"
            >
              <Compass className="size-4 text-primary" />
              Resort Experiences
            </Link>
            <Link
              href="/gallery"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center gap-3 rounded-lg px-3 py-2.5 hover:bg-muted"
            >
              <ImageIcon className="size-4 text-primary" />
              Photo Gallery
            </Link>
            <Link
              href="/offers"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center gap-3 rounded-lg px-3 py-2.5 hover:bg-muted"
            >
              <Tag className="size-4 text-primary" />
              Exclusive Offers
            </Link>
            <Link
              href="/events"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center gap-3 rounded-lg px-3 py-2.5 hover:bg-muted"
            >
              <Calendar className="size-4 text-primary" />
              Weddings & Events
            </Link>
            <Link
              href="/about"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center gap-3 rounded-lg px-3 py-2.5 hover:bg-muted"
            >
              <Info className="size-4 text-primary" />
              About Resort
            </Link>
            <Link
              href="/contact"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center gap-3 rounded-lg px-3 py-2.5 hover:bg-muted"
            >
              <PhoneCall className="size-4 text-primary" />
              Contact Us
            </Link>

            <div className="my-2 border-t border-border/60" />
            
            {isLoggedIn ? (
              <div className="flex flex-col gap-2 pt-1">
                <Link
                  href="/account"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center gap-3 rounded-lg px-3 py-2.5 bg-primary/10 text-primary font-semibold"
                >
                  <User className="size-5" />
                  My Account
                </Link>
                <form action={logoutAction} className="w-full">
                  <button
                    type="submit"
                    className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-destructive hover:bg-muted"
                  >
                    <LogOut className="size-5" />
                    Sign Out
                  </button>
                </form>
              </div>
            ) : (
              <div className="flex flex-col gap-3 pt-2">
                <Link
                  href="/login"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex w-full items-center justify-center rounded-xl border border-border px-4 py-3 text-sm font-medium hover:bg-muted"
                >
                  Sign In
                </Link>
                <Link
                  href="/register"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex w-full items-center justify-center rounded-xl bg-primary px-4 py-3 text-sm font-medium text-primary-foreground shadow-md"
                >
                  Register Account
                </Link>
              </div>
            )}
          </nav>
        </div>
      )}
    </header>
  );
}

