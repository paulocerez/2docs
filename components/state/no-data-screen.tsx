import React from "react";
import { FolderOpen } from "lucide-react";

interface NoDataAvailableProps {
  title: string;
}

export default function NoDataAvailable({ title }: NoDataAvailableProps) {
  return (
    <div className="min-h-screen flex flex-col h-full w-full items-center justify-center text-gray-500 space-y-4">
      <FolderOpen className="w-5 h-5 text-gray-400" />
      <div className="flex flex-col items-center space-y-4 max-w-lg text-center">
        <p className="text-lg font-medium">No {title} Available</p>
        <p className="text-sm leading-relaxed">
          We couldn&apos;t find any {title.toLowerCase()} data to display at the
          moment. This could be due to a network issue or because there&apos;s
          no data to show.
        </p>
      </div>
    </div>
  );
}
