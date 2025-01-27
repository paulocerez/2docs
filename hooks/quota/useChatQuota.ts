import { useQuery } from "@tanstack/react-query";

export function useChatQuota(userId: string) {
  return useQuery({
    queryKey: ["chat-quota"],
    queryFn: async () => {
      const response = await fetch(`/api/users/${userId}/quota/chats`);
      if (!response.ok) throw new Error("Failed to fetch chat quota");
      return response.json();
    },
    refetchInterval: 60000, // Refetch every minute
  });
} 