import { auth } from "@/auth";
import ChatLayout from "@/components/chat/ChatLayout";
import { getAllChatsByUserId } from "@/db/queries/chat";
import { SelectChat } from "@/db/schema/chats";

export default async function ChatPage() {
  const session = await auth();
  const userId = session?.user?.id;

  if (userId) {
    const chats: SelectChat[] = await getAllChatsByUserId(userId);
    return <ChatLayout sessionId={userId} initialChats={chats} />;
  }

  return <div>User is not logged in</div>;
}
