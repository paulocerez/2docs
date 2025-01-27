import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export function useRenameChat(userId: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ chatId, title }: { chatId: string; title: string }) => {
      const response = await fetch(
        `/api/users/${userId}/chats/${chatId}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ title }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to rename chat");
      }

      return response.json();
    },
    onSuccess: (data, { chatId }) => {
      // Update the chat title in the cache
      queryClient.setQueryData(["chats", userId], (oldChats: any[] = []) =>
        oldChats.map((chat) =>
          chat.id === chatId ? { ...chat, title: data.title } : chat
        )
      );
      
      toast.success("Chat renamed successfully");
    },
    onError: () => {
      toast.error("Failed to rename chat");
    },
  });
}
