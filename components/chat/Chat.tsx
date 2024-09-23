"use client";
import React, { useState, KeyboardEvent, useEffect, useRef } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { FaArrowRight } from "react-icons/fa";
import { ChatProps, Message } from "@/types/types";
import { SelectChat } from "@/db/schema/chats";
import MessageList from "./message-list";
import { MessageLoadingScreen } from "../state/messages-loading";
import { useMessageMutation } from "@/hooks/useMessageMutation";
import { useMessages } from "@/hooks/useMessages";

export default function Chat({ sessionId, currentChatId }: ChatProps) {
  const [inputMessage, setInputMessage] = useState("");
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);

  const { data: messages, isLoading, error } = useMessages(currentChatId);
  const sendMessageMutation = useMessageMutation(sessionId, currentChatId);

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  }, [inputMessage]);

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
    <div className="flex flex-col h-full">
      <div className="flex-grow overflow-y-auto pb-24">
        <div className="max-w-2xl mx-auto p-4">
          <MessageList messages={messages || []} />
        </div>
      </div>
      <div className="fixed bottom-0 p-6 pt-0 bg-white w-full">
        <div className="max-w-2xl mx-auto">
          <form
            className="flex flex-row items-center space-x-2 rounded-2xl px-4 bg-white w-full border border-gray-100 shadow-md"
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
            <div>
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
    </div>
  );
}
