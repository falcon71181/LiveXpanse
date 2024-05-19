import { pool } from "./db"

const createStreamTable = async () => {
    try {
        await pool.query(`CREATE TABLE IF NOT EXISTS streams (
            id SERIAL PRIMARY KEY,
            name TEXT NOT NULL,
            thumbnail_url TEXT,

            ingress_id TEXT UNIQUE,
            stream_url TEXT,
            stream_key TEXT,

            is_live BOOLEAN NOT NULL DEFAULT false,
            is_chat_disabled BOOLEAN NOT NULL DEFAULT false,
            is_chat_delayed BOOLEAN NOT NULL DEFAULT false,
            is_chat_followers_only BOOLEAN NOT NULL DEFAULT false,

            user_id INTEGER UNIQUE NOT NULL REFERENCES users(user_id),

            created_on TIMESTAMPTZ NOT NULL DEFAULT NOW(),
            updated_on TIMESTAMPTZ NOT NULL DEFAULT NOW()
        )`)
    } catch (error) {
        console.error('Error creating streams table: ', error);
    }
}

export { createStreamTable };
