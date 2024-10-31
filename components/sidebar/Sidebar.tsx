"use client";
import SidebarHeader from "./SidebarHeader";
import StoredWorkflows from "./StoredWorkflows";
import CreateChatButton from "./CreateChatButton";
import { SelectChat } from "@/db/schema/chats";
import { QueryClient, useQuery } from "@tanstack/react-query";
import { ChatList } from "./chat-list";

interface SidebarProps {
  isSidebarOpen: boolean;
  userId: string;
  currentChatId: string | null;
  setCurrentChatId: (id: string) => void;
  toggleSidebar: () => void;
  chats: SelectChat[] | undefined;
  isLoading: boolean;
}

const queryClient = new QueryClient();

export default function Sidebar({
  userId,
  toggleSidebar,
  setCurrentChatId,
  currentChatId,
  isSidebarOpen,
  chats,
  isLoading,
}: SidebarProps) {
  const { data: currentChat } = useQuery<SelectChat | undefined>({
    queryKey: ["currentChat"],
    queryFn: () => queryClient.getQueryData(["currentChat"]),
    enabled: !!queryClient.getQueryData(["currentChat"]),
  });

  return (
    <div
      className={`flex flex-col justify-between p-4 h-full w-64 fixed left-0 top-0 bottom-0 
	  transition-transform duration-300 ease-in-out 
	  bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 z-10
	  ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"}`}
    >
      <div className="space-y-4">
        <SidebarHeader toggleSidebar={toggleSidebar} userId={userId} />
        <div className="flex flex-col space-y-1">
          <CreateChatButton />
          <StoredWorkflows />
        </div>
        <div className="border-t-2 border-gray-200 dark:border-gray-700 text-[10px] text-gray-500 pt-1 text-right">
          No. of Chats: {chats?.length}
        </div>
        <ChatList
          chats={chats}
          currentChatId={currentChatId}
          setCurrentChatId={setCurrentChatId}
          isLoading={isLoading}
        />
      </div>
    </div>
  );
}
