"use client";
import { DesktopHeaderProps } from "@/types/Header";
import { useState } from "react";

export default function DesktopSidebar({
  isSidebarOpen,
  toggleSidebar,
}: DesktopHeaderProps) {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 h-full bg-blue-500 text-white transition-transform duration-300 ${
          isOpen ? "w-1/5" : "w-0"
        } overflow-hidden`}
        s
      >
        <div className="p-4">
          <h2 className="text-xl font-bold">Sidebar</h2>
          <ul className="mt-4 space-y-2">
            <li>
              <a href="#" className="block">
                Home
              </a>
            </li>
            <li>
              <a href="#" className="block">
                Profile
              </a>
            </li>
            <li>
              <a href="#" className="block">
                Settings
              </a>
            </li>
            <li>
              <a href="#" className="block">
                Logout
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="flex-grow bg-gray-100 p-4">
        <button
          onClick={toggleSidebar}
          className="absolute top-4 right-4 bg-blue-800 text-white p-2 rounded"
        >
          {isOpen ? "Close" : "Open"} Sidebar
        </button>
        <div>
          <h1 className="text-2xl font-bold">Main Content</h1>
          <p className="mt-4">This is the main content area.</p>
        </div>
      </div>
    </div>
  );
}
