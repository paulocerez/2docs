"use client";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import SidebarHeader from "./SidebarHeader";
import SidebarFooter from "./SidebarFooter";
import { SelectChat } from "@/db/schema/chats";
import { SidebarProps } from "@/types/types";

export default function Sidebar({
  sessionId,
  toggleSidebar,
  setCurrentChatId,
  currentChatId,
}: SidebarProps) {
  const queryClient = useQueryClient();

  // Fetch chats
  const { data: chats, isLoading } = useQuery<SelectChat[]>({
    queryKey: ["chats", sessionId],
    queryFn: () =>
      fetch(`/api/chats?userId=${sessionId}`).then((res) => res.json()),
  });

  // Create new chat mutation
  const createChatMutation = useMutation({
    mutationFn: () =>
      fetch("/api/chats", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId: sessionId, prompt: "New chat" }),
      }).then((res) => res.json()),
    onSuccess: (newChat) => {
      queryClient.setQueryData<SelectChat[]>(["chats", sessionId], (oldChats) =>
        oldChats ? [...oldChats, newChat] : [newChat]
      );
      setCurrentChatId(newChat.id);
    },
  });

  const handleCreateNewChat = () => {
    createChatMutation.mutate();
  };

  if (isLoading) return <div>Loading chats...</div>;

  return (
    <div
      className="flex flex-col justify-between p-4 h-full w-64 fixed left-0 top-0 bottom-0 
      transition-transform duration-300 ease-in-out 
      bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700"
    >
      <div className="space-y-4">
        <SidebarHeader toggleSidebar={toggleSidebar} />
        <button
          onClick={handleCreateNewChat}
          className="w-full p-2 text-center text-xs border rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 dark:bg-gray-700"
        >
          Create new chat
        </button>
        <div className="space-y-2 px-2">
          {chats?.map((chat) => (
            <div
              key={chat.id}
              className={`p-2 text-xs hover:bg-gray-100 rounded cursor-pointer ${
                chat.id === currentChatId ? "bg-gray-200" : ""
              }`}
              onClick={() => setCurrentChatId(chat.id)}
            >
              {chat.prompt}
            </div>
          ))}
        </div>
      </div>
      <SidebarFooter />
    </div>
  );
}
