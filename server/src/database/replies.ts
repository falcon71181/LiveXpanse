import { pool } from "./db";

export const createTable = async () => {
  try {
    await pool.query(`CREATE TABLE IF NOT EXISTS replies (
    reply_id SERIAL PRIMARY KEY,
    thread_id INT NOT NULL,
    reply_message TEXT NOT NULL,
    replier_user_id INT NOT NULL,
    FOREIGN KEY (thread_id) REFERENCES threads(thread_id),
    FOREIGN KEY (replier_user_id) REFERENCES users(user_id)
)`);
  } catch (error) {
    throw error;
  }
};
