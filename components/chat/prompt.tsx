import { useEffect, useRef, useState } from "react";
import { FaPaperPlane } from "react-icons/fa";
import { KeyboardEvent } from "react";
import { useUserMessageMutation } from "@/hooks/messages/useUserMessageMutation";

export interface PromptProps {
  onSubmit: (message: string) => void;
  isAiResponding: boolean;
  onInputChange: (value: boolean) => void;
  chatId: string;
  userId: string;
}

export default function Prompt({
  onSubmit,
  isAiResponding,
  onInputChange,
  userId,
  chatId,
}: PromptProps) {
  const [inputMessage, setInputMessage] = useState("");
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);
  const userMessageMutation = useUserMessageMutation(userId);

  useEffect(() => {
    if (onInputChange) {
      onInputChange(inputMessage.trim() !== "");
    }
  }, [inputMessage, onInputChange]);

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  }, [inputMessage]);

  const handleSubmit = async (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!inputMessage.trim()) return;

    try {
      await userMessageMutation.mutateAsync({ chatId, prompt: inputMessage });
      onSubmit(inputMessage);
      setInputMessage("");
    } catch (error) {
      console.error("Error submitting prompt:", error);
    }
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  const handleInput = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInputMessage(e.target.value);
  };

  return (
    <div className="w-full">
      <form
        className="flex flex-row items-center space-x-2 rounded-lg bg-white w-full border border-gray-200 shadow-md focus-within:ring-2 focus-within:ring-blue-500 focus-within:border-transparent transition-all duration-200"
        onSubmit={handleSubmit}
      >
        <textarea
          ref={textareaRef}
          value={inputMessage}
          placeholder="Insert a prompt to get started..."
          className="w-full text-sm p-4 resize-none focus:outline-none bg-transparent"
          rows={1}
          onChange={handleInput}
          onKeyDown={handleKeyDown}
          style={{ overflow: "hidden" }}
        />
        <button
          type="submit"
          disabled={isAiResponding || !inputMessage.trim()}
          className="border-l border-gray-200 py-2 px-4 text-blue-500 disabled:text-gray-300 hover:text-blue-400 transition-all duration-200"
        >
          <FaPaperPlane />
        </button>
      </form>
      <p className="text-xs text-gray-400 mt-2 text-right">
        Press Enter to send, Shift + Enter for a new line
      </p>
    </div>
  );
}
