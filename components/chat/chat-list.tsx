import { SelectChat } from "@/db/schema/chats";
import { ChatListProps } from "@/types/types";
import { useQuery } from "@tanstack/react-query";
import { ChatLoadingScreen } from "../state/chats-loading";
import { BsThreeDots } from "react-icons/bs";
import Link from "next/link";

export function ChatList({
  sessionId,
  currentChatId,
  setCurrentChatId,
  temporaryChatId,
}: ChatListProps) {
  const { data: chats, isLoading } = useQuery<SelectChat[]>({
    queryKey: ["chats", sessionId],
    queryFn: () =>
      fetch(`/api/chats?userId=${sessionId}`).then((res) => res.json()),
  });

  if (isLoading) return <ChatLoadingScreen />;
  return (
    <div className="space-y-2 px-2">
      {chats?.map((chat) => (
        <Link key={chat.id} href={`/chat/${chat.id}`} passHref>
          <div
            className={`p-2 flex flex-row items-center justify-between text-xs hover:bg-gray-100 rounded cursor-pointer ${
              chat.id === currentChatId ? "bg-gray-200" : ""
            }`}
            onClick={() => setCurrentChatId(chat.id)}
          >
            {chat.id === temporaryChatId
              ? `${chat.prompt} (unsaved)`
              : chat.prompt}
            <button>
              <BsThreeDots />
            </button>
          </div>
        </Link>
      ))}
    </div>
  );
}
