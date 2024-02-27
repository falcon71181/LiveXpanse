import { creatTable } from "../database/threads";
import { pool } from "../database/db";
import type { RequestHandler, Request, Response } from "express";
import type { QueryResult } from "pg";

// create thread
const createThread: RequestHandler = async (req: Request, res: Response) => {
  try {
    let { title, message } = req.body;

    // Check if the message exceeds the limit of 1000 characters
    if (message.length > 1000) {
      return res
        .status(400)
        .send({ error: "Message exceeds the character limit of 1000." });
    }

    // extracting user_email from req object that was added in Middleware
    const user_email = (req as Request & { email?: string }).email;

    // extracting user info from database users
    const userInfo: QueryResult = await pool.query(
      "SELECT * FROM users WHERE user_email = $1",
      [user_email],
    );
    // filtering userInfo to get user_id
    const user_id = userInfo.rows[0].user_id;

    // Trim whitespac from inputs
    const trimmedTitle: string = title.trim();
    const trimmedMessage: string = message.trim();

    // wait for table to be created
    await creatTable();

    // inserting thread data into table threads
    await pool.query(
      "INSERT INTO threads (thread_title, thread_message, leader_user_id) VALUES ($1, $2, $3)",
      [trimmedTitle, trimmedMessage, user_id],
    );

    // Thread Created successful
    return res.sendStatus(200);
  } catch (error) {
    // Handle errors
    console.error("Error creating thread:", error);
    return res.status(500).send({ error: "Internal server error." });
  }
};

export { createThread };
