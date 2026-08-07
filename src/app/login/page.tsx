import Image from "next/image";
import Link from "next/link";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { LoginForm } from "@/components/auth/LoginForm";
import { OtpForm } from "@/components/auth/OtpForm";
import { SocialLoginButtons } from "@/components/auth/SocialLoginButtons";

const HERO_IMAGE =
  "https://images.unsplash.com/photo-1552858725-a19e7fcd3ac4?fm=jpg&q=80&w=1600&auto=format&fit=crop";

export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{ reason?: string }>;
}) {
  const { reason } = await searchParams;

  return (
    <div className="grid min-h-screen lg:grid-cols-2">
      <div className="relative hidden lg:block">
        <Image src={HERO_IMAGE} alt="" fill priority className="object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-primary/70 via-primary/10 to-transparent" />
        <div className="absolute bottom-10 left-10 right-10 text-primary-foreground">
          <p className="font-heading text-3xl leading-snug">Welcome back.</p>
        </div>
      </div>

      <div className="flex items-center justify-center bg-background px-4 py-12">
        <div className="w-full max-w-sm">
          <Link href="/" className="mb-8 inline-flex items-center gap-2.5">
            <div className="flex h-9 w-9 items-center justify-center rounded-md bg-primary font-heading text-primary-foreground">
              R
            </div>
            <span className="font-heading text-lg text-foreground">Sign in</span>
          </Link>

          {reason === "expired" && (
            <p className="mb-4 rounded-md bg-accent px-3 py-2 text-sm text-accent-foreground">
              Your session expired. Please sign in again.
            </p>
          )}

          <Tabs defaultValue="password">
            <TabsList className="w-full">
              <TabsTrigger value="password" className="flex-1">
                Password
              </TabsTrigger>
              <TabsTrigger value="otp" className="flex-1">
                Code (OTP)
              </TabsTrigger>
            </TabsList>
            <TabsContent value="password" className="mt-6">
              <LoginForm />
            </TabsContent>
            <TabsContent value="otp" className="mt-6">
              <OtpForm />
            </TabsContent>
          </Tabs>

          <div className="my-6 flex items-center gap-3">
            <Separator className="flex-1" />
            <span className="text-xs text-muted-foreground">or</span>
            <Separator className="flex-1" />
          </div>

          <SocialLoginButtons />

          <p className="mt-6 text-center text-sm text-muted-foreground">
            New here?{" "}
            <Link href="/register" className="text-primary hover:underline">
              Create an account
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
