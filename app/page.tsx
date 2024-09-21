import AuthForm from "@/components/auth/AuthForm";
import SignIn from "@/components/auth/sign-in";
import { ModeToggle } from "@/components/mode-toggle";

export default function Home() {
  return (
    <main className="flex flex-col p-8 items-center space-y-12 sm:space-y-24 min-h-screen">
      <div className="w-full flex flex-row justify-between items-center">
        <div className="text-md md:text-xl text-blue-700 font-medium">
          2docs
        </div>
        <ModeToggle />
      </div>
      <div className="flex flex-col space-y-12 items-center text-left sm:text-center animate-slide-in-bottom max-w-3xl">
        <div className="flex flex-col space-y-8">
          <h1 className="text-4xl lg:text-6xl font-semibold">
            Two API&apos;s. <br></br>
            One workflow.
          </h1>
          <p className="text-md md:text-xl md:px-12 text-gray-500 max-w-2xl">
            You give us the docs, we generate the workflow - from document
            generation to flashcard creation.
          </p>
        </div>
        <AuthForm />
      </div>
    </main>
  );
}
