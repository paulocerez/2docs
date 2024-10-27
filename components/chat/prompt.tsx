import { useEffect, useRef, useState } from "react";
import { FaPaperPlane } from "react-icons/fa";
import { KeyboardEvent } from "react";
import { PromptProps } from "@/types/types";
import LoadingSpinner from "../ui/loading-spinner";

export default function Prompt({
  onSubmit,
  isAiResponding,
  className = "",
}: PromptProps & { className?: string }) {
  const [inputMessage, setInputMessage] = useState("");
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  }, [inputMessage]);

  const handleSubmit = (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!inputMessage.trim()) return;
    onSubmit(inputMessage);
    setInputMessage("");
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  return (
    <div className={`w-full ${className}`}>
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
          onChange={(e) => setInputMessage(e.target.value)}
          onKeyDown={handleKeyDown}
        />
        <div className="p-2">
          <button
            type="submit"
            className={`p-2 rounded-full transition-all duration-200 flex items-center justify-center ${
              inputMessage.trim() && !isAiResponding
                ? "bg-blue-500 hover:bg-blue-600 text-white"
                : "bg-gray-200 text-gray-400 cursor-not-allowed"
            }`}
            disabled={!inputMessage.trim() || isAiResponding}
          >
            <div className="relative w-5 h-5">
              <div
                className={`absolute inset-0 transition-opacity duration-200 ${
                  isAiResponding ? "opacity-100" : "opacity-0"
                }`}
              >
                <LoadingSpinner />
              </div>
              <div
                className={`absolute inset-0 transition-opacity duration-200 ${
                  isAiResponding ? "opacity-0" : "opacity-100"
                }`}
              >
                <FaPaperPlane />
              </div>
            </div>
          </button>
        </div>
      </form>
      <p className="text-xs text-gray-400 mt-2 text-right">
        Press Enter to send, Shift + Enter for a new line
      </p>
    </div>
  );
}
