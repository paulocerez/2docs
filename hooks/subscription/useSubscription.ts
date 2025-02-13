import { useQuery } from "@tanstack/react-query";

export function useSubscription(userId: string) {
	return useQuery({
		queryKey: [],
		queryFn: async () => {
			
		}
	})
}