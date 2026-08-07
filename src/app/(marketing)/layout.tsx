import { publicFetch } from "@/lib/backend";
import { isLoggedIn } from "@/lib/session";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { SiteFooter } from "@/components/layout/SiteFooter";
import type { TenantInfo } from "@/types/backend";

export default async function MarketingLayout({
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

  const loggedIn = await isLoggedIn();

  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader tenantName={info.tenant.name} isLoggedIn={loggedIn} />
      <main className="flex-1">{children}</main>
      <SiteFooter info={info} />
    </div>
  );
}
