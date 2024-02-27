export type MessageData = {
  socketId?: string;
  message: string;
};

export interface Message {
  type: "sent" | "received";
  data: MessageData;
}

export interface MessagesLogsProps {
  messages: Message[];
}
