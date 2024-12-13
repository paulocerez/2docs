"use client";
import Header from "@/components/header/Header";
import Sidebar from "@/components/sidebar/Sidebar";
import { SelectChat } from "@/db/postgres/schema/chats";
import { useChats } from "@/hooks/chats/useChats";
import { QueryClient, useQuery } from "@tanstack/react-query";
import React from "react";
import { useState } from "react";
import { useHotkeys } from "react-hotkeys-hook";

export interface AuthenticatedLayoutProps {
  children: React.ReactNode;
  userId: string;
  currentPageTitle?: string;
}

const queryClient = new QueryClient();

export default function AuthenticatedLayout({
  userId,
  currentPageTitle,
  children,
}: AuthenticatedLayoutProps) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const { chats, isLoading, setCurrentChat } = useChats(userId);
  const { data: currentChat } = useQuery<SelectChat | undefined>({
    queryKey: ["currentChat"],
    queryFn: () => queryClient.getQueryData(["currentChat"]),
    enabled: !!queryClient.getQueryData(["currentChat"]),
  });

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);
  useHotkeys("s", () => toggleSidebar());

  return (
    <div className="flex">
      {isSidebarOpen && (
        <Sidebar
          isSidebarOpen={isSidebarOpen}
          userId={userId}
          toggleSidebar={toggleSidebar}
          chats={chats}
          isLoading={isLoading}
          currentChatId={currentChat?.id || null}
          setCurrentChatId={setCurrentChat}
        />
      )}
      <div
        className={`flex-1 flex flex-col transition-all duration-300 ease-in-out ${
          isSidebarOpen ? "sm:ml-24 blur-background" : "ml-0"
        }`}
      >
        <Header
          toggleSidebar={toggleSidebar}
          isSidebarOpen={isSidebarOpen}
          currentPageTitle={currentPageTitle}
          chatId={currentChat?.id}
        />
        <main className="flex-1 overflow-hidden">{children}</main>
      </div>
    </div>
  );
}
