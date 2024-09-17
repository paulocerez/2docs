"use client";

import { useSession } from "next-auth/react";
import { SidebarProvider } from "@/lib/hooks/use-sidebar";
import SidebarWrapper from "./SidebarWrapper";
import Header from "../header/Header";
import Chat from "../chat/Chat";

export default function ChatLayout() {
  const { data: session } = useSession();
  const sessionId = session?.user?.id;

  return (
    <SidebarProvider>
      <div className="flex h-screen">
        {sessionId && <SidebarWrapper sessionId={sessionId} />}
        <div className="flex flex-col flex-grow">
          <Header />
          <Chat />
        </div>
      </div>
    </SidebarProvider>
  );
}
