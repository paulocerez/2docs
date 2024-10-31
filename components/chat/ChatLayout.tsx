"use client";
import Chat from "./Chat";
import { useState } from "react";
import AuthenticatedLayout from "@/layouts/AuthenticatedLayout";

export interface ChatLayoutProps {
  userId: string;
  currentChatId: string | null;
}

function ChatLayout({ userId, currentChatId }: ChatLayoutProps) {
  const [chatTitle, setChatTitle] = useState("");

  return (
    <AuthenticatedLayout userId={userId} currentPageTitle={chatTitle}>
      <Chat
        userId={userId}
        currentChatId={currentChatId}
        chatTitle={chatTitle}
        setChatTitle={setChatTitle}
      />
    </AuthenticatedLayout>
  );
}

export default ChatLayout;
