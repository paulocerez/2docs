// ChatState.tsx
"use client";
import React, { useState, useCallback } from "react";
import { ChatProps, Message } from "@/types/types";
import { ChatUI } from "./ChatUI";
import ChatDataFetcher from "./ChatData";

export function ChatState({ sessionId, currentChatId }: ChatProps) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputMessage, setInputMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleMessagesLoaded = useCallback((newMessages: Message[]) => {
    setMessages(newMessages);
  }, []);

  const handleError = useCallback((errorMessage: string) => {
    setError(errorMessage);
  }, []);

  const handleLoadingChange = useCallback((loading: boolean) => {
    setIsLoading(loading);
  }, []);

  const sendMessage = async (content: string) => {
    if (!currentChatId) return;
    try {
      const response = await fetch(`/api/chats/${currentChatId}/messages`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ content, userId: sessionId }),
      });
      if (!response.ok) {
        throw new Error("Failed to send message");
      }
      const newMessage = await response.json();
      setMessages((prev) => [...prev, newMessage]);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to send message");
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputMessage.trim() || !currentChatId) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      content: inputMessage,
      sender: "user",
      timestamp: new Date(),
    };
    setMessages((prev) => [...prev, userMessage]);

    sendMessage(inputMessage);
    setInputMessage("");
  };

  return (
    <>
      <ChatDataFetcher
        currentChatId={currentChatId}
        sessionId={sessionId}
        onMessagesLoaded={handleMessagesLoaded}
        onError={handleError}
        onLoadingChange={handleLoadingChange}
      />
      <ChatUI
        messages={messages}
        inputMessage={inputMessage}
        setInputMessage={setInputMessage}
        handleSubmit={handleSubmit}
        isLoading={isLoading}
        error={error}
      />
    </>
  );
}
