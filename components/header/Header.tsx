import { HeaderProps } from "@/types/types";
import React from "react";
import { FiSidebar } from "react-icons/fi";

export default function Header({
  currentChatId,
  isSidebarOpen,
  toggleSidebar,
  currentChatTopic,
}: HeaderProps) {
  return (
    <div className="flex flex-row h-16 items-center p-4 w-full md:w-full justify-between border-b border-slate-200 dark:border-gray-700">
      <div className="flex items-center">
        {!isSidebarOpen && (
          <button
            onClick={toggleSidebar}
            className="p-2 rounded-md hover:bg-slate-50"
          >
            <FiSidebar />
          </button>
        )}
        {isSidebarOpen && <div className="w-8"></div>}
      </div>
      <h1 className="text-sm font-semibold">
        {currentChatTopic || "Chat topic"}
      </h1>
      <h1 className="text-sm">
        {currentChatId ? `Id: ${currentChatId.slice(-5)}` : "New id"}
      </h1>
    </div>
  );
}
