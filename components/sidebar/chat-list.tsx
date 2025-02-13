"use client";

import { ChatLoadingScreen } from "../state/chats-loading";
import { BsThreeDots } from "react-icons/bs";
import Link from "next/link";
import { useState, useRef, useEffect } from "react";
import React from "react";
import ChatTooltip from "../chat/chat-tooltip";
import ChatDeleteAlert from "../chat/chat-delete-alert";
import { SelectChat } from "@/db/schema/chats";
import { useRenameChat } from "@/hooks/chats/useRenameChat";
import { useDeleteChat } from "@/hooks/chats/useDeleteChat";

interface ChatListProps {
  chats: SelectChat[] | undefined;
  isLoading: boolean;
  currentChatId: string | null;
  setCurrentChatId: (id: string) => void;
  userId: string;
  chatToDelete: { id: string; title: string } | null;
  setChatToDelete: (id: { id: string; title: string } | null) => void;
}

export const ChatList = React.memo(function ChatList({
  chats,
  isLoading,
  currentChatId,
  setCurrentChatId,
  userId,
  chatToDelete,
  setChatToDelete,
}: ChatListProps) {
  const [selectedChatId, setSelectedChatId] = useState<string | null>(null);
  const [editingChatId, setEditingChatId] = useState<string | null>(null);
  const [currentChatTitle, setCurrentChatTitle] = useState<string>("");
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const handleRenameChat = useRenameChat(userId);
  const handleDeleteChat = useDeleteChat(userId);

  useEffect(() => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.style.scrollBehavior = "smooth";
    }
  }, []);

  const handleChatTitleChange = (chatId: string, title: string) => {
    if (!chatId || !title) return;
    setCurrentChatTitle(title);
    setEditingChatId(null);
    handleRenameChat.mutate({ chatId, title });
  };

  const initiateDelete = (chatId: string, title: string) => {
    setChatToDelete({ id: chatId, title });
    setSelectedChatId(null);
  };

  if (isLoading) return <ChatLoadingScreen />;

  return (
    <>
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
              {editingChatId === chat.id ? (
                <input
                  type="text"
                  defaultValue={chat.title}
                  className="w-full text-[13px] outline-none border border-gray-300 rounded-md p-1"
                  autoFocus
                  onBlur={(e) => {
                    handleChatTitleChange(chat.id, e.target.value);
                  }}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      handleChatTitleChange(
                        chat.id,
                        (e.target as HTMLInputElement).value
                      );
                    } else if (e.key === "Escape") {
                      setEditingChatId(null);
                      setSelectedChatId(null);
                    }
                  }}
                  onClick={(e) => e.preventDefault()}
                />
              ) : (
                <Link
                  href={`/chat/${chat.id}`}
                  className="w-full text-left truncate mr-2"
                  onClick={() => {
                    setCurrentChatId(chat.id);
                  }}
                >
                  {chat.title}
                </Link>
              )}
              <div className="relative">
                <button
                  className="p-1 rounded-sm hover:bg-gray-200"
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    if (selectedChatId === chat.id) {
                      setSelectedChatId(null);
                    } else {
                      setSelectedChatId(chat.id);
                    }
                    setEditingChatId(null);
                  }}
                >
                  <BsThreeDots className="w-3 h-3" />
                </button>
                {selectedChatId === chat.id && (
                  <ChatTooltip
                    editingChatId={chat.id}
                    setEditingChatId={setEditingChatId}
                    handleChatDelete={() => initiateDelete(chat.id, chat.title)}
                  />
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
});
