import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import StreamPlayer from "../components/Stream/StreamPlayer";

type StreamData = {
    created_on: string
    id: number
    ingress_id: string | null
    is_chat_delayed: boolean
    is_chat_disabled: boolean
    is_chat_followers_only: boolean
    is_live: boolean
    name: string
    stream_key: string | null
    stream_url: string | null
    thumbnail_url: string | null
    updated_on: string
    user_id: number
}

type UserData = {
    id: number;
    username: string;
    email: string;
    joinedOn: string;
}

const StreamPage = () => {
    const { username } = useParams();

    const [stream, setStream] = useState<StreamData | null>(null);
    const [user, setUser] = useState<UserData | null>(null);

    useEffect(() => {
        const fetchStream = async () => {
            try {
                const res = await fetch(`http://localhost:3333/streams/${username}`)
                const data = await res.json();

                if (res.ok) {
                    setStream(data);
                }
            } catch (error) {
                console.error(error);
            }
        }

        const fetchUser = async () => {
            try {
                const res = await fetch(`http://localhost:3333/users/${username}`)
                const data = await res.json();

                if (res.ok) {
                    setUser(data);
                }
            } catch (error) {
                console.error(error);
            }
        }

        fetchStream();
        fetchUser();
    }, [username])

    return (
        <div className='pt-14 w-full h-screen'>
            {stream && user && (
                <div className="my-10 mx-12">
                    <h1 className="font-bold text-4xl mb-8">LiveXpanse Streaming</h1>
                    <StreamPlayer
                        user={user}
                        stream={stream}
                    />
                </div>
            )}
        </div>
    )
}

export default StreamPage;
