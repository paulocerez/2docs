"use client";
import SidebarHeader from "./SidebarHeader";
import { SidebarProps } from "@/types/types";
import { ChatList } from "../chat/chat-list";
import StoredWorkflows from "./StoredWorkflows";
import CreateChatButton from "./CreateChatButton";

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
  return (
    <div
      className={`flex flex-col justify-between p-4 h-full w-64 fixed left-0 top-0 bottom-0 
	  transition-transform duration-300 ease-in-out 
	  bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 z-10
	  ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"}`}
    >
      <div className="space-y-4">
        <SidebarHeader toggleSidebar={toggleSidebar} sessionId={sessionId} />
        <div className="flex flex-col space-y-1">
          <CreateChatButton
            setCurrentChatId={setCurrentChatId}
            createTemporaryChat={createTemporaryChat}
          />
          <StoredWorkflows />
        </div>
        <div className="border-t-2 border-gray-200 dark:border-gray-700 text-[10px] text-gray-500 pt-1 text-right">
          No. of Chats: {chats?.length}
        </div>
        <ChatList
          chats={chats}
          currentChatId={currentChatId}
          setCurrentChatId={setCurrentChatId}
          temporaryChatId={temporaryChatId}
          isLoading={isLoading}
        />
      </div>
    </div>
  );
}
