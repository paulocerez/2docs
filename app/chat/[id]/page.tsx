import { auth } from "@/auth";
import { redirect } from "next/navigation";
import ChatContent from "./ChatContent";
import { getChatById } from "@/db/postgres/queries/chat";

export default async function ChatPage({ params }: { params: { id: string } }) {
  const session = await auth();
  const userId = session?.user?.id;

  if (!userId) {
    redirect("/api/auth/signin?callbackUrl=/chat");
  }
  const currentChat = await getChatById(params.id);

  if (!currentChat) {
    redirect("/chat");
  }

  return (
    <ChatContent
      userId={userId}
      currentChatId={params.id}
      currentChatTitle={currentChat.title}
    />
  );
}
