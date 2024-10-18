"use client";
import { ChatListProps } from "@/types/types";
import { ChatLoadingScreen } from "../state/chats-loading";
import { BsThreeDots } from "react-icons/bs";
import Link from "next/link";
import { useState } from "react";
import { useQueryClient } from "@tanstack/react-query";

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

  //   const handleChatRenameClick = (chatId: string, currentPrompt: string) => {
  //     setEditingChatId(chatId);
  //     setEditedPrompt(currentPrompt);
  //     setActiveTooltip(null);
  //   };

  //   const handleChatRenameSubmit = (chatId: string) => {
  //     updateChatMutation.mutate({ chatId, newPrompt: editedPrompt });
  //     setEditingChatId(null);
  //   };

  //   const updateChatMutation = useMutation(
  //     async ({ chatId, newPrompt }: { chatId: string; newPrompt: string }) => {
  //       const response = await fetch(`/api/chats/${chatId}`, {
  //         method: "PUT",
  //         headers: { "Content-Type": "application/json" },
  //         body: JSON.stringify({ prompt: newPrompt }),
  //       });
  //       if (!response.ok) {
  //         throw new Error("Failed to update chat");
  //       }
  //       return response.json();
  //     },
  //     {
  //       onSuccess: () => {
  //         queryClient.invalidateQueries(["chats"]);
  //       },
  //     }
  //   );

  const deleteChat = (chatId: string) => {};

  //   I need two states -> one storing the edited prompt, one storing the id of the chat that is being renamed
  //   one function to set the values of these two + remove tooltip
  // one function to send the mutation to an API route

  if (isLoading) return <ChatLoadingScreen />;

  return (
    <div>
      {chats?.map((chat) => (
        <div
          key={chat.id}
          className={`flex flex-row items-center justify-between p-2 text-xs hover:bg-gray-100 rounded cursor-pointer ${
            chat.id === currentChatId || chat.id === temporaryChatId
              ? "bg-gray-100"
              : ""
          }`}
        >
          <Link
            href={`/chat/${chat.id}`}
            className="w-full text-left truncate"
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
