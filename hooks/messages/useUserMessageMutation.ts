import { SelectChat } from "@/db/postgres/schema/chats";
import { Message } from "@/types/message";
import { useMutation, useQueryClient } from "@tanstack/react-query";

interface UserMessageMutationData {
  prompt: string;
  chatId?: string;
  title?: string;
}

export function useUserMessageMutation(userId: string) {
	const queryClient = useQueryClient();
  
	return useMutation({
	  mutationFn: async ({ chatId, title, prompt }: UserMessageMutationData) => {
		let url = chatId ? `/api/chats/${chatId}/messages` : '/api/chats';
		let body = chatId ? { userId, prompt } : { userId, title, prompt };
  
		const response = await fetch(url, {
		  method: "POST",
		  headers: { "Content-Type": "application/json" },
		  body: JSON.stringify(body),
		});
  
		if (!response.ok) {
		  throw new Error(chatId ? "Failed to add message to chat" : "Failed to create new chat");
		}
  
		const data = await response.json();
		console.log("data", data);
		return { chatId: data.id, message: data.prompt };
	  },
	  onSuccess: (data, variables) => {
		if (variables.chatId) {
		  // Update existing chat
		  queryClient.setQueryData<Message[]>(
			["messages", data.chatId],
			(oldMessages = []) => [...oldMessages, data.message]
		  );
  
		  // Update the last activity of the chat
		  queryClient.setQueryData<SelectChat[]>(
			["chats", userId],
			(oldChats = []) =>
			  oldChats.map((chat) =>
				chat.id === data.chatId
				  ? { ...chat, lastActivityAt: new Date() }
				  : chat
			  )
		  );
		} else {
		  // Add new chat
		  const newChat: SelectChat = {
			title: variables.title!,
			id: data.chatId,
			prompt: data.message.content,
			userId: userId,
			createdAt: new Date(),
			lastActivityAt: new Date()
		  };
  
		  queryClient.setQueryData<SelectChat[]>(
			["chats", userId],
			(oldChats = []) => [newChat, ...oldChats]
		  );
  
		  queryClient.setQueryData<Message[]>(
			["messages", data.chatId],
			[data.message]
		  );
  
		  queryClient.setQueryData(["currentChatId"], data.chatId);
		}
	  },
	});
  }