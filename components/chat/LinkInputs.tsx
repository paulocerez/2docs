"use client";
import { LinkInputsProps } from "@/types/types";
import { Plus, Zap } from "lucide-react";
import { useState } from "react";
import { IoIosAdd, IoIosLink } from "react-icons/io";

interface LinkPreview {
  url: string;
  favicon: string;
  name: string;
}

export default function LinkInputs({ onSubmit }: LinkInputsProps) {
  const [userInputs, setUserInputs] = useState<string[]>(["", ""]);
  const [toggleLinkInsertionTooltip, setToggleLinkInsertionTooltip] = useState<
    boolean[]
  >([false, false]);

  const handleInputChange = (index: number, value: string) => {
    const newInputs = [...userInputs];
    newInputs[index] = value;
    setUserInputs(newInputs);
  };

  const addInputField = () => {
    setUserInputs([...userInputs, ""]);
    setToggleLinkInsertionTooltip([...toggleLinkInsertionTooltip, false]);
  };

  const toggleLinkVisibility = (index: number) => {
    const newVisibleLink = [...toggleLinkInsertionTooltip];
    newVisibleLink[index] = !newVisibleLink[index];
    setToggleLinkInsertionTooltip(newVisibleLink);
  };

  const handleLinkInsert = (index: number) => {
    if (userInputs[index].trim() === "") return;
    toggleLinkVisibility(index);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const nonEmptyLinks = userInputs.filter((link) => link.trim() !== "");
    // TODO Add link validation here
    onSubmit(nonEmptyLinks);
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-wrap items-center gap-4">
      {userInputs.map((input, index) => (
        <div key={index} className="relative">
          <button
            className="flex flex-row justify-center items-center gap-2 px-4 py-2 border rounded-lg shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            onClick={() => handleLinkInsert(index)}
          >
            <Zap className="w-4 h-4 text-indigo-500" />
            <span className="text-xs font-medium">API {index + 1}</span>
          </button>
        </div>
      ))}
      <button
        className="p-2 border rounded-lg shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        onClick={addInputField}
      >
        <Plus className="w-4 h-4 text-gray-400" />
      </button>
    </form>
  );
}
