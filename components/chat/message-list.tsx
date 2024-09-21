import React from "react";
import { MessageListProps } from "@/types/types";

export default function MessageList({ messages }: MessageListProps) {
  console.log(messages);
  return (
    <div className="flex-1 flex-col space-y-2 overflow-y-auto mb-4">
      {Array.isArray(messages) && messages.length > 0 ? (
        messages.map((message, index) => (
          <div
            key={index}
            className={`flex p-2 ${
              message.role === "user" ? "justify-end" : "justify-start"
            }`}
          >
            <div className="text-sm p-2 rounded shadow-sm max-w-[70%] bg-white">
              {message.content}
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
