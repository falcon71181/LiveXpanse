import React from "react";
import { ThreadCardProps } from "../../types/threads";

const ThreadCard: React.FC<ThreadCardProps> = ({ thread }) => {
  return (
    <div className="p-3 w-11/12 h-40 bg-[#151E27] flex flex-col gap-1 items-center rounded-xl overflow-hidden border-[1px] border-[#2fa8a3] hover:border-[#47FFF7]">
      <h1 className="max-w-[99%] w-[99%] h-10 text-xl text-zinc-50 text-ellipsis overflow-hidden whitespace-nowrap">
        {thread.title}
      </h1>
      <div className="max-w-[99%] w-[99%] h-6 flex items-center">
        <h1 className="p-2 text-base font-semibold text-ellipsis overflow-hidden">
          {thread.leader}
        </h1>
        {/* Add Date */}
      </div>
      <div className="p-2 max-w-[99%] w-[99%] h-24 text-sm line-clamp-3">
        {thread.message}
      </div>
    </div>
  );
};

export default ThreadCard;