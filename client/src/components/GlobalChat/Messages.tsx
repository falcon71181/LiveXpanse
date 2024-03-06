import React, { Key } from "react";
import { useEffect, useRef } from "react";
import { Message, MessagesLogsProps } from "../../types/GlobalChat";
import MessageBubble from "./MessageBubble";

// TODO: Make Chat More Like Discord Server Chat
const MessagesLogs: React.FC<MessagesLogsProps> = ({ messages }) => {
  const messageLogs = useRef<HTMLDivElement>(null);

  // automatically scroll to the bottom of a message logs
  useEffect(() => {
    messageLogs.current?.scrollIntoView({
      behavior: "smooth",
      block: "end",
    });
  }, [messages]);

  return (
    <main className="flex-grow">
      <div className="flex flex-col gap-2" ref={messageLogs}>
        {messages.map((message: Message, index: Key) => (
          <MessageBubble key={index} props={message} />
        ))}
      </div>
    </main>
  );
};

export default MessagesLogs;
