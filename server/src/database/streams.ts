import { pool } from "./db"

const createStreamTable = async () => {
    try {
        pool.query(`CREATE TABLE IF NOT EXISTS streams (
            id SERIAL PRIMARY KEY,
            name TEXT NOT NULL,
            thumbnail_url TEXT,

            ingressId TEXT UNIQUE,
            streamUrl TEXT,
            streamKey TEXT,

            isLive BOOLEAN NOT NULL DEFAULT false,
            isChatDisabled BOOLEAN NOT NULL DEFAULT false,
            isChatDelayed BOOLEAN NOT NULL DEFAULT false,
            isChatFollowersOnly BOOLEAN NOT NULL DEFAULT false,

            userId INTEGER UNIQUE NOT NULL REFERENCES users(user_id),

            created_on TIMESTAMPTZ NOT NULL DEFAULT NOW(),
            updated_on TIMESTAMPTZ NOT NULL DEFAULT NOW()
        )`)
    } catch (error) {
        console.error('Error creating streams table: ', error);
    }
}

export { createStreamTable };
