"use client";
import React, { useState, useEffect } from "react";
import { FaArrowRight } from "react-icons/fa";
import { SelectChat } from "@/db/schema/chats";
import { ChatProps, Message } from "@/types/types";

export default function Chat({ sessionId, currentChatId }: ChatProps) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputMessage, setInputMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (currentChatId) {
      // Fetch messages for current chat
      fetchMessages(currentChatId);
    }
  }, [currentChatId]);

  const fetchMessages = async (chatId: string) => {
    setIsLoading(true);
    try {
      const response = await fetch(`/api/chats/${chatId}/messages`);
      if (response.ok) {
        const data = await response.json();
        setMessages(data);
      } else {
        console.error("Failed to fetch messages");
      }
    } catch (error) {
      console.error("Error fetching messages:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputMessage.trim() || !currentChatId) return;

    const newMessage: Message = {
      id: Date.now().toString(),
      content: inputMessage,
      sender: "user",
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, newMessage]);
    setInputMessage("");

    try {
      const response = await fetch(`/api/chats/${currentChatId}/messages`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ content: inputMessage, userId: sessionId }),
      });

      if (response.ok) {
        const aiResponse = await response.json();
        setMessages((prev) => [
          ...prev,
          {
            id: Date.now().toString(),
            content: aiResponse.content,
            sender: "ai",
            timestamp: new Date(),
          },
        ]);
      } else {
        console.error("Failed to send message");
      }
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  if (isLoading) {
    return <div>Loading messages...</div>;
  }

  return (
    <div className="flex flex-col h-full p-4">
      <div className="flex-1 overflow-y-auto mb-4">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`mb-2 p-2 rounded ${
              message.sender === "user" ? "bg-blue-100 ml-auto" : "bg-gray-100"
            }`}
          >
            {message.content}
          </div>
        ))}
      </div>
      <div className="rounded-lg border border-gray-100 dark:border-gray-700 p-4 w-full max-w-3xl mx-auto">
        <p className="text-gray-500 text-xs">Insert a prompt to get started</p>
        <form
          className="mt-4 relative flex flex-row items-center"
          onSubmit={handleSubmit}
        >
          <textarea
            placeholder="What should the workflow do?"
            className="w-full text-sm p-4 border rounded-full resize-none focus:outline-none pr-12 dark:bg-transparent"
            rows={1}
            onChange={(e) => setInputMessage(e.target.value)}
          />
          <button
            type="submit"
            className={`absolute right-4 top-1/2 transform -translate-y-1/2 text-black border p-2 rounded-full transition-transform duration-100 hover:bg-gray-100 dark:hover:bg-gray-800 active:scale-95 ${
              inputMessage.trim() ? "dark:border-gray-700" : "border-none"
            }`}
          >
            <FaArrowRight
              className={`${
                inputMessage.trim()
                  ? "text-gray-500 dark:text-gray-400"
                  : "text-gray-300 dark:text-gray-700"
              }`}
            />
          </button>
        </form>
      </div>
    </div>
  );
}
