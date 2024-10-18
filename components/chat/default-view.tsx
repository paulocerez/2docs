import { PromptProps } from "@/types/types";
import LinkInputs from "./LinkInputs";
import Prompt from "./prompt";

export default function DefaultView({ onSubmit, isAiResponding }: PromptProps) {
  const handleLinkSubmit = (links: string[]) => {
    // Mutate links to backend here
    console.log("Submitted links:", links);
  };
  return (
    <div className="min-h-screen flex items-center justify-center">
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
        </div>
        <div className="flex flex-col space-y-2">
          <div className="inline-flex gap-2">
            <button className="border text-xs w-fit py-1 px-2 rounded-full hover:bg-gray-100">
              Automatically map Linear issues to Notion database
            </button>
            <button className="border text-xs w-fit py-1 px-2 rounded-full hover:bg-gray-100">
              Create Flashcards in Notion
            </button>
          </div>
          <Prompt onSubmit={onSubmit} isAiResponding={isAiResponding} />
          <LinkInputs onSubmit={handleLinkSubmit} />
        </div>
      </div>
    </div>
  );
}
