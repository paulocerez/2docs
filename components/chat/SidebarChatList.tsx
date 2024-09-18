"use client";
import { SidebarChatListProps } from "@/types/types";
import Link from "next/link";

export default function SidebarChatList({
  chats,
  setCurrentChatId,
  currentChatId,
}: SidebarChatListProps) {
  return (
    <div className="flex-grow text-sm overflow-y-auto rounded-sm">
      <ul className="space-y-6 sm:space-y-2">
        {chats.map((chat) => (
          <li
            key={chat.id}
            className={`rounded-md px-2 py-1 cursor-pointer transition-colors duration-200
			${
        chat.id === currentChatId
          ? "bg-gray-100 dark:bg-gray-700"
          : "hover:bg-gray-100 dark:hover:bg-gray-700"
      }`}
            onClick={() => setCurrentChatId(chat.id)}
          >
            <Link href={`/chat/${chat.id}`} className="block w-full h-full">
              {chat.prompt}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
