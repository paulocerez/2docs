import React from "react";
import { ModeToggle } from "../mode-toggle";
import { LogOut } from "lucide-react";
import { SignOut } from "../auth/sign-out";

export default function SidebarFooter() {
  return (
    <div className="p-2 flex justify-between items-center">
      <ModeToggle />
      {/* <SignOut /> */}
    </div>
  );
}
