"use client";
import React, { useCallback, useState } from "react";
import { Plus } from "lucide-react";

interface LinkInputsProps {
  onSubmit: (links: string[]) => void;
  onInputChange: (links: string[]) => void;
}

const LinkInputs: React.FC<LinkInputsProps> = React.memo(
  ({ onSubmit, onInputChange }) => {
    const [linkInputs, setLinkInputs] = useState<string[]>(["", ""]);
    const [activeInput, setActiveInput] = useState<number | null>(null);

    const updateLinks = useCallback(
      (newLinks: string[]) => {
        setLinkInputs(newLinks);
        const validLinks = newLinks.filter((link) => link.trim() !== "");
        onInputChange(newLinks);
        onSubmit(validLinks);
      },
      [onInputChange, onSubmit]
    );

    const handleInputChange = (index: number, value: string) => {
      const newInputs = [...linkInputs];
      newInputs[index] = value;
      updateLinks(newInputs);
    };

    const addInputField = () => {
      updateLinks([...linkInputs, ""]);
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
                <div
                  className={`rounded-full w-1 h-1 ${
                    isValidUrl(linkInputs[index])
                      ? "bg-green-500"
                      : "bg-red-500"
                  }`}
                ></div>
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
          {activeInput !== null && !isValidUrl(linkInputs[activeInput]) && (
            <span className="text-red-500 text-xs mt-1 block">Invalid URL</span>
          )}
        </div>
        <p className="text-[10px] text-gray-400">
          Make sure to point to the OpenAPI Specification file of the API you
          want to use. Alternatively, you can point to the full API docs
          website, e.g. in Postman. Ensure that all the endpoints are shown on
          one page, possibly in HTTP or cURL format.
        </p>
      </div>
    );
  }
);

LinkInputs.displayName = "LinkInputs";

export default LinkInputs;

export const isValidUrl = (url: string) => {
  try {
    new URL(url);
    return true;
  } catch (error) {
    return false;
  }
};
