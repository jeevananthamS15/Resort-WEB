import Image from "next/image";
import Link from "next/link";
import { RegisterForm } from "@/components/auth/RegisterForm";

const HERO_IMAGE =
  "https://images.unsplash.com/photo-1781511816247-006884d259e1?fm=jpg&q=80&w=1600&auto=format&fit=crop";

export default function RegisterPage() {
  return (
    <div className="grid min-h-screen lg:grid-cols-2">
      <div className="relative hidden lg:block">
        <Image src={HERO_IMAGE} alt="" fill priority className="object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-primary/70 via-primary/10 to-transparent" />
        <div className="absolute bottom-10 left-10 right-10 text-primary-foreground">
          <p className="font-heading text-3xl leading-snug">
            Your next stay starts here.
          </p>
        </div>
      </div>

      <div className="flex items-center justify-center bg-background px-4 py-12">
        <div className="w-full max-w-sm">
          <Link href="/" className="mb-8 inline-flex items-center gap-2.5">
            <div className="flex h-9 w-9 items-center justify-center rounded-md bg-primary font-heading text-primary-foreground">
              R
            </div>
            <span className="font-heading text-lg text-foreground">Create account</span>
          </Link>

          <RegisterForm />

          <p className="mt-6 text-center text-sm text-muted-foreground">
            Already have an account?{" "}
            <Link href="/login" className="text-primary hover:underline">
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
