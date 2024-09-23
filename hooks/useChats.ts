import { SelectChat } from "@/db/schema/chats";
import { useQuery, QueryClient } from "@tanstack/react-query";
import { useState } from "react";

export function useChats(sessionId: string, queryClient: QueryClient) {
  const [temporaryChatId, setTemporaryChatId] = useState<string | null>(null);

  const { data: chats, isLoading } = useQuery<SelectChat[]>({
    queryKey: ["chats", sessionId],
    queryFn: () => fetch(`/api/chats?userId=${sessionId}`).then((res) => res.json()),
  });

  const createTemporaryChat = () => {
    const newTempChat: SelectChat = {
      id: `temp-${Date.now()}`,
      prompt: "New chat",
      userId: sessionId,
      createdAt: new Date(),
    };

    queryClient.setQueryData<SelectChat[]>(["chats", sessionId], (oldChats) =>
      oldChats ? [newTempChat, ...oldChats] : [newTempChat]
    );

    setTemporaryChatId(newTempChat.id);
    return newTempChat.id;
  };

  const setCurrentChat = (chatId: string) => {
    const currentChat = chats?.find((chat) => chat.id === chatId) ||
      (chatId === temporaryChatId ? { id: chatId, prompt: "New chat" } : undefined);
    queryClient.setQueryData(["currentChat"], currentChat);
  };

  return { chats, isLoading, setCurrentChat, createTemporaryChat, temporaryChatId };
}