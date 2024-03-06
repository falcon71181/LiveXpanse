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
          <main
            key={index}
            className={`w-full my-2 px-4 inline-block ${message.type === "sent" ? "bg-[#444037] border-l-2 border-yellow-500" : ""}`}
          >
            <div className="flex gap-3 text-sm">
              <h1 className="font-semibold tracking-wide text-[#E91E63] hover:underline">
                username
              </h1>
              <h1 className="text-gray-400">date&time</h1>
            </div>
            <div
              className={`${message.type === "sent" ? "text-zinc-300" : "text-white"}`}
            >
              {message.data.message}
            </div>
          </main>
        ))}
      </div>
    </main>
  );
};

export default MessagesLogs;
