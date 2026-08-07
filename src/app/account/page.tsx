import { backendFetch } from "@/lib/backend";
import { Badge } from "@/components/ui/badge";
import { ProfileForm } from "@/components/account/ProfileForm";
import { Card, CardContent } from "@/components/ui/card";
import { Calendar, ShieldCheck, Heart, CreditCard, Sparkles } from "lucide-react";
import Link from "next/link";
import type { PublicCustomer } from "@/types/backend";

export default async function AccountDashboardPage() {
  const { customer } = await backendFetch<{ customer: PublicCustomer }>("/auth/customer/me");

  return (
    <div className="flex flex-col gap-8">
      {/* Welcome Banner */}
      <div className="rounded-3xl border border-primary/20 bg-gradient-to-r from-primary/10 via-card to-card p-6 sm:p-8 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs uppercase tracking-widest font-semibold text-primary">Guest Portal</span>
          <h1 className="font-heading text-2xl sm:text-3xl font-bold text-foreground mt-0.5">Welcome Back, {customer.name}!</h1>
          <p className="text-sm text-muted-foreground mt-1">Manage your active reservations, update profile preferences, and explore saved suites.</p>
        </div>
        <div className="shrink-0">
          {customer.isVerified ? (
            <Badge className="bg-emerald-500/10 text-emerald-600 border-emerald-500/20 px-3 py-1 text-xs">
              <ShieldCheck className="size-3.5 mr-1" /> Verified Guest
            </Badge>
          ) : (
            <Badge variant="secondary">Unverified</Badge>
          )}
        </div>
      </div>

      {/* Quick Access Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Link href="/account/bookings">
          <Card className="hover:shadow-md transition-all border-border/60">
            <CardContent className="p-5 flex items-center gap-4">
              <div className="flex size-11 items-center justify-center rounded-2xl bg-primary/10 text-primary shrink-0">
                <Calendar className="size-5" />
              </div>
              <div>
                <p className="font-heading text-base font-bold text-foreground">My Bookings</p>
                <p className="text-xs text-muted-foreground">View & manage stays</p>
              </div>
            </CardContent>
          </Card>
        </Link>

        <Link href="/account/wishlist">
          <Card className="hover:shadow-md transition-all border-border/60">
            <CardContent className="p-5 flex items-center gap-4">
              <div className="flex size-11 items-center justify-center rounded-2xl bg-primary/10 text-primary shrink-0">
                <Heart className="size-5" />
              </div>
              <div>
                <p className="font-heading text-base font-bold text-foreground">Saved Suites</p>
                <p className="text-xs text-muted-foreground">Your wishlist rooms</p>
              </div>
            </CardContent>
          </Card>
        </Link>

        <Link href="/account/payments">
          <Card className="hover:shadow-md transition-all border-border/60">
            <CardContent className="p-5 flex items-center gap-4">
              <div className="flex size-11 items-center justify-center rounded-2xl bg-primary/10 text-primary shrink-0">
                <CreditCard className="size-5" />
              </div>
              <div>
                <p className="font-heading text-base font-bold text-foreground">Payments</p>
                <p className="text-xs text-muted-foreground">Billing history</p>
              </div>
            </CardContent>
          </Card>
        </Link>
      </div>

      {/* Profile Info Form */}
      <div className="rounded-3xl border border-border/60 bg-card p-6 sm:p-8 shadow-sm">
        <h2 className="font-heading text-xl font-bold text-foreground mb-4">Guest Profile Information</h2>
        <ProfileForm customer={customer} />
      </div>
    </div>
  );
}
