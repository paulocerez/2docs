import { useMutation } from "@tanstack/react-query";

interface WorkflowMutationData {
  prompt: string;
  apiDocIds: string[];
  userId: string;
  title: string;
}

export default function useWorkflowMutation() {
	console.log("workflow mutation");

  return useMutation({
    mutationFn: async ({ prompt, apiDocIds, userId, title }: WorkflowMutationData) => {
      const response = await fetch(`/api/workflows`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt, apiDocIds, userId, title }),
      });

      if (!response.ok) {
        throw new Error("Failed to generate and save workflow");
      }
      return response.json();
    },
  });
}