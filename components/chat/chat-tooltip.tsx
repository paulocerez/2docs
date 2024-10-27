"use client";
import { useState } from "react";

export default function ChatTooltip({
  activeTooltip,
  editingChatId,
}: {
  activeTooltip: string | null;
  editingChatId: string | null;
}) {
  const [editedPrompt, setEditedPrompt] = useState<string>("");
  const [chatToBeDeleted, setChatToBeDeleted] = useState<string>("");
  return (
    <div className="absolute top-full bg-white right-0 mt-2 w-32 dark:bg-gray-800 rounded-md shadow-lg p-1 z-30 text-xs">
      <button className="block rounded-md p-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 w-full text-left">
        Rename
      </button>
      <button className="block rounded-md p-2 text-red-500 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 w-full text-left font-medium">
        Delete
      </button>
    </div>
  );
}
