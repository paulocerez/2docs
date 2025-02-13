"use client";

import { useMessageQuota } from "@/hooks/quota/useMessageQuota";
import { QuotaBlock } from "./quota-block";

export function MessageQuota({
  userId,
  transparent,
}: {
  userId: string;
  transparent: boolean;
}) {
  const { data: quota, isPending, isError } = useMessageQuota(userId);
  const remaining = quota?.absolute.remaining;
  const limit = quota?.absolute.limit;
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

  return (
    <QuotaBlock
      used={used}
      limit={limit}
      resource="Messages"
      transparent={transparent}
    />
  );
}
