import React, { Key } from "react";
import { useEffect, useRef } from "react";

interface MessagesLogsProps {
  messages: any[];
}

const MessagesLogs: React.FC<MessagesLogsProps> = ({ messages }) => {
  const messageLogs = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messageLogs.current?.scrollIntoView({
      behavior: "smooth",
      block: "end",
    });
  }, [messages]);
  return (
    <main className="flex-grow">
      <div className="flex flex-col" ref={messageLogs}>
        {messages.map((message: any, index: Key) => (
          <div
            key={index}
            className={`h-full w-fit mb-2 text-slate-50 px-3 py-2 rounded-full justify-center inline-block'>
                            ${message.type === "sent" ? "bg-[#8D65DE] self-end" : "bg-gray-600"}`}
          >
            {message.data}
          </div>
        ))}
      </div>
    </main>
  );
};

export default MessagesLogs;
