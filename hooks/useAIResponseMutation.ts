import { Message } from "@/types/types";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export function useAIResponseMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ chatId, messages }: { chatId: string, messages: Array<{ role: string; content: string }> }) => {
      const response = await fetch(`/api/chats/${chatId}/generate`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages }),
      });

      if (!response.ok) {
        throw new Error("Failed to generate AI response");
      }

      const reader = response.body?.getReader();
      const decoder = new TextDecoder();

      let latestMessage: Message | null = null;

      while (true) {
        const { done, value } = await reader!.read();
        if (done) break;

        const chunk = decoder.decode(value);
        const lines = chunk.split('\n');
        const parsedLines = lines
          .filter(line => line.startsWith('data: '))
          .map(line => JSON.parse(line.slice(5)));

        for (const parsedLine of parsedLines) {
          latestMessage = parsedLine as Message;
          // You can update UI here with each chunk if needed
        }
      }

      return { chatId, message: latestMessage! };
    },
    onSuccess: (data) => {
      queryClient.setQueryData<Message[]>(
        ["messages", data.chatId],
        (oldMessages = []) => [...oldMessages, data.message]
      );
    },
  });
}