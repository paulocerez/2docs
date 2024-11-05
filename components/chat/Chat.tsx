import React, { useState, useEffect, useRef, useCallback } from "react";
import { MessageLoadingScreen } from "../state/messages-loading";
import { useUserMessageMutation } from "@/hooks/messages/useUserMessageMutation";
import { useAIResponseMutation } from "@/hooks/messages/useAIResponseMutation";
import { useMessages } from "@/hooks/messages/useMessages";
import LinkInputs from "./new-chat/link-inputs";
import MessageList from "./message-list";
import Prompt from "./prompt";
import LoadingSpinner from "../ui/loading-spinner";
import { useRouter } from "next/navigation";

interface ChatProps {
  userId: string;
  currentChatId: string | null;
  chatTitle: string;
  setChatTitle: (title: string) => void;
}

export default function Chat({
  userId,
  currentChatId,
  chatTitle,
  setChatTitle,
}: ChatProps) {
  const [isAiResponding, setIsAiResponding] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const { data: messages, isLoading, error } = useMessages(currentChatId);
  const userMessageMutation = useUserMessageMutation(userId);
  const aiResponseMutation = useAIResponseMutation();

  const router = useRouter();

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSubmit = useCallback(
    async (prompt: string) => {
      if (!currentChatId) {
        console.error("No current chat selected");
        return;
      }
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

  if (!currentChatId) {
    return (
      <div className="flex items-center justify-center h-full">
        <p>No chat selected. Please select or create a chat.</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full bg-gray-50">
      <div className="flex-grow overflow-y-auto pt-20 pb-24">
        <div
          className={`mx-auto px-4 w-full ${
            messages && messages.length > 0 ? "max-w-2xl" : "max-w-4xl"
          }`}
        >
          <>
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
          </>
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
  );
}
