"use client";
import React, { useState, KeyboardEvent, useEffect, useRef } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { FaArrowRight } from "react-icons/fa";
import { ChatProps, Message } from "@/types/types";
import { SelectChat } from "@/db/schema/chats";
import MessageList from "./message-list";
import { MessageLoadingScreen } from "../state/messages-loading";

export default function Chat({ sessionId, currentChatId }: ChatProps) {
  const [inputMessage, setInputMessage] = useState("");
  const queryClient = useQueryClient();
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  }, [inputMessage]);

  const {
    data: messages,
    isLoading,
    error,
  } = useQuery<Message[]>({
    queryKey: ["messages", currentChatId],
    queryFn: async () => {
      if (currentChatId.startsWith("temp-")) {
        return [];
      }
      const response = await fetch(`/api/chats/${currentChatId}/messages`);
      if (!response.ok) {
        throw new Error("Failed to fetch messages");
      }
      const data = await response.json();
      if (!Array.isArray(data)) {
        console.error("Expected array of messages, got:", data);
        return [];
      }
      return data;
    },
    enabled: !!currentChatId,
  });

  const sendMessageMutation = useMutation({
    mutationFn: async (content: string) => {
      if (currentChatId.startsWith("temp-")) {
        // Create a new chat and send the first message
        const response = await fetch("/api/chats", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            userId: sessionId,
            prompt: content,
            role: "user",
          }),
        });

        if (!response.ok) {
          throw new Error("Failed to create new chat");
        }

        const newChat = await response.json();
        return {
          chatId: newChat.id,
          message: {
            content,
            role: "user",
            id: newChat.messageId,
            timestamp: new Date(),
          },
        };
      } else {
        // Send message to existing chat
        const response = await fetch(`/api/chats/${currentChatId}/messages`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ content, userId: sessionId, role: "user" }),
        });

        if (!response.ok) {
          throw new Error("Failed to send message");
        }

        const data = await response.json();
        return { chatId: currentChatId, message: data };
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
        (oldMessages = []) => [...oldMessages, data.message]
      );
    },
  });

  const handleSubmit = (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!inputMessage.trim() || !currentChatId) return;

    sendMessageMutation.mutate(inputMessage, {
      onError: (error) => {
        console.error("Failed to send message:", error);
        throw new Error("Message could not been sent");
      },
    });
    setInputMessage("");
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  if (isLoading)
    return (
      <div className="p-4">
        <MessageLoadingScreen />
      </div>
    );
  if (error) return <div>Error loading messages: {error.toString()}</div>;

  return (
    <div className="flex flex-col h-full p-4">
      <MessageList messages={messages || []} />
      <div className="flex flex-col w-full bg-transparent px-12 py-4 justify-center space-x-4 items-center fixed bottom-0">
        <form
          className="flex flex-row items-center space-x-2 rounded-2xl px-4 max-w-2xl bg-white w-full border border-gray-100 shadow-md"
          onSubmit={handleSubmit}
        >
          <textarea
            ref={textareaRef}
            value={inputMessage}
            placeholder="Insert a prompt to get started"
            className="w-full text-sm p-4 resize-none focus:outline-none dark:bg-transparent bg-white"
            rows={1}
            onChange={(e) => setInputMessage(e.target.value)}
            onKeyDown={handleKeyDown}
          />
          <div className="">
            <button
              type="submit"
              className={`text-black border p-1 rounded-full transition-all duration-200 ${
                inputMessage.trim()
                  ? "bg-blue-500 hover:bg-blue-600"
                  : "bg-gray-200 hover:bg-gray-300"
              }`}
              disabled={!inputMessage.trim()}
            >
              <FaArrowRight
                className={`${
                  inputMessage.trim() ? "text-white" : "text-gray-500"
                }`}
              />
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
