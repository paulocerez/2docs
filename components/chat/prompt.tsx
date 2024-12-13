import { useEffect, useRef, useState } from "react";
import { FaPaperPlane } from "react-icons/fa";
import { KeyboardEvent } from "react";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";

export interface PromptProps {
  onSubmit: (message: string) => void;
  isAiResponding: boolean;
  onInputChange: (value: boolean) => void;
  mode: "question" | "editing";
  setMode: (mode: "question" | "editing") => void;
}

export default function Prompt({
  onSubmit,
  isAiResponding,
  onInputChange,
  mode,
  setMode,
}: PromptProps) {
  const [inputMessage, setInputMessage] = useState("");
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

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

  const handleInput = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInputMessage(e.target.value);
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
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
          placeholder={
            mode === "question"
              ? "What do you want to know?"
              : "What should I change?"
          }
          className="w-full text-sm p-4 resize-none focus:outline-none bg-transparent"
          rows={1}
          onChange={handleInput}
          onKeyDown={handleKeyDown}
          style={{ overflow: "hidden" }}
        />
        <div className="relative">
          <button
            type="button"
            onClick={toggleDropdown}
            className="border rounded-lg border-gray-200 p-2 text-xs transition-all duration-200 flex items-center text-gray-700"
          >
            {mode === "question" ? "Question" : "Editing"}
            {isDropdownOpen ? (
              <IoIosArrowUp className="ml-2" />
            ) : (
              <IoIosArrowDown className="ml-2" />
            )}
          </button>
          {isDropdownOpen && (
            <div
              className="absolute text-xs right-0 bottom-full mb-2 w-36 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5
              transform transition-all duration-200 ease-out origin-bottom
              animate-in fade-in slide-in-from-bottom-2"
            >
              <div
                className="py-1"
                role="menu"
                aria-orientation="vertical"
                aria-labelledby="options-menu"
              >
                <button
                  onClick={() => {
                    setMode("question");
                    setIsDropdownOpen(false);
                  }}
                  className="block px-4 py-2 text-gray-700 hover:bg-gray-100 hover:text-gray-900 w-full text-left"
                  role="menuitem"
                >
                  Ask a question
                </button>
                <button
                  onClick={() => {
                    setMode("editing");
                    setIsDropdownOpen(false);
                  }}
                  className="block px-4 py-2 text-gray-700 hover:bg-gray-100 hover:text-gray-900 w-full text-left"
                  role="menuitem"
                >
                  Edit the workflow
                </button>
              </div>
            </div>
          )}
        </div>
        <button
          type="submit"
          disabled={isAiResponding || !inputMessage.trim()}
          className="p-4 text-blue-500 disabled:text-gray-300 hover:text-blue-400 transition-all duration-200"
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
