import { useNavigate, useParams } from "react-router-dom"
import { useState, useEffect, FormEvent, useContext } from "react";
import { Link } from "react-router-dom";
import { IoArrowBack, IoSend } from "react-icons/io5";
import { FaRegCommentAlt } from "react-icons/fa";
import { PostCard } from "../components/Forum/Post/PostCard";
import { PostInfo, Reply } from "../types/posts";
import { ReplyCard } from "../components/Forum/Post/ReplyCard";
import { AuthContext } from "../context/auth";
import { AuthContextType } from "../types/auth";

export const Post = () => {
    const { threadId } = useParams();
    const SERVER = import.meta.env.VITE_SERVER;

    const { authUser } = useContext(AuthContext) as AuthContextType;
    const [postData, setPostData] = useState<PostInfo>();
    const [replyText, setReplyText] = useState('');

    const navigate = useNavigate();

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

    console.log(postData?.replies);

    const addReply = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        try {
            const res = await fetch(`http://localhost:3333/threads/${threadId}/replies`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${authUser?.token}`
                },
                body: JSON.stringify({ reply: replyText })
            })


            if (res.ok) {
                // Refresh the page with new replies
                navigate(0)
            }

            if (!res.ok) {
                const data = await res.json();
                const error = data.error;
                throw error;
            }
        } catch (error) {
            if (error instanceof Error) {
                console.error(error.message);
            }
        }

        setReplyText('');
    }

    return (
        <main className="mt-16 w-full min-h-screen flex flex-col items-center text-zinc-300">
            <div
                className="h-10 px-3 lg:px-0 text-white sm:m-3 md:m-4 w-full sm:w-10/12 md:w-9/12 lg:w-8/12">
                <Link to="/community/board"
                    className="group h-full flex gap-3 items-center w-20"
                >
                    <IoArrowBack className="group-hover:translate-x-1 transition-transform duration-200" />
                    <span className="text-lg">Back</span>
                </Link>
            </div>

            <div className="w-8/12 flex flex-col gap-3">
                {postData && (
                    <PostCard key={threadId} props={postData} />
                )}

                <div className="group flex gap-3 items-center">
                    <FaRegCommentAlt />
                    <h1 className="text-base pb-1 font-semibold text-white">{postData?.noOfReplies} Comments</h1>
                </div>

                <form onSubmit={addReply}>
                    <div className='relative'>
                        <textarea
                            value={replyText}
                            placeholder={`${authUser === null ? 'Signin to reply to this thread!' : 'Enter your reply here...'}`}
                            rows={6}
                            onChange={e => setReplyText(e.target.value)}
                            className='border border-gray-500 p-2 w-full text-sm rounded-md bg-[#192A3E] outline-none focus:border-gray-200'
                        />
                        <button disabled={authUser === null} className='absolute right-0 bottom-0 mr-3 mb-4'>
                            <IoSend className="h-5 w-5" />
                        </button>
                    </div>
                </form>
            </div>

            <div className="my-5 w-8/12">
                {postData?.replies && postData.replies.map((reply: Reply, index) => (
                    <ReplyCard key={index} props={reply} />
                ))}
            </div>
        </main>
    )
}
