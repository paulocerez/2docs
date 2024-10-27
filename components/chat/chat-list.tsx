"use client";

import { ChatListProps } from "@/types/types";
import { ChatLoadingScreen } from "../state/chats-loading";
import { BsThreeDots } from "react-icons/bs";
import Link from "next/link";
import { useState, useRef, useEffect } from "react";
import { QueryClient } from "@tanstack/react-query";
import ChatTooltip from "./chat-tooltip";

export function ChatList({
  chats,
  isLoading,
  currentChatId,
  setCurrentChatId,
  temporaryChatId,
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

  const sortedChats = chats?.sort(
    (a, b) =>
      new Date(b.lastActivityAt).getTime() -
      new Date(a.lastActivityAt).getTime()
  );

  if (isLoading) return <ChatLoadingScreen />;

  return (
    <div className="h-[calc(100vh-64px)] flex flex-col">
      <div
        ref={scrollContainerRef}
        className="flex-grow overflow-y-auto pr-2 pb-6 space-y-1 custom-scrollbar"
      >
        {sortedChats?.map((chat) => (
          <div
            key={chat.id}
            className={`group flex flex-row items-center justify-between p-1.5 text-[13px] hover:bg-gray-100 rounded cursor-pointer ${
              chat.id === currentChatId || chat.id === temporaryChatId
                ? "bg-gray-100"
                : ""
            }`}
          >
            <Link
              href={`/chat/${chat.id}`}
              className="w-full text-left truncate mr-2"
              onClick={() => setCurrentChatId(chat.id)}
            >
              {chat.id === temporaryChatId
                ? `${chat.prompt} (unsaved)`
                : chat.prompt}
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
}
