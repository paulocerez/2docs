"use client";
import { useState } from "react";
import Sidebar from "./Sidebar";
import Chat from "../chat/Chat";
import Header from "../header/Header";

export default function ChatLayout() {
  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(false);
  const toggleSidebar = () => {
    setIsSidebarOpen((prev) => !prev);
  };

  return (
    <div className="flex h-screen">
      <div
        className={`transition-all duration-300 ${
          isSidebarOpen ? "w-full sm:w-2/5 lg:w-1/5" : "w-0"
        }`}
      >
        <Sidebar isSidebarOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
      </div>
      <div
        className={`flex flex-col flex-grow transition-all duration-300 ${
          isSidebarOpen ? "hidden sm:flex sm:w-3/5 lg:w-4/5" : "w-full"
        }`}
      >
        <Header isSidebarOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
        <Chat isSidebarOpen={isSidebarOpen} />
      </div>
    </div>
  );
}
