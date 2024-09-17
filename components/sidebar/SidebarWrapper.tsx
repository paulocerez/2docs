import { getAllChatsByUserId } from "@/db/queries/chat";
import { Sidebar } from "./Sidebar";
import { auth } from "@/auth";

interface SidebarWrapperProps {
  sessionId: string;
}

export default async function SidebarWrapper({
  sessionId,
}: SidebarWrapperProps) {
  const session = await auth();
  const userId = session?.user?.id;

  if (!userId) {
    return null;
  }

  const initialChats = await getAllChatsByUserId(userId);

  return (
    <Sidebar
      sessionId={sessionId}
      initialChats={initialChats}
      className="peer absolute inset-y-0 z-30 hidden -translate-x-full border-r bg-muted duration-300 ease-in-out data-[state=open]:translate-x-0 lg:flex lg:w-[250px] xl:w-[300px]"
    />
  );
}
