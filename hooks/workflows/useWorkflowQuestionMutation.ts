import { Message } from "@/types/message";
import { useMutation } from "@tanstack/react-query";
import { useQueryClient } from "@tanstack/react-query";

export function useWorkflowQuestionMutation() {
	const queryClient = useQueryClient();
  
	return useMutation({
	  mutationFn: async ({ chatId, messages, codeSnippet }: {
		chatId: string;
		messages: { role: string; content: string }[];
		codeSnippet: string;
	  }) => {
		const response = await fetch(`/api/chats/${chatId}/workflow-question`, {
		  method: "POST",
		  headers: { "Content-Type": "application/json" },
		  body: JSON.stringify({ messages, codeSnippet }),
		});
  
		if (!response.ok) {
		  throw new Error("Failed to get explanation");
		}
  
		return response.json();
	  },
	  onSuccess: (data, variables) => {
		queryClient.setQueryData<Message[]>(
		  ["messages", variables.chatId],
		  (oldMessages = []) => [...oldMessages, data.message]
		);
	  },
	});
  }
  