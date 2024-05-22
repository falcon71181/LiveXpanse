import { FormEvent, useContext, useEffect, useRef, useState } from "react"
import { AuthContext } from "../../context/auth";
import { AuthContextType } from "../../types/auth";
import socket from "../../lib/socket";

type MessageBlock = {
    data: string;
    user: string;
}

const ChatSection = () => {
    const [message, setMessage] = useState('');
    const [messageLogs, setMessageLogs] = useState<MessageBlock[]>([]);
    const { authUser } = useContext(AuthContext) as AuthContextType;

    const [isConnected, setIsConnected] = useState(socket.connected);

    const messageRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        messageRef.current?.scrollIntoView({
            behavior: "smooth",
            block: "end",
        });
    }, [messageLogs]);

    useEffect(() => {
        const onConnect = () => {
            setIsConnected(true);
        };

        const onDisconnect = () => {
            setIsConnected(false);
        };

        const onMessageReceive = (message: MessageBlock) => {
            setMessageLogs(prevMessages => {
                return [...prevMessages, {
                    data: message.data,
                    user: message.user
                }]
            })
        }

        socket.on("connect", onConnect);
        socket.on("disconnect", onDisconnect);
        socket.on('receive-stream-message', onMessageReceive)

        return () => {
            socket.off("connect", onConnect);
            socket.off("disconnect", onDisconnect);
            socket.off('receive-stream-message', onMessageReceive)
        };
    })

    const sendMessage = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        if (authUser) {
            const newMessageBlock: MessageBlock = {
                data: message,
                user: authUser.username
            }

            socket.emit('send-stream-message', newMessageBlock);
        }


        setMessage('');
    }

    return (
        <div className="border border-gray-600 rounded-md px-4 py-2 flex flex-col gap-2">
            <h1 className="font-semibold text-xl">Chat Section <span className="text-xs font-normal text-gray-500">(Be kind to each other)</span></h1>
            {isConnected && (
                <div className="flex-grow flex flex-col gap-2 overflow-y-auto h-[20rem] my-2" >
                    {messageLogs.map((message, index) => (
                        <div key={`${index}-${message.user}`} className="flex flex-col border px-2 py-1 rounded-md  bg-purple-900/10 border-gray-500" ref={messageRef}>
                            <p className="text-xs text-gray-500">{message.user}</p>
                            <p>{message.data}</p>
                        </div>
                    ))}
                </div>
            )}
            <form onSubmit={sendMessage}>
                <input
                    className="border border-gray-500 bg-transparent rounded-md w-full text-sm px-2 py-1 outline-none focus:outline-1 focus:outline-purple-500 placeholder:text-sm"
                    placeholder="Message..."
                    onChange={(e) => setMessage(e.target.value)}
                    value={message}
                />
            </form>
        </div>
    )
}

export default ChatSection
