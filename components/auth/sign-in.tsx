"use client";
import { signInWithGoogle } from "@/app/actions/auth";
import { GoogleIcon } from "./icons/icon";

export default function SignIn() {
  return (
    <form action={signInWithGoogle} className="w-full">
      <button
        type="submit"
        className="w-full flex items-center justify-center gap-2 px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors duration-200"
      >
        <GoogleIcon className="h-5 w-5" />
        <span>Sign in with Google</span>
      </button>
    </form>
  );
}
