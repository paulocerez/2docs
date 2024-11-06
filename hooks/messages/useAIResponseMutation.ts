import { SelectChat } from "@/db/postgres/schema/chats";
import { Message } from "@/types/message";
import { useMutation, useQueryClient } from "@tanstack/react-query";

interface AIResponseMutationData {
	chatId: string;
	messages: Array<{ role: string; content: string }>;
}	

export function useAIResponseMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ chatId, messages }: AIResponseMutationData ) => {
      const response = await fetch(`/api/chats/${chatId}/generate`, {
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