import { SelectChat } from "@/db/schema/chats";
import { Message } from "@/types/types";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export function useUserMessageMutation(sessionId: string, currentChatId: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (content: string) => {
      if (currentChatId.startsWith("temp-")) {
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
        return { chatId: currentChatId, message: data };
      }
    },
    onSuccess: (data) => {
      if (currentChatId.startsWith("temp-")) {
        // Update the chats list with the new chat
        queryClient.setQueryData<SelectChat[]>(
          ["chats", sessionId],
          (oldChats) =>
            oldChats
              ? oldChats.map((chat) =>
                  chat.id === currentChatId
                    ? { ...chat, id: data.chatId }
                    : chat
                )
              : []
        );
        // Update the current chat ID
        queryClient.setQueryData(["currentChatId"], data.chatId);
      }
      // Update the messages for the chat
      queryClient.setQueryData<Message[]>(
        ["messages", data.chatId],
        (oldMessages = []) => [...oldMessages, data.message]
      );
    },
  });
}