"use client";
import Header from "../header/Header";
import Sidebar from "../sidebar/Sidebar";
import Chat from "./Chat";
import { useEffect, useState } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ChatLayoutProps } from "@/types/types";
import { useChats } from "@/hooks/useChats";
import { useCurrentChat } from "@/hooks/useCurrentChat";
import { useHotkeys } from "react-hotkeys-hook";

const queryClient = new QueryClient();

function ChatLayoutContent({
  sessionId,
  initialChatId,
  createNewChat,
}: ChatLayoutProps) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const {
    chats,
    isLoading,
    setCurrentChat,
    createTemporaryChat,
    temporaryChatId,
  } = useChats(sessionId, queryClient);

  const currentChat = useCurrentChat(queryClient);

  useEffect(() => {
    if (createNewChat && !currentChat && !temporaryChatId) {
      const newChatId = createTemporaryChat();
      setCurrentChat(newChatId);
    }
  }, [
    createNewChat,
    currentChat,
    temporaryChatId,
    createTemporaryChat,
    setCurrentChat,
  ]);

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);
  useHotkeys("s", () => toggleSidebar());

  return (
    <div className="flex h-screen dark:bg-gray-900">
      {isSidebarOpen && (
        <Sidebar
          isSidebarOpen={isSidebarOpen}
          sessionId={sessionId}
          currentChatId={currentChat?.id || temporaryChatId}
          setCurrentChatId={setCurrentChat}
          toggleSidebar={toggleSidebar}
          chats={chats}
          isLoading={isLoading}
          createTemporaryChat={createTemporaryChat}
          temporaryChatId={temporaryChatId}
        />
      )}
      <div
        className={`flex-1 flex flex-col transition-all duration-300 ease-in-out bg-red-500 ${
          isSidebarOpen ? "sm:ml-24 blur-background" : "ml-0"
        }`}
      >
        <Header
          currentChatId={currentChat?.id || temporaryChatId}
          toggleSidebar={toggleSidebar}
          isSidebarOpen={isSidebarOpen}
          currentChatTopic={currentChat?.prompt}
        />
        {(currentChat || temporaryChatId) && (
          <Chat
            sessionId={sessionId}
            currentChatId={currentChat?.id || temporaryChatId}
            isTemporary={!currentChat?.id || currentChat.id === temporaryChatId}
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
