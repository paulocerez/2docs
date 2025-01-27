import { WorkflowStepProps } from "@/types/workflow";
import { useMutation } from "@tanstack/react-query";

export function useWorkflowQuestionMutation() {
	return useMutation({
		mutationFn: async ({
			chatId,
			messages,
			codeSnippet,
			userId,
		}: {
			chatId: string;
			messages: { role: string; content: string }[];
			codeSnippet: { mainFunction: string; steps: WorkflowStepProps[] };
			userId: string;
		}) => {
		const response = await fetch(`/api/users/${userId}/chats/${chatId}/workflow-question`, {
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
