import { Message } from "@/types/message";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export function useWorkflowUpdateMutation() {
	const queryClient = useQueryClient();
  
	return useMutation({
	  mutationFn: async ({ chatId, prompt, workflow }: {
		chatId: string;
		prompt: string;
		workflow: any;
	  }) => {
		const response = await fetch(`/api/chats/${chatId}/workflow-update`, {
		  method: "POST",
		  headers: { "Content-Type": "application/json" },
		  body: JSON.stringify({ prompt, workflow }),
		});
  
		if (!response.ok) {
		  throw new Error("Failed to update workflow");
		}
  
		return response.json();
	  },
	  onSuccess: (data, variables) => {
		// Update messages
		queryClient.setQueryData<Message[]>(
		  ["messages", variables.chatId],
		  (oldMessages = []) => [...oldMessages, data.message]
		);
  
		// Update workflow
		queryClient.setQueryData(
		  ["workflow", variables.chatId],
		  data.workflow
		);
	  },
	});
  }		