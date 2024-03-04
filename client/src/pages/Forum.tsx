import { useState, useEffect } from "react";
import ThreadCard from "../components/Forum/ThreadCard";
import { Thread } from "../types/threads";

const Forum = () => {
  const SERVER = import.meta.env.VITE_SERVER;

  const [threadData, setThreadData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${SERVER}/threads`);
        const data = await response.json();
        setThreadData(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="pt-16 w-screen flex justify-center min-h-screen text-zinc-300">
      <div className="m-6 w-8/12">
        <h1 className="h-14 w-full flex justify-center text-4xl text-white font-bold tracking-wider overflow-hidden">
          LiveXpanse Connect
        </h1>
        <div className="mt-8 flex flex-col items-center gap-4">
          {threadData.map((thread: Thread) => (
            <ThreadCard key={thread.title + thread.leader} thread={thread} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Forum;
