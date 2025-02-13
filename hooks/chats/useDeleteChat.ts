import { useMutation, useQueryClient } from "@tanstack/react-query"
import { useRouter } from "next/navigation"
import { toast } from "sonner"

export function useDeleteChat(userId: string) {
	const queryClient = useQueryClient();
	const router = useRouter();

	return useMutation({
		mutationFn: async (chatId: string) => {
			const response = await fetch(
				`/api/users/${userId}/chats/${chatId}`,
				{ method: "DELETE" }
			);

			if (!response.ok) {
				throw new Error("Failed to delete chat");
			}

			return response.json();
		},
		onSuccess: (_, chatId) => {
			// Remove the chat from the cache
			queryClient.setQueryData(["chats", userId], (oldChats: any[] = []) =>
				oldChats.filter((chat) => chat.id !== chatId)
			);
			
			// If we're on the deleted chat's page, redirect to /chat
			router.push("/chat");
			toast.success("Chat deleted successfully");
		},
		onError: () => {
			toast.error("Failed to delete chat");
		},
	});
}