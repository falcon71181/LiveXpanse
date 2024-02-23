import { pool } from "./db";

export const createTable = async () => {
  try {
    await pool.query(`CREATE TABLE IF NOT EXISTS users (
            id SERIAL PRIMARY KEY,
            username TEXT NOT NULL,
            email TEXT UNIQUE NOT NULL,
            password TEXT NOT NULL
        )`);
  } catch (error) {
    throw error;
  }
};
