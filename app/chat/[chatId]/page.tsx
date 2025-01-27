import { auth } from "@/auth";
import ChatContent from "./ChatContent";
import { getAllMessagesForChat } from "@/db/queries/message/message";
import { Message } from "@/types/message";

export default async function ChatPage({
  params: { chatId },
}: {
  params: { chatId: string };
}) {
  const session = await auth();
  const userId = session?.user?.id;
  if (!userId) throw new Error("Not authenticated");

  // Fetch initial messages server-side
  const initialMessages = await getAllMessagesForChat(chatId);

  return (
    <ChatContent
      userId={userId}
      currentChatId={chatId}
      currentChatTitle=""
      initialMessages={initialMessages as Message[]}
    />
  );
}
