import { Message } from "@/types/types";
import { useQuery } from "@tanstack/react-query";

export function useMessages(currentChatId: string) {
	return useQuery<Message[]>({
		queryKey: ["messages", currentChatId],
		queryFn: async () => {
			if (currentChatId.startsWith("temp-")) {
        return [];
      }
      const response = await fetch(`/api/chats/${currentChatId}/messages`);
      if (!response.ok) {
        throw new Error("Failed to fetch messages");
      }
      const data = await response.json();
      if (!Array.isArray(data)) {
        console.error("Expected array of messages, got:", data);
        return [];
      }
	  return data.filter((message): message is Message => message != null);
    },
    enabled: !!currentChatId,
  });
}