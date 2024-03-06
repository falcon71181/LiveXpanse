import { createReplyTable } from "../database/replies";
import { pool } from "../database/db";
import type { RequestHandler, Request, Response } from "express";
import type { QueryResult } from "pg";
import { createUserTable } from "../database/users";

// create reply or subReply to a thread
const createReply: RequestHandler = async (req: Request, res: Response) => {
  try {
    let { reply } = req.body;
    let thread_id = req.params.threadId;
    let parent_id = req.params.parentId ?? null;

    // Check if the reply exceeds the limit of 1000 characters
    if (reply.length > 1000) {
      return res
        .status(400)
        .send({ error: "Message exceeds the character limit of 1000." });
    }

    // extracting user_email from req object that was added in Middleware
    const user_email = (req as Request & { email?: string }).email;

    await createUserTable();
    // extracting user info from database users
    const userInfo: QueryResult = await pool.query(
      "SELECT * FROM users WHERE user_email = $1",
      [user_email],
    );
    // filtering userInfo to get user_id
    const user_id = userInfo.rows[0].user_id;

    // Trim whitespac from inputs
    const trimmedReply: string = reply.trim();

    // wait for table to be created
    await createReplyTable();

    // Inserting reply data into replies table
    await pool.query(
      "INSERT INTO replies (thread_id, parent_reply_id, replier_user_id, reply_message) VALUES ($1, $2, $3, $4)",
      [thread_id, parent_id, user_id, trimmedReply],
    );

    // Reply Created successful
    return res.sendStatus(200);
  } catch (error) {
    // Handle errors
    console.error("Error creating thread:", error);
    return res.status(500).send({ error: "Internal server error." });
  }
};

export { createReply };
