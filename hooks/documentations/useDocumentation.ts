import { useQuery } from "@tanstack/react-query";

export function useDocumentation() {
  return useQuery({
    queryKey: ["documentation"],
    queryFn: async () => {
      const response = await fetch(`/api/documentations`);
      console.log("API Response status:", response.status);
      
      const data = await response.json();
      console.log("API Response data:", data);

      if (!response.ok) {
        throw new Error(data.error || "Failed to fetch documentations");
      }

      return data.documentations || [];
    }
  });
}
