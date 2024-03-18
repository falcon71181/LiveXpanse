export type MessageData = {
  socketId?: string;
  message: string;
};

export interface Message {
  type: "sent" | "received";
  data: MessageData;
  time: string;
}

export interface MessagesLogsProps {
  messages: Message[];
}

export interface MessageInputProps {
  onSendMessage: (message: string) => void;
}

export interface MessageBubbleProps {
  props: Message;
}
