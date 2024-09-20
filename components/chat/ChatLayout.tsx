"use client";
import { useState } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Header from "../header/Header";
import Sidebar from "../sidebar/Sidebar";
import Chat from "./Chat";
import { ChatLayoutProps } from "@/types/types";

const queryClient = new QueryClient();

export default function ChatLayout({
  sessionId,
  initialChatId,
}: ChatLayoutProps) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [currentChatId, setCurrentChatId] = useState<string | undefined>(
    initialChatId
  );

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  return (
    <QueryClientProvider client={queryClient}>
      <div className="flex h-screen bg-gray-100 dark:bg-gray-900">
        {isSidebarOpen && (
          <Sidebar
            sessionId={sessionId}
            currentChatId={currentChatId}
            setCurrentChatId={setCurrentChatId}
            toggleSidebar={toggleSidebar}
          />
        )}
        <div
          className={`flex-1 flex flex-col transition-all duration-300 ease-in-out ${
            isSidebarOpen ? "ml-64" : "ml-0"
          }`}
        >
          <Header
            currentChatId={currentChatId}
            toggleSidebar={toggleSidebar}
            isSidebarOpen={isSidebarOpen}
          />
          {currentChatId && (
            <Chat sessionId={sessionId} currentChatId={currentChatId} />
          )}
        </div>
      </div>
    </QueryClientProvider>
  );
}
