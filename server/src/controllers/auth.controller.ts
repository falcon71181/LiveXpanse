import { RequestHandler, Request, Response } from "express";
import { createTable } from "../database/users";
import { pool } from "../database/db";
import { QueryResult } from "pg";
import bcrypt from "bcrypt";

const registerUser: RequestHandler = async (req: Request, res: Response) => {
  console.log(req.body);
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
    await createTable();

    // Check for already existing user
    const existingUser: QueryResult = await pool.query(
      "SELECT * FROM users WHERE username = $1",
      [username],
    );

    if (existingUser.rows.length > 0) {
      const error = "User already registered";
      return res.status(409).send({ error });
    }

    // Hash password
    const hashedPassword: string = await bcrypt.hash(password, 12);

    // Insert user into database
    await pool.query(
      "INSERT INTO users (username, email, password) VALUES ($1, $2, $3)",
      [username, email, hashedPassword],
    );

    // Send success response
    res.status(200).send({ message: "User registered successfully." });
  } catch (error) {
    // Handle errors
    console.error("Error registering user:", error);
    res.status(500).send({ error: "Internal server error." });
  }
};

export { registerUser };
