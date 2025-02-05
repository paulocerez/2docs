import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { AnimatedSteps } from "@/components/home/animated-steps";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default async function Home() {
  const session = await auth();
  const userId = session?.user?.id;

  if (userId) {
    redirect("/chat");
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Main content */}
      <div className="relative min-h-screen flex flex-col max-w-4xl mx-auto">
        {/* Hero section */}
        <div className="flex-1 flex flex-col">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-20 w-full">
            <div className="text-center space-y-8 sm:space-y-12">
              {/* Logo */}
              <div className="flex justify-center mb-8 items-center space-x-3">
                <Image
                  src="/logo.png"
                  alt="2docs logo"
                  width={60}
                  height={60}
                  className="rounded-xl shadow-md"
                />
              </div>

              {/* Hero Title */}
              <div className="space-y-4">
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 tracking-tight max-w-3xl mx-auto">
                  Transform API Docs into{" "}
                  <span className="text-blue-600">Interactive Workflows</span>
                </h1>
                <p className="text-base sm:text-lg text-gray-600 max-w-xl mx-auto">
                  Connect multiple APIs and create powerful automation in
                  minutes, while you maintain the owner of the code.
                </p>
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6">
                <Link
                  href="/signup"
                  className="group flex items-center px-6 py-3 bg-black text-white rounded-full font-medium shadow-lg hover:bg-gray-900 transition-all duration-200 hover:shadow-xl"
                >
                  Get Started Free
                  <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Link>
                <button className="text-gray-400 cursor-not-allowed font-medium">
                  Watch Demo (soon)
                </button>
              </div>

              {/* Steps Section */}
              <div className="mt-16 sm:mt-24">
                <AnimatedSteps />
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
