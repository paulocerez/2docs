import { useMutation, useQueryClient } from "@tanstack/react-query";

interface ChatApiLinksMutationData {
	chatId: string;
	apiDocumentationIds: string[];
}

export function useChatApiLinksMutation() {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: async ({ chatId, apiDocumentationIds }: ChatApiLinksMutationData) => {
			const response = await fetch(`/api/chats/${chatId}/api-links`, {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({ apiDocumentationIds }),
			});


			if (!response.ok) {
				throw new Error("Failed to create API links");
			}
			return response.json();
		},
		onSuccess: (data, { chatId }) => {
			queryClient.setQueryData(["chatApiLinks", chatId], data);
			console.log("success", data);
		}
	});
}