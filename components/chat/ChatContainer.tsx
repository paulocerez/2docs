"use client";
import Header from "../header/Header";
import Sidebar from "../sidebar/Sidebar";
import Chat from "./Chat";
import { useEffect, useState } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useChats } from "@/hooks/useChats";
import { useCurrentChat } from "@/hooks/useCurrentChat";
import { useHotkeys } from "react-hotkeys-hook";
import { SelectChat } from "@/db/schema/chats";

export interface ChatLayoutProps {
  sessionId: string;
  initialChatId?: string;
  initialChats?: SelectChat[];
  createNewChat?: boolean;
}

const queryClient = new QueryClient();

function ChatLayoutContent({ sessionId, initialChatId }: ChatLayoutProps) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [chatTitle, setChatTitle] = useState("");
  const { chats, isLoading, setCurrentChat } = useChats(sessionId, queryClient);
  const currentChat = useCurrentChat(queryClient);

  const currentChatId = currentChat?.id || initialChatId || null;

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);
  useHotkeys("s", () => toggleSidebar());

  return (
    <div className="flex h-screen dark:bg-gray-900">
      {isSidebarOpen && (
        <Sidebar
          isSidebarOpen={isSidebarOpen}
          sessionId={sessionId}
          currentChatId={currentChatId}
          setCurrentChatId={setCurrentChat}
          toggleSidebar={toggleSidebar}
          chats={chats}
          isLoading={isLoading}
        />
      )}
      <div
        className={`flex-1 flex flex-col transition-all duration-300 ease-in-out ${
          isSidebarOpen ? "sm:ml-24 blur-background" : "ml-0"
        }`}
      >
        <Header
          currentChatId={currentChatId}
          toggleSidebar={toggleSidebar}
          isSidebarOpen={isSidebarOpen}
          currentChatTopic={chatTitle || currentChat?.prompt}
        />
        <Chat
          sessionId={sessionId}
          currentChatId={currentChatId}
          chatTitle={chatTitle}
          setChatTitle={setChatTitle}
        />
      </div>
    </div>
  );
}

export default function ChatLayout(props: ChatLayoutProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <ChatLayoutContent {...props} />
    </QueryClientProvider>
  );
}
