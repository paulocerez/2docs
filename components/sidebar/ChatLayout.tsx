import { SidebarProvider } from "@/lib/hooks/use-sidebar";
import SidebarWrapper from "./SidebarWrapper";
import Header from "../header/Header";
import Chat from "../chat/Chat";

export default function ChatLayout() {
  return (
    <SidebarProvider>
      <div className="flex h-screen">
        <SidebarWrapper sessionId="cefw" />
        <div className="flex flex-col flex-grow">
          <Header />
          <Chat />
        </div>
      </div>
    </SidebarProvider>
  );
}
