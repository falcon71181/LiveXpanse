import type { RequestHandler, Request, Response } from "express";
import bcrypt, { compare } from "bcrypt";
import { createToken } from "../lib/token";

import type { QueryResult } from "pg";
import { pool } from "../database/db";
import { createUser, createUser as createUserTable } from "../database/users";
import { createStreamTable } from "../database/streams";

const getAllUsers = async (_req: Request, res: Response) => {
    try {
        await createUser();

        const result: QueryResult<{
            user_id: number;
            user_email: string;
            user_username: string;
            is_live: boolean;
        }> = await pool.query(`
            SELECT users.user_id, users.user_username, users.user_email, streams.is_live
            FROM users
            JOIN streams ON users.user_id = streams.user_id
        `);

        const users = result.rows;
        res.json({ users })
    } catch (error) {
        console.error('Error occured getting all users:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

// send user`s data
const getProfileData: RequestHandler = async (req: Request, res: Response) => {
  try {
    const username: string = req.params.username;

    await createUserTable();
    // extracting user info from database users
    const userInfo: QueryResult = await pool.query(
      "SELECT * FROM users WHERE user_username = $1",
      [username as string],
    );

    if (!userInfo.rows.length) {
      return res.status(404).send({ error: "User do not exist." });
    }
    const user_details = userInfo.rows[0];

    res.status(200).send({
      username: user_details.user_username,
      email: user_details.user_email,
      joinedOn: user_details.registered_on,
    });
  } catch (error) {
    // Handle errors
    console.error("Error sending user's details:", error);
    return res.status(500).send({ error: "Internal server error." });
  }
};

// Update Profile 
const updateUserProfile: RequestHandler = async (req: Request, res: Response) => {
  try {
    const { updatedUsername, updatedEmail, currentPassword, updatedPassword, updatedConfirmPassword } = req.body;
    const email = (req as Request & { email?: string }).email;

    // Trim whitespace from inputs
    const trimmedUsername: string = updatedUsername.trim();
    const trimmedEmail: string = updatedEmail.trim();
    const trimmedPassword: string = currentPassword.trim();
    const trimmedUpdatedPassword: string = updatedPassword.trim();
    const trimmedConfirmPassword: string = updatedConfirmPassword.trim();

    // Check if user exists
    let existingUser: QueryResult = await pool.query(
      "SELECT * FROM users WHERE user_email = $1",
      [email as string],
    );
    // update the password
    if (trimmedUpdatedPassword.length > 8 && trimmedConfirmPassword.length > 8) {
      if (trimmedUpdatedPassword != trimmedConfirmPassword) {
        return res.status(401).send({ error: "New password and confirm password are not same." });
      }

      const user = existingUser.rows[0];
      const isPasswordCorrect: boolean = await compare(trimmedPassword, user.user_password);

      if (!isPasswordCorrect) {
        return res.status(401).send({ error: "Incorrect password." });
      }

      const hashedPassword: string = await bcrypt.hash(trimmedConfirmPassword, 12);
      const update_user_password: QueryResult = await pool.query("UPDATE users SET user_password = $1 WHERE user_email = $2", [hashedPassword as string, email as string]);

      if (update_user_password) {
        return res.status(200).send({
          message: "Password updated successfully.",
        })
      }
    } else if (email != trimmedEmail) { // update the email
      // Validate email format
      const emailRegex: RegExp = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(trimmedEmail)) {
        return res.status(400).send({ error: "Invalid email format." });
      }

      const user = existingUser.rows[0];

      const isPasswordCorrect: boolean = await compare(trimmedPassword, user.user_password);

      if (!isPasswordCorrect) {
        return res.status(401).send({ error: "Incorrect password." });
      }

      const update_user_email: QueryResult = await pool.query("UPDATE users SET user_email = $1 WHERE user_email = $2", [trimmedEmail as string, email as string]);

      if (update_user_email) {
        const token: string = createToken(trimmedEmail);
        return res.status(200).send({
          message: "Email updated successfully.",
          username: user.user_username,
          email: trimmedEmail,
          token: token,
        })
      }
    } else if (trimmedUsername != existingUser.rows[0].user_username) { // Update username

      const user = existingUser.rows[0];
      const isPasswordCorrect: boolean = await compare(trimmedPassword, user.user_password);

      if (!isPasswordCorrect) {
        return res.status(401).send({ error: "Incorrect password." });
      }

      const username_data: QueryResult = await pool.query("SELECT * FROM users WHERE user_username = $1", [trimmedUsername as string]);
      if (username_data.rows.length != 0) {
        return res.status(409).send({
          error: "User with same username exists.",
        })
      }

      const update_user_username: QueryResult = await pool.query("UPDATE users SET user_username = $1 WHERE user_email = $2", [trimmedUsername as string, email as string]);

      if (update_user_username) {
        return res.status(200).send({
          message: "Username updated successfully.",
          username: trimmedUsername,
        })
      }
    }

    return res.status(404).send({ error: "Wrong request, Check again." });

  } catch (error) {
    // Handle errors
    console.error("Error sending user's details:", error);
    return res.status(500).send({ error: "Internal server error." });
  }
}

// User Login
const loginUser: RequestHandler = async (req: Request, res: Response) => {
  try {
    let { email, password } = req.body;

    // Trim whitespace from inputs
    const trimmedEmail: string = email.trim();
    const trimmedPassword: string = password.trim();

    // Check for missing fields
    if (!trimmedEmail || !trimmedPassword) {
      return res
        .status(400)
        .send({ error: "Please provide email and password." });
    }

    // Validate email format
    const emailRegex: RegExp = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(trimmedEmail)) {
      return res.status(400).send({ error: "Invalid email format." });
    }

    // Ensure table exists in database
    await createUserTable();

    // Check if user exists
    const existingUser: QueryResult = await pool.query(
      "SELECT * FROM users WHERE user_email = $1",
      [trimmedEmail],
    );

    if (existingUser.rows.length === 0) {
      return res.status(404).send({ error: "User not found." });
    }

    const user = existingUser.rows[0];

    // Compare passwords
    const isPasswordCorrect: boolean = await compare(
      trimmedPassword,
      user.user_password,
    );

    if (!isPasswordCorrect) {
      return res.status(401).send({ error: "Incorrect password." });
    }

    // create jwt token
    const token: string = createToken(user.user_email);

    // Login successful
    return res.status(200).send({
      message: "User logged in successfully.",
      username: user.user_username,
      email: user.user_email,
      token: token,
    });
  } catch (error) {
    console.error("Error logging in:", error);
    return res.status(500).send({ error: "Internal server error." });
  }
};

// User Registration
const registerUser: RequestHandler = async (req: Request, res: Response) => {
  let { username, email, password, confirmPassword } = req.body;

  // Trim whitespace from inputs
  username = username.trim();
  email = email.trim();
  password = password.trim();
  confirmPassword = confirmPassword.trim();

  // Check for missing fields
  if (!username || !email || !password || !confirmPassword) {
    const error =
      "Require all following data: username, email, password, confirmPassword";
    return res.status(400).send({ error });
  }

  // Validate email format
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    const error = "Invalid email format.";
    return res.status(400).send({ error });
  }

  // Check if passwords match
  if (password !== confirmPassword) {
    const error = "Passwords do not match.";
    return res.status(400).send({ error });
  }

  try {
    // Wait for db to Create Table users
    await createUserTable();

    // Check for already existing user
    const existingUser: QueryResult = await pool.query(
      "SELECT * FROM users WHERE user_email = $1",
      [email],
    );

    if (existingUser.rows.length > 0) {
      const error = "User already registered";
      return res.status(409).send({ error });
    }

    // Hash password
    const hashedPassword: string = await bcrypt.hash(password, 12);

    // Insert user into database
    const result: QueryResult<{ user_id: string }> = await pool.query(`
      INSERT INTO users (registered_on, user_username, user_email, user_password)
      VALUES ($1, $2, $3, $4)
      RETURNING user_id
    `, [Date.now(), username, email, hashedPassword])

    const user_id = result.rows[0].user_id;

    // Create stream for that user
    await createStreamTable();

    await pool.query(`
      INSERT INTO streams (name, user_id)
      VALUES ($1, $2)
    `, [`${username}'s stream`, user_id]);

    //  create jwt token
    const token: string = createToken(email);

    // Send success response
    res.status(200).send({
      message: "User registered successfully.",
      username: username,
      email: email,
      token: token,
    });
  } catch (error) {
    // Handle errors
    console.error("Error registering user:", error);
    res.status(500).send({ error: "Internal server error." });
  }
};

export { getProfileData, updateUserProfile, loginUser, registerUser, getAllUsers };
