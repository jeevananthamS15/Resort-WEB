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
  const [info, loggedIn] = await Promise.all([
    publicFetch<TenantInfo>("/public/tenant-info"),
    isLoggedIn(),
  ]);

  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader tenantName={info.tenant.name} isLoggedIn={loggedIn} />
      <main className="flex-1">{children}</main>
      <SiteFooter info={info} />
    </div>
  );
}
