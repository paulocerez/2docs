"use client";
import React, { createContext, useContext, useState, useEffect } from "react";
import { SelectChat } from "@/db/schema/chats";
import { ChatContextType } from "@/types/types";

const ChatContext = createContext<ChatContextType | undefined>(undefined);

export function ChatProvider({
  children,
  initialChats,
  initialChatId,
}: {
  children: React.ReactNode;
  initialChats: SelectChat[];
  initialChatId?: string;
}) {
  const [chats, setChats] = useState<SelectChat[]>(initialChats);
  const [currentChatId, setCurrentChatId] = useState<string | undefined>(
    initialChatId
  );
  const [currentChatTopic, setCurrentChatTopic] = useState<string | undefined>(
    initialChats.find((chat) => chat.id === initialChatId)?.prompt
  );

  useEffect(() => {
    if (initialChatId && !currentChatId) {
      setCurrentChatId(initialChatId);
    }
  }, [initialChatId, currentChatId]);

  const addChat = (newChat: SelectChat) => {
    setChats((prevChats) => [newChat, ...prevChats]);
    setCurrentChatId(newChat.id);
    setCurrentChatTopic(newChat.prompt);
  };

  return (
    <ChatContext.Provider
      value={{
        chats,
        setChats,
        currentChatId,
        setCurrentChatId,
        currentChatTopic,
        setCurrentChatTopic,
        addChat,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
}

export const useChatContext = () => {
  const context = useContext(ChatContext);
  if (context === undefined) {
    throw new Error("useChatContext must be used within a ChatProvider");
  }
  return context;
};
