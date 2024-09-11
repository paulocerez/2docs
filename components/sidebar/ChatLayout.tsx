"use client";
import { useState } from "react";
import DesktopHeader from "../header/Desktop-Header";
import DesktopSidebar from "./Desktop-Sidebar";
import Chat from "../chat/Chat";

export default function ChatLayout() {
  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(false);
  const toggleSidebar = () => {
    setIsSidebarOpen((prev) => !prev);
  };

  return (
    <div className="flex flex-col h-screen">
      <DesktopHeader
        isSidebarOpen={isSidebarOpen}
        toggleSidebar={toggleSidebar}
      />
      <div className="flex flex-row flex-grow">
        <div
          className={`transition-all duration-300 ${
            isSidebarOpen ? "w-1/5" : "w-0"
          }`}
        >
          <DesktopSidebar
            isSidebarOpen={isSidebarOpen}
            toggleSidebar={toggleSidebar}
          />
        </div>
        <div
          className={`flex-grow transition-all duration-300 ${
            isSidebarOpen ? "w-4/5" : "w-full"
          }`}
        >
          <Chat />
        </div>
      </div>
    </div>
  );
}
