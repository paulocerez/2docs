"use client";

import { useChatQuota } from "@/hooks/quota/useChatQuota";
import { motion } from "framer-motion";
import { AlertCircle, ExternalLink } from "lucide-react";

export function ChatQuota({ userId }: { userId: string }) {
  const { data: quota } = useChatQuota(userId);

  if (!quota) return null;

  if (quota.remaining === 0) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        className="fixed bottom-0 left-0 right-0 p-4 bg-gradient-to-r from-blue-500 to-blue-600 shadow-lg z-50"
      >
        <div className="max-w-2xl mx-auto flex items-start gap-4 text-white">
          <div className="bg-white/20 rounded-full p-2">
            <AlertCircle className="h-6 w-6 flex-shrink-0" />
          </div>
          <div className="space-y-4">
            <h3 className="font-semibold text-sm">Chat Quota Exceeded</h3>
            <p className="text-sm text-white/90">
              You&apos;ve used all {quota.limit} available chats.
            </p>
            <button className="text-xs text-white/90 underline flex flex-row items-center justify-between space-x-2">
              <p>Upgrade Plan</p>
              <ExternalLink className="h-3 w-3" />
            </button>
          </div>
        </div>
      </motion.div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-3 border border-gray-100">
      <div className="space-y-2">
        <div className="flex items-center justify-between text-xs text-gray-600">
          <span>Chat Quota</span>
          <span className="font-medium">
            {quota.total}/{quota.limit}
          </span>
        </div>
        <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
          <div
            className="h-full bg-blue-500 transition-all duration-500"
            style={{
              width: `${(quota.total / quota.limit) * 100}%`,
            }}
          />
        </div>
      </div>
    </div>
  );
}
