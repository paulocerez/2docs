import React from "react";
import { FiSidebar } from "react-icons/fi";

interface HeaderProps {
  isSidebarOpen: boolean;
  toggleSidebar: () => void;
}

export default function Header({ isSidebarOpen, toggleSidebar }: HeaderProps) {
  return (
    <div className="flex flex-row h-16 items-center p-4 w-full md:w-full justify-between border-b border-slate-100">
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
      <h1 className="text-sm font-semibold">New chat</h1>
      <h1 className="text-sm">Id #12324</h1>
    </div>
  );
}
