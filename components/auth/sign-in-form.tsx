"use client";

import { signIn } from "@/auth";
import { GoogleIcon, MailIcon } from "./icons/icon";
import SignIn from "./sign-in";
export default function SignInForm() {
  return (
    <div className="w-full max-w-md bg-white rounded-lg shadow-md p-8">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-gray-900">Sign in</h2>
        <p className="text-sm text-gray-600 mt-2">
          Choose your preferred sign-in method
        </p>
      </div>
      <div className="space-y-4">
        <SignIn />
        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-300"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-2 bg-white text-gray-500">
              Or continue with
            </span>
          </div>
        </div>
        <button
          disabled
          className="w-full flex items-center justify-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-500 bg-gray-100 cursor-not-allowed"
        >
          <MailIcon className="h-5 w-5 mr-2" />
          Email
        </button>
      </div>
      <p className="mt-4 text-center text-sm text-gray-600">
        Email-password sign-in coming soon!
      </p>
    </div>
  );
}
