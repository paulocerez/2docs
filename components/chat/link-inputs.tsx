"use client";
import { LinkInputsProps } from "@/types/types";
import { Plus, Zap } from "lucide-react";
import { useState } from "react";

export default function LinkInputs({ onSubmit }: LinkInputsProps) {
  const [linkInputs, setLinkInputs] = useState<string[]>(["", ""]);
  const [showLinkTooltip, setShowLinkTooltip] = useState<number | null>(null);

  const handleInputChange = (index: number, value: string) => {
    const newInputs = [...linkInputs];
    newInputs[index] = value;
    setLinkInputs(newInputs);
  };

  const addInputField = () => {
    setLinkInputs([...linkInputs, ""]);
  };

  const handleLinkInsert = (index: number) => {
    setShowLinkTooltip(showLinkTooltip === index ? null : index);
  };

  const handleLinkInputChange = (index: number, value: string) => {
    const newLinkInputs = [...linkInputs];
    newLinkInputs[index] = value;
    setLinkInputs(newLinkInputs);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const nonEmptyLinks = linkInputs.filter((link) => link.trim() !== "");
    // TODO Add link validation here
    onSubmit(nonEmptyLinks);
    setShowLinkTooltip(null);
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-wrap items-center gap-4">
      {linkInputs.map((input, index) => (
        <div key={index} className="relative">
          <button
            type="button"
            className="flex flex-row justify-center items-center gap-2 p-2 border rounded-lg shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            onClick={() => handleLinkInsert(index)}
          >
            <div className="rounded-full w-4 h-4 bg-indigo-500"></div>
            <span className="text-xs font-medium">API {index + 1}</span>
          </button>
          {showLinkTooltip === index && (
            <div className="absolute top-full left-0 mt-2 w-64 bg-white border border-gray-200 rounded-lg shadow-lg p-4 z-10">
              <input
                type="text"
                value={linkInputs[index]}
                onChange={(e) => handleLinkInputChange(index, e.target.value)}
                placeholder="Enter API link"
                className="w-full p-2 border rounded-md text-sm"
              />
            </div>
          )}
        </div>
      ))}
      <button
        type="button"
        className="p-2 border rounded-lg shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        onClick={addInputField}
      >
        <Plus className="w-4 h-4 text-gray-400" />
      </button>
    </form>
  );
}
