import { useQuery } from "@tanstack/react-query";

export function useMessageQuota(userId: string) {
  return useQuery({
    queryKey: ["message-quota"],
    queryFn: async () => {
      const response = await fetch(`/api/users/${userId}/quota/messages`);
      if (!response.ok) throw new Error("Failed to fetch message quota");
      return response.json();
    },
    refetchInterval: 60000, // Refetch every minute
  });
} 