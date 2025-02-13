"use client";
import AuthenticatedLayout from "@/layouts/AuthenticatedLayout";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import SubscriptionList from "./subscription-list";
import Usage from "./usage";

const queryClient = new QueryClient();

export default function SettingsContent({ userId }: { userId: string }) {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthenticatedLayout userId={userId} currentPageTitle="Settings">
        <div className="min-h-screen bg-gray-50 pt-16">
          <div className="max-w-6xl mx-auto px-4 py-8">
            <div className="space-y-10 bg-white rounded-lg shadow-sm p-6">
              <h1 className="text-2xl font-semibold text-gray-900">Settings</h1>
              <Usage userId={userId} />
              <SubscriptionList userId={userId} />
            </div>
          </div>
        </div>
      </AuthenticatedLayout>
    </QueryClientProvider>
  );
}
