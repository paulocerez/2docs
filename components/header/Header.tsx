import React, { useState } from "react";
import { FiSidebar } from "react-icons/fi";
import Hotkey from "../ui/hotkey";

interface HeaderProps {
  isSidebarOpen: boolean;
  toggleSidebar: () => void;
  currentChatId: string | null;
  currentChatTopic?: string;
}

export default function Header({
  currentChatId,
  isSidebarOpen,
  toggleSidebar,
  currentChatTopic,
}: HeaderProps) {
  const [showSidebarTooltip, setShowSidebarTooltip] = useState<boolean>(false);

  return (
    <div className="flex flex-row items-center p-3 w-full justify-start space-x-4 fixed backdrop-blur-lg bg-gray-50/50 dark:bg-black/50 lg:bg-transparent lg:backdrop-blur-none border-b border-gray-100 dark:lg:border-gray-700 lg:border-none">
      <div className="flex items-center relative">
        {!isSidebarOpen && (
          <button
            onClick={toggleSidebar}
            onMouseEnter={() => setShowSidebarTooltip(true)}
            onMouseLeave={() => setShowSidebarTooltip(false)}
            className="p-1 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200 text-gray-700 dark:text-gray-300"
            aria-label="Toggle Sidebar"
          >
            <FiSidebar className="w-4 h-4" />
            <div
              className={`absolute left-0 top-full mt-2 z-50 ${
                showSidebarTooltip
                  ? "opacity-100 visible"
                  : "opacity-0 invisible"
              } transition-all duration-200 ease-in-out transform ${
                showSidebarTooltip ? "translate-y-0" : "-translate-y-1"
              }`}
            >
              <div className="flex flex-row items-center justify-between space-x-2 p-2 bg-gray-100 dark:bg-gray-700 text-gray-500 dark:text-gray-300 border dark:border-gray-600 shadow-sm text-xs rounded whitespace-nowrap">
                <p>Toggle Sidebar</p>
                <Hotkey letter="s" />
              </div>
            </div>
          </button>
        )}
        {isSidebarOpen && <div className="w-8"></div>}
      </div>
      <h1 className="text-sm text-gray-800 dark:text-gray-200 truncate max-w-[700px]">
        {currentChatTopic || "Building a new workflow"}
      </h1>
      <div className="w-8"></div>
    </div>
  );
}
