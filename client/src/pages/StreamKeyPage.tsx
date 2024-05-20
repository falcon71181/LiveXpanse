import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/auth";
import { AuthContextType } from "../types/auth";
import { useNavigate } from "react-router-dom";

const StreamKeyPage = () => {
    const { authUser } = useContext(AuthContext) as AuthContextType;
    const token = authUser?.token;

    const navigate = useNavigate();

    const [streamUrl, setStreamUrl] = useState('');
    const [streamKey, setStreamKey] = useState('');
    const [showKey, setShowKey] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        const fetchStream = async () => {
            try {
                const res = await fetch('http://localhost:3333/streams/me', {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });

                const data = await res.json();
                console.log(data);

                if (res.ok) {
                    setStreamUrl(data.stream_url);
                    setStreamKey(data.stream_key);
                }
            } catch (error) {
                console.error(error);
            }
        }

        fetchStream();
    }, [token])

    const generateConnection = async () => {
        setIsLoading(true)

        try {
            const res = await fetch('http://localhost:3333/streams/ingress', {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })

            const data = await res.json();
            console.log(data);

            if (res.ok) {
                navigate(0)
            }
        } catch (error) {
            console.error(error);
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <div className='pt-14 w-full h-screen'>
            <div className="my-10 mx-12">
                <div className="flex justify-start items-center gap-3 mb-5">
                    <h1 className="font-semibold text-xl">URL and Keys</h1>
                    <button
                        onClick={generateConnection}
                        disabled={isLoading}
                        className={`${isLoading ? 'cursor-wait' : 'cursor-pointer'} px-3 py-2 inline-flex justify-center items-center border border-gray-500 rounded-md hover:bg-gray-700`}
                    >
                        {isLoading ? 'Generating...' : 'Generate Connection'}
                    </button>
                </div>
                <div className="w-1/2 flex flex-col gap-3">
                    <input
                        disabled
                        type="text"
                        value={streamUrl || ''}
                        placeholder="Stream Url"
                        className="px-2 py-1 rounded-sm bg-gray-800 border border-gray-500"
                    />
                    <div className="flex gap-4 items-center">
                        <input
                            disabled
                            type={showKey ? 'text' : 'password'}
                            value={streamKey || ''}
                            placeholder="Stream Key"
                            className="flex-grow px-2 py-1 rounded-sm bg-gray-800 border border-gray-500"
                        />
                        <button
                            className="w-[4rem] border border-gray-500 min-h-full px-3 py-1.5 text-sm rounded-md hover:bg-gray-700"
                            onClick={() => setShowKey(!showKey)}
                        >
                            {showKey ? 'Hide' : 'Show'}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default StreamKeyPage;
