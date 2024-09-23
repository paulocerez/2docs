import { SelectChat } from "@/db/schema/chats";

export interface SidebarProps {
	sessionId: string;
	toggleSidebar: () => void;
	setCurrentChatId: (id: string) => void;
	currentChatId?: string;
	isSidebarOpen: boolean;
	chats: SelectChat[]| undefined;
	isLoading: boolean;
	createTemporaryChat: () => string;
	temporaryChatId: string | null;
  }

  export interface ChatLayoutProps {
	sessionId: string;
	initialChatId?: string;
	initialChats?: SelectChat[]
  }

  export interface ChatListProps {
	chats: SelectChat[] | undefined;
	isLoading: boolean;
	currentChatId: string | undefined;
	setCurrentChatId: (id: string) => void;
	temporaryChatId: string | null;
  }

export interface SidebarHeaderProps {
	toggleSidebar: () => void;
	sessionId: string;
}

export interface ChatProps {
	sessionId: string;
	currentChatId: string;
	isTemporary: boolean;
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

  export interface LinkInputsProps {
	onSubmit: (links: string[]) => void;
  }