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
	
	console.log("workflow mutation");

  return useMutation({
    mutationFn: async ({ prompt, apiDocIds, title }: WorkflowMutationData) => {
      const response = await fetch(`/api/users/${userId}/workflows`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
          prompt, 
          apiDocIds,
          chatTitle: title
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to generate workflow");
      }
      return response.json(); 
    },
    onError: (error) => {
      toast.error("Failed to generate workflow. Please try again.");
      router.push('/workflow/new');
    }
  });
}