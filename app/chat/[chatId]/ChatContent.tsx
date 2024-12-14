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
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";

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
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [error, setError] = useState<string | null>(null);
  const [isInitialLoading, setIsInitialLoading] = useState(true);
  const [mode, setMode] = useState<"question" | "editing">("question");
  const workflowRef = useRef<HTMLDivElement>(null);
  const [streamingContent, setStreamingContent] = useState("");

  const {
    data: messages,
    isLoading: isMessagesLoading,
    error: messagesError,
  }: {
    data: Message[] | undefined;
    isLoading: boolean;
    error: Error | null;
  } = useMessages(currentChatId);

  console.log("Chat Messages", messages);

  const userMessageMutation = useUserMessageMutation(userId);
  const workflowQuestionMutation = useWorkflowQuestionMutation();
  const workflowUpdateMutation = useWorkflowUpdateMutation();
  const { data: workflow, isLoading: isWorkflowLoading } =
    useWorkflow(currentChatId);

  const selectMode = (selectedMode: "question" | "editing") => {
    setMode(selectedMode);
  };

  const streamResponse = (fullContent: string) => {
    let index = 0;
    setStreamingContent("");
    setIsAiResponding(false);

    const interval = setInterval(() => {
      if (index >= fullContent.length) {
        clearInterval(interval);

        // Update the messages query data with the complete message
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

        setStreamingContent(""); // Clear streaming content after it's added to messages
        return;
      }

      // Increase chunk size for faster streaming
      const chunkSize = 5; // Adjust this value to control speed
      setStreamingContent((current) => fullContent.slice(0, index + chunkSize));
      index += chunkSize;
    }, 1); // Minimum interval time
  };

  const scrollToWorkflow = () => {
    if (workflowRef.current) {
      const padding = 70;
      const elementPosition = workflowRef.current.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.scrollY - padding;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
  };

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  useEffect(() => {
    return () => {
      setStreamingContent(""); // Clear streaming content on unmount
    };
  }, []);

  useEffect(() => {
    if (!isMessagesLoading && !isWorkflowLoading && messages !== undefined) {
      setIsInitialLoading(false);
    }
  }, [isMessagesLoading, isWorkflowLoading, messages]);

  const handleSubmit = useCallback(
    async (prompt: string) => {
      setError(null);
      setIsAiResponding(true);

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
              codeSnippet: workflow?.codeSnippet || "",
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

  if (isInitialLoading || isWorkflowLoading) {
    return (
      <div className="flex items-center justify-center h-screen space-x-2">
        <LoadingSpinner />
        <p className="text-sm text-gray-400 flex items-center">
          {isWorkflowLoading ? "Loading workflow..." : "Loading chat..."}
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
    <AuthenticatedLayout userId={userId} currentPageTitle={currentChatTitle}>
      <div className="flex flex-col h-full pt-16">
        <div className="flex-grow overflow-y-auto pb-32">
          <div className="mx-auto px-4 w-full max-w-2xl relative">
            {workflow && (
              <div className="fixed left-1/2 -translate-x-1/2 bottom-28 flex gap-2">
                <button
                  onClick={scrollToWorkflow}
                  className="bg-white border border-gray-200 transition-all duration-200 z-50 p-1 hover:bg-gray-100 rounded-md"
                  title="Go to Workflow"
                >
                  <IoIosArrowUp className="h-4 w-4" />
                </button>
                <button
                  onClick={() =>
                    messagesEndRef.current?.scrollIntoView({
                      behavior: "smooth",
                    })
                  }
                  className="bg-white border border-gray-200 transition-all duration-200 z-50 p-1 hover:bg-gray-100 rounded-md"
                  title="Go to Latest Message"
                >
                  <IoIosArrowDown className="h-4 w-4" />
                </button>
              </div>
            )}
            <MessageList
              messages={messages}
              streamingContent={streamingContent}
              workflow={
                workflow
                  ? {
                      title: workflow.title,
                      steps: workflow.steps,
                      variables: workflow.variables,
                      codeSnippet: workflow.codeSnippet,
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
          <div className="max-w-2xl mx-auto px-4 w-full">
            <Prompt
              mode={mode}
              setMode={selectMode}
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
