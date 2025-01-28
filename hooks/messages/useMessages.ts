import { useQuery } from "@tanstack/react-query";
import { Message } from "@/types/message";

export function useMessages(chatId: string, userId: string, initialMessages: Message[]) {
  return useQuery<Message[]>({
    queryKey: ["messages", userId, chatId],
    queryFn: async () => {
      const response = await fetch(
        `/api/users/${userId}/chats/${chatId}/messages`
      );
      
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(
          errorData.error || 
          `Failed to fetch messages: ${response.status} ${response.statusText}`
        );
      }

      const data = await response.json();
      return data;
    },
    initialData: initialMessages,
    staleTime: 1000 * 60, // 1 minute
    gcTime: 1000 * 60 * 30, // 30 minutes
    refetchOnWindowFocus: false,
    retry: 2,
    enabled: Boolean(userId) && Boolean(chatId)
  });
}