export interface Message {
	id: string;
	chatId: string;
	message: string;
	role: "user" | "assistant" | "system";
	timestamp: Date | string;
  }