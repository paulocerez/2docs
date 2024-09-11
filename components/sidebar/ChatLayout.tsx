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
    <div className="flex h-screen">
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
        className={`flex flex-col flex-grow transition-all duration-300 ${
          isSidebarOpen ? "w-4/5" : "w-full"
        }`}
      >
        <DesktopHeader
          isSidebarOpen={isSidebarOpen}
          toggleSidebar={toggleSidebar}
        />
        <Chat />
      </div>
    </div>
  );
}
