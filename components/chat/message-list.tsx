import React from "react";
import { Message, MessageListProps } from "@/types/types";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";

export default function MessageList({ messages }: MessageListProps) {
  return (
    <div className="flex flex-col space-y-6 p-4 max-w-3xl mx-auto">
      {Array.isArray(messages) && messages.length > 0 ? (
        messages.map(
          (message: Partial<Message> | null, index) =>
            message && (
              <div
                key={index}
                className={`flex ${
                  message.role === "user" ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`max-w-[80%] p-4 rounded-lg shadow-md ${
                    message.role === "user"
                      ? "bg-gray-100 border border-gray-200"
                      : "bg-gray-50 border border-gray-200"
                  }`}
                >
                  <Markdown
                    remarkPlugins={[remarkGfm]}
                    className={`text-sm ${
                      message.role === "user" ? "text-black" : "text-gray-600"
                    }`}
                  >
                    {message.content || "No content"}
                  </Markdown>
                </div>
              </div>
            )
        )
      ) : (
        <div className="flex justify-center items-center h-32">
          <p className="text-gray-500 text-sm">No messages yet.</p>
        </div>
      )}
    </div>
  );
}
