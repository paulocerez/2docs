import { getAllChatsByUserId } from "@/db/queries/chat";
import { SelectChat } from "@/db/schema/chats";
import { ChatListProps } from "@/types/types";
import { useQuery, useQueryClient } from "@tanstack/react-query";

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

  if (isLoading) return <div>Loading chats...</div>;
  return (
    <div className="space-y-2 px-2">
      {chats?.map((chat) => (
        <div
          key={chat.id}
          className={`p-2 text-xs hover:bg-gray-100 rounded cursor-pointer ${
            chat.id === currentChatId ? "bg-gray-200" : ""
          }`}
          onClick={() => setCurrentChatId(chat.id)}
        >
          {chat.id === temporaryChatId
            ? `${chat.prompt} (unsaved)`
            : chat.prompt}
        </div>
      ))}
    </div>
  );
}
