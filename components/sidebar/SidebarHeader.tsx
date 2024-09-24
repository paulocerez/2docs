"use client";
import React, { useState } from "react";
import { SidebarHeaderProps } from "@/types/types";
import { IoIosClose } from "react-icons/io";
import Image from "next/image";
import { useQuery } from "@tanstack/react-query";
import { SelectUser } from "@/db/schema/users";
import Link from "next/link";
import { IoIosArrowDown } from "react-icons/io";
import { useTheme } from "next-themes";

type UserData = Pick<SelectUser, "id" | "name" | "image">;

export default function SidebarHeader({
  toggleSidebar,
  sessionId,
}: SidebarHeaderProps) {
  const [showTooltip, setShowTooltip] = useState<boolean>(false);
  const { theme, setTheme } = useTheme();
  const { data: user, isLoading } = useQuery<UserData>({
    queryKey: ["user", sessionId],
    queryFn: () => fetch(`/api/users/${sessionId}`).then((res) => res.json()),
  });

  return (
    <div className="flex justify-between items-center">
      <button
        className="flex items-center space-x-2 relative hover:bg-gray-100 p-1 rounded-md"
        onClick={() => setShowTooltip((prev) => !prev)}
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
                showTooltip ? "rotate-180" : ""
              }`}
            >
              <IoIosArrowDown />
            </div>
          </>
        )}
        {showTooltip && (
          <div className="absolute text-left top-full left-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-md shadow-lg p-2 z-10 text-xs">
            <Link
              href="/settings"
              className="block rounded-md p-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
            >
              Account Settings
            </Link>
            <button
              className="block rounded-md p-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 w-full text-left"
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            >
              {theme === "dark" ? "Light" : "Dark"} Mode
            </button>
            <Link
              href="/api/auth/logout"
              className="block rounded-md p-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
            >
              Logout
            </Link>
          </div>
        )}
      </button>
      <button
        onClick={toggleSidebar}
        className="p-1 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700"
      >
        <IoIosClose className="text-2xl" />
      </button>
    </div>
  );
}
