import React, { useEffect, useState } from "react";
import { MessageBubbleProps } from "../../types/GlobalChat";

const MessageBubble: React.FC<MessageBubbleProps> = ({ props }) => {
  const [time, setTime] = useState<string | null>(null);

  useEffect(() => {
    {
      /* TODO: Make it in ago format */
    }
    const fetchTime = async () => {
      const timestamp = parseInt(props.time);
      const date = new Date(timestamp);
      const messageDateTime = date.toLocaleTimeString();
      setTime(messageDateTime);
    };
    fetchTime();
  }, [props.time]);

  return (
    <main
      className={`w-screen min-h-12 px-4 inline-block ${
        props.type === "sent" ? "bg-[#444037] border-l-2 border-yellow-500" : ""
      }`}
    >
      <div className="flex gap-3 text-sm">
        <h1 className="font-semibold tracking-wide text-[#E91E63] hover:underline">
          {props.data.username}
        </h1>
        <h1 className="text-gray-400">{time}</h1>
      </div>
      <div
        className={`${
          props.type === "sent" ? "text-zinc-300" : "text-white"
        } break-words whitespace-pre-wrap hyphens-auto`}
      >
        {props.data.message}
      </div>
    </main>
  );
};

export default MessageBubble;
