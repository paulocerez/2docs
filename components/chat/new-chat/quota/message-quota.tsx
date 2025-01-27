"use client";

import { useMessageQuota } from "@/hooks/quota/useMessageQuota";

export function MessageQuota({ userId }: { userId: string }) {
  const { data: quota } = useMessageQuota(userId);

  if (!quota) return null;

  return (
    <div className="text-xs text-gray-500">
      <div className="flex items-center gap-2">
        <div className="flex-1">
          <div className="h-1 bg-gray-200 rounded-full overflow-hidden">
            <div
              className="h-full bg-blue-500 transition-all duration-500"
              style={{
                width: `${(quota.remaining / quota.limit) * 100}%`,
              }}
            />
          </div>
        </div>
        <span>
          {quota.remaining}/{quota.limit} messages remaining
        </span>
      </div>
    </div>
  );
}
