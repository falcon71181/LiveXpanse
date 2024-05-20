import {
    type CreateIngressOptions,
    IngressAudioEncodingPreset,
    IngressClient,
    IngressInput,
    IngressVideoEncodingPreset,
    RoomServiceClient,
} from "livekit-server-sdk";

import { TrackSource } from "livekit-server-sdk/dist/proto/livekit_models";
import { pool } from "../database/db";

const roomService = new RoomServiceClient(
    process.env.LIVEKIT_API_URL!,
    process.env.LIVEKIT_API_KEY!,
    process.env.LIVEKIT_API_SECRET!,
)

const ingressClient = new IngressClient(process.env.LIVEKIT_API_URL!);

const resetIngresses = async (hostIdentity: string) => {
    const ingresses = await ingressClient.listIngress({ roomName: hostIdentity });
    const rooms = await roomService.listRooms([hostIdentity]);

    // Deleting all rooms
    for (const room of rooms) {
        await roomService.deleteRoom(room.name);
    }

    // Deleing all ingresses
    for (const ingress of ingresses) {
        if (ingress.ingressId) {
            await ingressClient.deleteIngress(ingress.ingressId);
        }
    }
}

const createIngress = async (user: { user_id: string, user_username: string }) => {
    await resetIngresses(`${user.user_id}`);

    const options: CreateIngressOptions = {
        name: user.user_username,
        roomName: `${user.user_id}`,
        participantName: user.user_username,
        participantIdentity: `${user.user_id}`,
        video: {
            source: TrackSource.CAMERA,
            preset: IngressVideoEncodingPreset.H264_1080P_30FPS_3_LAYERS
        },
        audio: {
            source: TrackSource.MICROPHONE,
            preset: IngressAudioEncodingPreset.OPUS_STEREO_96KBPS
        }
    }

    try {
        const ingress = await ingressClient.createIngress(IngressInput.RTMP_INPUT, options);

        if (!ingress || !ingress.url || !ingress.streamKey) {
            throw new Error("Failed to create ingress");
        }

        await pool.query(`
            UPDATE streams
            SET ingress_id = $1, stream_url = $2, stream_key = $3
            WHERE user_id = $4
        `, [ingress.ingressId, ingress.url, ingress.streamKey, user.user_id]);

        return ingress;
    } catch (error) {
        console.error("Error occured in creating ingress:", error);
    }
}

export { createIngress };
