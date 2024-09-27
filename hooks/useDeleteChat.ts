import { useQueryClient } from "@tanstack/react-query"
import { useState } from "react"

export function useDeleteChat() {
	const [chatToDelete, setChatToDelete] = useState<string | null>(null)
	const queryClient = useQueryClient();

	const confirmDelete = async () => {
		if (chatToDelete) {
			try {
				const response = await fetch(`/api/chats/${chatToDelete}`, {
					method: "DELETE"
				})
				if (response.ok) {
					// queryClient.invalidateQueries(["chats"])
				} else { 
					// 
				}
			} catch (error) {
				// 
			}
			setChatToDelete(null);

		}
	}
	return { chatToDelete, setChatToDelete, confirmDelete }
}