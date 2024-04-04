import { Reply } from "../../../types/posts"
import { FaReply } from "react-icons/fa";
import { useState, useEffect } from "react";

interface ReplyCardProps {
  props: Reply;
}

export const ReplyCard: React.FC<ReplyCardProps> = ({ props: replyData }) => {
  const [replyCreatedOn, setReplyCreatedOn] = useState("");

  useEffect(() => {
    {
      /* TODO: Make it in ago format */
    }
    const fetchTime = async () => {
      const timestamp = parseInt(replyData.createdOn);
      const date = new Date(timestamp);
      const messageDateTime = date.toLocaleString();
      setReplyCreatedOn(messageDateTime);
    };
    fetchTime();
  }, [replyData.createdOn]);
  return (
    <div className="relative min-h-40 w-full p-3 border-b border-cyan-800">
      <div className="flex justify-between">
        <h1 className="font-semibold text-green-300">{replyData.leader}</h1>
        <span>{replyCreatedOn}</span>
      </div>
      <div className="text-sm text-zinc-300 mx-6 my-3">
        {replyData.message}
      </div>
      <section className="absolute bottom-3 md:bottom-5 lg:bottom-7">
        <div className="group flex gap-3 items-center cursor-pointer">
          <FaReply className="group-hover:text-[#a970ff] group-hover:translate-x-1 transition-all duration-200" />
          <span className="group-hover:text-[#a970ff]">Reply</span>
        </div>
      </section>
    </div>
  )
}
