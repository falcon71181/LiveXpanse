import { pool } from "./db";

export const createTable = async () => {
  try {
    await pool.query(`CREATE TABLE IF NOT EXISTS users (
            user_id SERIAL PRIMARY KEY,
            user_username TEXT NOT NULL,
            user_email TEXT UNIQUE NOT NULL,
            user_password TEXT NOT NULL
        )`);
  } catch (error) {
    throw error;
  }
};
