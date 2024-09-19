import { auth } from "@/auth";
import ChatLayout from "@/components/chat/ChatLayout";
import { createChat, getAllChatsByUserId } from "@/db/queries/chat";
import { SelectChat } from "@/db/schema/chats";

export default async function ChatPage() {
  const session = await auth();
  const userId = session?.user?.id;

  if (userId) {
    let chats: SelectChat[] = await getAllChatsByUserId(userId);
    let initialChatId: string | undefined;

    if (chats.length === 0) {
      const newChat = await createChat({ userId, prompt: "New chat" });
      chats = [newChat];
      initialChatId = newChat.id;
    } else {
      initialChatId = chats[0].id;
    }
    return (
      <ChatLayout
        sessionId={userId}
        initialChats={chats}
        initialChatId={initialChatId}
      />
    );
  }

  return <div>User is not logged in</div>;
}
