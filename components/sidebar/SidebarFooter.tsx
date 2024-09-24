import React from "react";
import { ModeToggle } from "../mode-toggle";

export default function SidebarFooter() {
  return (
    <div className="py-2 flex justify-between items-center">
      <ModeToggle />
    </div>
  );
}
