import { useEffect, useRef, useState } from "react";
import { FaPaperPlane } from "react-icons/fa";
import { KeyboardEvent } from "react";
import LoadingSpinner from "../ui/loading-spinner";

export interface PromptProps {
  onSubmit: (message: string) => void;
  isAiResponding: boolean;
  onInputChange: (value: boolean) => void;
}

export default function DefaultPrompt({
  onSubmit,
  onInputChange,
  isAiResponding,
}: PromptProps) {
  const [inputMessage, setInputMessage] = useState("");

  useEffect(() => {
    if (onInputChange) {
      onInputChange(inputMessage.trim() !== "");
    }
  }, [inputMessage, onInputChange]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputMessage.trim()) {
      onSubmit(inputMessage);
      setInputMessage("");
    }
  };

  return (
    <div className="w-full">
      <div className="flex flex-row items-center space-x-2 rounded-lg bg-white w-full border border-gray-200 shadow-md focus-within:ring-2 focus-within:ring-blue-500 focus-within:border-transparent transition-all duration-200">
        <textarea
          value={inputMessage}
          placeholder="Insert a prompt to get started..."
          className="w-full text-sm p-4 resize-none focus:outline-none bg-transparent"
          rows={1}
          onChange={(e) => setInputMessage(e.target.value)}
        />
        <button
          type="submit"
          disabled={isAiResponding || !inputMessage.trim()}
          className="p-2 text-blue-500 disabled:text-gray-300"
        >
          <FaPaperPlane />
        </button>
      </div>
    </div>
  );
}
