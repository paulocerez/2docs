import { Message } from "@/types/message";
import { useAIResponseMutation } from "./useAIResponseMutation";
import { useCallback } from "react";

export function useGenerateAIResponse(currentChatId: string, messages: Message[] | undefined, userId: string) {
	const aiResponseMutation = useAIResponseMutation();
  
	const generateAIResponse = useCallback(
	  async (prompt: string) => {
		return aiResponseMutation.mutateAsync({
		  chatId: currentChatId,
		  messages: [...(messages || []), { role: "user", content: prompt }],
		  userId: userId,
		});
	  },
	  [aiResponseMutation, currentChatId, messages]
	);
  
	return { generateAIResponse, isAIResponding: aiResponseMutation.isPending };
  }