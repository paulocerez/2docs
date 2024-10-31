import { auth } from "@/auth";
import ChatLayout from "@/components/chat/ChatLayout";
import { getChatById } from "@/db/queries/chat";
import { redirect } from "next/navigation";

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

  return <ChatLayout userId={userId} currentChatId={params.id} />;
}
