import { Dispatch, FormEvent, SetStateAction, useState } from "react";

type ThreadFormProps = {
    threadPop: boolean;
    setThreadPop: Dispatch<SetStateAction<boolean>>;
}

const ThreadForm = ({ threadPop, setThreadPop }: ThreadFormProps) => {
    const [threadTitle, setThreadTitle] = useState('');
    const [threadDescription, setThreadDescription] = useState('')

    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const threadData = {
            title: threadTitle,
            description: threadDescription
        }

        console.log(threadData);

        setThreadPop(false);
        setThreadTitle('');
        setThreadDescription('');
    }

    return (
        <div className={`${threadPop ? 'block' : 'hidden'} absolute text-white transition-opacity duration-300 left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 border border-gray-500 p-5 rounded-md bg-background_dark`}>
            <form className='flex flex-col gap-4' onSubmit={handleSubmit}>
                <div>
                    <h1 className='text-lg font-bold'>New Thread</h1>
                    <p className='font-light text-sm text-white/60'>Enter a title and a relevant description for a new thread</p>
                </div>
                <input
                    placeholder="Thread Title"
                    value={threadTitle}
                    onChange={(e) => setThreadTitle(e.target.value)}
                    className='bg-transparent border border-gray-500 p-2 text-sm rounded-md bg-[#192A3E] outline-none focus:outline-1 focus:outline-white'
                    required
                />
                <textarea
                    placeholder="Description"
                    rows={5}
                    value={threadDescription}
                    onChange={(e) => setThreadDescription(e.target.value)}
                    className='bg-transparent border border-gray-500 p-2 text-sm rounded-md bg-[#192A3E] outline-none focus:outline-1 focus:outline-white'
                    required
                />
                <button className='px-3 py-2.5 inline-flex justify-center items-center text-sm rounded-md bg-[#34495E] border border-gray-500 cursor-pointer hover:bg-[#2C3E50]'>
                    Add Thread
                </button>
            </form>
            <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 absolute top-4 right-4 cursor-pointer opacity-70 hover:opacity-100" onClick={() => setThreadPop(false)}>
                <path d="M11.7816 4.03157C12.0062 3.80702 12.0062 3.44295 11.7816 3.2184C11.5571 2.99385 11.193 2.99385 10.9685 3.2184L7.50005 6.68682L4.03164 3.2184C3.80708 2.99385 3.44301 2.99385 3.21846 3.2184C2.99391 3.44295 2.99391 3.80702 3.21846 4.03157L6.68688 7.49999L3.21846 10.9684C2.99391 11.193 2.99391 11.557 3.21846 11.7816C3.44301 12.0061 3.80708 12.0061 4.03164 11.7816L7.50005 8.31316L10.9685 11.7816C11.193 12.0061 11.5571 12.0061 11.7816 11.7816C12.0062 11.557 12.0062 11.193 11.7816 10.9684L8.31322 7.49999L11.7816 4.03157Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd"></path>
            </svg>
        </div>
    )
}

export default ThreadForm;
