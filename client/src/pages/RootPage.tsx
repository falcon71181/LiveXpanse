import { useEffect, useState } from "react";
import Sukuna from "../assets/bg/sukuna.jpg";

type StreamData = {
    id: number;
    name: string;
    thumbnail: string;
    author: string;
}

const RootPage = () => {
    const [streamsData, setStreamsData] = useState<StreamData[]>([]);

    useEffect(() => {
        const fetchStreamData = async () => {
            try {
                const res = await fetch('http://localhost:3333/videos');
                const data = await res.json();

                if (res.ok) {
                    setStreamsData(data);
                }
            } catch (error) {
                console.error(error);
            }
        }

        fetchStreamData();
    }, [])

    return (
        <main className="pt-14 w-full h-screen">
            <img src={Sukuna} className="absolute left-0 top-0 h-screen w-full object-cover opacity-10" />
            <div className="text-white">
                <div className="my-10 mx-12">
                    <h1 className="font-bold text-4xl mb-8">Current Live Streams</h1>
                    <div className="grid grid-cols-4 gap-y-3 gap-x-5">
                        {streamsData.map(stream => (
                            <div key={stream.id} className="z-50 bg-transparent cursor-pointer border border-gray-500 rounded-lg p-3 bg-gradient-to-r from-gray-800">
                                    <video controls className="mb-2">
                                        <source src={`http://localhost:3333/videos/${stream.id}`} type="video/mp4" />
                                    </video>
                                <div>
                                    <h1 className="font-bold">{stream.name}</h1>
                                    <h1 className="text-gray-400 font-sm mt-1">{stream.author}'s streaming</h1>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </main>
    );
};

export default RootPage;
