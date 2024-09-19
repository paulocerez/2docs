import { getAllChatsByUserId } from "@/db/queries/chat";
import { ChatListProps } from "@/types/types";

export async function ChatList({ userId }: ChatListProps) {
  //   const chats = await getAllChatsByUserId(userId);
  const chats = ["1", "2", "3", "4"];

  if (!chats || "error" in chats) {
    return <div>Error loading chats</div>;
  }

  return (
    <div className="space-y-2 px-2">
      {chats.length > 0 ? (
        chats.map((chat) => (
          <div key={chat.id} className="p-2 hover:bg-gray-100 rounded">
            {chat.prompt}
          </div>
        ))
      ) : (
        <div className="p-4 text-center text-gray-500">No chat history</div>
      )}
    </div>
  );
}
