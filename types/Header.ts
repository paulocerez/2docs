import { SelectChat } from "@/db/schema";

export interface HeaderProps {
  isSidebarOpen: boolean;
  toggleSidebar: () => void;
}
export interface SidebarProps extends HeaderProps {
	sessionId: string | null | undefined;
	initialChats: SelectChat[];
  }

  export interface ChatListProps {
	chats: SelectChat[]
  }

  export interface SidebarWrapperProps {
	isSidebarOpen: boolean;
	toggleSidebar: () => void;
	sessionId: string;
  }