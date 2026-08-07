import Link from "next/link";
import { publicFetch } from "@/lib/backend";
import { SiteHeader } from "@/components/layout/SiteHeader";
import type { TenantInfo } from "@/types/backend";

export default async function AccountLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const info = await publicFetch<TenantInfo>("/public/tenant-info").catch(() => ({
    tenant: { name: "Grand Hill Resort & Spa", currency: "INR", timezone: "Asia/Kolkata" },
    general: { checkInTime: "14:00", checkOutTime: "11:00", address: "Mountain Ridge Estate" },
    branding: {},
    policies: { cancellationWindowHours: 48, cancellationPolicy: "Flexible 48h cancellation" },
  }));

  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader tenantName={info.tenant.name} isLoggedIn />
      <div className="mx-auto flex w-full max-w-6xl flex-1 flex-col md:flex-row gap-6 md:gap-8 px-4 sm:px-6 py-6 sm:py-10">
        <aside className="w-full md:w-48 shrink-0">
          <nav className="flex flex-row md:flex-col gap-1.5 text-sm overflow-x-auto pb-2 md:pb-0">
            <Link
              href="/account"
              className="rounded-xl px-4 py-2.5 font-medium text-foreground hover:bg-muted whitespace-nowrap transition-colors"
            >
              Dashboard
            </Link>
            <Link
              href="/account/bookings"
              className="rounded-xl px-4 py-2.5 font-medium text-foreground hover:bg-muted whitespace-nowrap transition-colors"
            >
              My Bookings
            </Link>
            <Link
              href="/account/wishlist"
              className="rounded-xl px-4 py-2.5 font-medium text-foreground hover:bg-muted whitespace-nowrap transition-colors"
            >
              Saved Suites
            </Link>
            <Link
              href="/account/payments"
              className="rounded-xl px-4 py-2.5 font-medium text-foreground hover:bg-muted whitespace-nowrap transition-colors"
            >
              Payment History
            </Link>
            <Link
              href="/account/security"
              className="rounded-xl px-4 py-2.5 font-medium text-foreground hover:bg-muted whitespace-nowrap transition-colors"
            >
              Security Settings
            </Link>
          </nav>
        </aside>
        <main className="flex-1 min-w-0">{children}</main>
      </div>
    </div>
  );
}
