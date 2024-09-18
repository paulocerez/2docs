"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { auth } from "@/auth";
import { redirect } from "next/navigation";
import Header from "@/components/header/Header";
import Chat from "@/components/chat/Chat";
import { Sidebar } from "@/components/sidebar/Sidebar";
import { useSidebar } from "@/components/sidebar/SidebarContext";
import { SelectChat } from "@/db/schema/chats";
import { getAllChatsByUserId, getChatById } from "@/db/queries/chat";

export default function ChatPage() {
  const { id } = useParams();
  const [session, setSession] = useState(null);
  const [currentChat, setCurrentChat] = useState<SelectChat | null>(null);
  const [chats, setChats] = useState<SelectChat[]>([]);
  const { isSidebarOpen } = useSidebar();

  useEffect(() => {
    const checkAuth = async () => {
      const authSession = await auth();
      if (!authSession?.user) {
        redirect("/api/auth/signin?callbackUrl=/chat");
      }
      setSession(authSession);
    };
    checkAuth();
  }, []);

  useEffect(() => {
    if (session?.user?.id) {
      const fetchChats = async () => {
        const allChats = await getAllChatsByUserId(session.user.id);
        setChats(allChats);
      };
      fetchChats();
    }
  }, [session]);

  useEffect(() => {
    if (id && session?.user?.id) {
      const fetchCurrentChat = async () => {
        const chat = await getChatById(id as string);
        setCurrentChat(chat);
      };
      fetchCurrentChat();
    }
  }, [id, session]);

  const addChat = (newChat: SelectChat) => {
    setChats((prevChats) => [...prevChats, newChat]);
  };

  if (!session) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex h-screen bg-gray-100 dark:bg-gray-900">
      <Sidebar sessionId={session.user.id} chats={chats} />
      <div
        className={`flex-1 flex flex-col transition-all duration-300 ease-in-out ${
          isSidebarOpen ? "ml-64" : "ml-0"
        }`}
      >
        <Header />
        {currentChat ? (
          <Chat
            sessionId={session.user.id}
            addChat={addChat}
            currentChat={currentChat}
          />
        ) : (
          <div>Loading chat...</div>
        )}
      </div>
    </div>
  );
}
