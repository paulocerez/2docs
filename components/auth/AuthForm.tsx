import SignIn from "./sign-in";

export default function AuthForm() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-gray-50 to-gray-100">
      <div className="flex flex-col items-center justify-center space-y-10 w-full max-w-sm">
        <h1 className="text-xl font-semibold text-center text-gray-800">
          Sign in to 2docs
        </h1>
        <SignIn />
      </div>
    </main>
  );
}
