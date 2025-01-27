import Image from "next/image";
import SignInForm from "@/components/auth/sign-in-form";
import { redirect } from "next/navigation";
import { auth } from "@/auth";

export default async function SignUpPage() {
  const session = await auth();

  if (session?.user?.id) {
    redirect("/chat");
  }

  return (
    <main className="flex min-h-screen">
      <aside className="hidden lg:block lg:w-1/2 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/30 to-purple-600/30 mix-blend-overlay z-10" />
        <Image
          src="/train.jpg"
          alt="Beautiful landscape"
          fill
          priority
          className="object-cover transition-transform duration-500 hover:scale-105"
          sizes="50vw"
          quality={100}
        />
      </aside>

      <section className="w-full lg:w-1/2 flex items-center justify-center p-8 bg-gradient-to-br from-gray-50 to-gray-100">
        <div className="w-full max-w-md space-y-12">
          <div className="text-center space-y-6">
            <Image
              src="/logo.png"
              alt="2docs logo"
              width={100}
              height={100}
              className="mx-auto rounded-lg mb-4"
            />
          </div>
          <SignInForm />
        </div>
      </section>
    </main>
  );
}
