"use client";

import { useChatQuota } from "@/hooks/quota/useChatQuota";
import { motion } from "framer-motion";
import { AlertCircle } from "lucide-react";

export function QuotaExceededAlert({ userId }: { userId: string }) {
  const { data: quota } = useChatQuota(userId);

  if (!quota || quota.remaining > 0) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      className="fixed bottom-0 left-0 right-0 p-8 bg-white border-t border-red-200 shadow-lg z-50"
    >
      <div className="max-w-2xl mx-auto flex items-start gap-3 text-red-600">
        <AlertCircle className="h-5 w-5 flex-shrink-0 mt-0.5" />
        <div className="space-y-1">
          <h3 className="font-medium">Chat Quota Exceeded</h3>
          <p className="text-sm text-red-500">
            You&apos;ve used all {quota.limit} chats. Upgrade your plan to
            continue.
          </p>
        </div>
      </div>
    </motion.div>
  );
}
