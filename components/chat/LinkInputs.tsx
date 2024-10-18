"use client";
import { LinkInputsProps } from "@/types/types";
import { useState } from "react";
import { IoIosAdd } from "react-icons/io";

export default function LinkInputs({ onSubmit }: LinkInputsProps) {
  const [userInputs, setUserInputs] = useState<string[]>(["", ""]);

  const handleInputChange = (index: number, value: string) => {
    const newInputs = [...userInputs];
    newInputs[index] = value;
    setUserInputs(newInputs);
  };

  const addInputField = () => {
    setUserInputs([...userInputs, ""]);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const nonEmptyLinks = userInputs.filter((link) => link.trim() !== "");
    // TODO Add link validation here

    onSubmit(nonEmptyLinks);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col items-center space-y-8 w-full p-8"
    >
      {userInputs.map((input, index) => (
        <div key={index} className="max-w-lg w-full space-y-2">
          <p className="text-xs text-gray-400 text-right">*Required</p>
          <input
            type="text"
            value={input}
            onChange={(e) => handleInputChange(index, e.target.value)}
            placeholder="Insert API Doc link here"
            className="p-3 sm:p-4 text-xs rounded-md w-full border border-gray-100 h-auto"
          />
        </div>
      ))}
      <button
        type="button"
        onClick={addInputField}
        className="p-1 text-2xl bg-blue-500 text-white rounded-lg"
      >
        <IoIosAdd />
      </button>
    </form>
  );
}
