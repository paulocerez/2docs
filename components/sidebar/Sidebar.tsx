"use client";
import SidebarHeader from "./SidebarHeader";
import SidebarFooter from "./SidebarFooter";
import { SelectChat } from "@/db/schema/chats";
import { SidebarProps } from "@/types/types";
import { ChatList } from "../chat/chat-list";
import StoredWorkflows from "./StoredWorkflows";

export default function Sidebar({
  sessionId,
  toggleSidebar,
  setCurrentChatId,
  currentChatId,
  isSidebarOpen,
  chats,
  isLoading,
  createTemporaryChat,
  temporaryChatId,
}: SidebarProps) {
  const handleCreateNewChat = () => {
    const newChatId = createTemporaryChat();
    setCurrentChatId(newChatId);
  };

  return (
    <div
      className={`flex flex-col justify-between p-4 h-full w-64 fixed left-0 top-0 bottom-0 
	transition-transform duration-300 ease-in-out 
	bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 z-50
	${isSidebarOpen ? "translate-x-0" : "-translate-x-full"}`}
    >
      <div className="space-y-4">
        <SidebarHeader toggleSidebar={toggleSidebar} sessionId={sessionId} />
        <button
          onClick={handleCreateNewChat}
          className="w-full p-2 text-center text-xs border rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 dark:bg-gray-700"
        >
          Create new chat
        </button>
        <ChatList
          chats={chats}
          currentChatId={currentChatId}
          setCurrentChatId={setCurrentChatId}
          temporaryChatId={temporaryChatId}
          isLoading={isLoading}
        />
      </div>
      <div>
        <StoredWorkflows />
        <SidebarFooter />
      </div>
    </div>
  );
}
