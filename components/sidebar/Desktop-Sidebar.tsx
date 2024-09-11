import { DesktopHeaderProps } from "@/types/Header";
import { FiSidebar } from "react-icons/fi";
import AccountSelect from "./AccountSelect";
import { ModeToggle } from "../mode-toggle";

const chats = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
const chatItems = chats.map((chat) => (
  <li key={chat} className="hover:bg-gray-100 rounded-md px-2">
    {chat}: Chat
  </li>
));

export default function DesktopSidebar({
  isSidebarOpen,
  toggleSidebar,
}: DesktopHeaderProps) {
  return (
    <div className="flex">
      <div
        className={`fixed top-0 left-0 h-full border-r border-slate-100 text-black transition-transform duration-300 ${
          isSidebarOpen ? "w-1/5" : "w-0"
        } overflow-hidden`}
      >
        {/* Entire Sidebar */}
        <div className="flex flex-col justify-between p-4 h-full">
          <div className="space-y-8">
            {/* Header */}
            <div className="flex flex-row justify-between items-center">
              <AccountSelect />
              {isSidebarOpen && (
                <button
                  onClick={toggleSidebar}
                  className=" p-2 rounded-md hover:bg-slate-50"
                >
                  <FiSidebar />
                </button>
              )}
            </div>
            <ul className="space-y-2">{chatItems}</ul>
          </div>
          <ModeToggle />
        </div>
      </div>
    </div>
  );
}
