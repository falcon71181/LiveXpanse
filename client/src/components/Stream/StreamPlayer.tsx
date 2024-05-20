import { useContext, useEffect, useState } from "react"
import { AuthContext } from "../../context/auth"
import { AuthContextType } from "../../types/auth"
import { JwtPayload, jwtDecode } from "jwt-decode"
import { LiveKitRoom } from "@livekit/components-react"
import Video from "./Video"

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

type StreamPlayerProps = {
    user: UserData,
    stream: StreamData;
}

const StreamPlayer = ({ user, stream }: StreamPlayerProps) => {
    console.log({ user, stream });

    const { authUser } = useContext(AuthContext) as AuthContextType;

    const [token, setToken] = useState('');
    const [name, setName] = useState('');
    const [identity, setIdentity] = useState('');

    useEffect(() => {
        const createToken = async () => {
            try {
                const res = await fetch('http://localhost:3333/streams/viewer-token', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        host: {
                            id: user.id,
                            username: user.username
                        },
                        current: authUser?.username
                    })
                });

                const data = await res.json();

                if (res.ok) {
                    setToken(data);

                    const decodedToken = jwtDecode(data) as JwtPayload & { name?: string };
                    const identityValue = decodedToken.jti;
                    const nameValue = decodedToken.name;

                    if (nameValue) setName(nameValue);
                    if (identityValue) setIdentity(identityValue);
                }
            } catch (error) {
                console.error(error);
            }
        }

        createToken();
    }, [])

    console.log({ token, name, identity });

    return (
        <>
            {(!token || !name || !identity) ? (
                <div>Cannot watch the stream</div>
            ) : (
                <LiveKitRoom
                    token={token}
                    serverUrl={import.meta.env.VITE_LIVEKIT_WS_URL}
                    className="grid grid-cols-1 lg:gap-y-0 lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-6 h-full"
                >
                    <div className="space-y-4 col-span-1 lg:col-span-2 xl:col-span-2 2xl:col-span-5 lg:overflow-y-auto pb-10">
                        <Video hostName={user.username} hostIdentity={user.id} />
                    </div>
                </LiveKitRoom>
            )}
        </>
    )
}

export default StreamPlayer;
