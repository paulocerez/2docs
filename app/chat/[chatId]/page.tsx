import { auth } from "@/auth";
import ChatContent from "./ChatContent";
import { getAllMessagesForChat } from "@/db/queries/message/message";
import { Message } from "@/types/message";
import { getChatById } from "@/db/queries/chat/chat";

export default async function ChatPage({
  params: { chatId },
}: {
  params: { chatId: string };
}) {
  const session = await auth();
  const userId = session?.user?.id;
  if (!userId) throw new Error("Not authenticated");

  const [initialMessages, chat] = await Promise.all([
    getAllMessagesForChat(chatId),
    getChatById(chatId),
  ]);

  if (!chat) throw new Error("Chat not found");

  return (
    <ChatContent
      userId={userId}
      currentChatId={chatId}
      currentChatTitle={chat.title}
      initialMessages={initialMessages as Message[]}
    />
  );
}
