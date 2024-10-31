import { SelectChat } from "@/db/schema/chats";
import { Message } from "@/types/message";
import { useMutation, useQueryClient } from "@tanstack/react-query";

interface UserMessageMutationData {
	title: string;
	prompt: string;
}

export function useUserMessageMutation(userId: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({title, prompt}: UserMessageMutationData) => {
        const response = await fetch("/api/chats", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            userId: userId,
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
			title: title,
			id: data.chatId,
			prompt: data.message.content,
			userId: userId,
			createdAt: new Date(),
			lastActivityAt: new Date()
		  };

		// Add the new chat to the chats list
		queryClient.setQueryData<SelectChat[]>(
			["chats", userId],
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