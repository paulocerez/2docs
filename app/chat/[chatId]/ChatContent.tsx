"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import { MessageLoadingScreen } from "@/components/state/messages-loading";
import { useUserMessageMutation } from "@/hooks/messages/useUserMessageMutation";
import { useAIResponseMutation } from "@/hooks/messages/useAIResponseMutation";
import { useMessages } from "@/hooks/messages/useMessages";
import MessageList from "@/components/chat/message-list";
import Prompt from "@/components/chat/prompt";
import LoadingSpinner from "@/components/ui/loading-spinner";
import { useRouter } from "next/navigation";
import AuthenticatedLayout from "@/layouts/AuthenticatedLayout";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

interface ChatContentProps {
  userId: string;
  currentChatId: string;
  currentChatTitle: string;
}

function ChatContentInner({
  userId,
  currentChatId,
  currentChatTitle,
}: ChatContentProps) {
  const [isAiResponding, setIsAiResponding] = useState(false);
  const [chatTitle, setChatTitle] = useState(currentChatTitle);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const { data: messages, isLoading, error } = useMessages(currentChatId);
  const userMessageMutation = useUserMessageMutation(userId);
  const aiResponseMutation = useAIResponseMutation();

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSubmit = useCallback(
    async (prompt: string) => {
      setIsAiResponding(true);
      try {
        await userMessageMutation.mutateAsync({
          chatId: currentChatId,
          prompt,
        });
        await aiResponseMutation.mutateAsync({
          chatId: currentChatId,
          messages: [...(messages || []), { role: "user", content: prompt }],
        });
      } catch (error) {
        console.error("Failed to send message or generate workflow:", error);
      } finally {
        setIsAiResponding(false);
      }
    },
    [userMessageMutation, aiResponseMutation, currentChatId, messages]
  );

  if (isLoading)
    return (
      <div className="flex items-center justify-center h-full">
        <MessageLoadingScreen />
      </div>
    );
  if (error)
    return (
      <div className="text-red-500 p-4">
        Error loading messages: {error.toString()}
      </div>
    );

  return (
    <AuthenticatedLayout userId={userId} currentPageTitle={chatTitle}>
      <div className="flex flex-col h-full pt-16">
        <div className="flex-grow overflow-y-auto pb-32">
          <div className="mx-auto px-4 w-full max-w-2xl">
            <MessageList messages={messages} />
            {isAiResponding && (
              <div className="flex flex-row justify-start items-center space-x-2 mt-4">
                <LoadingSpinner />
                <p className="text-sm text-gray-400 flex items-center">
                  Workflow is generated...
                </p>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
        </div>
        <div className="fixed bottom-0 left-0 right-0 bg-gradient-to-t from-gray-50 to-transparent pt-4 pb-4 z-10">
          <div className="max-w-2xl mx-auto px-4 w-full">
            <Prompt
              onSubmit={handleSubmit}
              isAiResponding={isAiResponding}
              onInputChange={() => {}}
            />
          </div>
        </div>
      </div>
    </AuthenticatedLayout>
  );
}

export default function ChatContent(props: ChatContentProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <ChatContentInner {...props} />
    </QueryClientProvider>
  );
}
