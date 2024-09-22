import React from "react";
import { Message, MessageListProps } from "@/types/types";

export default function MessageList({ messages }: MessageListProps) {
  console.log(messages);
  return (
    <div className="flex-1 flex-col space-y-2 overflow-y-auto mb-4">
      {Array.isArray(messages) && messages.length > 0 ? (
        messages.map((message: Partial<Message>, index) => (
          <div
            key={index}
            className={`flex p-2 ${
              message.role === "user" ? "justify-end" : "justify-start"
            }`}
          >
            <div className="text-sm p-2 rounded shadow-md max-w-[70%] bg-white">
              {message.content || "No content"}
            </div>
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
