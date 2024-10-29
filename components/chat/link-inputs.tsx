"use client";
import { Plus } from "lucide-react";
import { useEffect, useState } from "react";

interface LinkInputsProps {
  onSubmit: (links: string[]) => void;
  onInputChange: (hasValidLinks: boolean) => void;
}

export default function LinkInputs({
  onSubmit,
  onInputChange,
}: LinkInputsProps) {
  const [linkInputs, setLinkInputs] = useState<string[]>(["", ""]);
  const [activeInput, setActiveInput] = useState<number | null>(null);

  useEffect(() => {
    if (onInputChange) {
      const hasValidLinks =
        linkInputs.filter((link) => link.trim() !== "").length >= 2;
      onInputChange(hasValidLinks);
    }
  }, [linkInputs, onInputChange]);

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

  const getColorClass = (index: number) => {
    switch (index) {
      case 0:
        return "bg-indigo-500";
      case 1:
        return "bg-blue-500";
      case 2:
        return "bg-slate-500";
      case 3:
        return "bg-amber-300";
      case 4:
        return "bg-green-400";
      case 5:
        return "bg-violet-500";
      default:
        return "bg-indigo-500";
    }
  };

  return (
    <div className="flex flex-col space-y-4">
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
              <div
                className={`rounded-full w-4 h-4 ${getColorClass(index)}`}
              ></div>
              {activeInput === index ? (
                <input
                  type="text"
                  value={linkInputs[index]}
                  onChange={(e) => handleInputChange(index, e.target.value)}
                  placeholder="Enter API link"
                  className="w-full bg-transparent focus:outline-none text-xs"
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
        <p className="text-xs text-gray-400">Insert at least two links</p>
      </div>
    </div>
  );
}
