import { useParams } from "react-router-dom"
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { IoArrowBack } from "react-icons/io5";
import { FaRegCommentAlt } from "react-icons/fa";
import { PostCard } from "../components/Forum/Post/PostCard";
import { PostInfo, Reply } from "../types/posts";
import { ReplyCard } from "../components/Forum/Post/ReplyCard";

export const Post = () => {
  const { threadId } = useParams();
  const SERVER = import.meta.env.VITE_SERVER;

  const [postData, setPostData] = useState<PostInfo>();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${SERVER}/threads/${threadId}`);
        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.error)
        }

        if (response.ok) {
          setPostData(data)
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, [SERVER, threadId]);

  return (
    <main className="pt-16 w-screen min-h-screen flex flex-col items-center text-zinc-300">
      <div
        className="px-6 h-10 text-white m-1 sm:m-3 md:m-6 w-full sm:w-10/12 md:w-9/12 lg:w-8/12 border border-red-300">
        <Link to="/community/board"
          className="group h-full flex gap-3 items-center w-20"
        >
          <IoArrowBack className="group-hover:translate-x-1 transition-transform duration-200" />
          <span className="text-lg">Back</span>
        </Link>
      </div>
      <div className="w-8/12">
        {postData && (
          <PostCard key={threadId} props={postData} />
        )}
        <div className="group flex gap-3 items-center">
          <FaRegCommentAlt />
          <h1 className="text-base pb-2 font-semibold text-white">{postData?.noOfReplies} Comments</h1>
        </div>
      </div>
      <div className="my-5 w-8/12">
        {postData?.replies && postData.replies.map((reply: Reply, index) => (
          <ReplyCard key={index} props={reply} />
        ))}
      </div>
    </main>
  )
}
