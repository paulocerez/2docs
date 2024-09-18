import React from "react";
import AccountSelect from "./AccountSelect";
import { SidebarHeaderProps } from "@/types/types";
import { IoIosClose } from "react-icons/io";

export default function SidebarHeader({ toggleSidebar }: SidebarHeaderProps) {
  return (
    <div className="p-2 flex justify-between items-center">
      <AccountSelect />
      <button
        onClick={toggleSidebar}
        className="rounded-md hover:bg-gray-100 dark:hover:bg-gray-700"
      >
        <IoIosClose className="text-2xl" />
      </button>
    </div>
  );
}
