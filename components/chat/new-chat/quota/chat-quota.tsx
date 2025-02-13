"use client";

import { useChatQuota } from "@/hooks/quota/useChatQuota";
import { QuotaBlock } from "./quota-block";

export function ChatQuota({ userId }: { userId: string }) {
  const { data: quota, isPending, isError } = useChatQuota(userId);
  const remaining = quota?.absolute.remaining ?? 0;
  const limit = quota?.absolute.limit ?? 0;
  const used = limit - remaining;

  if (!quota) return null;

  if (isPending) {
    return (
      <div className="animate-pulse space-y-2">
        <div className="h-2 bg-gray-200 rounded w-24"></div>
        <div className="h-4 bg-gray-200 rounded w-full"></div>
        <div className="h-2 bg-gray-200 rounded w-16"></div>
      </div>
    );
  }

  return <QuotaBlock used={used} limit={limit} resource="Chats" />;
}
