import { useQuery } from "@tanstack/react-query";

export function useWorkflow(chatId: string) {
  return useQuery(["workflow", chatId], async () => {
	const response = await fetch(`/api/chats/${chatId}/workflow`);
	if (!response.ok) {
	  throw new Error("Failed to fetch workflow");
	}
	return response.json();
  });
}