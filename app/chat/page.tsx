import { auth } from "@/auth";
import NewChatPage from "@/components/chat/new-chat/new-chat";
import { redirect } from "next/navigation";

export default async function ChatPage() {
  const session = await auth();
  const userId = session?.user?.id;
  console.log("userId", userId);

  if (!userId) {
    redirect("/api/auth/signin?callbackUrl=/chat");
  }

  return <NewChatPage userId={userId} />;
}
