import { useQuery } from "@tanstack/react-query";

export function useDocumentation() {
  return useQuery({
    queryKey: ["documentation"],
    queryFn: async () => {
      const response = await fetch(`/api/documentations`);
      
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to fetch documentations");
      }
      return data || [];
    }
  });
}
