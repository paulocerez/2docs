"use client";
import SidebarHeader from "./SidebarHeader";
import { SelectChat } from "@/db/postgres/schema/chats";
import { ChatList } from "./chat-list";
import { IoDocumentTextOutline } from "react-icons/io5";
import { GrChat, GrStorage } from "react-icons/gr";
import SidebarItem from "./SidebarItem";
import { usePathname } from "next/navigation";
import Link from "next/link";

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
  const activeItem = sidebarItems.find((item) =>
    pathname === "/" ? item.path === "/chat" : pathname.startsWith(item.path)
  );

  return (
    <div
      className={`flex flex-col justify-between p-4 h-full w-64 fixed left-0 top-0 bottom-0 
	  transition-transform duration-300 ease-in-out 
	  bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 z-20
	  ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"}`}
    >
      <div className="space-y-4">
        <SidebarHeader toggleSidebar={toggleSidebar} userId={userId} />
        <div className="flex flex-col space-y-1">
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
        <div className="border-t-2 border-gray-200 dark:border-gray-700 text-[10px] text-gray-500 pt-1 text-right">
          No. of Chats: {chats?.length}
        </div>
        <ChatList
          chats={chats}
          currentChatId={currentChatId}
          setCurrentChatId={setCurrentChatId}
          isLoading={isLoading}
        />
      </div>
    </div>
  );
}
