"use client";
import AuthenticatedLayout from "@/layouts/AuthenticatedLayout";
import { Settings, MessageSquare, Zap } from "lucide-react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { MessageQuota } from "@/components/chat/new-chat/quota/message-quota";
import { ChatQuota } from "@/components/chat/new-chat/quota/chat-quota";

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
                <div className="flex items-center gap-3 pb-6 border-b-4 border-gray-200">
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
                      <ChatQuota userId={userId} />
                    </div>
                    <div className="space-y-2">
                      <p className="text-sm font-medium text-gray-600">
                        Message Quota
                      </p>
                      <MessageQuota userId={userId} transparent={false} />
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
