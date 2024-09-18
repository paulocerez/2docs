"use client";
import { SelectChat } from "@/db/schema/chats";
import { SidebarChatListProps } from "@/types/types";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function SidebarChatList({ chats }: SidebarChatListProps) {
  return (
    <div className="flex-grow overflow-y-auto">
      <ul className="space-y-6 sm:space-y-2">
        {chats.map((chat) => (
          <li key={chat.id} className="hover:bg-gray-100 rounded-md px-2">
            <Link href={`/chat/${chat.id}`}>{chat.prompt}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
