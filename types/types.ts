import { InsertChat, SelectChat } from "@/db/schema/chats";

export interface HeaderProps {
  isSidebarOpen: boolean;
  toggleSidebar: () => void;
}

export interface SidebarProps {
	sessionId: string;
	chats: SelectChat[];
	addChat: (chat: SelectChat) => void;
	isSidebarOpen: boolean;
	toggleSidebar: () => void;
  }
  
  export interface ChatLayoutProps {
	sessionId: string;
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

export interface SidebarContextType {
  isSidebarOpen: boolean;
  toggleSidebar: () => void;
}


export interface SidebarChatListProps {
  chats: SelectChat[]
}

export interface ChatProps {
	sessionId: string;
	addChat: (chat: SelectChat) => void;
}

export interface SidebarHeaderProps {
	toggleSidebar: () => void
}