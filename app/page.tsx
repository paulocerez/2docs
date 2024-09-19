import AuthForm from "@/components/auth/AuthForm";
import SignIn from "@/components/auth/sign-in";
import { ModeToggle } from "@/components/mode-toggle";

export default function Home() {
  return (
    <main className="flex flex-col p-8 items-center space-y-12 sm:space-y-24 min-h-screen ">
      <div className="w-full flex justify-between items-center">
        <h1 className="text-md md:text-xl text-blue-600 font-semibold">
          2docs
        </h1>
        <ModeToggle />
      </div>
      <div className="flex flex-col space-y-12 items-center text-left animate-slide-in-bottom max-w-3xl">
        <div className="flex flex-col space-y-8">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-semibold">
            Combine API docs into{" "}
            <span className="text-blue-500 underline decoration-dotted">
              seamless
            </span>{" "}
            code workflows.{" "}
          </h2>
          <p className="text-sm md:text-xl md:px-12 text-gray-500">
            Best used for all API&apos;s Zapier didn&apos;t integrate yet. Or if
            you planned higher budget for domain names than automation saas
            subscriptions.
          </p>
        </div>
        <AuthForm />
      </div>
    </main>
  );
}
