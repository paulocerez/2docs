import React from "react";
import { useSidebar } from "./SidebarContext";
import AccountSelect from "./AccountSelect";
import { X } from "lucide-react";
import { SidebarHeaderProps } from "@/types/types";

export default function SidebarHeader({ toggleSidebar }: SidebarHeaderProps) {
  return (
    <div className="p-4 flex justify-between items-center border-b border-gray-200 dark:border-gray-700">
      <AccountSelect />
      <button
        onClick={toggleSidebar}
        className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700"
      >
        <X size={20} />
      </button>
    </div>
  );
}
