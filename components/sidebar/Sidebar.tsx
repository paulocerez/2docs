"use client";
import { useQueryClient } from "@tanstack/react-query";
import SidebarHeader from "./SidebarHeader";
import SidebarFooter from "./SidebarFooter";
import { SelectChat } from "@/db/schema/chats";
import { SidebarProps } from "@/types/types";
import { ChatList } from "../chat/chat-list";
import { useState } from "react";

export default function Sidebar({
  sessionId,
  toggleSidebar,
  setCurrentChatId,
  currentChatId,
  isSidebarOpen,
}: SidebarProps) {
  const queryClient = useQueryClient();
  const [temporaryChatId, setTemporaryChatId] = useState<string | null>(null);

  const handleCreateNewChat = () => {
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
    setCurrentChatId(newTempChat.id);
  };

  return (
    <div
      className={`flex flex-col justify-between p-4 h-full w-64 fixed left-0 top-0 bottom-0 
	transition-transform duration-300 ease-in-out 
	bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 z-50
	${isSidebarOpen ? "translate-x-0" : "-translate-x-full"}`}
    >
      <div className="space-y-4">
        <SidebarHeader toggleSidebar={toggleSidebar} />
        <button
          onClick={handleCreateNewChat}
          className="w-full p-2 text-center text-xs border rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 dark:bg-gray-700"
        >
          Create new chat
        </button>
        <ChatList
          sessionId={sessionId}
          currentChatId={currentChatId}
          setCurrentChatId={setCurrentChatId}
          temporaryChatId={temporaryChatId}
        />
      </div>
      <SidebarFooter />
    </div>
  );
}
