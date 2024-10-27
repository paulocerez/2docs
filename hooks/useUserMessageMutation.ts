import { SelectChat } from "@/db/schema/chats";
import { Message } from "@/types/types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

export function useUserMessageMutation(sessionId: string, currentChatId: string | null) {
  const queryClient = useQueryClient();
  const router = useRouter()

  return useMutation({
    mutationFn: async (content: string) => {
      if (!currentChatId || currentChatId.startsWith("temp-")) {
        // Create a new chat and send the first message
        const response = await fetch("/api/chats", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            userId: sessionId,
            prompt: content,
            role: "user",
          }),
        });

        if (!response.ok) {
          throw new Error("Failed to create new chat");
        }

        const newChat = await response.json();
        return {
          chatId: newChat.id,
          message: {
            content,
            role: "user",
            id: newChat.messageId,
            timestamp: new Date(),
          },
          isNewChat: true,
        };
      } else {
        // Send message to existing chat
        const response = await fetch(`/api/chats/${currentChatId}/messages`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ content, userId: sessionId, role: "user" }),
        });

        if (!response.ok) {
          throw new Error("Failed to send message");
        }

        const data = await response.json();
        return { chatId: currentChatId, message: data, isNewChat: false };
      }
    },
    onSuccess: (data) => {
      if (data.isNewChat) {
        // Update the chats list with the new chat
        queryClient.setQueryData<SelectChat[]>(
          ["chats", sessionId],
          (oldChats = []) => [
            { 
              id: data.chatId, 
              prompt: data.message.content, 
              userId: sessionId,
              createdAt: new Date(),
              lastActivityAt: new Date()
            },
            ...oldChats.filter(chat => chat.id !== currentChatId)
          ]
        );

		// Set the messages for the new chat
        queryClient.setQueryData<Message[]>(
			["messages", data.chatId],
			[data.message]
		  );

        // Update currentChatId
        queryClient.setQueryData(["currentChatId"], data.chatId);
		router.replace(`/chat/${data.chatId}`)
      } else {
        // Update the messages for the chat
        queryClient.setQueryData<Message[]>(
        ["messages", data.chatId],
        (oldMessages = []) => [...oldMessages, data.message]
      );
	}
    },
  });
}