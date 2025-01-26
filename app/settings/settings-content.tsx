"use client";
import AuthenticatedLayout from "@/layouts/AuthenticatedLayout";
import { Settings, MessageSquare, Zap } from "lucide-react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

function SettingsContent({ userId }: { userId: string }) {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthenticatedLayout userId={userId} currentPageTitle="Settings">
        <div className="min-h-screen bg-gray-50 pt-16">
          <div className="min-h-screen bg-gray-50 pt-16">
            <div className="max-w-4xl mx-auto px-4 py-8">
              <div className="space-y-8">
                {/* Header */}
                <div className="flex items-center gap-3 pb-6 border-b border-gray-200">
                  <Settings className="h-6 w-6 text-gray-600" />
                  <h1 className="text-2xl font-semibold text-gray-900">
                    Settings
                  </h1>
                </div>

                {/* Usage Section */}
                <div className="bg-white rounded-lg shadow-sm p-6 space-y-4">
                  <h2 className="text-lg font-medium text-gray-900 flex items-center gap-2">
                    <Zap className="h-5 w-5 text-blue-600" />
                    Usage & Limits
                  </h2>
                  <div className="grid gap-6 sm:grid-cols-2">
                    <div className="space-y-2">
                      <p className="text-sm font-medium text-gray-600">
                        Chat Quota
                      </p>
                      <div className="bg-gray-100 rounded-full h-2">
                        <div className="bg-blue-600 h-2 rounded-full w-3/4" />
                      </div>
                      <p className="text-sm text-gray-500">
                        7 / 10 chats created
                      </p>
                    </div>
                    <div className="space-y-2">
                      <p className="text-sm font-medium text-gray-600">
                        Message Quota
                      </p>
                      <div className="bg-gray-100 rounded-full h-2">
                        <div className="bg-blue-600 h-2 rounded-full w-1/2" />
                      </div>
                      <p className="text-sm text-gray-500">
                        50 / 100 messages sent
                      </p>
                    </div>
                  </div>
                </div>

                {/* Account Section */}
                <div className="bg-white rounded-lg shadow-sm p-6 space-y-4">
                  <h2 className="text-lg font-medium text-gray-900 flex items-center gap-2">
                    <MessageSquare className="h-5 w-5 text-blue-600" />
                    Account Preferences
                  </h2>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between py-3 border-b border-gray-100">
                      <div>
                        <p className="font-medium text-gray-900">
                          Email Notifications
                        </p>
                        <p className="text-sm text-gray-500">
                          Receive email updates about your workflows
                        </p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input type="checkbox" className="sr-only peer" />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                      </label>
                    </div>
                    <div className="flex items-center justify-between py-3">
                      <div>
                        <p className="font-medium text-gray-900">Dark Mode</p>
                        <p className="text-sm text-gray-500">
                          Toggle dark mode theme
                        </p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input type="checkbox" className="sr-only peer" />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                      </label>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </AuthenticatedLayout>
    </QueryClientProvider>
  );
}

export default SettingsContent;
