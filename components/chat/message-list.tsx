import React from "react";
import { Message } from "@/types/types";

interface MessageListProps {
  messages: Message[] | undefined;
}

export default function MessageList({ messages }: MessageListProps) {
  if (!messages || messages.length === 0) {
    return <div>No messages yet.</div>;
  }

  return (
    <div className="flex-1 overflow-y-auto mb-4">
      {Array.isArray(messages) && messages.length > 0 ? (
        messages.map((message, index) => (
          <div
            key={index}
            className={`mb-2 p-2 rounded ${
              message.sender === "user" ? "bg-blue-100 ml-auto" : "bg-gray-100"
            }`}
          >
            {message.content}
          </div>
        ))
      ) : (
        <div>No messages yet.</div>
      )}
    </div>
  );
}
