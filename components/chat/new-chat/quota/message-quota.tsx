"use client";

import { useQuery } from "@tanstack/react-query";
import { AlertCircle } from "lucide-react";

export function MessageQuota() {
  const { data: quota } = useQuery({
    queryKey: ["message-quota"],
    queryFn: async () => {
      const response = await fetch("/api/user/message-quota");
      return response.json();
    },
    refetchInterval: 60000,
  });

  if (!quota) return null;

  return (
    <div className="text-xs text-gray-500">
      <div className="flex items-center gap-2">
        <div className="flex-1">
          <div className="h-1 bg-gray-200 rounded-full overflow-hidden">
            <div
              className="h-full bg-green-500 transition-all duration-500"
              style={{
                width: `${(quota.remaining / quota.limit) * 100}%`,
              }}
            />
          </div>
        </div>
        <span>
          {quota.remaining}/{quota.limit} messages remaining this hour
        </span>
      </div>
    </div>
  );
}
