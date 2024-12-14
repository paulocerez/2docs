import { useMutation } from "@tanstack/react-query";

export function useWorkflowUpdateMutation() {
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
	});
}
