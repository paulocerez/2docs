"use client";
import React, { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { FaArrowRight } from "react-icons/fa";
import { ChatProps, Message } from "@/types/types";
import { SelectChat } from "@/db/schema/chats";
import MessageList from "./message-list";

export default function Chat({ sessionId, currentChatId }: ChatProps) {
  const [inputMessage, setInputMessage] = useState("");
  const queryClient = useQueryClient();

  const { data: messages, isLoading } = useQuery<Message[]>({
    queryKey: ["messages", currentChatId],
    queryFn: () =>
      currentChatId.startsWith("temp-")
        ? Promise.resolve([])
        : fetch(`/api/chats/${currentChatId}/messages`).then((res) =>
            res.json()
          ),
    enabled: !!currentChatId,
  });

  const sendMessageMutation = useMutation({
    mutationFn: async (content: string) => {
      if (currentChatId.startsWith("temp-")) {
        // Create a new chat and send the first message
        const response = await fetch("/api/chats", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ userId: sessionId, prompt: content }),
        });
        const newChat = await response.json();
        return { chatId: newChat.id, message: { content, sender: "user" } };
      } else {
        // Send message to existing chat
        return fetch(`/api/chats/${currentChatId}/messages`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ content, userId: sessionId }),
        }).then((res) => res.json());
      }
    },
    onSuccess: (data) => {
      if (currentChatId.startsWith("temp-")) {
        // Update the chats list with the new chat
        queryClient.setQueryData<SelectChat[]>(
          ["chats", sessionId],
          (oldChats) =>
            oldChats
              ? oldChats.map((chat) =>
                  chat.id === currentChatId
                    ? { ...chat, id: data.chatId }
                    : chat
                )
              : []
        );
        // Update the current chat ID
        queryClient.setQueryData(["currentChatId"], data.chatId);
      }
      // Update the messages for the chat
      queryClient.setQueryData<Message[]>(
        ["messages", data.chatId],
        (oldMessages) =>
          oldMessages ? [...oldMessages, data.message] : [data.message]
      );
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputMessage.trim() || !currentChatId) return;

    sendMessageMutation.mutate(inputMessage);
    setInputMessage("");
  };

  if (isLoading) return <div>Loading messages...</div>;

  return (
    <div className="flex flex-col justify-between h-full p-4">
      <MessageList messages={messages} />
      <div className="rounded-lg border border-gray-100 dark:border-gray-700 p-4 w-full max-w-3xl mx-auto">
        <form
          className="mt-4 relative flex flex-row items-center"
          onSubmit={handleSubmit}
        >
          <textarea
            value={inputMessage}
            placeholder="Type your message..."
            className="w-full text-sm p-4 border rounded-full resize-none focus:outline-none pr-12 dark:bg-transparent"
            rows={1}
            onChange={(e) => setInputMessage(e.target.value)}
          />
          <button
            type="submit"
            className="absolute right-4 top-1/2 transform -translate-y-1/2 text-black border p-2 rounded-full transition-transform duration-100 hover:bg-gray-100 dark:hover:bg-gray-800 active:scale-95"
          >
            <FaArrowRight className="text-gray-500 dark:text-gray-400" />
          </button>
        </form>
      </div>
    </div>
  );
}
