import { DesktopHeaderProps } from "@/types/Header";
import { FiSidebar } from "react-icons/fi";

export default function DesktopHeader({
  isSidebarOpen,
  toggleSidebar,
}: DesktopHeaderProps) {
  return (
    <div className="hidden md:flex flex-row h-24 items-center p-4 w-full md:w-full justify-between border-b border-slate-100">
      {!isSidebarOpen && (
        <button
          onClick={toggleSidebar}
          className=" p-2 rounded-md hover:bg-slate-50"
        >
          <FiSidebar />
        </button>
      )}
      <h1>Chat Topic</h1>
      <h1>Id #12324</h1>
    </div>
  );
}
