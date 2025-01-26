"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { QuotaExceededAlert } from "@/components/chat/new-chat/quota-exceeded-alert";
import { ChatQuota } from "@/components/chat/new-chat/chat-quota";

// Define the quota type
type QuotaData = {
  limit: number;
  remaining: number;
  reset: string;
};

const mockQuota: Record<string, QuotaData> = {
  exceeded: {
    limit: 10,
    remaining: 0,
    reset: new Date(Date.now() + 5 * 60 * 60 * 1000).toISOString(), // 5 hours from now
  },
  available: {
    limit: 10,
    remaining: 5,
    reset: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(),
  },
};

// Create a new QueryClient instance
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: Infinity,
    },
  },
});

// Add this before using setQueryData
queryClient.setDefaultOptions({
  queries: {
    initialData: undefined as QuotaData | undefined,
  },
});

export default function TestQuotaPage() {
  return (
    <QueryClientProvider client={queryClient}>
      <div className="min-h-screen p-4">
        <h1 className="text-2xl font-bold mb-4">Quota Alert Test Page</h1>

        <div className="space-y-8">
          <div className="space-y-4">
            <h2 className="text-xl font-semibold">Workflow Quota</h2>
            <div className="space-y-4">
              <button
                onClick={() =>
                  queryClient.setQueryData<QuotaData>(
                    ["usage-quota"],
                    () => mockQuota.exceeded
                  )
                }
                className="px-4 py-2 bg-red-500 text-white rounded"
              >
                Test Exceeded Workflow Quota
              </button>
              <button
                onClick={() =>
                  queryClient.setQueryData<QuotaData>(
                    ["usage-quota"],
                    () => mockQuota.available
                  )
                }
                className="px-4 py-2 bg-green-500 text-white rounded"
              >
                Test Available Workflow Quota
              </button>
            </div>
          </div>

          <div className="space-y-4">
            <h2 className="text-xl font-semibold">Chat Quota</h2>
            <div className="space-y-4">
              <button
                onClick={() =>
                  queryClient.setQueryData<QuotaData>(
                    ["chat-quota"],
                    () => mockQuota.exceeded
                  )
                }
                className="px-4 py-2 bg-orange-500 text-white rounded"
              >
                Test Exceeded Chat Quota
              </button>
              <button
                onClick={() =>
                  queryClient.setQueryData<QuotaData>(
                    ["chat-quota"],
                    () => mockQuota.available
                  )
                }
                className="px-4 py-2 bg-green-500 text-white rounded"
              >
                Test Available Chat Quota
              </button>
            </div>
          </div>
        </div>

        <div className="mt-8 space-y-4">
          <QuotaExceededAlert />
          <ChatQuota />
        </div>
      </div>
    </QueryClientProvider>
  );
}
