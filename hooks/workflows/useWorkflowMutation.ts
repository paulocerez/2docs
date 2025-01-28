import { useMutation } from "@tanstack/react-query";
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

interface WorkflowMutationData {
  prompt: string;
  apiDocIds: string[];
  title: string;
}

export function useWorkflowMutation(userId: string) {
	const router = useRouter();

  return useMutation({
    mutationFn: async ({ prompt, apiDocIds, title }: WorkflowMutationData) => {
      const response = await fetch(`/api/users/${userId}/workflows`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
          prompt, 
          apiDocIds,
          title
        }),
      });

      if (!response.ok) {
        console.error("Workflow mutation failed:", response.status, response.statusText);
        throw new Error("Failed to generate workflow");
      }
      
      const data = await response.json();
      
      if (!data.workflow || !data.workflow.id) {
        console.error("Invalid workflow response structure:", data);
        throw new Error("Invalid workflow response from server");
      }

      return data;
    },
    onError: (error) => {
      console.error("Workflow mutation error:", error);
      toast.error("Failed to generate workflow. Please try again.");
      router.push('/chat');
    }
  });
}