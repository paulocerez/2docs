import { useEffect, useRef, useState } from "react";
import { FaPaperPlane } from "react-icons/fa";
import { KeyboardEvent } from "react";
import LoadingSpinner from "../../ui/loading-spinner";
import LinkInputs from "./link-inputs";
import DocumentationSelector from "./documentation-selector";

export interface PromptProps {
  onSubmit: (message: string) => void;
  isAiResponding: boolean;
  onInputChange: (newPrompt: string) => void;
  setLinks: (links: string[]) => void;
  handleLinksChange: (links: string[]) => void;
}

export default function DefaultPrompt({
  onSubmit,
  onInputChange,
  setLinks,
  handleLinksChange,
}: PromptProps) {
  const [inputMessage, setInputMessage] = useState("");
  const [selectedDocs, setSelectedDocs] = useState<string[]>([]);
  const [manualLinks, setManualLinks] = useState<string[]>([]);
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);

  useEffect(() => {
    const allLinks = [...selectedDocs, ...manualLinks];
    handleLinksChange(allLinks);
    setLinks(allLinks);
  }, [selectedDocs, manualLinks, handleLinksChange, setLinks]);

  useEffect(() => {
    if (onInputChange) {
      onInputChange(inputMessage);
    }
  }, [inputMessage, onInputChange]);

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  }, [inputMessage]);

  const handleInput = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInputMessage(e.target.value);
  };

  const handleDocumentationSelect = (docs: string[]) => {
    setSelectedDocs(docs);
  };

  const handleManualLinksChange = (links: string[]) => {
    setManualLinks(links);
  };

  return (
    <div className="w-full">
      <div className="flex flex-col items-center space-x-2 rounded-lg bg-white w-full border border-gray-200 shadow-md transition-all duration-200">
        <textarea
          ref={textareaRef}
          value={inputMessage}
          placeholder="Insert a prompt to get started..."
          className="w-full text-sm p-4 resize-none focus:outline-none bg-transparent"
          rows={1}
          onChange={handleInput}
          style={{ overflow: "hidden" }}
        />
        <div className="w-full px-4 pb-4 space-y-4">
          <LinkInputs
            onSubmit={(value: string[]) => handleManualLinksChange(value)}
            onInputChange={(links: string[]) => handleManualLinksChange(links)}
          />
          <DocumentationSelector
            onSelect={handleDocumentationSelect}
            selectedLinks={selectedDocs}
          />
        </div>
      </div>
    </div>
  );
}
