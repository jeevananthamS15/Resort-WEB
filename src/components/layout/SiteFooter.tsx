import type { TenantInfo } from "@/types/backend";

export function SiteFooter({ info }: { info: TenantInfo }) {
  return (
    <footer className="border-t border-border/60 bg-secondary/40">
      <div className="mx-auto grid max-w-6xl gap-8 px-6 py-12 sm:grid-cols-3">
        <div>
          <p className="font-heading text-lg text-foreground">{info.tenant.name}</p>
          <p className="mt-2 text-sm text-muted-foreground">
            Check-in {info.general.checkInTime} · Check-out {info.general.checkOutTime}
          </p>
        </div>

        <div>
          <p className="text-sm font-medium text-foreground">Contact</p>
          <div className="mt-2 flex flex-col gap-1 text-sm text-muted-foreground">
            {info.general.contactEmail && <span>{info.general.contactEmail}</span>}
            {info.general.contactPhone && <span>{info.general.contactPhone}</span>}
            {info.general.address && <span>{info.general.address}</span>}
          </div>
        </div>

        {info.policies.cancellationPolicy && (
          <div>
            <p className="text-sm font-medium text-foreground">Cancellation policy</p>
            <p className="mt-2 text-sm text-muted-foreground">
              {info.policies.cancellationPolicy} — free cancellation up to{" "}
              {info.policies.cancellationWindowHours}h before check-in.
            </p>
          </div>
        )}
      </div>
      <div className="border-t border-border/60 py-4 text-center text-xs text-muted-foreground">
        © {new Date().getFullYear()} {info.tenant.name}. All rights reserved.
      </div>
    </footer>
  );
}
