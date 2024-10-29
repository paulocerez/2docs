import { SelectChat } from "@/db/schema/chats";
import { Message } from "@/types/types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

export function useUserMessageMutation(sessionId: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({title, prompt}: {title: string, prompt: string}) => {
        const response = await fetch("/api/chats", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            userId: sessionId,
            title,
            prompt,
            role: "user",
          }),
        });

        if (!response.ok) {
          throw new Error("Failed to create new chat");
        }

		const data = await response.json();
      return { chatId: data.chatId, message: data.message };
    },
    onSuccess: (data, {title}) => {
		const newChat: SelectChat = {
			id: data.chatId,
			prompt: title,
			userId: sessionId,
			createdAt: new Date(),
			lastActivityAt: new Date()
		  };

		// Add the new chat to the chats list
		queryClient.setQueryData<SelectChat[]>(
			["chats", sessionId],
			(oldChats = []) => [newChat, ...oldChats]
		  );
	
		  // Set the messages for the new chat
		  queryClient.setQueryData<Message[]>(
			["messages", data.chatId],
			[data.message]
		  );
	
		  // Update currentChatId
		  queryClient.setQueryData(["currentChatId"], data.chatId);
	}
  });
}