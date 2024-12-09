import { useMutation } from "@tanstack/react-query";

interface WorkflowMutationData {
  prompt: string;
  apiDocIds: string[];
  userId: string;
  title: string;
}

export default function useWorkflowMutation() {
  return useMutation({
    mutationFn: async ({ prompt, apiDocIds, userId, title: chatTitle }: WorkflowMutationData) => {
      const response = await fetch(`/api/workflows`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt, apiDocIds, userId, chatTitle }),
      });

	  console.log(prompt, apiDocIds, userId, chatTitle)

      if (!response.ok) {
        throw new Error("Failed to generate and save workflow");
      }
      return response.json();
    },
  });
}