import { IoIosArrowUp } from "react-icons/io";

import { IoIosArrowDown } from "react-icons/io";

export default function ScrollButtons({
  workflowRef,
  messagesEndRef,
}: {
  workflowRef: React.RefObject<HTMLDivElement>;
  messagesEndRef: React.RefObject<HTMLDivElement>;
}) {
  const scrollToWorkflow = () => {
    if (workflowRef.current) {
      const padding = 70;
      const elementPosition = workflowRef.current.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.scrollY - padding;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
  };
  return (
    <div
      className="fixed left-1/2 -translate-x-1/2 bottom-32 flex gap-2"
      style={{ zIndex: 9999 }}
    >
      <button
        onClick={scrollToWorkflow}
        className="bg-white border border-gray-200 transition-all duration-200 p-1 hover:bg-gray-100 rounded-md shadow-sm"
        title="Go to Workflow"
      >
        <IoIosArrowUp className="h-4 w-4" />
      </button>
      <button
        onClick={() =>
          messagesEndRef.current?.scrollIntoView({
            behavior: "smooth",
          })
        }
        className="bg-white border border-gray-200 transition-all duration-200 p-1 hover:bg-gray-100 rounded-md shadow-sm"
        title="Go to Latest Message"
      >
        <IoIosArrowDown className="h-4 w-4" />
      </button>
    </div>
  );
}
