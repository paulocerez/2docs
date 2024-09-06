import { DesktopHeaderProps } from "@/types/Header";
import DesktopHeader from "../header/Desktop-Header";

export default function Chat({
  isSidebarOpen,
  toggleSidebar,
}: DesktopHeaderProps) {
  return (
    <div className="flex flex-col w-full rounded-md">
      <DesktopHeader isSidebarOpen={false} toggleSidebar={toggleSidebar} />
    </div>
  );
}
