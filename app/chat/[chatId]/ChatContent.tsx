"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import { MessageLoadingScreen } from "@/components/state/messages-loading";
import { useUserMessageMutation } from "@/hooks/messages/useUserMessageMutation";
import { useMessages } from "@/hooks/messages/useMessages";
import MessageList from "@/components/chat/message-list";
import Prompt from "@/components/chat/prompt";
import LoadingSpinner from "@/components/ui/loading-spinner";
import AuthenticatedLayout from "@/layouts/AuthenticatedLayout";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Message } from "@/types/message";
import { useWorkflow } from "@/hooks/workflows/useWorkflow";
import { useWorkflowUpdateMutation } from "@/hooks/workflows/useWorkflowUpdateMutation";
import { useWorkflowQuestionMutation } from "@/hooks/workflows/useWorkflowQuestionMutation";
import ScrollButtons from "@/components/ui/scroll-buttons";
import { QuotaExceededAlert } from "@/components/chat/new-chat/quota/quota-exceeded-alert";
import { MessageQuota } from "@/components/chat/new-chat/quota/message-quota";
import { useQuery } from "@tanstack/react-query";

const queryClient = new QueryClient();

interface ChatContentProps {
  userId: string;
  currentChatId: string;
  currentChatTitle: string;
  initialMessages: Message[];
}

