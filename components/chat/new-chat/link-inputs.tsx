"use client";
import React, { useCallback, useState } from "react";
import { Info, Plus, Check } from "lucide-react";

interface LinkInputsProps {
  onSubmit: (links: string[]) => void;
  onInputChange: (links: string[]) => void;
}

const LinkInputs: React.FC<LinkInputsProps> = React.memo(
  ({ onSubmit, onInputChange }) => {
    const [linkInputs, setLinkInputs] = useState<string[]>([
      "https://mochi.cards/docs/api",
      "https://coda.io/apis/v1/openapi.yaml",
    ]);
    const [activeInput, setActiveInput] = useState<number | null>(null);
    const [showInfoTooltip, setShowInfoTooltip] = useState<boolean>(false);

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

    const getButtonStyle = (input: string, index: number) => {
      const baseStyle =
        "flex flex-row justify-center items-center gap-2 p-2 border rounded-lg shadow-sm transition-all duration-300 min-w-fit";

      if (!input.trim()) {
        return `${baseStyle} bg-gray-100 hover:bg-gray-200 border-gray-300`;
      }

      return isValidUrl(input)
        ? `${baseStyle} bg-green-50 hover:bg-green-100 border-green-300`
        : `${baseStyle} bg-red-50 hover:bg-red-100 border-red-300`;
    };

    const getStatusIndicator = (input: string) => {
      if (!input.trim()) {
        return (
          <div className="w-4 h-4 rounded-full bg-gray-300 flex-shrink-0"></div>
        );
      }

      return isValidUrl(input) ? (
        <div className="w-4 h-4 rounded-full bg-green-500 flex items-center justify-center flex-shrink-0">
          <Check className="w-3 h-3 text-white" />
        </div>
      ) : (
        <div className="w-4 h-4 rounded-full bg-red-500 flex-shrink-0"></div>
      );
    };

    return (
      <div className="flex flex-col space-y-4">
        <div className="flex flex-wrap items-center gap-4">
          {linkInputs.map((input, index) => (
            <div key={index} className="relative">
              <button
                type="button"
                className={`${getButtonStyle(input, index)} ${
                  activeInput === index ? "w-64" : "w-auto"
                }`}
                onClick={() => toggleInput(index)}
              >
                {getStatusIndicator(input)}
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
            className="p-2 border rounded-lg shadow-sm hover:bg-gray-50"
            onClick={addInputField}
          >
            <Plus className="w-4 h-4 text-gray-400" />
          </button>
          {activeInput !== null && !isValidUrl(linkInputs[activeInput]) && (
            <span className="text-red-500 text-xs mt-1 block">Invalid URL</span>
          )}
          <div
            className="relative"
            onMouseEnter={() => setShowInfoTooltip(true)}
            onMouseLeave={() => setShowInfoTooltip(false)}
          >
            <Info className="w-4 h-4 text-gray-400 cursor-help" />
            {showInfoTooltip && (
              <div className="absolute left-0 top-6 w-80 z-10">
                <div
                  className={`
                    bg-gray-50 text-gray-900 rounded-lg p-3 shadow-lg border border-gray-200
                    transform transition-all duration-200 ease-in-out
                    ${
                      showInfoTooltip
                        ? "opacity-100 translate-y-0"
                        : "opacity-0 translate-y-1 pointer-events-none"
                    }
                  `}
                >
                  <p className="text-xs leading-relaxed">
                    Make sure to point to the OpenAPI Specification file or the
                    full API Reference Website. Ensure that all the endpoints
                    are shown on one page (best in cURL or HTTP format).
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
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
