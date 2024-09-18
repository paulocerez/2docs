"use client";

import { useEffect, useState } from "react";
import Header from "../header/Header";
import Chat from "./Chat";
import { SelectChat } from "@/db/schema/chats";
import { ChatLayoutProps } from "@/types/types";
import Sidebar from "../sidebar/Sidebar";

export default function ChatLayout({
  sessionId,
  initialChats,
  initialChatId,
}: ChatLayoutProps) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [chats, setChats] = useState<SelectChat[]>(initialChats);
  const [currentChatId, setCurrentChatId] = useState<string | undefined>(
    undefined
  );
  const [currentChatTopic, setCurrentChatTopic] = useState<string | undefined>(
    undefined
  );

  useEffect(() => {
    if (initialChatId) {
      setCurrentChatId(initialChatId);
    }
  }, [initialChatId]);

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  const addChat = (newChat: SelectChat) => {
    setChats((prevChats) => [...prevChats, newChat]);
    setCurrentChatId(newChat.id);
    setCurrentChatTopic(newChat.prompt);
  };

  return (
    <div className="flex h-screen bg-gray-100 dark:bg-gray-900">
      <Sidebar
        sessionId={sessionId}
        chats={chats}
        addChat={addChat}
        isSidebarOpen={isSidebarOpen}
        toggleSidebar={toggleSidebar}
        setCurrentChatId={setCurrentChatId}
        currentChatId={currentChatId}
      />
      <div
        className={`flex-1 flex flex-col transition-all duration-300 ease-in-out ${
          isSidebarOpen ? "ml-64" : "ml-0"
        }`}
      >
        <Header
          currentChatId={currentChatId}
          toggleSidebar={toggleSidebar}
          isSidebarOpen={isSidebarOpen}
          currentChatTopic={currentChatTopic}
        />
        <Chat sessionId={sessionId} currentChatId={currentChatId} />
      </div>
    </div>
  );
}
