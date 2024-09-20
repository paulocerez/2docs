"use client";
import React, { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { FaArrowRight } from "react-icons/fa";
import { ChatProps, Message } from "@/types/types";

export default function Chat({ sessionId, currentChatId }: ChatProps) {
  const handleSubmit = () => {};
  const setInputMessage = (e: any) => {};
  const inputMessage = "";

  return (
    <div className="flex flex-col h-full p-4">
      <div className="flex-1 overflow-y-auto mb-4">
        {/* {messages?.map((message) => (
          <div
            key={message.id}
            className={`mb-2 p-2 rounded ${
              message.sender === "user" ? "bg-blue-100 ml-auto" : "bg-gray-100"
            }`}
          >
            {message.content}
          </div>
        ))} */}
      </div>
      <div className="rounded-lg border border-gray-100 dark:border-gray-700 p-4 w-full max-w-3xl mx-auto">
        <form
          className="mt-4 relative flex flex-row items-center"
          onSubmit={handleSubmit}
        >
          <textarea
            value={inputMessage}
            placeholder="Type your message..."
            className="w-full text-sm p-4 border rounded-full resize-none focus:outline-none pr-12 dark:bg-transparent"
            rows={1}
            onChange={(e) => setInputMessage(e.target.value)}
          />
          <button
            type="submit"
            className="absolute right-4 top-1/2 transform -translate-y-1/2 text-black border p-2 rounded-full transition-transform duration-100 hover:bg-gray-100 dark:hover:bg-gray-800 active:scale-95"
          >
            <FaArrowRight className="text-gray-500 dark:text-gray-400" />
          </button>
        </form>
      </div>
    </div>
  );
}
