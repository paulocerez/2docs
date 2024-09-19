import { ChatDataFetcherProps } from "@/types/types";
import { useCallback, useEffect } from "react";

export default function ChatDataFetcher({
  currentChatId,
  sessionId,
  onMessagesLoaded,
  onError,
  onLoadingChange,
}: ChatDataFetcherProps) {
  const fetchMessages = useCallback(async () => {
    if (!currentChatId) return;
    onLoadingChange(true);
    try {
      const response = await fetch(`/api/chats/${currentChatId}/messages`);
      if (!response.ok) {
        throw new Error("Failed to fetch messages");
      }
      const data = await response.json();
      onMessagesLoaded(data);
    } catch (err) {
      onError(err instanceof Error ? err.message : "An error occurred");
    } finally {
      onLoadingChange(false);
    }
  }, [currentChatId, onMessagesLoaded, onError, onLoadingChange]);

  useEffect(() => {
    fetchMessages();
  }, [fetchMessages]);

  return null;
}
