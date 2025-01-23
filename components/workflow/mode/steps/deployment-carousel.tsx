import { DeploymentSuggestion } from "@/types/workflow";
import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function DeploymentCarousel({
  suggestions,
}: {
  suggestions: DeploymentSuggestion[];
}) {
  const [activeIndex, setActiveIndex] = useState(0);

  const handleNext = () => {
    setActiveIndex((prev) => (prev === suggestions.length - 1 ? 0 : prev + 1));
  };

  const handlePrev = () => {
    setActiveIndex((prev) => (prev === 0 ? suggestions.length - 1 : prev - 1));
  };

  const suggestion = suggestions[activeIndex];

  return (
    <div className="relative w-full overflow-hidden rounded-lg border border-gray-200">
      <div className="flex items-center justify-between border-b border-gray-200 bg-gray-50 px-4 py-2">
        <button
          onClick={handlePrev}
          className="p-2 hover:bg-gray-100 rounded-full transition-colors"
        >
          <ChevronLeft className="h-4 w-4 text-gray-600" />
        </button>
        <span className="text-sm font-medium text-gray-700">
          {suggestion.option} ({activeIndex + 1}/{suggestions.length})
        </span>
        <button
          onClick={handleNext}
          className="p-2 hover:bg-gray-100 rounded-full transition-colors"
        >
          <ChevronRight className="h-4 w-4 text-gray-600" />
        </button>
      </div>

      <div className="p-4 space-y-4">
        <div className="space-y-3">
          <div>
            <h4 className="text-xs font-medium text-gray-500 mb-2">Benefits</h4>
            <ul className="list-disc list-inside space-y-1">
              {suggestion.benefits.map((benefit, idx) => (
                <li key={idx} className="text-sm text-gray-600">
                  {benefit}
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-medium text-gray-500 mb-2">
              Considerations
            </h4>
            <ul className="list-disc list-inside space-y-1">
              {suggestion.downsides.map((downside, idx) => (
                <li key={idx} className="text-sm text-gray-600">
                  {downside}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      <div className="flex justify-center gap-1.5 pb-3">
        {suggestions.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setActiveIndex(idx)}
            className={`h-1.5 rounded-full transition-all ${
              idx === activeIndex ? "w-4 bg-blue-500" : "w-1.5 bg-gray-300"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
