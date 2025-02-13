import { useQuery } from "@tanstack/react-query";

interface Product {
  id: string;
  name: string;
  description: string | null;
  features: string[];
  priceId: string;
  unitAmount: number | null;
  currency: string;
  interval: string | null;
  metadata: {
    [key: string]: string;
  };
}

export function useProducts() {
  return useQuery<Product[]>({
    queryKey: ["products"],
    queryFn: async () => {
      const response = await fetch("/api/products");
      if (!response.ok) {
        throw new Error("Failed to fetch products");
      }
      const data = await response.json();
      console.log(data);
      return data;
    },
  });
} 