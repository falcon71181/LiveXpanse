import { createUserTable } from "../database/users";
import { pool } from "../database/db";
import bcrypt, { compare } from "bcrypt";
import { createToken } from "../lib/token";
import type { RequestHandler, Request, Response } from "express";
import type { QueryResult } from "pg";

// send user`s data
const getUserData: RequestHandler = async (req: Request, res: Response) => {
  try {
    const user_email = (req as Request & { email?: string }).email;

    // extracting user info from database users
    const userInfo: QueryResult = await pool.query(
      "SELECT * FROM users WHERE user_email = $1",
      [user_email as string],
    );

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
    await pool.query(
      "INSERT INTO users (registered_on, user_username, user_email, user_password) VALUES ($1, $2, $3, $4)",
      [Date.now(), username, email, hashedPassword],
    );

    //  create jwt token
    const token: string = createToken(email);

    // Send success response
    res.status(200).send({
      message: "User registered successfully.",
      username: username,
      token: token,
    });
  } catch (error) {
    // Handle errors
    console.error("Error registering user:", error);
    res.status(500).send({ error: "Internal server error." });
  }
};

export { getUserData, loginUser, registerUser };
