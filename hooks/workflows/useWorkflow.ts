import { useQuery } from "@tanstack/react-query";
import { WorkflowProps } from "@/types/workflow";

export function useWorkflow(chatId: string, userId: string) {
  return useQuery<WorkflowProps>({
    queryKey: ["workflow", userId, chatId],
    queryFn: async () => {
      const response = await fetch(
        `/api/users/${userId}/chats/${chatId}/workflow`
      );
      
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(
          errorData.error || 
          `Failed to fetch workflow: ${response.status} ${response.statusText}`
        );
      }

      return response.json();
    },
  });
}