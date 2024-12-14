import { useMutation } from "@tanstack/react-query";

export function useWorkflowQuestionMutation() {
	return useMutation({
		mutationFn: async ({
			chatId,
			messages,
			codeSnippet,
		}: {
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
	});
}
