import { auth } from "@/auth";
import ChatLayout from "@/components/sidebar/ChatLayout";

export default async function ChatInterface() {
  let session = await auth();
  let user = session?.user?.email;

  return (
    <div className="flex flex-col">
      <ChatLayout />
    </div>
  );
}
