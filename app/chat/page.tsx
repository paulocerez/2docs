import { auth } from "@/auth";
import ChatLayout from "@/components/sidebar/ChatLayout";
import { redirect } from "next/navigation";

export default async function ChatInterface() {
  const session = await auth();
  const user = session?.user?.email;

  if (!session?.user) {
    redirect("/api/auth/signin?callbackUrl=/chat");
  }
  console.log(session.user);

  return (
    <div className="flex flex-col">
      <ChatLayout />
    </div>
  );
}
