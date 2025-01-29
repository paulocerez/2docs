import EmailSignUp from "@/components/auth/email-sign-up";

export default function SignUpPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-md bg-white rounded-lg shadow-md p-8">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold text-gray-900">
            Create an account
          </h2>
          <p className="text-sm text-gray-600 mt-2">
            Fill in your details to get started
          </p>
        </div>
        <EmailSignUp />
      </div>
    </div>
  );
}
