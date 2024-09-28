import React from "react";
import { Message, MessageListProps } from "@/types/types";

export default function MessageList({ messages }: MessageListProps) {
  return (
    <div className="flex flex-col space-y-6 p-4 max-w-3xl mx-auto">
      {Array.isArray(messages) && messages.length > 0 ? (
        messages.map((message: Partial<Message>, index) => (
          <div
            key={index}
            className={`flex ${
              message.role === "user" ? "justify-end" : "justify-start"
            }`}
          >
            <div
              className={`max-w-[80%] p-4 rounded-lg shadow-sm ${
                message.role === "user"
                  ? "bg-blue-500 text-white"
                  : "bg-white border border-gray-200"
              }`}
            >
              <p
                className={`text-sm ${
                  message.role === "user" ? "text-white" : "text-gray-800"
                }`}
              >
                {message.content || "No content"}
              </p>
            </div>
          </div>
        ))
      ) : (
        <div className="flex justify-center items-center h-32">
          <p className="text-gray-500 text-sm">No messages yet.</p>
        </div>
      )}
    </div>
  );
}
