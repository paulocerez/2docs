import React from "react";
import { Message, MessageListProps } from "@/types/types";

export default function MessageList({ messages }: MessageListProps) {
  return (
    <div className="flex-1 space-y-2 overflow-y-auto mb-4">
      {Array.isArray(messages) && messages.length > 0 ? (
        messages.map((message, index) => (
          <div
            key={index}
            className={`flex flex-row text-sm items-center justify-end mb-2 p-2 rounded ${
              message.sender === "user" ? "justify-end" : "justify-start"
            }`}
          >
            {message.content}
          </div>
        ))
      ) : (
        <div className="flex flex-row justify-center">
          <p>No messages yet.</p>
        </div>
      )}
    </div>
  );
}
