import { useEffect, useRef, useState } from "react";
import { FaPaperPlane } from "react-icons/fa";
import { KeyboardEvent } from "react";

interface PromptProps {
  onSubmit: (message: string) => void;
  isAiResponding: boolean;
}

export default function Prompt({ onSubmit, isAiResponding }: PromptProps) {
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
    <div className="fixed bottom-0 left-0 right-0 bg-gradient-to-t from-gray-50 to-transparent pt-8 pb-6">
      <div className="max-w-3xl mx-auto px-4 w-full">
        <form
          className="flex flex-row items-center space-x-2 rounded-lg bg-white w-full border border-gray-200 shadow-lg focus-within:ring-2 focus-within:ring-blue-500 focus-within:border-transparent transition-all duration-200"
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
              className={`p-2 rounded-full transition-all duration-200 ${
                inputMessage.trim()
                  ? "bg-blue-500 hover:bg-blue-600 text-white"
                  : "bg-gray-200 text-gray-400 cursor-not-allowed"
              }`}
              disabled={!inputMessage.trim() || isAiResponding}
            >
              <FaPaperPlane className="w-3 h-3" />
            </button>
          </div>
        </form>
        <p className="text-xs text-gray-400 mt-2 text-right">
          Press Enter to send, Shift + Enter for a new line
        </p>
      </div>
    </div>
  );
}
