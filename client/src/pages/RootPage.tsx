import { useContext, useEffect, useState } from "react";
import Sukuna from "../assets/bg/sukuna.jpg";
import { AuthContext } from "../context/auth";
import { AuthContextType } from "../types/auth";
import { Link } from "react-router-dom";

type StreamData = {
    id: number;
    name: string;
    thumbnail: string;
    author: string;
}

type UserData = {
    user_id: number;
    user_email: string;
    user_username: string;
    is_live: boolean;
}

const RootPage = () => {
    const { authUser } = useContext(AuthContext) as AuthContextType;

    const [streamsData, setStreamsData] = useState<StreamData[]>([]);
    const [users, setUsers] = useState<UserData[]>([]);

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

        const fetchUsers = async () => {
            try {
                const res = await fetch('http://localhost:3333/users');
                const data = await res.json();

                if (res.ok) {
                    setUsers(data.users);
                }
            } catch (error) {
                console.error(error);
            }

        }

        fetchStreamData();
        fetchUsers();
    }, [])

    return (
        <main className={`${!authUser && 'mb-24'} pt-14 w-full h-screen mb-20`}>
            <img src={Sukuna} className="absolute left-0 top-0 h-full w-full object-cover opacity-10" />
            <div className="text-white">
                <div className="my-10 mx-12">
                    <h1 className="font-bold text-4xl mb-8">Previous Live Streams</h1>
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
                <div className="my-10 mx-12">
                    <div className="flex items-center gap-5 mb-8">
                        <h1 className="font-bold text-3xl">Current Streamers</h1>
                        <Link to='/stream/key' className='z-50 px-3 py-2 inline-flex justify-center items-center border border-gray-500 rounded-md hover:bg-gray-700'>
                            Your Keys
                        </Link>
                    </div>
                    {users && (
                        <div className="grid grid-cols-5 gap-5">
                            {users.map(user => (
                                <div key={user.user_id} className="z-50">
                                    <Link to={`/stream/${user.user_username}`} className="p-2 rounded-md border border-gray-500 flex justify-between">
                                        <div className="flex flex-col">
                                            <p className="font-bold text-lg">{user.user_username}</p>
                                            <p className="text-purple-500/60 text-sm">{user.user_email}</p>
                                        </div>
                                        {user.is_live && <p className="text-red-500 font-bold">Live</p>}
                                        {!user.is_live && <p className="text-gray-500 font-bold">Inactive</p>}
                                    </Link>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </main>
    );
};

export default RootPage;
