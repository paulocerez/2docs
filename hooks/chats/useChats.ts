import { SelectChat } from "@/db/postgres/schema/chats";
import { useQuery, QueryClient } from "@tanstack/react-query";
import { useCallback, useState } from "react";

export function useChats(userId: string, queryClient: QueryClient) {

  const { data: chats, isLoading } = useQuery<SelectChat[]>({
    queryKey: ["chats", userId],
    queryFn: async () => {
		const response = await fetch(`/api/chats?userId=${userId}`)
		return response.json()
	},
	staleTime: 1000 * 60,
  });

  const setCurrentChat = useCallback((chatId: string) => {
    const currentChat = chats?.find((chat) => chat.id === chatId)
    
    if (currentChat) {
      queryClient.setQueryData(["currentChat"], currentChat);
      
      queryClient.setQueryData<SelectChat[]>(["chats", userId], (oldChats) => {
        if (!oldChats) return oldChats;
        const updatedChats = oldChats.map(chat => 
          chat.id === chatId ? { ...chat, lastActivityAt: new Date() } : chat
        );
        return updatedChats.sort((a, b) => 
          new Date(b.lastActivityAt).getTime() - new Date(a.lastActivityAt).getTime()
        );
      });
    }
  }, [chats, queryClient, userId]);

  return { chats, isLoading, setCurrentChat };
}
