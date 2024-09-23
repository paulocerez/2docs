"use client";
import { useState } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Header from "../header/Header";
import Sidebar from "../sidebar/Sidebar";
import Chat from "./Chat";
import { ChatLayoutProps } from "@/types/types";
import { useChats } from "@/hooks/useChats";
import { useCurrentChat } from "@/hooks/useCurrentChat";

const queryClient = new QueryClient();

function ChatLayoutContent({ sessionId, initialChatId }: ChatLayoutProps) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const {
    chats,
    isLoading,
    setCurrentChat,
    createTemporaryChat,
    temporaryChatId,
  } = useChats(sessionId, queryClient);
  const currentChat = useCurrentChat(queryClient);

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  return (
    <div className="flex h-screen dark:bg-gray-900">
      {isSidebarOpen && (
        <Sidebar
          isSidebarOpen={isSidebarOpen}
          sessionId={sessionId}
          currentChatId={currentChat?.id}
          setCurrentChatId={setCurrentChat}
          toggleSidebar={toggleSidebar}
          chats={chats}
          isLoading={isLoading}
          createTemporaryChat={createTemporaryChat}
          temporaryChatId={temporaryChatId}
        />
      )}
      <div
        className={`flex-1 flex flex-col transition-all duration-300 ease-in-out ${
          isSidebarOpen ? "sm:ml-24 blur-background" : "ml-0"
        }`}
      >
        <Header
          currentChatId={currentChat?.id}
          toggleSidebar={toggleSidebar}
          isSidebarOpen={isSidebarOpen}
          currentChatTopic={currentChat?.prompt}
        />
        {currentChat && (
          <Chat
            sessionId={sessionId}
            currentChatId={currentChat.id}
            isTemporary={currentChat.id === temporaryChatId}
          />
        )}
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
