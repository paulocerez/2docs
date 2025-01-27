import { useQuery } from "@tanstack/react-query";

export function useCheckDocumentation(url: string) {
  return useQuery({
    queryKey: ["documentation", url],
    queryFn: async () => {
      const response = await fetch(`/api/documentations/check`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url })
      });
      if (!response.ok) throw new Error("Failed to check documentation");
      return response.json();
    },
    enabled: !!url
  });
} 