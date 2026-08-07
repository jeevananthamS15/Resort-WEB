import Link from "next/link";
import { LogOut, User } from "lucide-react";
import { logoutAction } from "@/actions/auth.actions";
import { Button } from "@/components/ui/button";

export function SiteHeader({
  tenantName,
  isLoggedIn,
}: {
  tenantName: string;
  isLoggedIn: boolean;
}) {
  return (
    <header className="sticky top-0 z-40 border-b border-border/60 bg-background/90 backdrop-blur supports-backdrop-filter:bg-background/70">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
        <Link href="/" className="flex items-center gap-2.5">
          <div className="flex h-8 w-8 items-center justify-center rounded-md bg-primary font-heading text-sm text-primary-foreground">
            {tenantName.charAt(0)}
          </div>
          <span className="font-heading text-lg text-foreground">{tenantName}</span>
        </Link>

        <nav className="hidden items-center gap-8 text-sm font-medium text-foreground/80 md:flex">
          <Link href="/" className="hover:text-primary">
            Home
          </Link>
          <Link href="/rooms" className="hover:text-primary">
            Rooms
          </Link>
        </nav>

        <div className="flex items-center gap-3">
          {isLoggedIn ? (
            <>
              <Button variant="ghost" size="sm" render={<Link href="/account" />}>
                <User className="size-4" />
                My account
              </Button>
              <form action={logoutAction}>
                <Button variant="ghost" size="sm" type="submit">
                  <LogOut className="size-4" />
                </Button>
              </form>
            </>
          ) : (
            <>
              <Button variant="ghost" size="sm" render={<Link href="/login" />}>
                Sign in
              </Button>
              <Button size="sm" render={<Link href="/register" />}>
                Sign up
              </Button>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
