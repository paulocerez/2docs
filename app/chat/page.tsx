import { auth } from "@/auth";
import ChatLayout from "@/components/chat/ChatLayout";
import { redirect } from "next/navigation";

export default async function ChatPage() {
  const session = await auth();
  const userId = session?.user?.id;

  if (!userId) {
    redirect("/api/auth/signin?callbackUrl=/chat");
  }

  return <ChatLayout sessionId={userId} />;
}
