import { ChatListProps } from "@/types/Header";
import Link from "next/link";

export default function ChatList({ chats }: ChatListProps) {
  return (
    <ul className="space-y-6 sm:space-y-2">
      {chats.map((chat) => (
        <li key={chat.id} className="hover:bg-gray-100 rounded-md px-2">
          <Link href={`/chat/${chat.id}`}>{chat.prompt}</Link>
        </li>
      ))}
    </ul>
  );
}
