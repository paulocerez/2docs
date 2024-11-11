
import { useMutation, useQueryClient } from "@tanstack/react-query";

interface ScrapeUrlMutationData {
	chatId: string;
	url: string;
	userId: string;
}	

export function useScrapeUrlMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ chatId, url, userId }: ScrapeUrlMutationData ) => {
      const response = await fetch('/api/scrape', {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId, chatId, url }),
      });


      if (!response.ok) {
		const errorData = await response.json();
		throw new Error(errorData.error || "Failed to scrape url");
      }

	  return response.json();
    },
  });
}
