"use client";

import React, { useState, KeyboardEvent, useEffect, useRef } from "react";
import { FaArrowRight } from "react-icons/fa";
import { ChatProps } from "@/types/types";
import { MessageLoadingScreen } from "../state/messages-loading";
import { useUserMessageMutation } from "@/hooks/useUserMessageMutation";
import { useAIResponseMutation } from "@/hooks/useAIResponseMutation";
import { useMessages } from "@/hooks/useMessages";
import LinkInputs from "./LinkInputs";
import MessageList from "./message-list";

export default function Chat({ sessionId, currentChatId }: ChatProps) {
  const [inputMessage, setInputMessage] = useState("");
  const [isAiResponding, setIsAiResponding] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const { data: messages, isLoading, error } = useMessages(currentChatId);
  const userMessageMutation = useUserMessageMutation(sessionId, currentChatId);
  const aiResponseMutation = useAIResponseMutation(currentChatId);

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  }, [inputMessage]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSubmit = async (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!inputMessage.trim() || !currentChatId) return;

    try {
      const result = await userMessageMutation.mutateAsync(inputMessage);
      setInputMessage("");

      setIsAiResponding(true);
      await aiResponseMutation.mutateAsync([
        { role: "user", content: inputMessage },
      ]);
    } catch (error) {
      console.error("Failed to send message or generate workflow:", error);
    } finally {
      setIsAiResponding(false);
    }
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  const handleLinkSubmit = (links: string[]) => {
    // Mutate links to backend here
    console.log("Submitted links:", links);
  };

  if (isLoading)
    return (
      <div className="flex items-center justify-center h-full">
        <MessageLoadingScreen />
      </div>
    );
  if (error)
    return (
      <div className="text-red-500 p-4">
        Error loading messages: {error.toString()}
      </div>
    );

  return (
    <div className="flex flex-col h-full bg-gray-50">
      <div className="flex-grow overflow-y-auto pt-4 pb-32">
        {messages && messages.length > 0 ? (
          <MessageList messages={messages} />
        ) : (
          <div className="flex flex-col items-center py-8 space-y-8 w-full">
            <div className="mx-4 p-4 text-gray-700 leading-relaxed max-w-lg">
              Insert two or more links of the API Docs you want to include in
              your workflow. Specify the workflow with as much context and
              precision as possible in the prompt field.
            </div>
            <div className="w-full max-w-2xl">
              <LinkInputs onSubmit={handleLinkSubmit} />
            </div>
          </div>
        )}
        {isAiResponding && (
          <div className="flex justify-start p-4 max-w-3xl mx-auto">
            <div className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm">
              <p className="text-sm text-gray-500">Workflow is generated...</p>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>
      <div className="fixed bottom-0 left-0 right-0 bg-gradient-to-t from-gray-50 to-transparent pt-8 pb-6">
        <div className="max-w-3xl mx-auto px-4">
          <form
            className="flex flex-row items-center space-x-2 rounded-lg bg-white w-full border border-gray-200 shadow-lg focus-within:ring-2 focus-within:ring-blue-500 focus-within:border-transparent transition-all duration-200"
            onSubmit={handleSubmit}
          >
            <textarea
              ref={textareaRef}
              value={inputMessage}
              placeholder="Insert a prompt to get started..."
              className="w-full text-sm p-4 resize-none focus:outline-none bg-transparent"
              rows={1}
              onChange={(e) => setInputMessage(e.target.value)}
              onKeyDown={handleKeyDown}
            />
            <div className="p-2">
              <button
                type="submit"
                className={`p-2 rounded-full transition-all duration-200 ${
                  inputMessage.trim()
                    ? "bg-blue-500 hover:bg-blue-600 text-white"
                    : "bg-gray-200 text-gray-400 cursor-not-allowed"
                }`}
                disabled={!inputMessage.trim() || isAiResponding}
              >
                <FaArrowRight className="w-4 h-4" />
              </button>
            </div>
          </form>
          <p className="text-xs text-gray-400 mt-2 text-right">
            Press Enter to send, Shift+Enter for a new line
          </p>
        </div>
      </div>
    </div>
  );
}
