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
import { Message } from "@/types/message";

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
  const [error, setError] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [isInitialLoading, setIsInitialLoading] = useState(true);

  const {
    data: messages,
    isLoading: isMessagesLoading,
    error: messagesError,
  } = useMessages(currentChatId);
  const userMessageMutation = useUserMessageMutation(userId);
  const aiResponseMutation = useAIResponseMutation();

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  useEffect(() => {
    if (messages && messages.length > 0) {
      setIsInitialLoading(false);
    }
  }, [messages]);

  const handleSubmit = useCallback(
    async (prompt: string) => {
      setError(null);
      setIsAiResponding(true);

      // Optimistic update
      const optimisticMessage: Message = {
        id: `temp-${Date.now()}`,
        chatId: currentChatId,
        role: "user",
        content: prompt,
        timestamp: new Date(),
      };

      queryClient.setQueryData<Message[]>(
        ["messages", currentChatId],
        (old) => [...(old || []), optimisticMessage]
      );

      const retry = async (fn: () => Promise<any>, maxRetries = 3) => {
        for (let i = 0; i < maxRetries; i++) {
          try {
            return await fn();
          } catch (error) {
            if (i === maxRetries - 1) throw error;
            await new Promise((resolve) =>
              setTimeout(resolve, 1000 * Math.pow(2, i))
            );
          }
        }
      };

      try {
        await retry(() =>
          userMessageMutation.mutateAsync({
            chatId: currentChatId,
            title: chatTitle,
            prompt,
          })
        );

        await retry(() =>
          aiResponseMutation.mutateAsync({
            chatId: currentChatId,
            messages: [...(messages || []), { role: "user", content: prompt }],
          })
        );
      } catch (error) {
        console.error("Failed to send message or generate workflow:", error);
        setError(
          "Failed to send message or generate response. Please try again."
        );

        // Remove optimistic update on error
        queryClient.setQueryData<Message[]>(
          ["messages", currentChatId],
          (old) => old?.filter((msg) => msg.id !== optimisticMessage.id) || []
        );
      } finally {
        setIsAiResponding(false);
      }
    },
    [
      userMessageMutation,
      aiResponseMutation,
      currentChatId,
      messages,
      chatTitle,
    ]
  );

  if (isInitialLoading) {
    return (
      <div className="flex items-center justify-center h-screen space-x-2">
        <LoadingSpinner />
        <p className="text-sm text-gray-400 flex items-center">
          Generating initial response ...
        </p>
      </div>
    );
  }

  if (isMessagesLoading) {
    return (
      <div className="flex items-center justify-center h-full">
        <MessageLoadingScreen />
      </div>
    );
  }

  if (messagesError) {
    return (
      <div className="text-red-500 p-4">
        Error loading messages: {messagesError.toString()}
      </div>
    );
  }

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
        <div className="fixed bottom-0 left-0 right-0 bg-gradient-to-t from-gray-50 to-transparent pt-4 pb-4">
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
