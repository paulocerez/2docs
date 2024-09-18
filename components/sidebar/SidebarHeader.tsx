"use client";
import React from "react";
import { SidebarHeaderProps } from "@/types/types";
import { IoIosClose } from "react-icons/io";
import Image from "next/image";

export default function SidebarHeader({
  toggleSidebar,
  userName,
  userImage,
}: SidebarHeaderProps) {
  return (
    <div className="p-2 flex justify-between items-center">
      <div className="flex items-center space-x-2">
        {userImage && (
          <Image
            src={userImage}
            alt="User Image"
            width={24}
            height={24}
            className="rounded-full"
          />
        )}
        <p className="text-sm text-gray-700 dark:text-gray-300">
          {userName || "User"}
        </p>
      </div>
      <button
        onClick={toggleSidebar}
        className="p-1 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700"
      >
        <IoIosClose className="text-2xl" />
      </button>
    </div>
  );
}
