import React, { useState, useEffect, useRef } from "react";
import { MessageLoadingScreen } from "../state/messages-loading";
import { useUserMessageMutation } from "@/hooks/useUserMessageMutation";
import { useAIResponseMutation } from "@/hooks/useAIResponseMutation";
import { useMessages } from "@/hooks/useMessages";
import LinkInputs from "./LinkInputs";
import MessageList from "./message-list";
import Prompt from "./prompt";
import DefaultView from "./default-view";
import { ChatProps } from "@/types/types";
import LoadingSpinner from "../ui/loading-spinner";

export default function Chat({ sessionId, currentChatId }: ChatProps) {
  const [isAiResponding, setIsAiResponding] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const { data: messages, isLoading, error } = useMessages(currentChatId!);
  const userMessageMutation = useUserMessageMutation(sessionId, currentChatId!);
  const aiResponseMutation = useAIResponseMutation(currentChatId!);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSubmit = async (inputMessage: string) => {
    if (!currentChatId) return;

    try {
      await userMessageMutation.mutateAsync(inputMessage);
      setIsAiResponding(true);

      await aiResponseMutation.mutateAsync([
        { role: "user", content: inputMessage },
      ]);
    } catch (error) {
      console.error("Failed to send message or generate workflow:", error);
    } finally {
      setIsAiResponding(false);
    }
  };

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
    <div className="flex flex-col h-full bg-gray-50">
      <div className="flex-grow overflow-y-auto pt-4 pb-16">
        <div
          className={`mx-auto px-4 w-full ${
            messages && messages.length > 0 ? "max-w-2xl" : "max-w-4xl"
          }`}
        >
          {messages && messages.length > 0 ? (
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
          ) : (
            <DefaultView onSubmit={handleSubmit} isAiResponding={false} />
          )}
        </div>
      </div>
      {messages && messages.length > 0 && (
        <div className="sticky bottom-0 left-0 right-0 bg-gradient-to-t from-gray-50 to-transparent pt-4 pb-4">
          <div className="max-w-2xl mx-auto px-4 w-full">
            <Prompt onSubmit={handleSubmit} isAiResponding={isAiResponding} />
          </div>
        </div>
      )}
    </div>
  );
}
