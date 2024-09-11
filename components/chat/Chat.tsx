"use client";
import { useState } from "react";
import { FaArrowRight } from "react-icons/fa";
import { IoIosAddCircleOutline } from "react-icons/io";

export default function Chat() {
  const [additionalInputFields, setAdditionalInputFields] = useState<Number>(0);

  return (
    <div className="flex flex-col p-4 h-full text-center justify-between">
      <div className="flex flex-col justify-center space-y-12 h-full">
        <div className="w-full px-32">
          <h1 className="font-semibold text-xl leading-8">
            👋🏼 Combine two or more API's into seamless code workflows by
            inserting their API Doc links and defining a prompt.
          </h1>
        </div>

        {/* Message Interface */}

        <div className="flex flex-col items-center space-y-8 px-64">
          <input
            type="text"
            placeholder="Insert API Doc link here"
            className="p-2 text-xs rounded-md w-full border border-gray-100 text"
          />
          <input
            type="text"
            placeholder="Insert API Doc link here"
            className="p-2 text-xs rounded-md w-full border border-gray-100"
          />
        </div>
      </div>
      {/* Prompt Interface */}
      <div className="mt-4 rounded-lg border border-gray-100 p-4">
        <p className="text-gray-500 text-xs">Insert a prompt to get started</p>
        <form
          className="mt-4 relative flex flex-row items-center"
          onSubmit={(e) => e.preventDefault()}
        >
          <textarea
            placeholder="What should the workflow do?"
            className=" w-full p-4 border rounded-full resize-none focus:outline-none pr-12"
            rows={1}
          />
          <button
            type="submit"
            className="absolute right-4 top-1/2 transform -translate-y-1/2 text-black border p-2 rounded-full transition-transform duration-100 hover:bg-gray-100 active:scale-95"
          >
            <FaArrowRight />
          </button>
        </form>
      </div>
    </div>
  );
}
