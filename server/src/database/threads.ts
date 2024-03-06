import { pool } from "./db";

export const createThreadTable = async () => {
  try {
    await pool.query(`CREATE TABLE IF NOT EXISTS threads (
            thread_id SERIAL PRIMARY KEY,
            thread_title VARCHAR(255) NOT NULL,
            thread_message TEXT NOT NULL,
            leader_user_id INT NOT NULL,
            FOREIGN KEY (leader_user_id) REFERENCES users(user_id)
    )`);
  } catch (error) {
    throw error;
  }
};
