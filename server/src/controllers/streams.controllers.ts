import { Request, Response } from "express";
import { createUser } from "../database/users";
import { createStreamTable } from "../database/streams";
import { pool } from "../database/db";
import { QueryResult } from "pg";
import { createIngress } from "../lib/ingress";
import { AccessToken } from "livekit-server-sdk";

// NOTE: The below two controllers are very same in functionality
// TODO: Build a single function to use for both

const getStream = async (req: Request, res: Response) => {
    const email = (req as Request & { email?: string }).email;

    try {
        await createUser();
        await createStreamTable();

        const userResult: QueryResult<{ user_id: string }> = await pool.query(`
            SELECT user_id from users
            WHERE user_email = $1
        `, [email]);

        const user_id = userResult.rows[0].user_id;

        if (!user_id) {
            throw new Error('User doesn\'t exist.');
        }

        const streamResult = await pool.query(`
            SELECT * FROM streams
            WHERE user_id = $1
        `, [user_id])

        const stream = streamResult.rows[0];

        if (!stream) {
            throw new Error('Stream doesn\'t exist.');
        }

        res.json(stream);
    } catch (error) {
        console.error('Error getting stream for current user', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

const getStreamByUsername = async (req: Request, res: Response) => {
    const { username } = req.params;

    try {
        await createUser();
        await createStreamTable();

        const userResult: QueryResult<{ user_id: string }> = await pool.query(`
            SELECT user_id from users
            WHERE user_username = $1
        `, [username]);

        const user_id = userResult.rows[0].user_id;

        if (!user_id) {
            throw new Error('User doesn\'t exist.');
        }

        const streamResult = await pool.query(`
            SELECT * FROM streams
            WHERE user_id = $1
        `, [user_id])

        const stream = streamResult.rows[0];

        if (!stream) {
            throw new Error('Stream doesn\'t exist.');
        }

        res.json(stream);
    } catch (error) {
        console.error('Error getting stream from userId:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

const createViewerToken = async (req: Request, res: Response) => {
    const { host, current } = req.body;

    try {
        const isHost = host === current;
        const token = new AccessToken(
            process.env.LIVEKIT_API_KEY!,
            process.env.LIVEKIT_API_SECRET!,
            {
                identity: isHost ? `host-${current}` : current,
                name: current
            }
        )

        token.addGrant({
            room: `${host.id}`,
            roomJoin: true,
            canPublish: true,
            canPublishData: true
        })

        const response = await Promise.resolve(token.toJwt());
        res.json(response);
    } catch (error) {
        if (error instanceof Error) {
            console.error('Error creating viewer token:', error.message);
        }

        res.status(500).json({ error: 'Internal server error' });
    }

}

const getIngress = async (req: Request, res: Response) => {
    const email = (req as Request & { email?: string }).email;

    try {
        await createUser();

        const result: QueryResult<{
            user_id: string,
            user_username: string
        }> = await pool.query(`
            SELECT user_id, user_username FROM users
            WHERE user_email = $1
        `, [email])

        const user = result.rows[0];
        const ingress = await createIngress(user);

        res.json(ingress);
    } catch (error) {
        console.error('Error getting ingress:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

export { getStream, getStreamByUsername, getIngress, createViewerToken };
