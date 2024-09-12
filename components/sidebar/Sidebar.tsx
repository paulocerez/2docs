import { DesktopHeaderProps } from "@/types/Header";
import { FiSidebar } from "react-icons/fi";
import AccountSelect from "./AccountSelect";
import { ModeToggle } from "../mode-toggle";
import { useCallback, useState } from "react";

const chats = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
const chatItems = chats.map((chat) => (
  <li key={chat} className="hover:bg-gray-100 rounded-md px-2">
    {chat}: Chat topic
  </li>
));

export default function Sidebar({
  isSidebarOpen,
  toggleSidebar,
}: DesktopHeaderProps) {
  const [chatSessions, setChatSessions] = useState([]);

  const createChatSession = useCallback(
    async (userId: number, prompt: string) => {
      try {
        const response = await fetch("/api/chat-sessions", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ userId, prompt }),
        });

        if (!response.ok) {
          throw new Error("Failed to create chat session");
        }

        const newSession = await response.json();
        setChatSessions((prevSessions) => [...prevSessions, newSession]);
        return newSession;
      } catch (error) {
        console.error("Error creating chat session:", error);
        throw error;
      }
    },
    []
  );

  return (
    <div
      className={`fixed top-0 left-0 h-full border-r border-slate-100 text-black transition-transform duration-300 ${
        isSidebarOpen ? "w-full sm:w-2/5 lg:w-1/5" : "w-0"
      } overflow-hidden`}
    >
      {/* Entire Sidebar */}
      <div className="flex flex-col justify-between p-8 sm:p-4 h-full">
        <div className="space-y-12 sm:space-y-8">
          {/* Header */}
          <div className="flex flex-row justify-between items-center ">
            <AccountSelect />
            {isSidebarOpen && (
              <button
                onClick={toggleSidebar}
                className="p-2 rounded-md hover:bg-slate-50"
              >
                <FiSidebar />
              </button>
            )}
          </div>
          <button
            className="border rounded-md p-2 w-full text-sm hover:bg-gray-100"
            onClick={createNewChatSession}
          >
            Create new workflow
          </button>
          <ul className="space-y-6 sm:space-y-2">{chatItems}</ul>
        </div>
        <ModeToggle />
      </div>
    </div>
  );
}
