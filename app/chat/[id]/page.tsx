import { auth } from "@/auth";
import ChatLayout from "@/components/chat/ChatContainer";
import { getAllChatsByUserId, getChatById } from "@/db/queries/chat";
import { SelectChat } from "@/db/schema/chats";
import { redirect } from "next/navigation";

export default async function ChatPage({ params }: { params: { id: string } }) {
  const session = await auth();
  const userId = session?.user?.id;

  if (!userId) {
    redirect("/api/auth/signin?callbackUrl=/chat");
  }

  const chats: SelectChat[] = await getAllChatsByUserId(userId);
  const currentChat = await getChatById(params.id);

  if (!currentChat) {
    redirect("/chat");
  }

  return (
    <ChatLayout
      sessionId={userId}
      initialChats={chats}
      initialChatId={params.id}
    />
  );
}
