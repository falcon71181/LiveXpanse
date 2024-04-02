import { useState, useEffect } from "react";
import ThreadCard from "../components/Forum/ThreadCard";
import { Thread } from "../types/threads";
import ThreadForm from "../components/Forum/ThreadForm";

const Forum = () => {
    const SERVER = import.meta.env.VITE_SERVER;

    const [threadData, setThreadData] = useState<Thread[]>([]);
    const [threadPop, setThreadPop] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`${SERVER}/threads`);
                const data = await response.json();

                if (!response.ok) {
                    throw new Error(data.error)
                }

                if (response.ok) {
                    setThreadData(data)
                }
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };
        fetchData();
    }, [SERVER]);

    return (
        <div>
            <div className={`${threadPop ? 'blur-md pointer-events-none' : 'blur-none'} transition relative pt-16 w-screen flex justify-center min-h-screen text-zinc-300`}>
                <div className="m-6 w-8/12">
                    <div className='relative max-w-2xl mx-auto p-2'>
                        <h1 className="flex justify-center text-4xl text-white font-bold tracking-wider overflow-hidden">
                            LiveXpanse Connect
                        </h1>
                        <button onClick={() => setThreadPop(!threadPop)} className='absolute top-1/2 right-0 -translate-y-1/2 px-3 py-2.5 inline-flex justify-center items-center text-sm rounded-md bg-[#34495E] border border-gray-500 cursor-pointer hover:bg-[#2C3E50]'>
                            New Thread
                        </button>
                    </div>
                    {threadData.length === 0 && <h1 className='font-light text-sm text-center text-white/60 mt-5'>No thread available</h1>}
                    <div className="mt-8 flex flex-col items-center gap-4">
                        {threadData.map(thread => (
                            <ThreadCard key={thread.title + thread.leader} thread={thread} />
                        ))}
                    </div>
                </div>
            </div>
            <ThreadForm threadPop={threadPop} setThreadPop={setThreadPop} />
        </div>
    );
};

export default Forum;
