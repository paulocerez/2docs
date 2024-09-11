import { DesktopHeaderProps } from "@/types/Header";
import { Button } from "../ui/button";
import { FiSidebar } from "react-icons/fi";

export default function DesktopSidebar({
  isSidebarOpen,
  toggleSidebar,
}: DesktopHeaderProps) {
  return (
    <div className="flex">
      <div
        className={`fixed top-0 left-0 h-full border-r border-slate-100 text-black transition-transform duration-300 ${
          isSidebarOpen ? "w-1/5" : "w-0"
        } overflow-hidden`}
      >
        <div className="p-4">
          <div className="flex flex-row justify-between items-center">
            <h2 className="text-xl font-bold">Sidebar</h2>
            {isSidebarOpen && (
              <button
                onClick={toggleSidebar}
                className=" p-2 rounded-md hover:bg-slate-50"
              >
                <FiSidebar />
              </button>
            )}
          </div>
          <ul className="mt-4 space-y-2">
            <li>
              <a href="#" className="block">
                Home
              </a>
            </li>
            <li>
              <a href="#" className="block">
                Profile
              </a>
            </li>
            <li>
              <a href="#" className="block">
                Settings
              </a>
            </li>
            <li>
              <a href="#" className="block">
                Logout
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
