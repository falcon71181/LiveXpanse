import { pool } from "./db";

export const createTable = async () => {
  try {
    await pool.query(`CREATE TABLE IF NOT EXISTS users (
            id VARCHAR(255) PRIMARY KEY,
            username TEXT UNIQUE NOT NULL,
            email TEXT UNIQUE NOT NULL,
            password TEXT NOT NULL
        )`);
  } catch (error) {
    throw error;
  }
};
