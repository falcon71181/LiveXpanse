import { pool } from "./db";

export const createUser = async (): Promise<void> => {
  try {
    await pool.query(`CREATE TABLE IF NOT EXISTS users (
            registered_on BIGINT NOT NULL,
            user_id SERIAL PRIMARY KEY,
            user_username VARCHAR(255) UNIQUE,
            user_email VARCHAR(255) UNIQUE,
            user_password TEXT NOT NULL
        )`);
  } catch (error) {
    console.error("Error creating user table:", error);
    throw error;
  }
};
