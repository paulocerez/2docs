import { Dispatch, SetStateAction } from "react";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import { FileText, Code, Eye } from "lucide-react";

type ViewMode = "steps" | "json" | "fullCode";

interface ModeToggleProps {
  viewMode: ViewMode;
  setViewMode: Dispatch<SetStateAction<ViewMode>>;
  isDropdownOpen: boolean;
}

export default function ModeToggle({
  viewMode,
  setViewMode,
  isDropdownOpen,
}: ModeToggleProps) {
  return (
    <button
      onClick={() => setViewMode(viewMode === "steps" ? "json" : "steps")}
      className="flex items-center gap-2 px-3 py-1.5 text-sm border rounded-lg hover:bg-gray-50 transition-all duration-200"
      aria-expanded={isDropdownOpen}
      aria-haspopup="true"
    >
      {viewMode === "steps" ? (
        <>
          <Eye className="h-4 w-4" aria-hidden="true" />
          <span>View Steps</span>
        </>
      ) : viewMode === "json" ? (
        <>
          <Code className="h-4 w-4" aria-hidden="true" />
          <span>View JSON</span>
        </>
      ) : (
        <>
          <FileText className="h-4 w-4" aria-hidden="true" />
          <span>View Full Code</span>
        </>
      )}
      {isDropdownOpen ? (
        <IoIosArrowUp className="h-4 w-4" />
      ) : (
        <IoIosArrowDown className="h-4 w-4" />
      )}
    </button>
  );
}
