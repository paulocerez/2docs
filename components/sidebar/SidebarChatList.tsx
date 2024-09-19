"use client";
import { useEffect, useState } from "react";
import { SidebarChatListProps } from "@/types/types";
import Link from "next/link";
import { SelectChat } from "@/db/schema/chats";

export default function SidebarChatList({
  sessionId,
  setCurrentChatId,
  currentChatId,
}: Omit<SidebarChatListProps, "chats"> & { sessionId: string }) {
  const [chats, setChats] = useState<SelectChat[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchChats = async () => {
      try {
        setIsLoading(true);
        const response = await fetch(`/api/chats?userId=${sessionId}`);
        if (!response.ok) {
          throw new Error("Failed to fetch chats");
        }
        const data = await response.json();
        setChats(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : "An error occurred");
      } finally {
        setIsLoading(false);
      }
    };

    fetchChats();
  }, [sessionId]);

  if (isLoading) return <div>Loading chats...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="flex-grow text-sm overflow-y-auto rounded-sm">
      <ul className="space-y-6 sm:space-y-2">
        {chats.map((chat) => (
          <li
            key={chat.id}
            className={`rounded-md px-2 py-1 cursor-pointer transition-colors duration-200
            ${
              chat.id === currentChatId
                ? "bg-gray-100 dark:bg-gray-700"
                : "hover:bg-gray-100 dark:hover:bg-gray-700"
            }`}
            onClick={() => setCurrentChatId(chat.id)}
          >
            <Link href={`/chat/${chat.id}`} className="block w-full h-full">
              {chat.prompt}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
