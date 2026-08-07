import { backendFetch } from "@/lib/backend";
import { Badge } from "@/components/ui/badge";
import { ProfileForm } from "@/components/account/ProfileForm";
import type { PublicCustomer } from "@/types/backend";

export default async function AccountProfilePage() {
  const { customer } = await backendFetch<{ customer: PublicCustomer }>("/auth/customer/me");

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="font-heading text-2xl text-foreground">Your profile</h1>
        <div className="mt-1">
          {customer.isVerified ? (
            <Badge>Verified</Badge>
          ) : (
            <Badge variant="secondary">Unverified</Badge>
          )}
        </div>
      </div>
      <ProfileForm customer={customer} />
    </div>
  );
}
