import { pool } from "./db";

// to create reply to thread
const createReplyTable = async () => {
  try {
    await pool.query(`CREATE TABLE IF NOT EXISTS replies (
      created_on BIGINT NOT NULL,
      reply_id SERIAL PRIMARY KEY,
      thread_id INT NOT NULL,
      parent_reply_id INT DEFAULT NULL,
      replier_user_id INT NOT NULL,
      reply_message TEXT NOT NULL,
      FOREIGN KEY (thread_id) REFERENCES threads(thread_id),
      FOREIGN KEY (replier_user_id) REFERENCES users(user_id)
    )`);
  } catch (error) {
    throw error;
  }
};

export { createReplyTable };
