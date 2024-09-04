import React from "react";
import SidebarDesktop from "./Desktop-Sidebar";
import SidebarMobile from "./Mobile-Sidebar";

export default function Sidebar() {
  return (
    <>
      <SidebarMobile />
      <SidebarDesktop />
    </>
  );
}
