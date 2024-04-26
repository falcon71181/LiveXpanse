import { useState, useEffect, useContext, Dispatch, SetStateAction } from "react";
import ThreadCard from "../components/Forum/ThreadCard";
import { Thread } from "../types/threads";
import ThreadForm from "../components/Forum/ThreadForm";
import { AuthContext } from "../context/auth";
import { AuthContextType } from "../types/auth";
import { FaPlus } from "react-icons/fa6";

const Forum = () => {
  const SERVER = import.meta.env.VITE_SERVER;

  const { authUser } = useContext(AuthContext) as AuthContextType;
  const [threadData, setThreadData] = useState<Thread[]>([]);
  const [threadPop, setThreadPop] = useState(false);
  const [newThread, setNewThread] = useState({})

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${SERVER}/threads`);
        const dataRaw = await response.json();
        // Reversing data to get latest first
        const data = dataRaw.reverse();

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
  }, [SERVER, newThread]);

  return (
    <div>
      <div className={`${threadPop ? 'blur-md pointer-events-none select-none' : 'blur-none'} ${!authUser ? 'mb-20' : 'mb-10'} relative pt-20 w-screen flex justify-center min-h-screen text-zinc-300 transition-all duration-100`}>
        <div className="m-1 sm:m-3 md:m-6 w-full sm:w-10/12 md:w-9/12 lg:w-8/12">
          <div className='flex justify-center items-center w-fit gap-6 mx-auto'>
            <h1 className="text-4xl text-white font-bold tracking-wider overflow-hidden">
              LiveXpanse Connect
            </h1>
            {authUser && (
              <CreateThread threadPop={threadPop} setThreadPop={setThreadPop} />
            )}
          </div>
          {threadData.length === 0 && <h1 className='font-light text-sm text-center text-white/60 mt-5'>No thread available</h1>}
          <div className="mt-8 flex flex-col items-center gap-4">
            {threadData.map((thread: Thread) => (
              <ThreadCard key={thread.title + thread.leader} thread={thread} />
            ))}
          </div>
        </div>
      </div>
      <ThreadForm threadPop={threadPop} setThreadPop={setThreadPop} setNewThread={setNewThread} />
    </div>
  );
};

const CreateThread = ({ threadPop, setThreadPop }: { threadPop: boolean, setThreadPop: Dispatch<SetStateAction<boolean>> }) => {
  return (
    <button 
      onClick={() => setThreadPop(!threadPop)} 
      className='px-3 py-2 inline-flex justify-center items-center gap-2 text-sm rounded-2xl bg-[#34495E] border border-gray-500 cursor-pointer hover:bg-[#2C3E50]'
    >
      <FaPlus className="text-xl" />
      <span className="text-lg">
        Create
      </span>
    </button>
  )
}

export default Forum;
