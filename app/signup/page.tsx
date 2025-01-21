import Image from "next/image";
import SignInForm from "@/components/auth/sign-in-form";

export default function SignInPage() {
  return (
    <div className="flex min-h-screen">
      {/* Left column -> image */}
      <div className="hidden w-1/2 lg:block relative">
        <Image
          src="/train.jpg"
          alt="Beautiful landscape"
          layout="fill"
          objectFit="cover"
          priority
        />
      </div>

      {/* Right column -> sign-in form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 bg-gray-50">
        <SignInForm />
      </div>
    </div>
  );
}
