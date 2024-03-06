import { createTable } from "../database/threads";
import { createReplyTable } from "../database/replies";
import { pool } from "../database/db";
import type { RequestHandler, Request, Response } from "express";
import type { QueryResult } from "pg";

type threadInfo = {
  threadId: number;
  leader: string;
  title: string;
  message: string;
};

type reply = {
  parentReplyId: number | null;
  replyId: number;
  leader: string;
  message: string;
};

type SingleThreadInfo = threadInfo & { replies: reply[] };

// get single thread info
const getThreadInfo: RequestHandler = async (req: Request, res: Response) => {
  try {
    const threadId = req.params.thread_Id;

    // Retrieve the thread from the database
    const threads: QueryResult = await pool.query(
      "SELECT * FROM threads WHERE thread_id = $1",
      [threadId],
    );

    const thread = threads.rows[0];

    // Retrieve the user data of the thread leader
    const userData: QueryResult = await pool.query(
      "SELECT * FROM users WHERE user_id = $1",
      [thread.leader_user_id],
    );
    let username = null;
    if (userData.rows.length == 1) {
      username = userData.rows[0].user_username;
    }

    // Create the replies table if it doesn't exist
    await createReplyTable();

    const replies: reply[] = [];
    const replyData: QueryResult = await pool.query(
      "SELECT reply_id, parent_reply_id, replier_user_id, reply_message FROM replies WHERE thread_id = $1",
      [threadId],
    );

    // Retrieve the reply data for the thread
    for (const replyRow of replyData.rows) {
      let replierUsername = null;
      const replierData: QueryResult = await pool.query(
        "SELECT * FROM users WHERE user_id = $1",
        [replyRow.replier_user_id],
      );
      if (replierData.rows.length == 1) {
        replierUsername = replierData.rows[0].user_username;
      }

      const replyObj: reply = {
        parentReplyId: Number(replyRow.parent_reply_id),
        replyId: Number(replyRow.reply_id),
        leader: replierUsername,
        message: replyRow.reply_message,
      };

      replies.push(replyObj);
    }

    // Create the SingleThreadInfo object with the retrieved data
    const threadObj: SingleThreadInfo = {
      threadId: Number(threadId),
      leader: username,
      title: thread.thread_title,
      message: thread.thread_message,
      replies: replies,
    };

    // Send the thread object as the response
    return res.status(200).send(threadObj);
  } catch (error) {
    console.error("Error creating thread:", error);
    return res.status(500).send({ error: "Internal server error." });
  }
};

// get all thread info
const getAllThreads: RequestHandler = async (_req: Request, res: Response) => {
  try {
    await createTable();
    // fetching threads from table threads
    const threads: QueryResult = await pool.query("SELECT * FROM threads");

    if (threads.rows.length == 0) {
      return res.status(404).send({ error: "No Thread Exist." });
    }

    // Create an empty array to store the objects
    const threadsData = [];

    // Iterate through each row in the threads result
    for (const thread of threads.rows) {
      // fetching username using user_id
      let data = await pool.query("SELECT * FROM users WHERE user_id = $1", [
        thread.leader_user_id,
      ]);

      let username = null; // Initialize username variable

      if (data.rows.length == 1) {
        username = data.rows[0].user_username; // Assign value to username variable
      }

      // thread data object
      let threadObj: threadInfo = {
        threadId: thread.thread_id,
        leader: username,
        title: thread.thread_title,
        message: thread.thread_message,
      };

      threadsData.push(threadObj);
    }

    // Thread Created successful
    return res.status(200).send(threadsData);
  } catch (error) {
    // Handle errors
    console.error("Error creating thread:", error);
    return res.status(500).send({ error: "Internal server error." });
  }
};

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
    await createTable();

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

export { getThreadInfo, getAllThreads, createThread };
