import { InsertChat, SelectChat, SelectMessage } from "@/db/schema/chats";

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
  sessionId: string;
  setCurrentChatId: (id: string) => void;
  currentChatId?: string;
}

export interface SidebarHeaderProps {
	toggleSidebar: () => void;
	userName?: string;
	userImage?: string;
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

  export interface ChatDataFetcherProps {
	currentChatId: string | undefined;
	sessionId: string;
	onMessagesLoaded: (messages: Message[]) => void;
	onError: (error: string) => void;
	onLoadingChange: (isLoading: boolean) => void;
  }

  export interface ChatUIProps {
	messages: Message[];
	inputMessage: string;
	setInputMessage: (message: string) => void;
	handleSubmit: (e: React.FormEvent) => void;
	isLoading: boolean;
	error: string | null;
  }