import { useMutation } from "@tanstack/react-query";
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

interface WorkflowMutationData {
  prompt: string;
  apiDocIds: string[];
  userId: string;
  title: string;
}

export function useWorkflowMutation() {
	const router = useRouter();
	
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
    onError: (error) => {
      // Set error state in your store or context
      toast.error("Failed to generate workflow. Please try again.");
      // Redirect to workflow creation
      router.push('/workflow/new');
    }
  });
}