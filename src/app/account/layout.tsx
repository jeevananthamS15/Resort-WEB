import Link from "next/link";
import { publicFetch } from "@/lib/backend";
import { SiteHeader } from "@/components/layout/SiteHeader";
import type { TenantInfo } from "@/types/backend";

export default async function AccountLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const info = await publicFetch<TenantInfo>("/public/tenant-info");

  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader tenantName={info.tenant.name} isLoggedIn />
      <div className="mx-auto flex w-full max-w-6xl flex-1 flex-col md:flex-row gap-6 md:gap-8 px-4 sm:px-6 py-6 sm:py-10">
        <aside className="w-full md:w-48 shrink-0">
          <nav className="flex flex-row md:flex-col gap-1 text-sm overflow-x-auto pb-2 md:pb-0">
            <Link
              href="/account"
              className="rounded-md px-3 py-2 font-medium text-foreground hover:bg-muted whitespace-nowrap"
            >
              Profile
            </Link>
            <Link
              href="/account/bookings"
              className="rounded-md px-3 py-2 font-medium text-foreground hover:bg-muted whitespace-nowrap"
            >
              My bookings
            </Link>
          </nav>
        </aside>
        <main className="flex-1 min-w-0">{children}</main>
      </div>
    </div>
  );
}
