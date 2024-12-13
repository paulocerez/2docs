"use client";
import { Dispatch, SetStateAction, useRef, useEffect, useState } from "react";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import { FileText, Code, Eye } from "lucide-react";

type ViewMode = "steps" | "json" | "fullCode";

interface ModeDropdownProps {
  viewMode: ViewMode;
  setViewMode: Dispatch<SetStateAction<ViewMode>>;
}

export default function ModeDropdown({
  viewMode,
  setViewMode,
}: ModeDropdownProps) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
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

      {isDropdownOpen && (
        <div className="absolute text-xs right-0 top-full mt-2 w-36 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 transform transition-all duration-200 ease-out origin-top animate-in fade-in slide-in-from-top-2">
          <div className="py-1" role="menu" aria-orientation="vertical">
            <button
              onClick={() => {
                setViewMode("steps");
                setIsDropdownOpen(false);
              }}
              className="block px-4 py-2 text-gray-700 hover:bg-gray-100 hover:text-gray-900 w-full text-left"
              role="menuitem"
            >
              <Eye className="h-4 w-4 inline mr-2" />
              View Steps
            </button>
            <button
              onClick={() => {
                setViewMode("json");
                setIsDropdownOpen(false);
              }}
              className="block px-4 py-2 text-gray-700 hover:bg-gray-100 hover:text-gray-900 w-full text-left"
              role="menuitem"
            >
              <Code className="h-4 w-4 inline mr-2" />
              View JSON
            </button>
            <button
              onClick={() => {
                setViewMode("fullCode");
                setIsDropdownOpen(false);
              }}
              className="block px-4 py-2 text-gray-700 hover:bg-gray-100 hover:text-gray-900 w-full text-left"
              role="menuitem"
            >
              <FileText className="h-4 w-4 inline mr-2" />
              View Full Code
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
