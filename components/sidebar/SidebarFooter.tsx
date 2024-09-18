import React from "react";
import { ModeToggle } from "../mode-toggle";
import { LogOut } from "lucide-react";
// import { SignOut } from "../auth/sign-out";

export default function SidebarFooter() {
  return (
    <div className="p-4 border-t border-gray-200 dark:border-gray-700 flex justify-between items-center">
      <ModeToggle />
      {/* <SignOut /> */}
    </div>
  );
}
