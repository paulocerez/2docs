import { SelectChat } from "@/db/schema/chats";
import { Message } from "@/types/message";
import { useMutation, useQueryClient } from "@tanstack/react-query";

interface AIResponseMutationData {
	chatId: string;
	messages: Array<{ role: string; content: string }>;
	userId: string;
}	
	
export function useAIResponseMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ chatId, messages, userId }: AIResponseMutationData ) => {
      const response = await fetch(`/api/users/${userId}/chats/${chatId}/ai-response`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages }),
      });


      if (!response.ok) {
		const errorData = await response.json();
		throw new Error(errorData.error || "Failed to generate AI response");
      }

	  const data = await response.json();
      return { chatId, message: data };

    },
    onSuccess: (data) => {
      queryClient.setQueryData<Message[]>(
        ["messages", data.chatId],
        (oldMessages = []) => [...oldMessages, data.message]
      );

	  queryClient.setQueryData<SelectChat[]>(
        ["chats"],
        (oldChats = []) =>
          oldChats.map((chat) =>
            chat.id === data.chatId
              ? { ...chat, lastActivityAt: new Date() }
              : chat
          )
      );
    },
  });
}