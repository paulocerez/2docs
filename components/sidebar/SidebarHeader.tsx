"use client";
import React from "react";
import { SidebarHeaderProps } from "@/types/types";
import { IoIosClose } from "react-icons/io";
import Image from "next/image";
import { useQuery } from "@tanstack/react-query";
import { SelectUser } from "@/db/schema/users";

type UserData = Pick<SelectUser, "id" | "name" | "image">;

export default function SidebarHeader({
  toggleSidebar,
  sessionId,
}: SidebarHeaderProps) {
  const { data: user, isLoading } = useQuery<UserData>({
    queryKey: ["user", sessionId],
    queryFn: () => fetch(`/api/users/${sessionId}`).then((res) => res.json()),
  });

  return (
    <div className="p-2 flex justify-between items-center">
      <div className="flex items-center space-x-2">
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
          </>
        )}
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
