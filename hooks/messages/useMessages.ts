import { useQuery } from "@tanstack/react-query";
import { Message } from "@/types/message";
import { auth } from "@/auth";

export function useMessages(chatId: string) {
  return useQuery<Message[]>({
    queryKey: ["messages", chatId],
    queryFn: async () => {
      const session = await auth();
	  const userId = session?.user?.id
      if (!userId) throw new Error("Not authenticated");

      const response = await fetch(
        `/api/users/${userId}/chats/${chatId}/messages`
      );
      
      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || "Failed to fetch messages");
      }

      return response.json();
    },
    refetchOnWindowFocus: false,
    retry: 2,
    staleTime: 1000 * 60, // 1 minute
  });
}