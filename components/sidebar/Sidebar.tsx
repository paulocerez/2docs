"use client";
import * as React from "react";
import Link from "next/link";
import { useSidebar } from "@/lib/hooks/use-sidebar";
import { SelectChat } from "@/db/schema";
import AccountSelect from "./AccountSelect";
import { ModeToggle } from "../mode-toggle";

interface SidebarProps extends React.ComponentProps<"div"> {
  sessionId: string;
  initialChats: SelectChat[];
}

export function Sidebar({ className, sessionId, initialChats }: SidebarProps) {
  const { isSidebarOpen, toggleSidebar } = useSidebar();
  const [chats, setChats] = React.useState<SelectChat[]>(initialChats);

  const createChat = React.useCallback(
    async (prompt: string) => {
      if (sessionId) {
        try {
          const response = await fetch("/api/chats", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ userId: sessionId, prompt }),
          });

          if (!response.ok) {
            throw new Error("Failed to create chat");
          }

          const newChat: SelectChat = await response.json();
          setChats((prevChats) => [...prevChats, newChat]);

          return newChat;
        } catch (error) {
          console.error("Error creating chat session:", error);
        }
      }
    },
    [sessionId]
  );

  return (
    <div
      className={`flex flex-col justify-between p-4 h-full w-full ${className}`}
    >
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <AccountSelect />
          <button
            onClick={toggleSidebar}
            className="p-2 rounded-md hover:bg-slate-50"
          >
            {/* Add sidebar toggle icon */}
          </button>
        </div>
        <button
          className="w-full p-2 text-left border rounded-md hover:bg-gray-100"
          onClick={() => createChat("New chat")}
        >
          Create new chat
        </button>
        <ul className="space-y-2">
          {chats.map((chat) => (
            <li key={chat.id} className="hover:bg-gray-100 rounded-md">
              <Link href={`/chat/${chat.id}`} className="block p-2">
                {chat.prompt}
              </Link>
            </li>
          ))}
        </ul>
      </div>
      <ModeToggle />
    </div>
  );
}
