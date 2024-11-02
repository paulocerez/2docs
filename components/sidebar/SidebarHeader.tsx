"use client";

import React, { useState } from "react";
import { IoIosClose } from "react-icons/io";
import { IoIosArrowDown } from "react-icons/io";
import Image from "next/image";
import { useQuery } from "@tanstack/react-query";
import { SelectUser } from "@/db/postgres/schema/users";
import Link from "next/link";
import { useTheme } from "next-themes";
import Hotkey from "../ui/hotkey";

export interface SidebarHeaderProps {
  toggleSidebar: () => void;
  userId: string;
}

type UserData = Pick<SelectUser, "id" | "name" | "image">;

export default function SidebarHeader({
  toggleSidebar,
  userId,
}: SidebarHeaderProps) {
  const [showAccountTooltip, setShowAccountTooltip] = useState<boolean>(false);
  const [showSidebarTooltip, setShowSidebarTooltip] = useState<boolean>(false);
  const { theme, setTheme } = useTheme();

  const { data: user, isLoading } = useQuery<UserData>({
    queryKey: ["user", userId],
    queryFn: async () => {
      const response = await fetch(`/api/users/${userId}`);
      return response.json();
    },
  });

  return (
    <div className="flex justify-between items-center">
      <button
        className="flex items-center space-x-2 relative hover:bg-gray-100 dark:hover:bg-gray-700 p-1 rounded-md transition-colors duration-200"
        onClick={() => setShowAccountTooltip((prev) => !prev)}
      >
        {isLoading ? (
          <div className="text-xs">Loading...</div>
        ) : (
          <>
            {user?.image && (
              <Image
                src={user.image}
                alt="User Image"
                width={24}
                height={24}
                className="rounded-full"
              />
            )}
            <p className="text-sm text-gray-700 dark:text-gray-300">
              {user?.name || "User"}
            </p>
            <div
              className={`transition-transform duration-300 ease-in-out ${
                showAccountTooltip ? "rotate-180" : ""
              }`}
            >
              <IoIosArrowDown />
            </div>
          </>
        )}
        {showAccountTooltip && (
          <div className="absolute text-left top-full left-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-md shadow-lg p-2 z-10 text-xs">
            <Link
              href="/settings"
              className="block rounded-md p-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200"
            >
              Account Settings
            </Link>
            <div
              className="block rounded-md p-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 w-full text-left transition-colors duration-200"
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            >
              {theme === "dark" ? "Light" : "Dark"} Mode
            </div>
            <Link
              href="/api/auth/signout"
              className="block rounded-md p-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200"
            >
              Logout
            </Link>
          </div>
        )}
      </button>
      <button
        onClick={toggleSidebar}
        onMouseEnter={() => setShowSidebarTooltip(true)}
        onMouseLeave={() => setShowSidebarTooltip(false)}
        className="p-1 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 relative transition-colors duration-200"
        aria-label="Toggle Sidebar"
      >
        <IoIosClose className="text-2xl" />
        <div
          className={`flex flex-row items-center justify-between space-x-2 absolute p-2 bg-gray-100 dark:bg-gray-700 text-gray-500 dark:text-gray-300 border dark:border-gray-600 shadow-sm text-xs rounded whitespace-nowrap mt-3 -ml-1 transition-all duration-200 ease-in-out ${
            showSidebarTooltip
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-1 pointer-events-none"
          }`}
        >
          <p>Toggle Sidebar</p>
          <Hotkey letter="s" />
        </div>
      </button>
    </div>
  );
}
