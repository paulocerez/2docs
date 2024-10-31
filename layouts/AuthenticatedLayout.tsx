import ChatLayout from "@/components/chat/ChatLayout";
import Header from "@/components/header/Header";
import Sidebar from "@/components/sidebar/Sidebar";
import { SelectChat } from "@/db/schema/chats";
import { useChats } from "@/hooks/useChats";
import {
  QueryClient,
  QueryClientProvider,
  useQuery,
} from "@tanstack/react-query";
import React from "react";
import { useState } from "react";
import { useHotkeys } from "react-hotkeys-hook";

export interface AuthenticatedLayoutProps {
  children: React.ReactNode;
  userId: string;
  currentPageTitle?: string;
}

const queryClient = new QueryClient();

function AuthenticatedLayoutContent({
  userId,
  currentPageTitle,
  children,
}: AuthenticatedLayoutProps) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const { chats, isLoading, setCurrentChat } = useChats(userId, queryClient);
  const { data: currentChat } = useQuery<SelectChat | undefined>({
    queryKey: ["currentChat"],
    queryFn: () => queryClient.getQueryData(["currentChat"]),
    enabled: !!queryClient.getQueryData(["currentChat"]),
  });

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);
  useHotkeys("s", () => toggleSidebar());

  //   const enhancedChildren = React.Children.map(children, (child) => {
  //     if (React.isValidElement(child) && child.type === ChatLayout) {
  //       return React.cloneElement(child, {});
  //     }
  //     return child;
  //   });

  return (
    <div className="flex h-screen dark:bg-gray-900">
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
          currentPageTitle={currentPageTitle || ""}
        />
        <main className="flex-1 overflow-y-auto">{children}</main>
      </div>
    </div>
  );
}

export default function AuthenticatedLayout(props: AuthenticatedLayoutProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthenticatedLayoutContent {...props} />
    </QueryClientProvider>
  );
}
