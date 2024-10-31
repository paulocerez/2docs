import { SelectChat } from "@/db/schema/chats";
import { useQuery, QueryClient } from "@tanstack/react-query";
import { useCallback, useState } from "react";

export function useChats(sessionId: string, queryClient: QueryClient) {

  const { data: chats, isLoading } = useQuery<SelectChat[]>({
    queryKey: ["chats", sessionId],
    queryFn: () => fetch(`/api/chats?userId=${sessionId}`).then((res) => res.json()),
	staleTime: 1000 * 60,
  });

  const setCurrentChat = useCallback((chatId: string) => {
    const currentChat = chats?.find((chat) => chat.id === chatId)
    
    if (currentChat) {
      queryClient.setQueryData(["currentChat"], currentChat);
      
      queryClient.setQueryData<SelectChat[]>(["chats", sessionId], (oldChats) => {
        if (!oldChats) return oldChats;
        const updatedChats = oldChats.map(chat => 
          chat.id === chatId ? { ...chat, lastActivityAt: new Date() } : chat
        );
        return updatedChats.sort((a, b) => 
          new Date(b.lastActivityAt).getTime() - new Date(a.lastActivityAt).getTime()
        );
      });
    }
  }, [chats, queryClient, sessionId]);

  return { chats, isLoading, setCurrentChat };
}
