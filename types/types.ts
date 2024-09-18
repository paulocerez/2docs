import { InsertChat, SelectChat } from "@/db/schema/chats";

export interface SidebarProps {
	sessionId: string;
	chats: SelectChat[];
	addChat: (chat: SelectChat) => void;
	isSidebarOpen: boolean;
	toggleSidebar: () => void;
	setCurrentChatId: (id: string) => void;
	currentChatId?: string;
  }
  
  export interface ChatLayoutProps {
	sessionId: string;
	initialChats: SelectChat[];
	initialChatId?: string;
  }

export interface ChatListProps {
  chats: SelectChat[]
}

export interface SidebarWrapperProps {
  isSidebarOpen: boolean;
  toggleSidebar: () => void;
  sessionId: string;
}


export interface SidebarChatListProps {
  chats: SelectChat[]
  setCurrentChatId: (id: string) => void;
  currentChatId?: string;
}

export interface SidebarHeaderProps {
	toggleSidebar: () => void
}

export interface ChatProps {
	sessionId: string;
	currentChatId?: string;
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