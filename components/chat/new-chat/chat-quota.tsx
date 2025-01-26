"use client";

import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { AlertCircle } from "lucide-react";

export function ChatQuota() {
  const { data: quota } = useQuery({
    queryKey: ["chat-quota"],
    queryFn: async () => {
      const response = await fetch("/api/user/chat-quota");
      return response.json();
    },
    refetchInterval: 60000,
  });

  if (!quota) return null;

  if (quota.remaining === 0) {
    const resetTime = new Date(quota.reset);
    const now = new Date();
    const hoursUntilReset = Math.ceil(
      (resetTime.getTime() - now.getTime()) / (1000 * 60 * 60)
    );

    return (
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        className="fixed bottom-0 left-0 right-0 p-4 bg-white border-t border-orange-200 shadow-lg z-50"
      >
        <div className="max-w-2xl mx-auto flex items-start gap-3 text-orange-600">
          <AlertCircle className="h-5 w-5 flex-shrink-0 mt-0.5" />
          <div className="space-y-1">
            <h3 className="font-medium">Daily Chat Quota Exceeded</h3>
            <p className="text-sm text-orange-500">
              You&apos;ve used all {quota.limit} chats for today. Your quota
              will reset in {hoursUntilReset} hours.
            </p>
            <div className="h-1.5 bg-orange-100 rounded-full overflow-hidden mt-2">
              <div
                className="h-full bg-orange-500 transition-all duration-500"
                style={{ width: "100%" }}
              />
            </div>
          </div>
        </div>
      </motion.div>
    );
  }

  return (
    <div className="text-xs text-gray-500">
      <div className="flex items-center gap-2">
        <div className="flex-1">
          <div className="h-1 bg-gray-200 rounded-full overflow-hidden">
            <div
              className="h-full bg-orange-500 transition-all duration-500"
              style={{
                width: `${(quota.remaining / quota.limit) * 100}%`,
              }}
            />
          </div>
        </div>
        <span>
          {quota.remaining}/{quota.limit} chats remaining today
        </span>
      </div>
    </div>
  );
}
