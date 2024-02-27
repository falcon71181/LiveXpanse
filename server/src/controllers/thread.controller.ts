import { creatTable } from "../database/threads";
import { pool } from "../database/db";
import jwt from "jsonwebtoken";
import type { RequestHandler, Request, Response } from "express";
import type { QueryResult } from "pg";
import type { JwtPayload } from "jsonwebtoken";

// create thread
const createThread: RequestHandler = async (req: Request, res: Response) => {
  const JWT_SECRET = process.env.JWT_SECRET || "secret";

  try {
    let { title, message } = req.body;
    const { authorization } = req.headers;

    if (!authorization) {
      const error = "Auth token not provided";
      return res.status(400).send({ error });
    }

    if (!JWT_SECRET) {
      const error = "Please provide JWT secret in config (.env) files";
      return res.status(500).send({ error });
    }

    const token = authorization.split(" ")[1];

    //TODO: better to make a middleware & adding user_id in additional req headers
    // break and return 402 because of lack of authorized token
    if (!token) {
      return res.status(402).send({ error: "No JWT Token Found" });
    }

    // verify iwt token
    const user = jwt.verify(token, JWT_SECRET) as JwtPayload;
    const user_email = user.email;

    const userInfo: QueryResult = await pool.query(
      "SELECT * FROM users WHERE user_email = $1",
      [user_email],
    );
    const user_id = userInfo.rows[0].user_id;

    // Trim whitespac from inputs
    const trimmedTitle: string = title.trim();
    const trimmedMessage: string = message.trim();

    // wait for table to be created
    await creatTable();

    await pool.query(
      "INSERT INTO threads (thread_title, thread_message, leader_user_id) VALUES ($1, $2, $3)",
      [trimmedTitle, trimmedMessage, user_id],
    );

    // Thread Created successful
    return res.sendStatus(200);
  } catch (error) {
    console.error("Error creating thread:", error);
    return res.status(500).send({ error: "Internal server error." });
  }
};

export { createThread };
