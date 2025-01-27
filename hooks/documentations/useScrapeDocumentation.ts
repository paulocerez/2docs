import { useMutation } from "@tanstack/react-query";

export function useScrapeDocumentation(userId: string) {
  return useMutation({
    mutationFn: async (url: string) => {
      const response = await fetch(`/api/users/${userId}/documentations/scrape`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url })
      });
      if (!response.ok) throw new Error("Failed to scrape documentation");
      return response.json();
    }
  });
} 