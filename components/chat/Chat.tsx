import React, { useState, useEffect, useRef } from "react";
import { ChatProps } from "@/types/types";
import { MessageLoadingScreen } from "../state/messages-loading";
import { useUserMessageMutation } from "@/hooks/useUserMessageMutation";
import { useAIResponseMutation } from "@/hooks/useAIResponseMutation";
import { useMessages } from "@/hooks/useMessages";
import LinkInputs from "./LinkInputs";
import MessageList from "./message-list";
import Prompt from "./prompt";

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

  const handleLinkSubmit = (links: string[]) => {
    // Mutate links to backend here
    console.log("Submitted links:", links);
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
      <div className="flex-grow overflow-y-auto pt-4 pb-32">
        <div className="max-w-3xl mx-auto px-4">
          {messages && messages.length > 0 ? (
            <MessageList messages={messages} />
          ) : (
            <div className="flex flex-col items-center py-8 space-y-8 w-full">
              <div className="mx-4 p-4 text-gray-700 leading-relaxed max-w-lg">
                Insert two or more links of the API Docs you want to include in
                your workflow. Specify the workflow with as much context and
                precision as possible in the prompt field.
              </div>
              <div className="w-full max-w-2xl">
                <LinkInputs onSubmit={handleLinkSubmit} />
              </div>
            </div>
          )}
          {isAiResponding && (
            <div className="flex justify-start p-4 max-w-3xl mx-auto">
              <div className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm">
                <p className="text-sm text-gray-500">
                  Workflow is generated...
                </p>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>
      </div>
      <Prompt onSubmit={handleSubmit} isAiResponding={isAiResponding} />
    </div>
  );
}
