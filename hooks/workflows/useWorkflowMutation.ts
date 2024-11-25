import { useMutation } from "@tanstack/react-query";


export default function useWorkflowMutation() {
  
	return useMutation({
		mutationFn: async ({ prompt, apiDocIds }: { prompt: string, apiDocIds: string[] }) => {
			const response = await fetch(`/api/workflows`, {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({ prompt, apiDocIds }),
			});

			if (!response.ok) {
				throw new Error("Failed to create workflow");
			}
			return response.json();
		}
  });
}
