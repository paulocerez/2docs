import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { getAllChatsByUserId } from "@/db/queries/chat";
import { SelectChat } from "@/db/schema/chats";
import ChatLayout from "@/components/chat/ChatContainer";

export default async function ChatPage() {
  const session = await auth();
  const userId = session?.user?.id;

  if (!userId) {
    redirect("/api/auth/signin?callbackUrl=/chat");
  }

  const chats: SelectChat[] = await getAllChatsByUserId(userId);

  return (
    <ChatLayout sessionId={userId} initialChats={chats} initialChatId="new" />
  );
}
