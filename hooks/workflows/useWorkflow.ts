import { useQuery } from "@tanstack/react-query";

export function useWorkflow(chatId: string) {
  return useQuery({
    queryKey: ["workflow", chatId],
    queryFn: async () => {
      const response = await fetch(`/api/chats/${chatId}/workflow`);
      if (!response.ok) {
        throw new Error("Failed to fetch workflow");
      }
      const data = await response.json();
      return data.workflow;
    }
  });
}