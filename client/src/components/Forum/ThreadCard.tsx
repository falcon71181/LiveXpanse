import React from "react";
import { ThreadCardProps } from "../../types/threads";
import { BiSolidMessageRounded } from "react-icons/bi";
import { Link } from "react-router-dom";

const ThreadCard: React.FC<ThreadCardProps> = ({ thread }) => {
  return (
    <Link to={`/community/post/${thread.threadId}`} className="p-3 w-11/12 h-44 bg-background_card flex flex-col gap-1 items-center rounded-xl overflow-hidden border-[1px] border-[#2fa8a3] hover:border-[#47FFF7]">
      <div className="max-w-[99%] w-[99%] h-10 flex justify-between">
        <h1 className=" bg-gradient-to-t from-[#c7d2fe] to-[#8678f9] h-10 bg-clip-text text-xl text-transparent text-ellipsis overflow-hidden whitespace-nowrap">
          {thread.title}
        </h1>
        <span className="h-10 flex items-center justify-center gap-1">
          <span className="h-7 text-lg">
            <BiSolidMessageRounded />
          </span>
          <h1 className="h-10">{thread.noOfReplies}</h1>
        </span>
      </div>
      <div className="max-w-[99%] w-[99%] h-6 flex justify-between items-center">
        <h1 className="p-2 text-base inline-flex animate-text-gradient bg-gradient-to-r from-[#b2a8fd] via-[#2fa8a3] to-[#8678f9] bg-[200%_auto] bg-clip-text text-transparent font-semibold text-ellipsis overflow-hidden tracking-wide">
          {thread.leader}
        </h1>
        <div>{(new Date(parseInt(thread.createdOn))).toLocaleString()}</div>
      </div>
      <div className="p-2 max-h-[4.5rem] max-w-[99%] w-[99%] text-sm line-clamp-3 break-words">
        {thread.message}
      </div>
    </Link>
  );
};

export default ThreadCard;
