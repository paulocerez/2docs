"use client";
import { LinkInputsProps } from "@/types/types";
import { Plus } from "lucide-react";
import { useState } from "react";

export default function LinkInputs({ onSubmit }: LinkInputsProps) {
  const [linkInputs, setLinkInputs] = useState<string[]>(["", ""]);
  const [activeInput, setActiveInput] = useState<number | null>(null);

  const handleInputChange = (index: number, value: string) => {
    const newInputs = [...linkInputs];
    newInputs[index] = value;
    setLinkInputs(newInputs);
  };

  const addInputField = () => {
    setLinkInputs([...linkInputs, ""]);
  };

  const toggleInput = (index: number) => {
    setActiveInput(activeInput === index ? null : index);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const nonEmptyLinks = linkInputs.filter((link) => link.trim() !== "");
    onSubmit(nonEmptyLinks);
    setActiveInput(null);
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
      <div className="flex flex-wrap items-center gap-4">
        {linkInputs.map((input, index) => (
          <div key={index} className="relative">
            <button
              type="button"
              className={`flex flex-row justify-center items-center gap-2 p-2 border rounded-lg shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all duration-300 ${
                activeInput === index ? "w-64" : "w-auto"
              }`}
              onClick={() => toggleInput(index)}
            >
              <div className="rounded-full w-4 h-4 bg-indigo-500"></div>
              {activeInput === index ? (
                <input
                  type="text"
                  value={linkInputs[index]}
                  onChange={(e) => handleInputChange(index, e.target.value)}
                  placeholder="Enter API link"
                  className="w-full bg-transparent focus:outline-none text-sm"
                  autoFocus
                />
              ) : (
                <span className="text-xs font-medium">API {index + 1}</span>
              )}
            </button>
          </div>
        ))}
        <button
          type="button"
          className="p-2 border rounded-lg shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          onClick={addInputField}
        >
          <Plus className="w-4 h-4 text-gray-400" />
        </button>
      </div>
    </form>
  );
}
