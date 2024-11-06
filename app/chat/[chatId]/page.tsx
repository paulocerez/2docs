import { auth } from "@/auth";
import { redirect } from "next/navigation";
import ChatContent from "./ChatContent";
import { getChatById } from "@/db/postgres/queries/chat";

export default async function ChatPage({
  params,
}: {
  params: { chatId: string };
}) {
  const { chatId } = await params;
  const session = await auth();
  const userId = session?.user?.id;

  if (!userId) {
    redirect("/api/auth/signin?callbackUrl=/chat");
  }
  const currentChat = await getChatById(chatId);

  if (!currentChat) {
    redirect("/chat");
  }

  return (
    <ChatContent
      userId={userId}
      currentChatId={chatId}
      currentChatTitle={currentChat.title}
    />
  );
}
