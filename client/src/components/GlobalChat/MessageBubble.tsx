import React from "react";
import { MessageBubbleProps } from "../../types/GlobalChat";
import { formateTime } from "../../lib/utils";

const MessageBubble: React.FC<MessageBubbleProps> = ({ props }) => {
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
        {/* TODO: Refactor into 'X mintues/hours ago' format */}
        <h1 className="text-gray-400">{formateTime(props.time)}</h1>
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
