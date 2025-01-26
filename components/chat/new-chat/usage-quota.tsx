"use client";

import { useQuery } from "@tanstack/react-query";

export function UsageQuota() {
  const { data: quota } = useQuery({
    queryKey: ["usage-quota"],
    queryFn: async () => {
      const response = await fetch("/api/user/quota");
      return response.json();
    },
    refetchInterval: 60000, // Refresh every minute
  });

  return (
    <div className="text-xs text-gray-500">
      {quota && (
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
            {quota.remaining}/{quota.limit} workflows remaining today
          </span>
        </div>
      )}
    </div>
  );
}
