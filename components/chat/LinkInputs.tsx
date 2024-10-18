"use client";
import { LinkInputsProps } from "@/types/types";
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
    <form onSubmit={handleSubmit} className="flex flex-wrap items-center gap-2">
      {userInputs.map((input, index) => (
        <div key={index} className="relative">
          <button
            type="button"
            onClick={() => toggleLinkInsertionTooltip(index)}
            className="w-24 h-24 flex flex-row items-center justify-center text-xs bg-red-300"
          ></button>
          <div className="w-24 h-24 border rounded-md p-2 flex flex-col">
            <input
              type="text"
              value={input}
              onChange={(e) => handleInputChange(index, e.target.value)}
              placeholder="Enter URL"
              className="text-xs mb-2"
            />
            <button
              type="button"
              onClick={() => handleLinkInsert(index)}
              className="text-xs mt-auto"
            >
              Insert
            </button>
          </div>
        </div>
      ))}
      <button
        type="button"
        onClick={addInputField}
        className="w-24 h-24 flex flex-col items-center justify-center text-xs"
      >
        <IoIosAdd className="text-2xl mb-1" />
        Add More
      </button>
    </form>
  );
}
