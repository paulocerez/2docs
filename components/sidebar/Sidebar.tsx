import { SidebarProps } from "@/types/types";
import SidebarHeader from "./SidebarHeader";
import SidebarFooter from "./SidebarFooter";
import SidebarChatList from "./SidebarChatList";
import { auth } from "@/auth";

export default async function Sidebar(props: SidebarProps) {
  const { sessionId, addChat, toggleSidebar, setCurrentChatId, currentChatId } =
    props;
  const session = await auth();

  const handleCreateNewChat = async () => {
    try {
      const response = await fetch("/api/chats", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userId: sessionId, prompt: "New chat" }),
      });
      if (!response.ok) {
        throw new Error("Failed to create new chat");
      }
      const newChat = await response.json();
      addChat(newChat);
    } catch (error) {
      console.error("Error creating new chat:", error);
    }
  };

  return (
    <div
      className={`flex flex-col justify-between p-4 h-full w-64 fixed left-0 top-0 bottom-0 
        ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"} 
        transition-transform duration-300 ease-in-out 
        bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700`}
    >
      <div className="space-y-4">
        <SidebarHeader
          toggleSidebar={toggleSidebar}
          userName={session?.user?.name || "User"}
          userImage={session?.user?.image || undefined}
        />
        <button
          onClick={handleCreateNewChat}
          className="w-full p-2 text-center text-xs border rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 dark:bg-gray-700"
        >
          Create new chat
        </button>
        <SidebarChatList
          sessionId={sessionId}
          setCurrentChatId={setCurrentChatId}
          currentChatId={currentChatId}
        />
      </div>
      <SidebarFooter />
    </div>
  );
}
