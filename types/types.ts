import { SelectChat } from "@/db/schema/chats";

export interface SidebarProps {
	sessionId: string;
	toggleSidebar: () => void;
	setCurrentChatId: (id: string) => void;
	currentChatId?: string;
	isSidebarOpen: boolean;
  }

  export interface ChatLayoutProps {
	sessionId: string;
	initialChatId?: string;
	initialChats?: SelectChat[]
  }

  export interface ChatListProps {
	sessionId: string;
	currentChatId: string | undefined;
	setCurrentChatId: (id: string) => void;
	temporaryChatId: string | null;
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
	chatId: string;
	content: string;
	role: "user" | "ai";
	timestamp: Date | string;
  }
  export interface HeaderProps {
	isSidebarOpen: boolean;
	toggleSidebar: () => void;
	currentChatId?: string;
	currentChatTopic?: string;
  }

  export interface MessageListProps {
	messages: Message[] | undefined;
  }