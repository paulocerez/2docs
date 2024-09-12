"use client";
import { useState } from "react";
import { FaArrowRight } from "react-icons/fa";
import { RiAddLargeFill } from "react-icons/ri";
import { TiFlowSwitch } from "react-icons/ti";
import { v4 as uuidv4 } from "uuid";

export default function Chat({ isSidebarOpen }: { isSidebarOpen: boolean }) {
  const [additionalInputFields, setAdditionalInputFields] = useState<number>(0);
  const [userInputs, setUserInputs] = useState<string[]>(["", ""]);
  const [prompt, setPrompt] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [chatResponse, setChatResponse] = useState<string>("");

  /* What needs to be done
	- adding input field on button click + add the element to the userInputs state, so that it can be sent to the server
	- setLoading state to true once the request is being made and set to false once it receives the response
	- adding the prompt into the prompt state
	- setChatResponse based on server route
	- setPrompt based on user input
*/

  const addInputField = () => {
    setUserInputs([...userInputs, ""]);
    setAdditionalInputFields((prev) => prev + 1);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const sessionId = uuidv4();

    setTimeout(async () => {
      const response = "This is a generated response based on your prompt.";
      setChatResponse(response);
      setLoading(false);

      // Store the session in the database
      const session = {
        id: sessionId,
        userInputs,
        prompt,
        response,
      };
      await fetch("/api/sessions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(session),
      });
    }, 2000);
  };

  const handleInputChange = (index: number, value: string) => {
    const newInputs = [...userInputs];
    newInputs[index] = value;
    setUserInputs(newInputs);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex flex-col p-4 h-full text-center items-center justify-between space-y-4">
      <div
        className={`flex flex-col justify-center items-center space-y-12 h-full max-w-3xl w-full mx-auto px-4 ${
          !isSidebarOpen ? "md:px-16 lg:px-24" : "lg:px-8"
        }`}
      >
        <TiFlowSwitch className="text-4xl" />
        <div className="w-full">
          <h1 className="font-medium lg:font-semibold md:text-2xl leading-6 lg:leading-8">
            Combine two or more API's into seamless code workflows by inserting
            their API Doc links and defining a prompt.
          </h1>
        </div>

        {/* Message Interface */}
        <div className="flex flex-col items-center space-y-8 w-full">
          {userInputs.map((input, index) => (
            <input
              key={index}
              type="text"
              value={input}
              onChange={(e) => handleInputChange(index, e.target.value)}
              placeholder="Insert API Doc link here"
              className="p-2 text-xs rounded-md w-full border border-gray-100"
            />
          ))}
          <button
            onClick={addInputField}
            className="rounded-full p-1 border hover:bg-gray-100"
          >
            <RiAddLargeFill />
          </button>
        </div>
      </div>

      {/* Prompt Interface */}
      <div className="rounded-lg border border-gray-100 p-4 w-full max-w-3xl mx-auto">
        <p className="text-gray-500 text-xs">Insert a prompt to get started</p>
        <form
          className="mt-4 relative flex flex-row items-center"
          onSubmit={handleSubmit}
        >
          <textarea
            placeholder="What should the workflow do?"
            className="w-full text-sm p-4 border rounded-full resize-none focus:outline-none pr-12"
            rows={1}
            onChange={(e) => setPrompt(e.target.value)}
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
