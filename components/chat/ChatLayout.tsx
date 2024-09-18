"use client";

import { useState } from "react";
import Header from "../header/Header";
import Chat from "./Chat";
import { Sidebar } from "../sidebar/Sidebar";
import { SelectChat } from "@/db/schema/chats";
import { ChatLayoutProps } from "@/types/types";

export default function ChatLayout({
  sessionId,
  initialChats,
}: ChatLayoutProps) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [chats, setChats] = useState<SelectChat[]>(initialChats);
  const [currentChatId, setCurrentChatId] = useState<string | undefined>(
    undefined
  );

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  const addChat = (newChat: SelectChat) => {
    setChats((prevChats) => [...prevChats, newChat]);
    setCurrentChatId(newChat.id);
  };

  return (
    <div className="flex h-screen bg-gray-100 dark:bg-gray-900">
      <Sidebar
        sessionId={sessionId}
        chats={chats}
        addChat={addChat}
        isSidebarOpen={isSidebarOpen}
        toggleSidebar={toggleSidebar}
      />
      <div
        className={`flex-1 flex flex-col transition-all duration-300 ease-in-out ${
          isSidebarOpen ? "ml-64" : "ml-0"
        }`}
      >
        <Header isSidebarOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
        <Chat sessionId={sessionId} currentChatId={currentChatId} />
      </div>
    </div>
  );
}
