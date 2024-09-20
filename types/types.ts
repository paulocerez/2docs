import { SelectChat } from "@/db/schema/chats";

export interface SidebarProps {
	sessionId: string;
	toggleSidebar: () => void;
	setCurrentChatId: (id: string) => void;
	currentChatId?: string;
  }

  export interface ChatLayoutProps {
	sessionId: string;
	initialChatId?: string;
	initialChats?: SelectChat[]
  }

export interface ChatListProps {
  userId: string;
}

export interface SidebarHeaderProps {
	toggleSidebar: () => void;
	userName?: string;
	userImage?: string;
}

export interface ChatProps {
	sessionId: string;
	currentChatId: string;
  }
  
  export interface Message {
	id: string;
	content: string;
	sender: "user" | "ai";
	timestamp: Date;
  }
  export interface HeaderProps {
	isSidebarOpen: boolean;
	toggleSidebar: () => void;
	currentChatId?: string;
	currentChatTopic?: string;
  }