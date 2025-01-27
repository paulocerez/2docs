import { useQuery } from "@tanstack/react-query";

export function useDocumentations() {
  return useQuery({
    queryKey: ["documentations"],
    queryFn: async () => {
      const response = await fetch("/api/documentations");
      if (!response.ok) throw new Error("Failed to fetch documentations");
      return response.json();
    }
  });
} 