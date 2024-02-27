import React, { Key } from "react";
import { useEffect, useRef } from "react";
import { Message, MessagesLogsProps } from "../../types/GlobalChat";

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
      <div className="flex flex-col" ref={messageLogs}>
        {messages.map((message: Message, index: Key) => (
          <div
            key={index}
            className={`h-full w-fit mb-2 text-slate-50 px-3 py-2 rounded-full justify-center inline-block ${message.type === "sent" ? "bg-[#8D65DE] self-end" : "bg-gray-600"
              }`}
          >
            {message.data.message}
          </div>
        ))}
      </div>
    </main>
  );
};

export default MessagesLogs;
