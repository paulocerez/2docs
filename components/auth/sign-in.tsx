import { signIn } from "@/auth";

export default function SignIn() {
  return (
    <form
      action={async () => {
        "use server";
        await signIn("google", { redirectTo: "/chat" });
      }}
      className="flex items-center justify-center w-full border rounded-md bg-white hover:bg-gray-100"
    >
      <button type="submit" className="w-full p-2 border-none">
        Sign in with Google
      </button>
    </form>
  );
}
