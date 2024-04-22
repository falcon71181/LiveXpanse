import { FaReply } from "react-icons/fa";
import { PostInfo } from "../../../types/posts";
import { formateTime } from "../../../lib/utils";

interface PostCardProps {
  props: PostInfo;
}

export const PostCard: React.FC<PostCardProps> = ({ props: postData }) => {
  return (
    <main className="relative min-h-60 p-3 md:p-5 lg:p-6 rounded-xl bg-background_card flex flex-col overflow-hidden border-[1px] border-[#2fa8a3] hover:border-[#47FFF7]">
      <section className="text-sm md:text-base h-10 flex justify-between items-center">
        <h1 className="text-[#a970ff]">by <span className="text-base inline-flex animate-text-gradient bg-gradient-to-r from-[#b2a8fd] via-[#2fa8a3] to-[#8678f9] bg-[200%_auto] bg-clip-text text-transparent font-semibold text-ellipsis overflow-hidden tracking-wide">{postData.leader}</span></h1>
        <span className="text-zinc-300">{formateTime(postData.createdOn)}</span>
      </section>
      <div className="min-h-10 font-semibold text-2xl bg-gradient-to-t from-[#c7d2fe] to-[#8678f9] bg-clip-text text-transparent text-ellipsis overflow-hidden whitespace-nowrap">
        {postData.title}
      </div>
      <div className="mb-10 text-zinc-300 break-words">
        {postData.message}
      </div>
      <section className="absolute bottom-5">
        <a href="#replyForm" className="group flex gap-3 items-center cursor-pointer">
          <FaReply className="group-hover:text-[#a970ff] group-hover:translate-x-1 transition-all duration-200" />
          <span className="group-hover:text-[#a970ff]">Reply</span>
        </a>
      </section>
    </main>
  )
}
