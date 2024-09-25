"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import ChatLayout from "@/components/chat/ChatLayout";
import { useChats } from "@/hooks/useChats";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

function NewChatContent() {
  const router = useRouter();
  const { createTemporaryChat, setCurrentChat } = useChats("", queryClient);

  //   useEffect(() => {
  //     const newChatId = createTemporaryChat();
  //     setCurrentChat(newChatId);
  //     router.push(`/chat/${newChatId}`);
  //   }, [createTemporaryChat, setCurrentChat, router]);

  return <ChatLayout sessionId="" initialChatId="" />;
}

export default function NewChat() {
  return (
    <QueryClientProvider client={queryClient}>
      <NewChatContent />
    </QueryClientProvider>
  );
}
