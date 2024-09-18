import { SidebarProps } from "@/types/types";
import SidebarHeader from "./SidebarHeader";
import SidebarFooter from "./SidebarFooter";
import { createChat } from "@/db/queries/chat";
import SidebarChatList from "../chat/SidebarChatList";

export function Sidebar(props: SidebarProps) {
  const { sessionId, addChat, isSidebarOpen, toggleSidebar } = props;

  const handleCreateNewChat = async () => {
    try {
      const newChat = await createChat({
        userId: sessionId,
        prompt: "New chat",
      });
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
        <SidebarHeader toggleSidebar={toggleSidebar} />
        <button
          onClick={handleCreateNewChat}
          className="w-full p-2 text-center text-sm border rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 dark:bg-gray-700"
        >
          Create new chat
        </button>
        <SidebarChatList {...props} />
      </div>
      <SidebarFooter />
    </div>
  );
}
