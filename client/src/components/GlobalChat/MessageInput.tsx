"use client";
import React, { useState } from "react";

interface MessageInputProps {
  onSendMessage: (message: string) => void;
}

const MessageInput: React.FC<MessageInputProps> = ({ onSendMessage }) => {
  const [inputData, setInputData] = useState<string>("");

  // to handle after message is send
  const handleSendMessage = (
    event:
      | React.MouseEvent<SVGSVGElement, MouseEvent>
      | React.FormEvent<HTMLFormElement>,
  ) => {
    event.preventDefault();
    if (inputData.length === 0) return;

    onSendMessage(inputData);
    setInputData("");
  };

  return (
    <div className="h-16 w-[99.6vw] p-3 absolute bottom-0 bg-[#162536]">
      <form onSubmit={handleSendMessage} className="relative w-full">
        <input
          className="h-full w-full rounded-md px-3 py-2 outline-none text-sm text-white bg-[#151E27]"
          placeholder="Write ur Message..."
          value={inputData}
          onChange={(e) => setInputData(e.target.value)}
        />
        <svg
          className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer"
          stroke="currentColor"
          fill="currentColor"
          strokeWidth="0"
          viewBox="0 0 512 512"
          height="1.6rem"
          width="1.6rem"
          xmlns="http://www.w3.org/2000/svg"
          onClick={handleSendMessage}
        >
          <path
            d="M476.59 227.05l-.16-.07L49.35 49.84A23.56 23.56 0 0027.14 52 24.65 24.65 0 0016 72.59v113.29a24 24 0 0019.52 23.57l232.93 43.07a4 4 0 010 7.86L35.53 303.45A24 24 0 0016 327v113.31A23.57 23.57 0 0026.59 460a23.94 23.94 0 0013.22 4 24.55 24.55 0 009.52-1.93L476.4 285.94l.19-.09a32 32 0 000-58.8z"
            fill="#efeff1"
          ></path>
        </svg>
      </form>
    </div>
  );
};

export default MessageInput;
