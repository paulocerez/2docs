
import { useMutation } from "@tanstack/react-query";

interface ScrapeUrlMutationData {
	url: string;
	userId: string;
}	

export function useScrapeUrlMutation() {

	console.log("Scraping url mutation");
  return useMutation({
    mutationFn: async ({ url, userId }: ScrapeUrlMutationData ) => {
		// check if api documentation already exists
		const checkResponse = await fetch('/api/check-documentation', {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({ url }),
		  });

		  if (checkResponse.ok) {
			const { apiDocId } = await checkResponse.json();
			if (apiDocId) {
				console.log("Existing API used for url:", apiDocId);
				return { apiDocId };
			}
		  }

		// if not, scrape the url
		const scrapeResponse = await fetch('/api/scrape', {
        	method: "POST",
        	headers: { "Content-Type": "application/json" },
        	body: JSON.stringify({ userId, url }),
	    });


      if (!scrapeResponse.ok) {
		const errorData = await scrapeResponse.json();
		throw new Error(errorData.error || "Failed to scrape url");
      }

	  return scrapeResponse.json();
    },
  });
}
