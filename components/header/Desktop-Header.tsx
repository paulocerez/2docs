import { DesktopHeaderProps } from "@/types/Header";
import ChatTopic from "../chat/ChatTopic";
import DesktopSidebar from "../sidebar/Desktop-Sidebar";

export default function DesktopHeader({
  isSidebarOpen,
  toggleSidebar,
}: DesktopHeaderProps) {
  return (
    <div className="hidden md:flex flex-col w-64 h-full bg-gray-800 text-white">
      <button onClick={toggleSidebar} className="p-2 bg-blue-800 rounded">
        {isSidebarOpen ? "Close Sidebar" : "Open Sidebar"}
      </button>
      <DesktopSidebar />
      <ChatTopic />
    </div>
  );
}
