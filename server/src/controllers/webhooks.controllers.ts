import { Request, Response } from "express"
import { WebhookReceiver } from "livekit-server-sdk";
import { pool } from "../database/db";

const receiver = new WebhookReceiver(
    process.env.LIVEKIT_API_KEY!,
    process.env.LIVEKIT_API_SECRET!,
)

const livekitEventWebhook = async (req: Request, _res: Response) => {
    const event = receiver.receive(req.body, req.get('Authorization'))
    console.log('WEBHOOK', event.event);

    try {
        if (event.event === 'ingress_started') {
            await pool.query(`
                UPDATE streams
                SET is_live = true
                WHERE ingress_id = $1
            `, [event.ingressInfo?.ingressId])
        }

        if (event.event === 'ingress_ended') {
            await pool.query(`
                UPDATE streams
                SET is_live = false
                WHERE ingress_id = $1
            `, [event.ingressInfo?.ingressId])
        }
    } catch (error) {
        console.error('Error in updating live event:', error);
    }
}

export { livekitEventWebhook };
