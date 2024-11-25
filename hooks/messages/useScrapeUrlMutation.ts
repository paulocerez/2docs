
import { useMutation } from "@tanstack/react-query";

interface ScrapeUrlMutationData {
	url: string;
	userId: string;
}	

export function useScrapeUrlMutation() {

  return useMutation({
    mutationFn: async ({ url, userId }: ScrapeUrlMutationData ) => {
      const response = await fetch('/api/scrape', {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId, url }),
      });


      if (!response.ok) {
		const errorData = await response.json();
		throw new Error(errorData.error || "Failed to scrape url");
      }

	  return response.json();
    },
  });
}
