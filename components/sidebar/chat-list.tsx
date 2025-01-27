"use client";

import { ChatLoadingScreen } from "../state/chats-loading";
import { BsThreeDots } from "react-icons/bs";
import Link from "next/link";
import { useState, useRef, useEffect } from "react";
import React from "react";
import ChatTooltip from "../chat/chat-tooltip";
import { SelectChat } from "@/db/schema/chats";
interface ChatListProps {
  chats: SelectChat[] | undefined;
  isLoading: boolean;
  currentChatId: string | null;
  setCurrentChatId: (id: string) => void;
}

export const ChatList = React.memo(function ChatList({
  chats,
  isLoading,
  currentChatId,
  setCurrentChatId,
}: ChatListProps) {
  const [activeTooltip, setActiveTooltip] = useState<string | null>(null);
  const [editingChatId, setEditingChatId] = useState<string | null>(null);
  const [editedPrompt, setEditedPrompt] = useState<string>("");
  const [chatToBeDeleted, setChatToBeDeleted] = useState<string>("");
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.style.scrollBehavior = "smooth";
    }
  }, []);

  if (isLoading) return <ChatLoadingScreen />;

  return (
    <div className="h-[calc(100vh-64px)] flex flex-col">
      <div
        ref={scrollContainerRef}
        className="flex-grow overflow-y-auto pr-2 pb-6 space-y-1 custom-scrollbar"
      >
        {chats?.map((chat) => (
          <div
            key={chat.id}
            className={`group flex flex-row items-center justify-between p-1.5 text-[13px] hover:bg-gray-100 rounded cursor-pointer ${
              chat.id === currentChatId ? "bg-gray-100" : ""
            }`}
          >
            <Link
              href={`/chat/${chat.id}`}
              className="w-full text-left truncate mr-2"
              onClick={() => {
                console.log("Setting current chat ID to:", chat.id);
                setCurrentChatId(chat.id);
              }}
            >
              {chat.title}
            </Link>
            <div className="relative opacity-0 group-hover:opacity-100 transition-opacity duration-200">
              <button
                className="p-1 rounded-sm hover:bg-gray-200"
                onClick={(e) => {
                  e.preventDefault();
                  setActiveTooltip(activeTooltip === chat.id ? null : chat.id);
                }}
              >
                <BsThreeDots className="w-3 h-3" />
              </button>
              {activeTooltip === chat.id && (
                <ChatTooltip
                  activeTooltip={activeTooltip}
                  editingChatId={editingChatId}
                />
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
});
