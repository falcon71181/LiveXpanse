import { ConnectionState, Track } from "livekit-client";
import {
    useConnectionState,
    useRemoteParticipant,
    useTracks
} from '@livekit/components-react'
import LiveVideo from "./LiveVideo";

type VideoProps = {
    hostName: string;
    hostIdentity: number;
}

const Video = ({ hostName, hostIdentity }: VideoProps) => {
    console.log(hostName, hostIdentity);

    const connectionState = useConnectionState();
    const participant = useRemoteParticipant(`${hostIdentity}`);
    const track = useTracks([
        Track.Source.Camera,
        Track.Source.Microphone
    ]).filter(track => track.participant.identity === `${hostIdentity}`);

    let content;

    if (!participant && connectionState === ConnectionState.Connected) {
        content = <p className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-red-500 text-2xl">Host is offline</p>
    } else if (!participant && track.length === 0) {
        content = <p className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-gray-500 text-2xl">Loading...</p>
    } else {
        if (participant) {
            content = <LiveVideo participant={participant} />
        }
    }

    return (
        <div className="bg-gray-900 aspect-video border border-gray-600 rounded-md group relative">
            {content}
        </div>
    )
}

export default Video;
