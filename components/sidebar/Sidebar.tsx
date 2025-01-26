"use client";
import SidebarHeader from "./SidebarHeader";
import { SelectChat } from "@/db/postgres/schema/chats";
import { ChatList } from "./chat-list";
import { IoDocumentTextOutline } from "react-icons/io5";
import { GrChat, GrStorage } from "react-icons/gr";
import SidebarItem from "./SidebarItem";
import { usePathname } from "next/navigation";
import { ChatQuota } from "@/components/chat/new-chat/quota/chat-quota";

interface SidebarProps {
  isSidebarOpen: boolean;
  userId: string;
  currentChatId: string | null;
  setCurrentChatId: (id: string) => void;
  toggleSidebar: () => void;
  chats: SelectChat[] | undefined;
  isLoading: boolean;
}

const sidebarItems = [
  { name: "Chat", icon: GrChat, hotkey: "c", path: "/chat" },
  { name: "Workflows", icon: GrStorage, hotkey: "w", path: "/workflows" },
  {
    name: "Documentations",
    icon: IoDocumentTextOutline,
    hotkey: "a",
    path: "/documentations",
  },
];

export default function Sidebar({
  userId,
  toggleSidebar,
  setCurrentChatId,
  currentChatId,
  isSidebarOpen,
  chats,
  isLoading,
}: SidebarProps) {
  const pathname = usePathname();

  const isCustomChatPage = pathname.startsWith("/chat/");
  const activeItem = sidebarItems.find((item) => {
    if (isCustomChatPage) {
      return false;
    }
    return pathname === "/"
      ? item.path === "/chat"
      : pathname.startsWith(item.path);
  });

  return (
    <div
      className={`flex flex-col justify-between p-4 h-full w-64 fixed left-0 top-0 bottom-0 
      transition-transform duration-300 ease-in-out 
      bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 z-20
      ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"}`}
    >
      {/* Main content area */}
      <div className="flex-1 flex flex-col min-h-0">
        <SidebarHeader toggleSidebar={toggleSidebar} userId={userId} />
        <div className="flex flex-col space-y-1 mt-4 pb-4">
          {sidebarItems.map((item) => (
            <SidebarItem
              key={item.name}
              name={item.name}
              Icon={item.icon}
              hotkey={item.hotkey}
              path={item.path}
              isActive={activeItem?.name === item.name}
            />
          ))}
        </div>
        <div className="flex-1 overflow-y-auto border-t-2 border-gray-200 dark:border-gray-700 pt-4">
          <ChatList
            chats={chats}
            currentChatId={currentChatId}
            setCurrentChatId={setCurrentChatId}
            isLoading={isLoading}
          />
        </div>
      </div>

      {/* Footer with quota */}
      <div className="mt-auto pt-4 border-t-2 border-gray-200 dark:border-gray-700">
        <ChatQuota />
      </div>
    </div>
  );
}
