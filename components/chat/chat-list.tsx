"use client";
import { ChatListProps } from "@/types/types";
import { ChatLoadingScreen } from "../state/chats-loading";
import { BsThreeDots } from "react-icons/bs";
import Link from "next/link";
import { useState } from "react";

export function ChatList({
  chats,
  isLoading,
  currentChatId,
  setCurrentChatId,
  temporaryChatId,
}: ChatListProps) {
  const [activeTooltip, setActiveTooltip] = useState<string | null>(null);

  if (isLoading) return <ChatLoadingScreen />;
  return (
    <div>
      {chats?.map((chat) => (
        <div
          key={chat.id}
          className={`flex flex-row items-center justify-between p-2 text-xs hover:bg-gray-100 rounded cursor-pointer ${
            chat.id === currentChatId ? "bg-gray-100" : ""
          }`}
        >
          <Link
            href={`/chat/${chat.id}`}
            passHref
            className="w-full"
            onClick={() => setCurrentChatId(chat.id)}
          >
            {chat.id === temporaryChatId
              ? `${chat.prompt} (unsaved)`
              : chat.prompt}
          </Link>

          <div className="relative">
            <button
              className="p-1 rounded-sm hover:bg-gray-300 w-fit"
              onClick={() =>
                setActiveTooltip(activeTooltip === chat.id ? null : chat.id)
              }
            >
              <BsThreeDots />
            </button>
            {activeTooltip === chat.id && (
              <div className="absolute top-full bg-white left-0 mt-2 w-32 dark:bg-gray-800 rounded-md shadow-lg p-2 z-30 text-xs">
                <button className="block rounded-md p-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 w-full text-left">
                  Rename
                </button>
                <button className="block rounded-md p-2 text-red-500 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 w-full text-left font-medium">
                  Delete
                </button>
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
