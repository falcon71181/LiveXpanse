import { FormEvent, useContext, useEffect, useRef, useState } from "react"
import { AuthContext } from "../../context/auth";
import { AuthContextType } from "../../types/auth";

const ChatSection = () => {
    const [message, setMessage] = useState('');
    const [messageLogs, setMessageLogs] = useState<{ data: string, user: string | undefined }[]>([]);
    const { authUser } = useContext(AuthContext) as AuthContextType;

    const messageRef = useRef<HTMLDivElement>(null);

    // automatically scroll to the bottom of a message logs
    useEffect(() => {
        messageRef.current?.scrollIntoView({
            behavior: "smooth",
            block: "end",
        });
    }, [messageLogs]);

    const sendMessage = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        setMessageLogs(prevMessages => {
            return [...prevMessages, { data: message, user: authUser?.username }]
        })

        setMessage('');
    }

    return (
        <div className="border border-gray-600 rounded-md px-4 py-2 flex flex-col gap-2">
            <h1 className="font-semibold text-xl">Chat Section <span className="text-xs font-normal text-gray-500">(Be kind to each other)</span></h1>
            <div className="flex-grow flex flex-col gap-2 overflow-y-auto h-[20rem] my-2" >
                {messageLogs.map((message, index) => (
                    <div key={`${index}-${message.user}`} className="flex flex-col border px-2 py-1 rounded-md bg-purple-900/10 border-gray-500" ref={messageRef}>
                        <p className="text-xs text-gray-500">{message.user}</p>
                        <p>{message.data}</p>
                    </div>
                ))}
            </div>
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
