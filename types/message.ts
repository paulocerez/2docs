export interface Message {
	id: string;
	chatId: string;
	content: string;
	role: "user" | "assistant" | "system";
	timestamp: Date | string;
  } 