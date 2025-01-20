import type React from "react";
import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface TabGroupProps {
  tabs: string[];
  children: React.ReactNode[];
}

export function TabGroup({ tabs, children }: TabGroupProps) {
  const [activeTab, setActiveTab] = useState(0);

  const handlePrevTab = () => {
    setActiveTab((prev) => (prev > 0 ? prev - 1 : tabs.length - 1));
  };

  const handleNextTab = () => {
    setActiveTab((prev) => (prev < tabs.length - 1 ? prev + 1 : 0));
  };

  return (
    <div className="w-full">
      <div className="flex items-center justify-between mb-4">
        <button onClick={handlePrevTab} className="p-2">
          <ChevronLeft className="h-6 w-6" />
        </button>
        <div className="flex space-x-2 overflow-x-auto">
          {tabs.map((tab, index) => (
            <button
              key={tab}
              onClick={() => setActiveTab(index)}
              className={`px-4 py-2 text-sm font-medium rounded-md ${
                activeTab === index
                  ? "bg-blue-500 text-white"
                  : "bg-gray-200 text-gray-700"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
        <button onClick={handleNextTab} className="p-2">
          <ChevronRight className="h-6 w-6" />
        </button>
      </div>
      <div className="mt-4">{children[activeTab]}</div>
    </div>
  );
}
