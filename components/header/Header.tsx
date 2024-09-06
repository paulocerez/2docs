"use client";
import { useState } from "react";
import DesktopHeader from "./Desktop-Header";
import MobileHeader from "./Mobile-Header";

export default function Header() {
  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <>
      <DesktopHeader isSidebarOpen={false} toggleSidebar={toggleSidebar} />
      <MobileHeader />
    </>
  );
}
