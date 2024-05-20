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
        content = <p>Host is offline</p>
    } else if (!participant && track.length === 0) {
        content = <p>Loading...</p>
    } else {
        if (participant) {
            content = <LiveVideo participant={participant} />
        }
    }

    return (
        <div className="aspect-video border-b group relative">
            {content}
        </div>
    )
}

export default Video;
