import { SelectChat } from "@/db/schema/chats";
import { Message } from "@/types/message";
import { useMutation, useQueryClient } from "@tanstack/react-query";

interface UserMessageMutationData {
	title: string;
	prompt: string;
	chatId?: string;
	workflowId?: string;
}

export function useUserMessageMutation(userId: string) {
	const queryClient = useQueryClient();
  
	return useMutation({
	  mutationFn: async ({ chatId, title, prompt, workflowId }: UserMessageMutationData) => {
		let url = chatId 
		  ? `/api/users/${userId}/chats/${chatId}/messages` 
		  : `/api/users/${userId}/chats`;
		
		let body = chatId ? { prompt } : { title, prompt, workflowId };
  
		const response = await fetch(url, {
		  method: "POST",
		  headers: { "Content-Type": "application/json" },
		  body: JSON.stringify(body),
		});
  
		if (!response.ok) {
		  throw new Error(chatId ? "Failed to add message to chat" : "Failed to create new chat");
		}
  
		return response.json();
	  },
	  onSuccess: (data, variables) => {
		if (variables.chatId) {
		  // Add new message to chat
		  queryClient.setQueryData<Message[]>(
			["messages", data.chatId],
			(oldMessages = []) => [...oldMessages, data.message]
		  );
  
		  // Update the last activity of the chat
		  queryClient.setQueryData<SelectChat[]>(
			["chats", userId],
			(oldChats = []) =>
			  oldChats.map((chat) =>
				chat.id === variables.chatId
				  ? { ...chat, lastActivityAt: new Date() }
				  : chat
			  )
		  );
		} else {
		  // Add new chat
		  const newChat: SelectChat = {
			title: data.chat.title,
			workflowId: variables.workflowId!,
			id: data.chat.id,
			prompt: data.chat.prompt,
			userId: userId,
			createdAt: new Date(data.chat.createdAt),
			lastActivityAt: new Date(data.chat.lastActivityAt)
		  };
  
		  queryClient.setQueryData<SelectChat[]>(
			["chats", userId],
			(oldChats = []) => [newChat, ...oldChats]
		  );
  
		  queryClient.setQueryData<Message[]>(
			["messages", data.chat.id],
			[data.message]
		  );
  
		  queryClient.setQueryData(["currentChatId"], data.chat.id);
		}
		// Invalidate message quota after successful message
		queryClient.invalidateQueries({ queryKey: ["message-quota"] });
	  },
	});
  }