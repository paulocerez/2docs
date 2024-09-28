import { useMutation, useQueryClient } from "@tanstack/react-query";

export function useDocLinkMutation(sessionId: string, currentChatId: string) {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: async (links: string[]) => {
			
		},
	})

}