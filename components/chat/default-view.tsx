import LinkInputs from "./new-chat/link-inputs";
import Prompt from "./prompt";
import { FormEvent, useCallback, useState } from "react";
import ChecklistItem from "./new-chat/ChecklistItem";
import DefaultPrompt from "./new-chat/default-prompt";
import { ChevronRight } from "lucide-react";
import WorkflowRecommendations from "./workflow-recommendations";

interface DefaultViewProps {
  onSubmit: (title: string, prompt: string) => void;
  isAiResponding: boolean;
  chatTitle: string;
  setChatTitle: (title: string) => void;
}

export default function DefaultView({
  onSubmit,
  isAiResponding,
  chatTitle,
  setChatTitle,
}: DefaultViewProps) {
  const [checklist, setChecklist] = useState<boolean[]>([false, false, false]);
  const [prompt, setPrompt] = useState("");
  const [links, setLinks] = useState<string[]>([]);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (chatTitle && prompt && links.length >= 2) {
      onSubmit(chatTitle, prompt);
    }
  };

  const handlePromptChange = useCallback((newPrompt: string) => {
    setPrompt(newPrompt);
    setChecklist((prev) => [prev[0], newPrompt.trim() !== "", prev[2]]);
  }, []);

  const handleChatTitleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const newTitle = e.target.value;
      setChatTitle(newTitle);
      setChecklist((prev) => [newTitle.trim() !== "", prev[1], prev[2]]);
    },
    [setChatTitle]
  );

  const handleLinksChange = useCallback((newLinks: string[]) => {
    setLinks(newLinks);
    setChecklist((prev) => [prev[0], prev[1], newLinks.length >= 2]);
  }, []);

  const handlePromptInputChange = useCallback((hasInput: boolean) => {
    setChecklist((prev) => [prev[0], hasInput, prev[2]]);
  }, []);

  const handleLinksInputChange = useCallback((hasValidLinks: boolean) => {
    setChecklist((prev) => [prev[0], prev[1], hasValidLinks]);
  }, []);

  const isFormValid = checklist.every(Boolean);

  return (
    <form
      onSubmit={handleSubmit}
      className="min-h-screen flex items-center justify-center"
    >
      <div className="w-full max-w-2xl px-4 py-8 space-y-16">
        <div className="flex flex-col items-center space-y-8 text-center">
          <h1 className="text-3xl sm:text-5xl font-bold text-gray-900">
            What can I help you build?
          </h1>
          <p className="text-gray-400 text-sm max-w-xl leading-relaxed">
            Insert two or more links of the API Docs you want to include in your
            workflow. Specify the workflow with as much context and precision as
            possible in the prompt field.
          </p>
          <div className="max-w-sm w-full space-y-1">
            <input
              type="text"
              value={chatTitle}
              onChange={handleChatTitleChange}
              placeholder="Name your workflow"
              className="w-full px-3 py-2 border rounded-full text-xs  focus-within:ring-2 focus-within:ring-blue-500 focus-within:border-transparent transition-all duration-200"
            />
            <p className="text-[10px] text-gray-400">
              &quot;Insert Google Calendar events based on a Notion
              database&quot;
            </p>
          </div>
        </div>
        <div className="flex flex-col space-y-8">
          <div className="flex flex-col space-y-4 w-full">
            <WorkflowRecommendations />
            <div className="flex flex-col space-y-4">
              <DefaultPrompt
                onSubmit={handlePromptChange}
                isAiResponding={isAiResponding}
                onInputChange={handlePromptInputChange}
              />
              <LinkInputs
                onSubmit={handleLinksChange}
                onInputChange={handleLinksInputChange}
              />
            </div>
          </div>
          <div className="flex flex-row bg-gray-50 w-full justify-center text-xs items-center gap-4 text-gray-400">
            <ChecklistItem checked={checklist[0]} label="Workflow name" />
            <ChecklistItem checked={checklist[1]} label="Prompt" />
            <ChecklistItem checked={checklist[2]} label="API links" />
          </div>
        </div>
        <div className="flex justify-center">
          <button
            type="submit"
            disabled={!isFormValid || isAiResponding}
            className="text-sm py-2 px-4 text-white bg-blue-500 rounded-full disabled:bg-gray-300"
          >
            Create Workflow
          </button>
        </div>
      </div>
    </form>
  );
}
