"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ChevronLeft,
  ChevronRight,
  Code,
  Database,
  Layers2,
} from "lucide-react";
import {
  EnvironmentProps,
  UtilsProps,
  DbHandlersProps,
} from "@/types/workflow";

const tabs = [
  { id: "setup", icon: <Layers2 />, label: "Setup" },
  { id: "utils", icon: <Code />, label: "Utils" },
  { id: "dbHandlers", icon: <Database />, label: "DB Handlers" },
];

interface SwipeTabsProps {
  setup?: EnvironmentProps;
  utils?: UtilsProps[];
  dbHandlers?: DbHandlersProps[];
}

export default function SwipeTabs({
  setup,
  utils,
  dbHandlers,
}: SwipeTabsProps) {
  const [activeTab, setActiveTab] = useState(0);

  const handleNext = () => {
    setActiveTab((prev) => (prev === tabs.length - 1 ? 0 : prev + 1));
  };

  const handlePrev = () => {
    setActiveTab((prev) => (prev === 0 ? tabs.length - 1 : prev - 1));
  };

  return (
    <div className="relative w-full overflow-hidden rounded-lg border border-gray-200">
      <div className="flex items-center justify-between border-b border-gray-200 bg-gray-50">
        <button
          onClick={handlePrev}
          className="p-2 hover:bg-gray-100 transition-colors"
        >
          <ChevronLeft className="h-4 w-4 text-gray-600" />
        </button>

        <div className="flex-1 flex justify-center">
          {tabs.map((tab, index) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(index)}
              className={`px-4 py-2 text-sm font-medium transition-colors ${
                activeTab === index
                  ? "text-blue-600 border-b-2 border-blue-600"
                  : "text-gray-600 hover:text-gray-900"
              }`}
            >
              {tab.icon}
            </button>
          ))}
        </div>

        <button
          onClick={handleNext}
          className="p-2 hover:bg-gray-100 transition-colors"
        >
          <ChevronRight className="h-4 w-4 text-gray-600" />
        </button>
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -100 }}
          transition={{ duration: 0.2 }}
          className="p-4"
        >
          {activeTab === 0 && <div>Setup Content</div>}
          {activeTab === 1 && <div>Utils Content</div>}
          {activeTab === 2 && <div>DB Handlers Content</div>}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
