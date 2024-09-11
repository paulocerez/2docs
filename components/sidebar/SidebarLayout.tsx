"use client";
import { useState } from "react";
import DesktopHeader from "../header/Desktop-Header";
import DesktopSidebar from "./Desktop-Sidebar";
import Chat from "../chat/Chat";

export default function SidebarLayout() {
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
      <DesktopSidebar
        isSidebarOpen={isSidebarOpen}
        toggleSidebar={toggleSidebar}
      />
      <div className={`flex-grow ${isSidebarOpen ? "w-4/5" : "w-full"}`}>
        <Chat />
      </div>
    </div>
  );
}
