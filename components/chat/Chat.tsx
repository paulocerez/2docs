"use client";
import { ChatProps } from "@/types/types";
import { ChatState } from "./ChatState";

export default function Chat(props: ChatProps) {
  return <ChatState {...props} />;
}
