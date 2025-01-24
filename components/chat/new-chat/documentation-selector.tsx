"use client";

import { Documentation } from "@/app/documentations/DocumentationContent";
import { useDocumentation } from "@/hooks/documentations/useDocumentation";
import { Check, ChevronDown } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

interface DocumentationSelectorProps {
  onSelect: (links: string[]) => void;
  selectedLinks: string[];
}

export default function DocumentationSelector({
  onSelect,
  selectedLinks,
}: DocumentationSelectorProps) {
  const { data: documentation, isLoading } = useDocumentation();
  const [isOpen, setIsOpen] = useState(false);

  const handleToggleDoc = (doc: Documentation) => {
    const newLinks = selectedLinks.includes(doc.baseUrl)
      ? selectedLinks.filter((link) => link !== doc.baseUrl)
      : [...selectedLinks, doc.baseUrl];
    onSelect(newLinks);
  };

  if (isLoading) return null;

  return (
    <div className="mt-2 relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-between w-full p-2 text-sm border border-gray-200 rounded-md hover:border-gray-300 transition-colors"
      >
        <span className="text-gray-600">
          {selectedLinks.length === 0
            ? "Select documentation (min. 2 APIs total)"
            : `${selectedLinks.length} selected`}
        </span>
        <ChevronDown
          className={`h-4 w-4 text-gray-500 transition-transform duration-200 ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>

      {isOpen && (
        <div className="mt-2">
          <p className="text-xs font-medium text-gray-500 mb-2">
            Available Documentation
          </p>
          <div className="flex flex-wrap gap-1.5">
            {documentation?.map((doc: Documentation) => (
              <button
                key={doc.name}
                onClick={() => handleToggleDoc(doc)}
                className={`flex items-center gap-2 py-1 px-2 text-sm rounded-md border transition-all duration-200 ${
                  selectedLinks.includes(doc.baseUrl)
                    ? "border-green-500 bg-green-50 text-green-700"
                    : "border-gray-200 hover:border-gray-300 text-gray-700"
                }`}
              >
                {doc.imageUrl && (
                  <div className="w-4 h-4 relative">
                    <Image
                      src={doc.imageUrl}
                      alt={doc.name}
                      fill
                      className="object-contain"
                    />
                  </div>
                )}
                <span className="truncate max-w-[150px]">{doc.name}</span>
                {selectedLinks.includes(doc.baseUrl) && (
                  <Check className="h-3 w-3 text-green-500 flex-shrink-0" />
                )}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
