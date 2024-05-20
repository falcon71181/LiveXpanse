import { useEffect } from "react";

const StreamPage = () => {
    useEffect(() => {
        const fetchStreamAndUserData = async () => {
            try {
                console.log('Fetch data here');
            } catch (error) {
                console.error(error);
            }
        }

        fetchStreamAndUserData()
    }, [])

    return (
        <div className='pt-14 w-full h-screen'>
            <div className="my-10 mx-12">
                <h1 className="font-bold text-4xl mb-8">Stream Page</h1>
            </div>
        </div>
    )
}

export default StreamPage;
