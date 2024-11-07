import { MdOutlineOpenInNew } from "react-icons/md";

export default function WorkflowRecommendations() {
  return (
    <div className="inline-flex justify-between">
      <div className="flex flex-row gap-2">
        <button className="border text-xs w-fit py-1 px-2 rounded-full hover:bg-gray-100 truncate max-w-64">
          Automatically map Linear issues to Notion database
        </button>
        <button className="border text-xs w-fit py-1 px-2 rounded-full hover:bg-gray-100 truncate max-w-64">
          Create Flashcards in Notion
        </button>
      </div>
      <div className="flex flex-row items-center gap-2 justify-end">
        <button className="text-xs underline flex flex-row items-center gap-2 max-w-64 truncate">
          Open stored workflows <MdOutlineOpenInNew className="w-3 h-3" />
        </button>
      </div>
    </div>
  );
}
