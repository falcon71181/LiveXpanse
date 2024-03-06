import React from "react";
import { Message } from "../../types/GlobalChat";

interface MessageBubbleProps {
  props: Message;
}

const MessageBubble: React.FC<MessageBubbleProps> = ({ props }) => {
  return (
    <main
      className={`w-screen min-h-12 px-4 inline-block ${props.type === "sent" ? "bg-[#444037] border-l-2 border-yellow-500" : ""}`}
    >
      <div className="flex gap-3 text-sm">
        <h1 className="font-semibold tracking-wide text-[#E91E63] hover:underline">
          username
        </h1>
        <h1 className="text-gray-400">date&time</h1>
      </div>
      <div
        className={`${props.type === "sent" ? "text-zinc-300" : "text-white"} break-words whitespace-pre-wrap hyphens-auto`}
      >
        {props.data.message}
      </div>
    </main>
  );
};

export default MessageBubble;