function ChatContentInner({
  userId,
  currentChatId,
  currentChatTitle,
  initialMessages,
}: ChatContentProps) {
  const [isAiResponding, setIsAiResponding] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [error, setError] = useState<string | null>(null);
  const [isInitialLoading, setIsInitialLoading] = useState(true);
  const [mode, setMode] = useState<"question" | "editing">("question");
  const workflowRef = useRef<HTMLDivElement>(null);
  const [streamingContent, setStreamingContent] = useState("");

  const {
    data: messages = initialMessages,
    isLoading: isMessagesLoading,
    error: messagesError,
  } = useQuery<Message[]>({
    queryKey: ["messages", currentChatId],
    queryFn: async () => {
      const response = await fetch(
        `/api/users/${userId}/chats/${currentChatId}/messages`
      );
      if (!response.ok) {
        throw new Error(`Error fetching messages: ${response.statusText}`);
      }
      return response.json();
    },
    initialData: initialMessages,
    refetchOnWindowFocus: false,
    staleTime: 1000 * 60, // Consider data fresh for 1 minute
  });

  console.log("Chat Messages", messages);

  const userMessageMutation = useUserMessageMutation(userId);
  const workflowQuestionMutation = useWorkflowQuestionMutation();
  const workflowUpdateMutation = useWorkflowUpdateMutation();
  const { data: workflow, isLoading: isWorkflowLoading } = useWorkflow(
    currentChatId,
    userId
  );

  const selectMode = (selectedMode: "question" | "editing") => {
    setMode(selectedMode);
  };

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  useEffect(() => {
    return () => {
      setStreamingContent(""); // Clear streaming content on unmount
    };
  }, []);

  const isLoading = isMessagesLoading || isWorkflowLoading;

  const handleSubmit = useCallback(
    async (prompt: string) => {
      setError(null);
      setIsAiResponding(true);

      const streamResponse = (fullContent: string) => {
        let index = 0;
        setStreamingContent("");
        setIsAiResponding(false);

        const interval = setInterval(() => {
          if (index >= fullContent.length) {
            clearInterval(interval);
            queryClient.setQueryData<Message[]>(
              ["messages", currentChatId],
              (old = []) => [
                ...old,
                {
                  id: `response-${Date.now()}`,
                  chatId: currentChatId,
                  role: "assistant",
                  content: fullContent,
                  timestamp: new Date(),
                },
              ]
            );
            setStreamingContent("");
            return;
          }
          const chunkSize = 10;
          setStreamingContent((current) => {
            const newContent = fullContent.slice(0, index + chunkSize);
            setTimeout(() => {
              messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
            }, 0);
            return newContent;
          });
          index += chunkSize;
        }, 1);
      };

      // Optimistic update to display the user message immediately
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

      try {
        // Add user message
        await userMessageMutation.mutateAsync({
          chatId: currentChatId,
          title: currentChatTitle,
          prompt,
        });

        // handle mutation based on mode -> question or edit
        if (mode === "question") {
          const response = await workflowQuestionMutation.mutateAsync(
            {
              chatId: currentChatId,
              messages: [
                ...(messages || []),
                { role: "user", content: prompt },
              ],
              codeSnippet: {
                mainFunction: workflow?.mainFunction.codeSnippet || "",
                steps: workflow?.steps || [],
              },
              userId: userId,
            },
            {
              // prevent automatic updates due to streaming
              onSuccess: () => {},
            }
          );
          streamResponse(response.message.content);
        } else {
          const response = await workflowUpdateMutation.mutateAsync(
            {
              chatId: currentChatId,
              prompt,
              workflow,
              userId: userId,
            },
            {
              // prevent automatic updates due to streaming
              onSuccess: () => {},
            }
          );
          streamResponse(response.message.content);
        }
      } catch (error) {
        console.error("Failed to process message:", error);
        setError("Failed to process message. Please try again.");

        // Remove optimistic update on error
        queryClient.setQueryData<Message[]>(
          ["messages", currentChatId],
          (old) => old?.filter((msg) => msg.id !== optimisticMessage.id) || []
        );
      }
    },
    [
      mode,
      workflow,
      userMessageMutation,
      workflowQuestionMutation,
      workflowUpdateMutation,
      currentChatId,
      messages,
      currentChatTitle,
    ]
  );

  if (isLoading) {
    return (
      <div className="flex-grow overflow-y-auto pb-32">
        <div className="mx-auto px-4 w-full max-w-2xl relative">
          <div className="flex items-center justify-center min-h-[50vh] space-x-2">
            <LoadingSpinner />
            <p className="text-sm text-gray-400">Loading chat...</p>
          </div>
        </div>
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

  console.log("Workflow in ChatContent", workflow);

  return (
    <AuthenticatedLayout userId={userId} currentPageTitle={currentChatTitle}>
      <div className="flex flex-col h-full pt-16">
        <div className="flex-grow overflow-y-auto pb-32">
          <div className="mx-auto px-4 w-full max-w-2xl relative">
            {workflow && (
              <ScrollButtons
                workflowRef={workflowRef}
                messagesEndRef={messagesEndRef}
              />
            )}
            <MessageList
              messages={messages}
              streamingContent={streamingContent}
              workflow={
                workflow
                  ? {
                      id: workflow.id,
                      title: workflow.title,
                      description: workflow.description,
                      steps: workflow.steps,
                      mainFunction: workflow.mainFunction,
                      technicalOverview: workflow.technicalOverview,
                      deploymentSuggestions: workflow.deploymentSuggestions,
                    }
                  : undefined
              }
              workflowRef={workflowRef}
            />
            {isAiResponding && (
              <div className="flex flex-row justify-start items-center space-x-2 mt-4">
                <LoadingSpinner />
                <p className="text-sm text-gray-400 flex items-center">
                  {mode === "question"
                    ? "Workflow is being explained..."
                    : "Workflow is being updated..."}
                </p>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
        </div>
        <div className="fixed bottom-0 left-0 right-0 bg-gradient-to-t from-gray-50 to-transparent pt-4 pb-4">
          <div className="max-w-2xl mx-auto px-4 w-full space-y-2">
            <MessageQuota userId={userId} />
            <Prompt
              mode={mode}
              setMode={selectMode}
              onSubmit={handleSubmit}
              isAiResponding={isAiResponding}
              onInputChange={() => {}}
            />
          </div>
        </div>
        <QuotaExceededAlert userId={userId} />
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
