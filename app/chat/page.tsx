import { auth } from "@/auth";
import { redirect } from "next/navigation";
import ChatLayout from "@/components/chat/ChatLayout";

export default async function ChatPage() {
  const session = await auth();
  const userId = session?.user?.id;

  if (!userId) {
    redirect("/api/auth/signin?callbackUrl=/chat");
  }

  return (
    <ChatLayout
      sessionId={userId}
      createNewChat={true}
      initialChatId={undefined}
    />
  );
}
